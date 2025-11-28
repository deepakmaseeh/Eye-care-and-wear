'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar, Footer } from '@/components'
import { Button, Card } from '@/components/ui'
import { WishlistManager, WishlistItem } from '@/lib/wishlist'
import { Trash2, ShoppingCart, Heart } from 'lucide-react'
import { CartManager } from '@/lib/cart'

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = () => {
    setWishlist(WishlistManager.getWishlist())
    setLoading(false)
  }

  const removeItem = (productId: string) => {
    WishlistManager.removeItem(productId)
    loadWishlist()
  }

  const addToCart = (item: WishlistItem) => {
    CartManager.addItem({
      productId: item.productId,
      name: item.name,
      price: item.price,
      discountPrice: item.discountPrice,
      image: item.image,
      quantity: 1,
    })
    alert('Added to cart!')
    window.dispatchEvent(new Event('storage'))
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom py-8">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold font-heading">My Wishlist</h1>
          <span className="text-text-secondary">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-text-tertiary mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-text-secondary mb-8">Start adding products you love!</p>
            <Link href="/products">
              <Button variant="primary" size="large">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <Card key={item.productId} hover className="relative">
                <button
                  onClick={() => removeItem(item.productId)}
                  className="absolute top-4 right-4 z-10 p-2 bg-bg-secondary/90 hover:bg-error-bg text-error rounded-lg transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>

                <Link href={`/products/${item.productId}`}>
                  <div className="relative h-64 bg-bg-tertiary rounded-lg overflow-hidden mb-4">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-tertiary text-xs">
                        No Image
                      </div>
                    )}
                    {item.discountPrice && (
                      <span className="absolute top-2 left-2 bg-error text-text-inverse px-2 py-1 rounded text-xs font-semibold">
                        Sale
                      </span>
                    )}
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/products/${item.productId}`}>
                    <h3 className="font-semibold mb-2 line-clamp-2 hover:text-brand-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mb-4">
                    {item.discountPrice ? (
                      <>
                        <span className="text-brand-primary font-bold">
                          ₹{item.discountPrice}
                        </span>
                        <span className="text-text-tertiary line-through text-sm">
                          ₹{item.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-brand-primary font-bold">₹{item.price}</span>
                    )}
                  </div>
                  <Button
                    variant="primary"
                    size="small"
                    fullWidth
                    onClick={() => addToCart(item)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

