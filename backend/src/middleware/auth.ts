import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import AdminUser, { AdminRole } from '../../../models/AdminUser'
import User from '../../../models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'eyewear-india-secret-key-change-in-production'

export interface AuthRequest extends Request {
  user?: {
    userId: string
    email: string
  }
  admin?: {
    adminId: string
    email: string
    role: AdminRole
    clinicId?: string
  }
}

// User authentication
export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - No token provided',
      })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string }

    const user = await User.findById(decoded.userId)
    if (!user || user.status !== 'active') {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - Invalid user',
      })
    }

    req.user = {
      userId: user._id.toString(),
      email: user.email,
    }

    next()
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized - Invalid token',
    })
  }
}

// Admin authentication
export const authenticateAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - No token provided',
      })
    }

    const token = authHeader.substring(7)
    const decoded = jwt.verify(token, JWT_SECRET) as {
      adminId: string
      email: string
      role: AdminRole
      clinicId?: string
    }

    const admin = await AdminUser.findById(decoded.adminId)
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized - Invalid admin',
      })
    }

    req.admin = {
      adminId: admin._id.toString(),
      email: admin.email,
      role: admin.role,
      clinicId: admin.clinicId?.toString(),
    }

    next()
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized - Invalid token',
    })
  }
}

// Role-based access control
export const requireRole = (allowedRoles: AdminRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.admin) {
      return res.status(401).json({
        success: false,
        error: 'Unauthorized',
      })
    }

    if (!allowedRoles.includes(req.admin.role)) {
      return res.status(403).json({
        success: false,
        error: 'Forbidden - Insufficient permissions',
      })
    }

    next()
  }
}

export const requireSuperAdmin = requireRole(['super_admin'])
export const requireAdmin = requireRole(['super_admin', 'admin'])

