import { Router } from 'express'
import AdminUser from '../../../../models/AdminUser'
import { generateAdminToken } from '../../utils/jwt'
import { authenticateAdmin } from '../../middleware/auth'
import connectDB from '../../config/database'

const router = Router()

// Admin Login
router.post('/login', async (req, res) => {
  try {
    await connectDB()

    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required',
      })
    }

    const admin = await AdminUser.findOne({ email })
    if (!admin) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      })
    }

    if (!admin.isActive) {
      return res.status(403).json({
        success: false,
        error: 'Account is inactive. Please contact administrator.',
      })
    }

    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      })
    }

    admin.lastLogin = new Date()
    await admin.save()

    const token = generateAdminToken({
      adminId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      clinicId: admin.clinicId?.toString(),
    })

    res.json({
      success: true,
      data: {
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
          clinicId: admin.clinicId,
        },
      },
      message: 'Login successful',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Get current admin
router.get('/me', authenticateAdmin, async (req: any, res) => {
  try {
    await connectDB()

    const admin = await AdminUser.findById(req.admin?.adminId)
      .select('-password')
      .populate('clinicId', 'name city state')

    if (!admin) {
      return res.status(404).json({
        success: false,
        error: 'Admin not found',
      })
    }

    res.json({
      success: true,
      data: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        clinicId: admin.clinicId,
        permissions: admin.permissions,
        isActive: admin.isActive,
        lastLogin: admin.lastLogin,
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

