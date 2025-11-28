'use client'

import { useState, useEffect, useRef } from 'react'
import { Navbar, Footer } from '@/components'
import { Button, Card } from '@/components/ui'
import { Camera, X, Download, Share2, RotateCcw, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'
import Link from 'next/link'
import { apiClient } from '@/lib/api-client'
import { estimateFacePosition, calculateFramePosition } from '@/lib/face-detection'

export default function TryOnPage() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isStreaming, setIsStreaming] = useState(false)
  const [selectedFrame, setSelectedFrame] = useState<any>(null)
  const [frames, setFrames] = useState<any[]>([])
  const [frameIndex, setFrameIndex] = useState(0)
  const [frameScale, setFrameScale] = useState(1)
  const [framePosition, setFramePosition] = useState({ x: 0, y: 0 })
  const [faceLandmarks, setFaceLandmarks] = useState<any>(null)
  const animationFrameRef = useRef<number | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    fetchFrames()
    return () => {
      stopCamera()
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isStreaming && videoRef.current) {
      const detectFace = () => {
        if (videoRef.current && videoRef.current.readyState === 4) {
          const landmarks = estimateFacePosition(
            videoRef.current.videoWidth,
            videoRef.current.videoHeight
          )
          setFaceLandmarks(landmarks)
          
          // Auto-position frame on first detection
          if (selectedFrame?.images?.[0]?.url && framePosition.x === 0 && framePosition.y === 0) {
            const img = new Image()
            img.onload = () => {
              const aspectRatio = img.width / img.height
              const pos = calculateFramePosition(landmarks, aspectRatio, frameScale)
              setFramePosition({ x: pos.x - (videoRef.current!.videoWidth / 2 - pos.width / 2), y: pos.y - (videoRef.current!.videoHeight / 2 - pos.height / 2) })
            }
            img.src = selectedFrame.images[0].url
          }
        }
        animationFrameRef.current = requestAnimationFrame(detectFace)
      }
      detectFace()
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isStreaming, selectedFrame, frameScale])

  const fetchFrames = async () => {
    try {
      const response = await apiClient.products.getAll({ limit: '20' })
      if (response.success && response.data) {
        setFrames(response.data.products || [])
        if (response.data.products?.length > 0) {
          setSelectedFrame(response.data.products[0])
        }
      }
    } catch (error) {
      console.error('Error fetching frames:', error)
    }
  }

  const startCamera = async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 }
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsStreaming(true)
      }
    } catch (err: any) {
      setError('Unable to access camera. Please check permissions.')
      console.error('Camera error:', err)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
  }

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame
    ctx.drawImage(video, 0, 0)

    // Draw frame overlay if selected
    if (selectedFrame?.images?.[0]?.url) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => {
        // Calculate position and size for frame overlay
        const faceWidth = video.videoWidth * 0.3 // Approximate face width
        const frameAspectRatio = img.width / img.height
        const frameHeight = faceWidth / frameAspectRatio
        
        const x = (video.videoWidth - faceWidth) / 2 + framePosition.x
        const y = (video.videoHeight - frameHeight) / 2 - 50 + framePosition.y // Offset for eye position
        
        ctx.drawImage(
          img,
          x,
          y,
          faceWidth * frameScale,
          frameHeight * frameScale
        )

        // Convert to image
        const imageData = canvas.toDataURL('image/png')
        setCapturedImage(imageData)
      }
      img.src = selectedFrame.images[0].url
    } else {
      const imageData = canvas.toDataURL('image/png')
      setCapturedImage(imageData)
    }
  }

  const downloadImage = () => {
    if (!capturedImage) return
    
    const link = document.createElement('a')
    link.download = `try-on-${Date.now()}.png`
    link.href = capturedImage
    link.click()
  }

  const shareImage = async () => {
    if (!capturedImage) return

    if (navigator.share) {
      try {
        // Convert data URL to blob
        const response = await fetch(capturedImage)
        const blob = await response.blob()
        const file = new File([blob], 'try-on.png', { type: 'image/png' })

        await navigator.share({
          title: 'My Virtual Try-On',
          text: 'Check out how I look in these frames!',
          files: [file],
        })
      } catch (err) {
        console.error('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard or show share options
      alert('Sharing not supported. Please download the image.')
    }
  }

  const nextFrame = () => {
    if (frames.length === 0) return
    const next = (frameIndex + 1) % frames.length
    setFrameIndex(next)
    setSelectedFrame(frames[next])
  }

  const prevFrame = () => {
    if (frames.length === 0) return
    const prev = frameIndex === 0 ? frames.length - 1 : frameIndex - 1
    setFrameIndex(prev)
    setSelectedFrame(frames[prev])
  }

  const adjustPosition = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 10
    setFramePosition(prev => {
      switch (direction) {
        case 'up':
          return { ...prev, y: prev.y - step }
        case 'down':
          return { ...prev, y: prev.y + step }
        case 'left':
          return { ...prev, x: prev.x - step }
        case 'right':
          return { ...prev, x: prev.x + step }
        default:
          return prev
      }
    })
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold font-heading mb-4">Virtual Try-On</h1>
          <p className="text-text-secondary">
            See how frames look on you in real-time using your camera
          </p>
        </div>

        {error && (
          <Card className="mb-6 border-error bg-error-bg">
            <p className="text-error">{error}</p>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera View */}
          <div className="lg:col-span-2">
            <Card>
              <div className="relative bg-bg-primary rounded-lg overflow-hidden aspect-video">
                {!isStreaming ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Camera className="w-16 h-16 text-text-tertiary mx-auto mb-4 opacity-50" />
                      <p className="text-text-secondary mb-4">Camera not active</p>
                      <Button variant="primary" onClick={startCamera}>
                        Start Camera
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {selectedFrame?.images?.[0]?.url && (
                      <div
                        className="absolute pointer-events-none"
                        style={{
                          left: `calc(50% - ${150 * frameScale}px + ${framePosition.x}px)`,
                          top: `calc(50% - ${100 * frameScale}px - 50px + ${framePosition.y}px)`,
                          width: `${300 * frameScale}px`,
                          height: `${200 * frameScale}px`,
                        }}
                      >
                        <img
                          src={selectedFrame.images[0].url}
                          alt={selectedFrame.name}
                          className="w-full h-full object-contain opacity-90"
                          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                        />
                      </div>
                    )}
                  </>
                )}
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Camera Controls */}
              {isStreaming && (
                <div className="mt-4 flex gap-4 justify-center">
                  <Button variant="secondary" onClick={stopCamera}>
                    <X className="w-4 h-4 mr-2" />
                    Stop Camera
                  </Button>
                  <Button variant="primary" onClick={capturePhoto}>
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Photo
                  </Button>
                </div>
              )}
            </Card>

            {/* Captured Image */}
            {capturedImage && (
              <Card className="mt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Captured Photo</h3>
                  <div className="flex gap-2">
                    <Button variant="secondary" size="small" onClick={downloadImage}>
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="secondary" size="small" onClick={shareImage}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Button
                      variant="icon"
                      size="small"
                      onClick={() => setCapturedImage(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="relative bg-bg-primary rounded-lg overflow-hidden aspect-video">
                  <img
                    src={capturedImage}
                    alt="Captured try-on"
                    className="w-full h-full object-contain"
                  />
                </div>
              </Card>
            )}
          </div>

          {/* Frame Selection & Controls */}
          <div className="space-y-6">
            {/* Frame Selection */}
            {frames.length > 0 && (
              <Card>
                <h3 className="font-semibold mb-4">Select Frame</h3>
                <div className="relative mb-4">
                  {selectedFrame?.images?.[0]?.url && (
                    <div className="relative h-48 bg-bg-tertiary rounded-lg overflow-hidden mb-4">
                      <img
                        src={selectedFrame.images[0].url}
                        alt={selectedFrame.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <button
                      onClick={prevFrame}
                      className="p-2 bg-bg-tertiary hover:bg-bg-hover rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="text-center flex-1">
                      <p className="font-medium text-sm">{selectedFrame?.name}</p>
                      <p className="text-xs text-text-secondary">
                        {frameIndex + 1} of {frames.length}
                      </p>
                    </div>
                    <button
                      onClick={nextFrame}
                      className="p-2 bg-bg-tertiary hover:bg-bg-hover rounded-lg transition-colors"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  {selectedFrame && (
                    <Link
                      href={`/products/${selectedFrame._id}`}
                      className="block text-center"
                    >
                      <Button variant="secondary" size="small" fullWidth>
                        View Details
                      </Button>
                    </Link>
                  )}
                </div>
              </Card>
            )}

            {/* Frame Adjustment Controls */}
            {isStreaming && selectedFrame && (
              <Card>
                <h3 className="font-semibold mb-4">Adjust Frame</h3>
                
                {/* Size Slider */}
                <div className="mb-6">
                  <label className="block text-sm text-text-secondary mb-2">
                    Size: {Math.round(frameScale * 100)}%
                  </label>
                  <div className="flex items-center gap-2">
                    <ZoomOut className="w-4 h-4 text-text-tertiary" />
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={frameScale}
                      onChange={(e) => setFrameScale(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <ZoomIn className="w-4 h-4 text-text-tertiary" />
                  </div>
                </div>

                {/* Position Controls */}
                <div>
                  <label className="block text-sm text-text-secondary mb-2">
                    Position
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <div></div>
                    <button
                      onClick={() => adjustPosition('up')}
                      className="p-3 bg-bg-tertiary hover:bg-bg-hover rounded-lg transition-colors"
                    >
                      ↑
                    </button>
                    <div></div>
                    <button
                      onClick={() => adjustPosition('left')}
                      className="p-3 bg-bg-tertiary hover:bg-bg-hover rounded-lg transition-colors"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => {
                        setFramePosition({ x: 0, y: 0 })
                        setFrameScale(1)
                      }}
                      className="p-3 bg-bg-tertiary hover:bg-bg-hover rounded-lg transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 mx-auto" />
                    </button>
                    <button
                      onClick={() => adjustPosition('right')}
                      className="p-3 bg-bg-tertiary hover:bg-bg-hover rounded-lg transition-colors"
                    >
                      →
                    </button>
                    <div></div>
                    <button
                      onClick={() => adjustPosition('down')}
                      className="p-3 bg-bg-tertiary hover:bg-bg-hover rounded-lg transition-colors"
                    >
                      ↓
                    </button>
                    <div></div>
                  </div>
                </div>
              </Card>
            )}

            {/* Instructions */}
            <Card>
              <h3 className="font-semibold mb-2">Instructions</h3>
              <ul className="text-sm text-text-secondary space-y-2">
                <li>• Click "Start Camera" to begin</li>
                <li>• Select a frame from the carousel</li>
                <li>• Adjust size and position as needed</li>
                <li>• Click "Capture Photo" to save</li>
                <li>• Download or share your photo</li>
              </ul>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

