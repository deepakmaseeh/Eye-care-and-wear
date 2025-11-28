import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/mongodb'
import Doctor from '@/models/Doctor'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const doctor = await Doctor.findByIdAndUpdate(
      params.id,
      {
        verificationStatus: 'verified',
        verifiedAt: new Date(),
        verifiedBy: admin.adminId,
        accountStatus: 'active',
      },
      { new: true }
    )

    if (!doctor) {
      return NextResponse.json(
        {
          success: false,
          error: 'Doctor not found',
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: doctor,
      message: 'Doctor verified successfully',
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

