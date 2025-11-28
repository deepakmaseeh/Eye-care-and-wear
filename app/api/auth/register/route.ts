import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { generateToken } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const { email, password, name, phone } = await request.json()

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        {
          success: false,
          error: 'Email, password, and name are required',
        },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: 'Password must be at least 6 characters',
        },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'User already exists',
        },
        { status: 400 }
      )
    }

    // Create user
    const user = new User({
      email,
      password,
      name,
      profile: phone ? { phone } : undefined,
    })

    await user.save()

    // Generate token
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
    })

    return NextResponse.json(
      {
        success: true,
        data: {
          token,
          user: {
            id: user._id,
            email: user.email,
            name: user.name,
          },
        },
        message: 'User registered successfully',
      },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        message: 'Failed to register user',
      },
      { status: 500 }
    )
  }
}

