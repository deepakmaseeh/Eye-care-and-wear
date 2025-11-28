import { Router } from 'express'
import { authenticateAdmin } from '../../middleware/auth'
import Order from '../../../../models/Order'
import connectDB from '../../config/database'

const router = Router()

router.get('/', authenticateAdmin, async (req, res) => {
  try {
    await connectDB()

    const { search, orderStatus, paymentStatus } = req.query

    const query: any = {}
    if (orderStatus) query.orderStatus = orderStatus
    if (paymentStatus) query.paymentStatus = paymentStatus

    let orders = await Order.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .limit(100)
      .lean()

    if (search) {
      const searchLower = (search as string).toLowerCase()
      orders = orders.filter((order: any) => {
        const userId = order.userId as any
        return (
          order._id.toString().toLowerCase().includes(searchLower) ||
          userId?.name?.toLowerCase().includes(searchLower) ||
          userId?.email?.toLowerCase().includes(searchLower)
        )
      })
    }

    res.json({ success: true, data: orders })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router

