import jwt from 'jsonwebtoken'
import { AdminRole } from '../../models/AdminUser'

const JWT_SECRET = process.env.JWT_SECRET || 'eyewear-india-secret-key-change-in-production'

export interface JWTPayload {
  userId: string
  email: string
}

export interface AdminJWTPayload {
  adminId: string
  email: string
  role: AdminRole
  clinicId?: string
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

export function generateAdminToken(payload: AdminJWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: process.env.ADMIN_JWT_EXPIRES_IN || '30m',
  })
}

export function verifyToken(token: string): JWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

export function verifyAdminToken(token: string): AdminJWTPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminJWTPayload
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}

