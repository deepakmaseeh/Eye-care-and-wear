'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, Search, User, LogOut, Menu } from 'lucide-react'

export default function AdminHeader({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const router = useRouter()
  const [adminUser, setAdminUser] = useState<any>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('adminUser')
    if (user) {
      setAdminUser(JSON.parse(user))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    router.push('/admin/login')
  }

  return (
    <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-[#1F2937]" />
        </button>

        {/* Search Bar */}
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-[#F5F7FA] border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0] focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          className="relative p-2 hover:bg-[#F5F7FA] rounded-lg transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-[#1F2937]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#DC3545] rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-[#F5F7FA] rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-[#1B6FA0] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            {adminUser && (
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium text-[#1F2937]">{adminUser.name}</p>
                <p className="text-xs text-[#6B7280] capitalize">{adminUser.role?.replace('_', ' ')}</p>
              </div>
            )}
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#E5E7EB] py-2 z-50">
              <button
                onClick={() => {
                  setShowUserMenu(false)
                  router.push('/admin/profile')
                }}
                className="w-full px-4 py-2 text-left text-sm text-[#1F2937] hover:bg-[#F5F7FA] flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left text-sm text-[#DC3545] hover:bg-[#F5F7FA] flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  )
}

