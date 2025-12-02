'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  Users,
  Calendar,
  ShoppingCart,
  FileText,
  UserCircle,
  FileEdit,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Stethoscope,
  Building2,
} from 'lucide-react'

interface MenuItem {
  title: string
  icon: React.ReactNode
  path: string
  roles?: string[]
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    path: '/admin',
  },
  {
    title: 'Products',
    icon: <Package className="w-5 h-5" />,
    path: '/admin/products',
  },
  {
    title: 'Doctors',
    icon: <Stethoscope className="w-5 h-5" />,
    path: '/admin/doctors',
  },
  {
    title: 'Clinics',
    icon: <Building2 className="w-5 h-5" />,
    path: '/admin/clinics',
  },
  {
    title: 'Consultations',
    icon: <Calendar className="w-5 h-5" />,
    path: '/admin/consultations',
  },
  {
    title: 'Orders',
    icon: <ShoppingCart className="w-5 h-5" />,
    path: '/admin/orders',
  },
  {
    title: 'Prescriptions',
    icon: <FileText className="w-5 h-5" />,
    path: '/admin/prescriptions',
  },
  {
    title: 'Customers',
    icon: <UserCircle className="w-5 h-5" />,
    path: '/admin/customers',
  },
  {
    title: 'Content',
    icon: <FileEdit className="w-5 h-5" />,
    path: '/admin/content',
  },
  {
    title: 'Analytics',
    icon: <BarChart3 className="w-5 h-5" />,
    path: '/admin/analytics',
  },
  {
    title: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    path: '/admin/settings',
    roles: ['super_admin'],
  },
]

export default function AdminSidebar({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname()

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-border-secondary text-text-primary transition-all duration-300 z-50 shadow-soft-md ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border-secondary bg-gradient-to-r from-brand-primary-light to-white">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">EyeWear Admin</h1>
          )}
          <button
            onClick={() => {}}
            className="p-2 hover:bg-bg-hover rounded-lg transition-colors text-text-primary"
            aria-label="Toggle sidebar"
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 bg-white">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path || pathname.startsWith(item.path + '/')
              
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-primary to-brand-primary-hover text-white shadow-brand'
                        : 'text-text-secondary hover:bg-bg-hover hover:text-brand-primary'
                    }`}
                    title={collapsed ? item.title : ''}
                  >
                    <span className="flex-shrink-0">{item.icon}</span>
                    {!collapsed && (
                      <span className="font-medium">{item.title}</span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t border-border-secondary text-sm text-text-tertiary bg-white">
            <p className="font-semibold text-text-primary">EyeWear India</p>
            <p className="text-xs mt-1">Admin Control Center</p>
          </div>
        )}
      </div>
    </aside>
  )
}

