'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar, Footer } from '@/components'
import { Card, Button, Input, Select, Checkbox } from '@/components/ui'
import { apiClient } from '@/lib/api-client'
import { Filter, Grid, List } from 'lucide-react'

export default function ComputerGlassesPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: 'computer-glasses',
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

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-heading mb-2">Computer Glasses</h1>
          <p className="text-text-secondary">
            Reduce digital eye strain with our blue light blocking glasses
          </p>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <aside className={`hidden lg:block w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden'}`}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filters</h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-text-tertiary hover:text-text-primary"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Gender */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Gender</label>
                  <div className="space-y-2">
                    {['Men', 'Women', 'Unisex'].map((gender) => (
                      <Checkbox
                        key={gender}
                        label={gender}
                        checked={filters.gender === gender.toLowerCase()}
                        onChange={() =>
                          setFilters({
                            ...filters,
                            gender: filters.gender === gender.toLowerCase() ? '' : gender.toLowerCase(),
                          })
                        }
                      />
                    ))}
                  </div>
                </div>

                {/* Frame Type */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Frame Type</label>
                  <Select
                    options={[
                      { value: '', label: 'All Types' },
                      { value: 'full-rim', label: 'Full Rim' },
                      { value: 'half-rim', label: 'Half Rim' },
                      { value: 'rimless', label: 'Rimless' },
                    ]}
                    value={filters.frameType}
                    onChange={(e) => setFilters({ ...filters, frameType: e.target.value })}
                  />
                </div>

                {/* Material */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Material</label>
                  <Select
                    options={[
                      { value: '', label: 'All Materials' },
                      { value: 'acetate', label: 'Acetate' },
                      { value: 'metal', label: 'Metal' },
                      { value: 'titanium', label: 'Titanium' },
                      { value: 'plastic', label: 'Plastic' },
                    ]}
                    value={filters.material}
                    onChange={(e) => setFilters({ ...filters, material: e.target.value })}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    />
                  </div>
                </div>

                <Button
                  variant="secondary"
                  size="small"
                  fullWidth
                  onClick={() => {
                    setFilters({
                      category: 'computer-glasses',
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
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  placeholder="Search computer glasses..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
              </div>
              <Select
                options={[
                  { value: 'createdAt-desc', label: 'Newest First' },
                  { value: 'price-asc', label: 'Price: Low to High' },
                  { value: 'price-desc', label: 'Price: High to Low' },
                  { value: 'rating-desc', label: 'Highest Rated' },
                ]}
                value={`${filters.sortBy}-${filters.sortOrder}`}
                onChange={(e) => {
                  const [sortBy, sortOrder] = e.target.value.split('-')
                  setFilters({ ...filters, sortBy, sortOrder })
                }}
                className="w-full sm:w-48"
              />
              <Button
                variant="secondary"
                size="normal"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
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
              <>
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

                {/* Pagination */}
                {pagination && (
                  <div className="mt-8 flex justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="small"
                      disabled={!pagination.hasPrev}
                      onClick={() => {
                        // TODO: Implement pagination
                      }}
                    >
                      Previous
                    </Button>
                    <span className="px-4 py-2 text-text-secondary">
                      Page {pagination.currentPage} of {pagination.totalPages}
                    </span>
                    <Button
                      variant="secondary"
                      size="small"
                      disabled={!pagination.hasNext}
                      onClick={() => {
                        // TODO: Implement pagination
                      }}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-text-secondary">No computer glasses found. Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
