import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'

export async function GET(request: NextRequest) {
  try {
    const admin = await authenticateAdmin(request)
    
    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
        },
        { status: 401 }
      )
    }

    await connectDB()

    // Get inventory stats
    const [totalProducts, inStock, lowStock, outOfStock, lowStockProducts] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ quantity: { $gt: 0 } }),
      Product.countDocuments({
        $expr: {
          $and: [
            { $gt: ['$quantity', 0] },
            { $lte: ['$quantity', '$lowStockThreshold'] },
          ],
        },
      }),
      Product.countDocuments({ quantity: 0 }),
      Product.find({
        $expr: {
          $and: [
            { $gt: ['$quantity', 0] },
            { $lte: ['$quantity', '$lowStockThreshold'] },
          ],
        },
      })
        .select('name sku quantity lowStockThreshold price')
        .sort({ quantity: 1 })
        .limit(50),
    ])

    // Calculate total inventory value
    const inventoryValue = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $multiply: ['$quantity', '$costPrice'],
            },
          },
        },
      },
    ])

    const totalValue = inventoryValue[0]?.total || 0

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalProducts,
          inStock,
          lowStock,
          outOfStock,
          totalValue,
        },
        lowStockProducts,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    )
  }
}

