import { NextRequest, NextResponse } from 'next/server'
import { requireSuperAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/mongodb'
import Settings from '@/models/Settings'

export async function GET(request: NextRequest) {
  try {
    const admin = await requireSuperAdmin(request)
    
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

    const settings = await Settings.find({ category: 'general' })
    const settingsObj: any = {}
    settings.forEach((setting) => {
      settingsObj[setting.key] = setting.value
    })

    return NextResponse.json({
      success: true,
      data: settingsObj,
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

export async function POST(request: NextRequest) {
  try {
    const admin = await requireSuperAdmin(request)
    
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

    const body = await request.json()

    // Save each setting
    for (const [key, value] of Object.entries(body)) {
      await Settings.findOneAndUpdate(
        { key, category: 'general' },
        {
          key,
          value,
          category: 'general',
          updatedBy: admin.adminId,
        },
        { upsert: true, new: true }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Settings saved successfully',
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

