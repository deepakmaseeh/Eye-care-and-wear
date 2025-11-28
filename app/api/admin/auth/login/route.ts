import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import AdminUser from '@/models/AdminUser'
import { generateAdminToken } from '@/lib/admin-jwt'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email and password are required',
        },
        { status: 400 }
      )
    }

    // Find admin user
    const admin = await AdminUser.findOne({ email })
    if (!admin) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials',
        },
        { status: 401 }
      )
    }

    // Check if admin is active
    if (!admin.isActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'Account is inactive. Please contact administrator.',
        },
        { status: 403 }
      )
    }

    // Check password
    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials',
        },
        { status: 401 }
      )
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    // Generate token
    const token = generateAdminToken({
      adminId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      clinicId: admin.clinicId?.toString(),
    })

    return NextResponse.json({
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
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: 'Failed to login',
      },
      { status: 500 }
    )
  }
}

