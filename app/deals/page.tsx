'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar, Footer } from '@/components'
import { Card, Button } from '@/components/ui'
import { apiClient } from '@/lib/api-client'
import { Tag, Percent, Clock } from 'lucide-react'

export default function DealsPage() {
  const [deals, setDeals] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDeals()
  }, [])

  const fetchDeals = async () => {
    setLoading(true)
    try {
      // Fetch products with discounts
      const response = await apiClient.products.getAll({ 
        limit: '50',
        sortBy: 'discountPrice',
        sortOrder: 'desc'
      })
      
      if (response.success && response.data) {
        // Filter products that have discountPrice
        const discountedProducts = (response.data.products || []).filter(
          (p: any) => p.discountPrice && p.discountPrice < p.price
        )
        setDeals(discountedProducts)
      }
    } catch (error) {
      console.error('Error fetching deals:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateDiscount = (price: number, discountPrice: number) => {
    return Math.round(((price - discountPrice) / price) * 100)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <Tag className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Exclusive Deals & Offers
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Discover amazing discounts on premium eyewear. Limited time offers!
          </p>
        </div>

        {/* Special Offers Banner */}
        <Card className="mb-8 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border-brand-primary/30">
          <div className="p-6 text-center">
            <h2 className="text-2xl font-bold font-heading mb-2">
              🎉 Flash Sale - Up to 50% Off!
            </h2>
            <p className="text-text-secondary mb-4">
              Limited time offer. Hurry up before stocks run out!
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
              <Clock className="w-4 h-4" />
              <span>Ends in 2 days, 14 hours</span>
            </div>
          </div>
        </Card>

        {/* Deals Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-64 bg-bg-tertiary rounded-lg mb-4" />
                <div className="h-4 bg-bg-tertiary rounded mb-2" />
                <div className="h-4 bg-bg-tertiary rounded w-2/3" />
              </Card>
            ))}
          </div>
        ) : deals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {deals.map((product: any) => {
              const discount = calculateDiscount(product.price, product.discountPrice)
              return (
                <Link key={product._id} href={`/products/${product._id}`}>
                  <Card hover className="overflow-hidden relative">
                    {/* Discount Badge */}
                    <div className="absolute top-2 left-2 z-10 bg-error text-text-inverse px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <Percent className="w-4 h-4" />
                      {discount}% OFF
                    </div>

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
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-brand-primary font-bold text-lg">
                          ₹{product.discountPrice}
                        </span>
                        <span className="text-text-tertiary line-through text-sm">
                          ₹{product.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-success">
                        <span>You save ₹{product.price - product.discountPrice}</span>
                      </div>
                      {product.rating > 0 && (
                        <div className="flex items-center gap-1 text-sm text-text-secondary mt-2">
                          <span>★</span>
                          <span>{product.rating.toFixed(1)}</span>
                          <span className="text-text-tertiary">({product.reviewCount})</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Tag className="w-24 h-24 text-text-tertiary mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-4">No Deals Available</h2>
            <p className="text-text-secondary mb-8">
              Check back soon for exciting offers!
            </p>
            <Link href="/products">
              <Button variant="primary" size="large">
                Browse All Products
              </Button>
            </Link>
          </div>
        )}

        {/* Additional Offers Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-brand-primary/10 to-transparent border-brand-primary/20">
            <div className="p-6">
              <h3 className="text-xl font-bold font-heading mb-2">Free Home Try-On</h3>
              <p className="text-text-secondary text-sm mb-4">
                Try 5 frames at home for free. No commitment required.
              </p>
              <Button variant="secondary" size="small">
                Learn More
              </Button>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-brand-secondary/10 to-transparent border-brand-secondary/20">
            <div className="p-6">
              <h3 className="text-xl font-bold font-heading mb-2">Buy 1 Get 1 Free</h3>
              <p className="text-text-secondary text-sm mb-4">
                Selected frames. Terms and conditions apply.
              </p>
              <Button variant="secondary" size="small">
                View Offer
              </Button>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-success/10 to-transparent border-success/20">
            <div className="p-6">
              <h3 className="text-xl font-bold font-heading mb-2">EMI Available</h3>
              <p className="text-text-secondary text-sm mb-4">
                Easy monthly installments starting from ₹499/month.
              </p>
              <Button variant="secondary" size="small">
                Check Eligibility
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

