import jwt from 'jsonwebtoken'
import { AdminRole } from '@/models/AdminUser'

const JWT_SECRET = process.env.JWT_SECRET || 'eyewear-india-secret-key-change-in-production'

export interface AdminJWTPayload {
  adminId: string
  email: string
  role: AdminRole
  clinicId?: string
}

export function generateAdminToken(payload: AdminJWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '30m', // 30-minute session timeout for admin
  })
}

export function verifyAdminToken(token: string): AdminJWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminJWTPayload
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

