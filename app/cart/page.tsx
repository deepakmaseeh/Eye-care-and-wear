'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar, Footer } from '@/components'
import { Button, Card } from '@/components/ui'
import { CartManager, CartItem } from '@/lib/cart'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    setCart(CartManager.getCart())
    setLoading(false)
  }

  const updateQuantity = (productId: string, quantity: number) => {
    CartManager.updateQuantity(productId, quantity)
    loadCart()
  }

  const removeItem = (productId: string) => {
    CartManager.removeItem(productId)
    loadCart()
  }

  const total = CartManager.getTotal()
  const itemCount = CartManager.getItemCount()

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
        <h1 className="text-4xl font-bold font-heading mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-text-tertiary mx-auto mb-4 opacity-50" />
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-text-secondary mb-8">Add some products to get started!</p>
            <Link href="/products">
              <Button variant="primary" size="large">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <Card key={item.productId} className="flex gap-4">
                  <div className="relative w-24 h-24 bg-bg-tertiary rounded-lg overflow-hidden flex-shrink-0">
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
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 border border-border-primary rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-2 hover:bg-bg-hover"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-2 hover:bg-bg-hover"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div>
                        <span className="text-brand-primary font-bold">
                          ₹{(item.discountPrice || item.price) * item.quantity}
                        </span>
                        {item.discountPrice && (
                          <span className="text-text-tertiary line-through text-sm ml-2">
                            ₹{item.price * item.quantity}
                          </span>
                        )}
                      </div>
                    </div>
                    {item.lensType && (
                      <p className="text-sm text-text-secondary mb-1">
                        Lens: {item.lensType.replace(/-/g, ' ')}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="p-2 text-error hover:bg-error-bg rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <h2 className="text-xl font-semibold font-heading mb-4">Order Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-text-secondary">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-text-secondary">
                    <span>Shipping</span>
                    <span className="text-success">Free</span>
                  </div>
                  <div className="border-t border-border-primary pt-2 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-brand-primary">₹{total}</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button variant="primary" size="large" fullWidth>
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/products" className="block mt-4">
                  <Button variant="secondary" size="normal" fullWidth>
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

