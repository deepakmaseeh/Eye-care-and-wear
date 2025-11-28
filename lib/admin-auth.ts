import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, JWTPayload } from './jwt'
import connectDB from './mongodb'
import AdminUser, { AdminRole } from '@/models/AdminUser'

export interface AdminJWTPayload extends JWTPayload {
  adminId: string
  role: AdminRole
  clinicId?: string
}

export async function authenticateAdmin(request: NextRequest): Promise<AdminJWTPayload | null> {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7)
    const payload = verifyToken(token) as any
    
    // Verify admin user exists and is active
    await connectDB()
    const admin = await AdminUser.findById(payload.adminId || payload.userId)
    
    if (!admin || !admin.isActive) {
      return null
    }

    return {
      userId: admin._id.toString(),
      email: admin.email,
      adminId: admin._id.toString(),
      role: admin.role,
      clinicId: admin.clinicId?.toString(),
    }
  } catch (error) {
    return null
  }
}

export function requireRole(allowedRoles: AdminRole[]) {
  return async (request: NextRequest): Promise<AdminJWTPayload | null> => {
    const admin = await authenticateAdmin(request)
    
    if (!admin) {
      return null
    }

    if (!allowedRoles.includes(admin.role)) {
      return null
    }

    return admin
  }
}

export function requireSuperAdmin(request: NextRequest): Promise<AdminJWTPayload | null> {
  return requireRole(['super_admin'])(request)
}

export function requireAdmin(request: NextRequest): Promise<AdminJWTPayload | null> {
  return requireRole(['super_admin', 'admin'])(request)
}

export function requireClinicManager(request: NextRequest): Promise<AdminJWTPayload | null> {
  return requireRole(['super_admin', 'admin', 'clinic_manager'])(request)
}

export function createAdminResponse(data: any, status: number = 200) {
  return NextResponse.json(
    {
      success: status < 400,
      data,
    },
    { status }
  )
}

export function createAdminErrorResponse(message: string, status: number = 400) {
  return NextResponse.json(
    {
      success: false,
      error: message,
    },
    { status }
  )
}

