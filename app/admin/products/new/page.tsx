'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, X, Upload } from 'lucide-react'

export default function NewProductPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    sku: '',
    category: 'glasses',
    description: '',
    shortDescription: '',
    price: '',
    costPrice: '',
    mrp: '',
    discountPrice: '',
    taxRate: '0',
    frameType: 'full-rim',
    material: 'acetate',
    color: '',
    gender: 'unisex',
    quantity: '0',
    lowStockThreshold: '10',
    status: 'draft',
    isFeatured: false,
    isNew: false,
    isOnSale: false,
    visibility: 'public',
    suitableFaceShapes: [] as string[],
    lensTypes: [] as string[],
    tags: [] as string[],
    images: [] as Array<{ url: string; alt: string }>,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('adminToken')
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
      const response = await fetch(`${apiUrl}/admin/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          costPrice: formData.costPrice ? parseFloat(formData.costPrice) : undefined,
          mrp: formData.mrp ? parseFloat(formData.mrp) : undefined,
          discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
          taxRate: parseFloat(formData.taxRate),
          quantity: parseInt(formData.quantity),
          lowStockThreshold: parseInt(formData.lowStockThreshold),
        }),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin/products')
      } else {
        alert(data.error || 'Failed to create product')
      }
    } catch (error) {
      alert('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Add New Product</h1>
        <p className="text-[#6B7280] mt-1">Create a new product in your catalog</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Product Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Brand *
              </label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                SKU *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Category *
              </label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              >
                <option value="glasses">Glasses</option>
                <option value="sunglasses">Sunglasses</option>
                <option value="computer-glasses">Computer Glasses</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Short Description
              </label>
              <textarea
                rows={2}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Frame Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Frame Type *
              </label>
              <select
                required
                value={formData.frameType}
                onChange={(e) => setFormData({ ...formData, frameType: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              >
                <option value="full-rim">Full Rim</option>
                <option value="semi-rimless">Semi-Rimless</option>
                <option value="rimless">Rimless</option>
                <option value="aviator">Aviator</option>
                <option value="cat-eye">Cat Eye</option>
                <option value="round">Round</option>
                <option value="square">Square</option>
                <option value="rectangular">Rectangular</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Material *
              </label>
              <select
                required
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              >
                <option value="acetate">Acetate</option>
                <option value="titanium">Titanium</option>
                <option value="stainless-steel">Stainless Steel</option>
                <option value="tr90">TR90</option>
                <option value="memory-metal">Memory Metal</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Color *
              </label>
              <input
                type="text"
                required
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
                <option value="kids">Kids</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Selling Price (₹) *
              </label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Cost Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                MRP (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.mrp}
                onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Discount Price (₹)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.discountPrice}
                onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                step="0.01"
                value={formData.taxRate}
                onChange={(e) => setFormData({ ...formData, taxRate: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Inventory</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Low Stock Threshold
              </label>
              <input
                type="number"
                min="0"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
          <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Status & Publishing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Status *
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              >
                <option value="draft">Draft</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2937] mb-2">
                Visibility
              </label>
              <select
                value={formData.visibility}
                onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 text-[#1B6FA0] border-[#D1D5DB] rounded focus:ring-[#1B6FA0]"
                />
                <span className="text-sm text-[#1F2937]">Featured Product</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isNew}
                  onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                  className="w-4 h-4 text-[#1B6FA0] border-[#D1D5DB] rounded focus:ring-[#1B6FA0]"
                />
                <span className="text-sm text-[#1F2937]">New Product</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isOnSale}
                  onChange={(e) => setFormData({ ...formData, isOnSale: e.target.checked })}
                  className="w-4 h-4 text-[#1B6FA0] border-[#D1D5DB] rounded focus:ring-[#1B6FA0]"
                />
                <span className="text-sm text-[#1F2937]">On Sale</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-[#D1D5DB] rounded-lg text-[#1F2937] hover:bg-[#F5F7FA] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-6 py-2 border border-[#D1D5DB] rounded-lg text-[#1F2937] hover:bg-[#F5F7FA] transition-colors flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-[#1B6FA0] text-white rounded-lg hover:bg-[#154A7B] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

