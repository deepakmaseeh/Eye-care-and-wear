'use client'

import { Navbar, Footer } from '@/components'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SunglassesPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to products page with category filter
    router.replace('/products?category=sunglasses')
  }, [router])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-custom py-16 text-center">
        <p className="text-text-secondary">Redirecting to sunglasses...</p>
      </div>
      <Footer />
    </div>
  )
}

