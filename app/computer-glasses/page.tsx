'use client'

import { Navbar, Footer } from '@/components'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ComputerGlassesPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirect to products page with category filter
    router.replace('/products?category=computer-glasses')
  }, [router])

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container-custom py-16 text-center">
        <p className="text-text-secondary">Redirecting to computer glasses...</p>
      </div>
      <Footer />
    </div>
  )
}

