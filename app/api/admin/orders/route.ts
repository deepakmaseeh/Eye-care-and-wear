import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/mongodb'
import Order from '@/models/Order'
import User from '@/models/User'

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
    const orderStatus = searchParams.get('orderStatus')
    const paymentStatus = searchParams.get('paymentStatus')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    // Build query
    const query: any = {}

    if (orderStatus) {
      query.orderStatus = orderStatus
    }

    if (paymentStatus) {
      query.paymentStatus = paymentStatus
    }

    // Fetch orders with user data
    const skip = (page - 1) * limit
    let orders = await Order.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean()

    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase()
      orders = orders.filter((order: any) => {
        const userId = order.userId as any
        return (
          order._id.toString().toLowerCase().includes(searchLower) ||
          userId?.name?.toLowerCase().includes(searchLower) ||
          userId?.email?.toLowerCase().includes(searchLower)
        )
      })
    }

    const total = await Order.countDocuments(query)

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
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

