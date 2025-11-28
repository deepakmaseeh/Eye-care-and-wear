import { Router } from 'express'
import { authenticateAdmin } from '../../middleware/auth'
import User from '../../../../models/User'
import Order from '../../../../models/Order'
import connectDB from '../../config/database'

const router = Router()

router.get('/', authenticateAdmin, async (req, res) => {
  try {
    await connectDB()

    const { search, status } = req.query

    const query: any = { role: { $ne: 'admin' } }
    if (status) query.status = status

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { 'profile.phone': { $regex: search, $options: 'i' } },
      ]
    }

    const customers = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(100)
      .lean()

    const customersWithStats = await Promise.all(
      customers.map(async (customer: any) => {
        const orders = await Order.find({ userId: customer._id })
        const totalOrders = orders.length
        const totalSpent = orders
          .filter((o: any) => o.paymentStatus === 'completed')
          .reduce((sum: number, o: any) => sum + o.total, 0)

        return { ...customer, totalOrders, totalSpent }
      })
    )

    res.json({ success: true, data: customersWithStats })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router

