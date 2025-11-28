'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components'
import { Card, Button, Input, Select, Checkbox } from '@/components/ui'
import { apiClient } from '@/lib/api-client'
import { Filter, Grid, List } from 'lucide-react'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    gender: '',
    frameType: '',
    material: '',
    color: '',
    faceShape: '',
    minPrice: '',
    maxPrice: '',
    brand: '',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })
  const [pagination, setPagination] = useState<any>(null)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      const params: any = { ...filters }
      if (params.minPrice) params.minPrice = String(params.minPrice)
      if (params.maxPrice) params.maxPrice = String(params.maxPrice)
      
      const response = await apiClient.products.getAll(params)
      if (response.success && response.data) {
        setProducts(response.data.products || [])
        setPagination(response.data.pagination)
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateFilter = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value })
  }

  const clearFilters = () => {
    setFilters({
      category: '',
      gender: '',
      frameType: '',
      material: '',
      color: '',
      faceShape: '',
      minPrice: '',
      maxPrice: '',
      brand: '',
      search: '',
      sortBy: 'createdAt',
      sortOrder: 'desc',
    })
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`hidden lg:block w-64 flex-shrink-0 ${showFilters ? 'lg:block' : ''}`}>
            <Card className="sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold font-heading">Filters</h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-brand-primary hover:underline"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Category</label>
                  <Select
                    options={[
                      { value: '', label: 'All' },
                      { value: 'glasses', label: 'Glasses' },
                      { value: 'sunglasses', label: 'Sunglasses' },
                      { value: 'computer-glasses', label: 'Computer Glasses' },
                      { value: 'accessories', label: 'Accessories' },
                    ]}
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Gender</label>
                  <Select
                    options={[
                      { value: '', label: 'All' },
                      { value: 'men', label: 'Men' },
                      { value: 'women', label: 'Women' },
                      { value: 'unisex', label: 'Unisex' },
                      { value: 'kids', label: 'Kids' },
                    ]}
                    value={filters.gender}
                    onChange={(e) => updateFilter('gender', e.target.value)}
                  />
                </div>

                {/* Frame Type */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Frame Type</label>
                  <Select
                    options={[
                      { value: '', label: 'All' },
                      { value: 'full-rim', label: 'Full Rim' },
                      { value: 'semi-rimless', label: 'Semi-Rimless' },
                      { value: 'rimless', label: 'Rimless' },
                      { value: 'aviator', label: 'Aviator' },
                      { value: 'round', label: 'Round' },
                      { value: 'square', label: 'Square' },
                    ]}
                    value={filters.frameType}
                    onChange={(e) => updateFilter('frameType', e.target.value)}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Price Range</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    />
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Sort By</label>
                  <Select
                    options={[
                      { value: 'createdAt', label: 'Newest' },
                      { value: 'price', label: 'Price: Low to High' },
                      { value: '-price', label: 'Price: High to Low' },
                      { value: 'rating', label: 'Highest Rated' },
                      { value: 'name', label: 'Name' },
                    ]}
                    value={filters.sortBy}
                    onChange={(e) => {
                      const value = e.target.value
                      if (value.startsWith('-')) {
                        updateFilter('sortBy', value.substring(1))
                        updateFilter('sortOrder', 'desc')
                      } else {
                        updateFilter('sortBy', value)
                        updateFilter('sortOrder', 'asc')
                      }
                    }}
                  />
                </div>
              </div>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold font-heading">All Products</h1>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 hover:bg-bg-hover rounded-lg"
                >
                  <Filter className="w-5 h-5" />
                </button>
                {pagination && (
                  <span className="text-text-secondary text-sm">
                    Showing {products.length} of {pagination.totalProducts} products
                  </span>
                )}
              </div>
            </div>

            {/* Search */}
            <div className="mb-6">
              <Input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => updateFilter('search', e.target.value)}
              />
            </div>

            {/* Products */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-64 bg-bg-tertiary rounded-lg mb-4" />
                    <div className="h-4 bg-bg-tertiary rounded mb-2" />
                    <div className="h-4 bg-bg-tertiary rounded w-2/3" />
                  </Card>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: any) => (
                  <Link key={product._id} href={`/products/${product._id}`}>
                    <Card hover className="overflow-hidden">
                      <div className="relative h-64 bg-bg-tertiary mb-4">
                        {product.images?.[0]?.url ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.images[0].alt || product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                            No Image
                          </div>
                        )}
                        {product.discountPrice && (
                          <span className="absolute top-2 right-2 bg-error text-text-inverse px-2 py-1 rounded text-xs font-semibold">
                            Sale
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                        <p className="text-sm text-text-secondary mb-2">{product.brand}</p>
                        <div className="flex items-center gap-2 mb-2">
                          {product.discountPrice ? (
                            <>
                              <span className="text-brand-primary font-bold">
                                ₹{product.discountPrice}
                              </span>
                              <span className="text-text-tertiary line-through text-sm">
                                ₹{product.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-brand-primary font-bold">₹{product.price}</span>
                          )}
                        </div>
                        {product.rating > 0 && (
                          <div className="flex items-center gap-1 text-sm text-text-secondary">
                            <span>★</span>
                            <span>{product.rating.toFixed(1)}</span>
                            <span className="text-text-tertiary">({product.reviewCount})</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-text-secondary text-lg mb-4">No products found</p>
                <Button variant="secondary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  variant="secondary"
                  size="small"
                  disabled={!pagination.hasPrev}
                  onClick={() => {
                    // Implement pagination
                  }}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4 text-text-secondary">
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <Button
                  variant="secondary"
                  size="small"
                  disabled={!pagination.hasNext}
                  onClick={() => {
                    // Implement pagination
                  }}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

