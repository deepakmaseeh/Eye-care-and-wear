'use client'

import { useEffect, useState } from 'react'
import { BarChart3, TrendingUp, DollarSign, ShoppingCart, Users, Package, Download } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AnalyticsData {
  totalSales: number
  totalOrders: number
  avgOrderValue: number
  conversionRate: number
  totalCustomers: number
  activeCustomers: number
  totalProducts: number
  lowStockProducts: number
}

const COLORS = ['#1B6FA0', '#00A86B', '#FF6B35', '#DC3545', '#154A7B']

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    totalSales: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    conversionRate: 0,
    totalCustomers: 0,
    activeCustomers: 0,
    totalProducts: 0,
    lowStockProducts: 0,
  })
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30')

  // Sample chart data (replace with real data from API)
  const salesData = [
    { name: 'Week 1', sales: 4000 },
    { name: 'Week 2', sales: 3000 },
    { name: 'Week 3', sales: 5000 },
    { name: 'Week 4', sales: 4500 },
  ]

  const categoryData = [
    { name: 'Glasses', value: 45 },
    { name: 'Sunglasses', value: 30 },
    { name: 'Computer Glasses', value: 20 },
    { name: 'Accessories', value: 5 },
  ]

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`http://localhost:5000/api/admin/analytics?range=${dateRange}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const result = await response.json()
        setData(result.data)
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExport = () => {
    alert('Export functionality will be implemented')
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B6FA0]"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Analytics & Reports</h1>
          <p className="text-[#6B7280] mt-1">View platform performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-[#1B6FA0] text-white rounded-lg hover:bg-[#154A7B] transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-[#1F2937]">
                ₹{data.totalSales.toLocaleString()}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-[#00A86B]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-[#1F2937]">{data.totalOrders}</p>
            </div>
            <ShoppingCart className="w-8 h-8 text-[#1B6FA0]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Avg Order Value</p>
              <p className="text-2xl font-bold text-[#1F2937]">
                ₹{data.avgOrderValue.toLocaleString()}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-[#FF6B35]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Conversion Rate</p>
              <p className="text-2xl font-bold text-[#1F2937]">{data.conversionRate}%</p>
            </div>
            <BarChart3 className="w-8 h-8 text-[#DC3545]" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Sales Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#1B6FA0" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Sales by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Customers</p>
              <p className="text-2xl font-bold text-[#1F2937]">{data.totalCustomers}</p>
            </div>
            <Users className="w-8 h-8 text-[#1B6FA0]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Active Customers</p>
              <p className="text-2xl font-bold text-[#1F2937]">{data.activeCustomers}</p>
            </div>
            <Users className="w-8 h-8 text-[#00A86B]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Products</p>
              <p className="text-2xl font-bold text-[#1F2937]">{data.totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-[#1B6FA0]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Low Stock</p>
              <p className="text-2xl font-bold text-[#FF6B35]">{data.lowStockProducts}</p>
            </div>
            <Package className="w-8 h-8 text-[#FF6B35]" />
          </div>
        </div>
      </div>
    </div>
  )
}
