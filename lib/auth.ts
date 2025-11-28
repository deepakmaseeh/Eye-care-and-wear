import { NextRequest } from 'next/server'
import { verifyToken, JWTPayload } from './jwt'

export interface AuthRequest extends NextRequest {
  user?: JWTPayload
}

export async function authenticate(request: NextRequest): Promise<JWTPayload | null> {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null
    }

    const token = authHeader.substring(7)
    const payload = verifyToken(token)
    
    return payload
  } catch (error) {
    return null
  }
}

