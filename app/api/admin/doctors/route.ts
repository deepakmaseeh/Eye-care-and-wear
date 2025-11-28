import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/mongodb'
import Doctor from '@/models/Doctor'

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

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')
    const status = searchParams.get('status')
    const verificationStatus = searchParams.get('verificationStatus')
    const specialty = searchParams.get('specialty')

    // Build query
    const query: any = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { licenseNumber: { $regex: search, $options: 'i' } },
      ]
    }

    if (status) {
      query.accountStatus = status
    }

    if (verificationStatus) {
      query.verificationStatus = verificationStatus
    }

    if (specialty) {
      query.primarySpecialty = specialty
    }

    // Apply clinic filter for clinic managers
    if (admin.role === 'clinic_manager' && admin.clinicId) {
      query.clinicId = admin.clinicId
    }

    const doctors = await Doctor.find(query)
      .populate('clinicId', 'name')
      .sort({ createdAt: -1 })
      .limit(100)

    return NextResponse.json({
      success: true,
      data: doctors,
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

    if (!['super_admin', 'admin'].includes(admin.role)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Insufficient permissions',
        },
        { status: 403 }
      )
    }

    await connectDB()

    const body = await request.json()
    const doctor = new Doctor(body)
    await doctor.save()

    return NextResponse.json({
      success: true,
      data: doctor,
      message: 'Doctor created successfully',
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

