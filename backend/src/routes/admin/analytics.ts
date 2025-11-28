import { Router } from 'express'
import { authenticateAdmin } from '../../middleware/auth'
import Order from '../../../../models/Order'
import User from '../../../../models/User'
import Product from '../../../../models/Product'
import connectDB from '../../config/database'

const router = Router()

router.get('/', authenticateAdmin, async (req, res) => {
  try {
    await connectDB()

    const range = parseInt((req.query.range as string) || '30')
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - range)

    const orders = await Order.find({
      createdAt: { $gte: startDate },
      paymentStatus: 'completed',
    })

    const totalSales = orders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = orders.length
    const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0

    const totalCustomers = await User.countDocuments({ role: { $ne: 'admin' } })
    const activeCustomers = await User.countDocuments({
      role: { $ne: 'admin' },
      lastLogin: { $gte: startDate },
    })

    const totalProducts = await Product.countDocuments()
    const lowStockProducts = await Product.countDocuments({
      $expr: {
        $and: [
          { $gt: ['$quantity', 0] },
          { $lte: ['$quantity', '$lowStockThreshold'] },
        ],
      },
    })

    res.json({
      success: true,
      data: {
        totalSales,
        totalOrders,
        avgOrderValue: Math.round(avgOrderValue),
        conversionRate: 0,
        totalCustomers,
        activeCustomers,
        totalProducts,
        lowStockProducts,
      },
    })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router

