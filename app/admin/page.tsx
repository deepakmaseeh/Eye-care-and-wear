'use client'

import { useEffect, useState } from 'react'
import {
  Users,
  Stethoscope,
  ShoppingCart,
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  Activity,
  BarChart3,
} from 'lucide-react'

interface DashboardStats {
  totalUsers: number
  totalDoctors: number
  totalOrders: number
  totalConsultations: number
  ordersThisMonth: number
  consultationsToday: number
  revenueThisMonth: number
  revenueGrowth: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDoctors: 0,
    totalOrders: 0,
    totalConsultations: 0,
    ordersThisMonth: 0,
    consultationsToday: 0,
    revenueThisMonth: 0,
    revenueGrowth: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken')
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
        const response = await fetch(`${apiUrl}/admin/dashboard/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.ok) {
          const data = await response.json()
          setStats(data.data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: <Users className="w-6 h-6" />,
      color: 'bg-[#1B6FA0]',
      bgColor: 'bg-[#E0E7FF]',
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors.toLocaleString(),
      icon: <Stethoscope className="w-6 h-6" />,
      color: 'bg-[#00A86B]',
      bgColor: 'bg-[#DCFCE7]',
    },
    {
      title: 'Orders (This Month)',
      value: stats.ordersThisMonth.toLocaleString(),
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'bg-[#FF6B35]',
      bgColor: 'bg-[#FEF3C7]',
    },
    {
      title: 'Consultations (Today)',
      value: stats.consultationsToday.toLocaleString(),
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-[#DC3545]',
      bgColor: 'bg-[#FEE2E2]',
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B6FA0]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Dashboard</h1>
        <p className="text-[#6B7280] mt-1">Welcome to EyeWear India Admin Control Center</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6B7280] mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-[#1F2937]">{card.value}</p>
              </div>
              <div className={`${card.bgColor} p-3 rounded-lg`}>
                <div className={card.color + ' text-white'}>{card.icon}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Card */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#1F2937]">Revenue This Month</h2>
          <DollarSign className="w-5 h-5 text-[#00A86B]" />
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-3xl font-bold text-[#1F2937]">
            ₹{stats.revenueThisMonth.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 text-[#00A86B]">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{stats.revenueGrowth}%</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F5F7FA] transition-colors text-left">
            <Package className="w-5 h-5 text-[#1B6FA0] mb-2" />
            <p className="font-medium text-[#1F2937]">Add New Product</p>
            <p className="text-sm text-[#6B7280] mt-1">Create a new product</p>
          </button>
          <button className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F5F7FA] transition-colors text-left">
            <Stethoscope className="w-5 h-5 text-[#1B6FA0] mb-2" />
            <p className="font-medium text-[#1F2937]">Add New Doctor</p>
            <p className="text-sm text-[#6B7280] mt-1">Onboard a doctor</p>
          </button>
          <button className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F5F7FA] transition-colors text-left">
            <Activity className="w-5 h-5 text-[#1B6FA0] mb-2" />
            <p className="font-medium text-[#1F2937]">Create Promotion</p>
            <p className="text-sm text-[#6B7280] mt-1">Add a new coupon</p>
          </button>
          <button className="p-4 border border-[#E5E7EB] rounded-lg hover:bg-[#F5F7FA] transition-colors text-left">
            <BarChart3 className="w-5 h-5 text-[#1B6FA0] mb-2" />
            <p className="font-medium text-[#1F2937]">View Analytics</p>
            <p className="text-sm text-[#6B7280] mt-1">Export reports</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <p className="text-[#6B7280] text-center py-8">
            Recent activity feed will be displayed here
          </p>
        </div>
      </div>
    </div>
  )
}

