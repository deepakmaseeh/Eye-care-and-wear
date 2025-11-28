/**
 * Face Detection Utilities
 * Simplified face detection for virtual try-on
 * In production, this would use MediaPipe Face Mesh for accurate detection
 */

export interface FaceLandmarks {
  leftEye: { x: number; y: number }
  rightEye: { x: number; y: number }
  nose: { x: number; y: number }
  mouth: { x: number; y: number }
  faceWidth: number
  faceHeight: number
}

/**
 * Estimate face position in video frame
 * This is a simplified version - in production, use MediaPipe for accurate detection
 */
export function estimateFacePosition(
  videoWidth: number,
  videoHeight: number
): FaceLandmarks {
  // Simplified: assume face is centered
  // In production, this would use MediaPipe Face Mesh to detect actual landmarks
  const centerX = videoWidth / 2
  const centerY = videoHeight / 2
  
  // Estimate face dimensions (roughly 30% of video width)
  const faceWidth = videoWidth * 0.3
  const faceHeight = faceWidth * 1.2

  return {
    leftEye: {
      x: centerX - faceWidth * 0.15,
      y: centerY - faceHeight * 0.15,
    },
    rightEye: {
      x: centerX + faceWidth * 0.15,
      y: centerY - faceHeight * 0.15,
    },
    nose: {
      x: centerX,
      y: centerY,
    },
    mouth: {
      x: centerX,
      y: centerY + faceHeight * 0.2,
    },
    faceWidth,
    faceHeight,
  }
}

/**
 * Calculate frame position based on face landmarks
 */
export function calculateFramePosition(
  landmarks: FaceLandmarks,
  frameAspectRatio: number,
  scale: number = 1
): { x: number; y: number; width: number; height: number } {
  // Position frame between eyes
  const eyeCenterX = (landmarks.leftEye.x + landmarks.rightEye.x) / 2
  const eyeCenterY = (landmarks.leftEye.y + landmarks.rightEye.y) / 2
  
  // Calculate frame dimensions
  const frameWidth = landmarks.faceWidth * 1.2 * scale
  const frameHeight = frameWidth / frameAspectRatio
  
  // Position frame centered on eyes, slightly above
  const x = eyeCenterX - frameWidth / 2
  const y = eyeCenterY - frameHeight * 0.6

  return {
    x,
    y,
    width: frameWidth,
    height: frameHeight,
  }
}

