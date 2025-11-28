import { Router } from 'express'
import User from '../../../models/User'
import { generateToken } from '../utils/jwt'
import connectDB from '../config/database'

const router = Router()

// User Login
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

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      })
    }

    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials',
      })
    }

    user.lastLogin = new Date()
    await user.save()

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    })

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
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

// User Register
router.post('/register', async (req, res) => {
  try {
    await connectDB()

    const { email, password, name } = req.body

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        error: 'Name, email, and password are required',
      })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: 'User already exists',
      })
    }

    const user = new User({
      email,
      password,
      name,
      role: 'user',
    })

    await user.save()

    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    })

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
        },
      },
      message: 'Registration successful',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

export default router

