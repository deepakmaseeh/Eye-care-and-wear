import { Router } from 'express'
import { authenticateAdmin } from '../../middleware/auth'
import connectDB from '../../config/database'
import User from '../../../../models/User'
import Doctor from '../../../../models/Doctor'
import Order from '../../../../models/Order'
import Consultation from '../../../../models/Consultation'

const router = Router()

router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    await connectDB()

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfToday = new Date(startOfToday)
    endOfToday.setHours(23, 59, 59, 999)

    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)

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

    res.json({
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
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

export default router

