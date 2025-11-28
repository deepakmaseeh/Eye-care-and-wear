'use client'

import { useEffect, useState } from 'react'
import { Package, AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown } from 'lucide-react'

interface InventoryStats {
  totalProducts: number
  inStock: number
  lowStock: number
  outOfStock: number
  totalValue: number
}

interface LowStockProduct {
  _id: string
  name: string
  sku: string
  currentStock: number
  threshold: number
  price: number
}

export default function InventoryPage() {
  const [stats, setStats] = useState<InventoryStats>({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    totalValue: 0,
  })
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInventoryData()
  }, [])

  const fetchInventoryData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${apiUrl}/admin/products/inventory/stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data.data.stats)
        setLowStockProducts(data.data.lowStockProducts || [])
      }
    } catch (error) {
      console.error('Failed to fetch inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleReorder = async (productId: string) => {
    // Implement reorder functionality
    alert('Reorder functionality will be implemented')
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
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Inventory Management</h1>
        <p className="text-[#6B7280] mt-1">Monitor and manage your product inventory</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Total Products</p>
              <p className="text-2xl font-bold text-[#1F2937]">{stats.totalProducts}</p>
            </div>
            <Package className="w-8 h-8 text-[#1B6FA0]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">In Stock</p>
              <p className="text-2xl font-bold text-[#00A86B]">{stats.inStock}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-[#00A86B]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Low Stock</p>
              <p className="text-2xl font-bold text-[#FF6B35]">{stats.lowStock}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-[#FF6B35]" />
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#6B7280] mb-1">Out of Stock</p>
              <p className="text-2xl font-bold text-[#DC3545]">{stats.outOfStock}</p>
            </div>
            <XCircle className="w-8 h-8 text-[#DC3545]" />
          </div>
        </div>
      </div>

      {/* Low Stock Alert */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#1F2937]">Low Stock Alerts</h2>
          {lowStockProducts.length > 0 && (
            <span className="px-3 py-1 bg-[#FEF3C7] text-[#92400E] rounded-full text-sm font-medium">
              {lowStockProducts.length} Products
            </span>
          )}
        </div>

        {lowStockProducts.length === 0 ? (
          <p className="text-center text-[#6B7280] py-8">No low stock products</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Product Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    SKU
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Current Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Threshold
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E7EB]">
                {lowStockProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-[#F9FAFB]">
                    <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">
                      {product.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{product.sku}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-[#FF6B35]">
                        {product.currentStock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{product.threshold}</td>
                    <td className="px-6 py-4 text-sm text-[#1F2937]">
                      ₹{product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleReorder(product._id)}
                        className="px-4 py-2 bg-[#1B6FA0] text-white rounded-lg hover:bg-[#154A7B] transition-colors text-sm"
                      >
                        Order More
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

