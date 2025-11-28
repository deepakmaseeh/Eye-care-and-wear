import { NextRequest, NextResponse } from 'next/server'
import { authenticateAdmin } from '@/lib/admin-auth'
import connectDB from '@/lib/mongodb'
import Prescription from '@/models/Prescription'

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

    // Build query
    const query: any = {}

    if (status) {
      query.status = status
    }

    const prescriptions = await Prescription.find(query)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name')
      .sort({ issueDate: -1 })
      .limit(100)

    // Filter by search term if provided
    let filteredPrescriptions = prescriptions
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPrescriptions = prescriptions.filter((prescription: any) => {
        const patient = prescription.patientId as any
        const doctor = prescription.doctorId as any
        return (
          patient?.name?.toLowerCase().includes(searchLower) ||
          patient?.email?.toLowerCase().includes(searchLower) ||
          doctor?.name?.toLowerCase().includes(searchLower) ||
          prescription.prescriptionId.toLowerCase().includes(searchLower)
        )
      })
    }

    return NextResponse.json({
      success: true,
      data: filteredPrescriptions,
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

