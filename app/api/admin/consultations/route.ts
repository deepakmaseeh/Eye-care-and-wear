import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/mongodb'
import Consultation from '@/models/Consultation'

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
    const type = searchParams.get('type')

    // Build query
    const query: any = {}

    if (status) {
      query.status = status
    }

    if (type) {
      query.type = type
    }

    // Apply clinic filter for clinic managers
    if (admin.role === 'clinic_manager' && admin.clinicId) {
      query.clinicId = admin.clinicId
    }

    const consultations = await Consultation.find(query)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name primarySpecialty')
      .sort({ scheduledDate: -1, scheduledTime: -1 })
      .limit(100)

    // Filter by search term if provided
    let filteredConsultations = consultations
    if (search) {
      const searchLower = search.toLowerCase()
      filteredConsultations = consultations.filter((consultation: any) => {
        const patient = consultation.patientId as any
        const doctor = consultation.doctorId as any
        return (
          patient?.name?.toLowerCase().includes(searchLower) ||
          patient?.email?.toLowerCase().includes(searchLower) ||
          doctor?.name?.toLowerCase().includes(searchLower)
        )
      })
    }

    return NextResponse.json({
      success: true,
      data: filteredConsultations,
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

