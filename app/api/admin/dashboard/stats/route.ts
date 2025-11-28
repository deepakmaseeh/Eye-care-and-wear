import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import Doctor from '@/models/Doctor'
import Order from '@/models/Order'
import Consultation from '@/models/Consultation'

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

    // Get current date ranges
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfToday = new Date(startOfToday)
    endOfToday.setHours(23, 59, 59, 999)

    // Get last month for comparison
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

    // Fetch stats in parallel
    const [
      totalUsers,
      totalDoctors,
      totalOrders,
      totalConsultations,
      ordersThisMonth,
      consultationsToday,
      revenueThisMonth,
      revenueLastMonth,
    ] = await Promise.all([
      User.countDocuments({ status: { $ne: 'deleted' } }),
      Doctor.countDocuments({ accountStatus: 'active' }),
      Order.countDocuments(),
      Consultation.countDocuments(),
      Order.countDocuments({
        createdAt: { $gte: startOfMonth },
      }),
      Consultation.countDocuments({
        scheduledDate: { $gte: startOfToday, $lte: endOfToday },
      }),
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: startOfMonth },
            paymentStatus: 'completed',
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$total' },
          },
        },
      ]),
      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: lastMonth, $lte: endOfLastMonth },
            paymentStatus: 'completed',
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$total' },
          },
        },
      ]),
    ])

    const revenueThisMonthValue = revenueThisMonth[0]?.total || 0
    const revenueLastMonthValue = revenueLastMonth[0]?.total || 0
    const revenueGrowth =
      revenueLastMonthValue > 0
        ? (((revenueThisMonthValue - revenueLastMonthValue) / revenueLastMonthValue) * 100).toFixed(1)
        : 0

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalDoctors,
        totalOrders,
        totalConsultations,
        ordersThisMonth,
        consultationsToday,
        revenueThisMonth: revenueThisMonthValue,
        revenueGrowth: parseFloat(revenueGrowth),
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

