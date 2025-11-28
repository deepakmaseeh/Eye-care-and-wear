import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import Order from '@/models/Order'

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
    const search = searchParams.get('search')
    const status = searchParams.get('status')

    // Build query
    const query: any = { role: { $ne: 'admin' } }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { 'profile.phone': { $regex: search, $options: 'i' } },
      ]
    }

    if (status) {
      query.status = status
    }

    const customers = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(100)
      .lean()

    // Get order stats for each customer
    const customersWithStats = await Promise.all(
      customers.map(async (customer: any) => {
        const orders = await Order.find({ userId: customer._id })
        const totalOrders = orders.length
        const totalSpent = orders
          .filter((o: any) => o.paymentStatus === 'completed')
          .reduce((sum: number, o: any) => sum + o.total, 0)

        return {
          ...customer,
          totalOrders,
          totalSpent,
        }
      })
    )

    return NextResponse.json({
      success: true,
      data: customersWithStats,
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

