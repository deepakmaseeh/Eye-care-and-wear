import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'
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

    const { searchParams } = new URL(request.url)
    const range = parseInt(searchParams.get('range') || '30')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - range)

    // Calculate date range
    const now = new Date()

    // Sales metrics
    const orders = await Order.find({
      createdAt: { $gte: startDate },
      paymentStatus: 'completed',
    })

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = orders.length
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

    // Customer metrics
    const totalCustomers = await User.countDocuments({ role: { $ne: 'admin' } })
    const activeCustomers = await User.countDocuments({
      role: { $ne: 'admin' },
      lastLogin: { $gte: startDate },
    })

    // Product metrics
    const totalProducts = await Product.countDocuments()
    const lowStockProducts = await Product.countDocuments({
      $expr: {
        $and: [
          { $gt: ['$quantity', 0] },
          { $lte: ['$quantity', '$lowStockThreshold'] },
        ],
      },
    })

    // Conversion rate (simplified - would need more data)
    const conversionRate = 0 // Placeholder

    return NextResponse.json({
      success: true,
      data: {
        totalSales,
        totalOrders,
        avgOrderValue: Math.round(avgOrderValue),
        conversionRate,
        totalCustomers,
        activeCustomers,
        totalProducts,
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

