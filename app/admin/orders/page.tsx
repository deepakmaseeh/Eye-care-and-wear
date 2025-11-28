'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Eye, Package, Filter } from 'lucide-react'

interface Order {
  _id: string
  orderId?: string
  userId: {
    name: string
    email: string
  }
  items: Array<{
    name: string
    quantity: number
  }>
  total: number
  paymentStatus: string
  orderStatus: string
  createdAt: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    orderStatus: '',
    paymentStatus: '',
    dateRange: '',
  })

  useEffect(() => {
    fetchOrders()
  }, [searchTerm, filters])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filters.orderStatus) params.append('orderStatus', filters.orderStatus)
      if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus)

      const response = await fetch(`/api/admin/orders?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setOrders(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string, type: 'order' | 'payment') => {
    const colors = {
      order: {
        pending: 'bg-[#FEF3C7] text-[#92400E]',
        confirmed: 'bg-[#E0E7FF] text-[#3730A3]',
        processing: 'bg-[#E0E7FF] text-[#3730A3]',
        shipped: 'bg-[#DBEAFE] text-[#1E40AF]',
        delivered: 'bg-[#DCFCE7] text-[#166534]',
        cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
      },
      payment: {
        pending: 'bg-[#FEF3C7] text-[#92400E]',
        completed: 'bg-[#DCFCE7] text-[#166534]',
        failed: 'bg-[#FEE2E2] text-[#991B1B]',
        refunded: 'bg-[#F3F4F6] text-[#374151]',
      },
    }

    const colorMap = type === 'order' ? colors.order : colors.payment
    return colorMap[status as keyof typeof colorMap] || 'bg-[#F3F4F6] text-[#374151]'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Orders</h1>
        <p className="text-[#6B7280] mt-1">Manage and track all orders</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by Order ID, Customer Name, Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
            />
          </div>

          <select
            value={filters.orderStatus}
            onChange={(e) => setFilters({ ...filters, orderStatus: e.target.value })}
            className="px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
          >
            <option value="">All Order Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={filters.paymentStatus}
            onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
            className="px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
          >
            <option value="">All Payment Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B6FA0]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[#6B7280]">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-[#F9FAFB]">
                    <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">
                      #{order.orderId || order._id.slice(-8).toUpperCase()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#1F2937]">
                        {order.userId?.name || 'N/A'}
                      </div>
                      <div className="text-xs text-[#6B7280]">{order.userId?.email || ''}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {order.items.length} item(s)
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">
                      ₹{order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(
                          order.paymentStatus,
                          'payment'
                        )}`}
                      >
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(
                          order.orderStatus,
                          'order'
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="text-[#1B6FA0] hover:text-[#154A7B] inline-flex items-center gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

