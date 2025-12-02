'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'
import { Providers } from '@/components/Providers'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    // Check admin authentication
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken')
      
      if (!token) {
        router.push('/admin/login')
        return
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
        const response = await fetch(`${apiUrl}/admin/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          localStorage.removeItem('adminToken')
          localStorage.removeItem('adminUser')
          router.push('/admin/login')
          return
        }

        setIsAuthenticated(true)
      } catch (error) {
        router.push('/admin/login')
      } finally {
        setLoading(false)
      }
    }

    // Don't check auth on login page
    if (pathname !== '/admin/login') {
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [pathname, router])

  // Don't render layout on login page
  if (pathname === '/admin/login') {
    return <Providers>{children}</Providers>
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B6FA0] mx-auto"></div>
          <p className="mt-4 text-[#6B7280]">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <Providers>
      <div className="min-h-screen bg-white">
        <AdminSidebar collapsed={sidebarCollapsed} />
        <div
          className={`transition-all duration-300 ${
            sidebarCollapsed ? 'ml-16' : 'ml-64'
          }`}
        >
          <AdminHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </Providers>
  )
}

