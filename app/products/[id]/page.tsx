'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar } from '@/components'
import { Button, Card, Select, Checkbox } from '@/components/ui'
import { apiClient } from '@/lib/api-client'
import { Heart, ShoppingCart, Star, Share2, FileText, CheckCircle } from 'lucide-react'
import { WishlistManager } from '@/lib/wishlist'

export default function ProductDetailPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedLensType, setSelectedLensType] = useState('')
  const [selectedCoatings, setSelectedCoatings] = useState<string[]>([])
  const [isInWishlist, setIsInWishlist] = useState(false)

  useEffect(() => {
    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await apiClient.products.getById(params.id as string)
      if (response.success && response.data) {
        setProduct(response.data)
        if (response.data.lensTypes?.length > 0) {
          setSelectedLensType(response.data.lensTypes[0])
        }
        setIsInWishlist(WishlistManager.isInWishlist(response.data._id))
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleCoating = (coating: string) => {
    setSelectedCoatings((prev) =>
      prev.includes(coating) ? prev.filter((c) => c !== coating) : [...prev, coating]
    )
  }

  const addToCart = () => {
    if (!product) return
    
    const { CartManager } = require('@/lib/cart')
    CartManager.addItem({
      productId: product._id,
      name: product.name,
      price: product.price,
      discountPrice: product.discountPrice,
      image: product.images?.[0]?.url,
      quantity: quantity,
      lensType: selectedLensType,
      coatings: selectedCoatings,
    })
    
    alert('Added to cart!')
    // Trigger cart count update in navbar
    window.dispatchEvent(new Event('storage'))
  }

  const toggleWishlist = () => {
    if (!product) return
    
    if (isInWishlist) {
      WishlistManager.removeItem(product._id)
      setIsInWishlist(false)
    } else {
      WishlistManager.addItem({
        productId: product._id,
        name: product.name,
        price: product.price,
        discountPrice: product.discountPrice,
        image: product.images?.[0]?.url,
      })
      setIsInWishlist(true)
    }
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

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom py-8">
          <p>Product not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="relative h-96 bg-bg-tertiary rounded-2xl overflow-hidden mb-4">
              {product.images?.[selectedImage]?.url ? (
                <Image
                  src={product.images[selectedImage].url}
                  alt={product.images[selectedImage].alt || product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                  No Image
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 bg-bg-tertiary rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? 'border-brand-primary'
                        : 'border-transparent'
                    }`}
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || product.name}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-text-secondary">{product.brand}</span>
              {product.rating > 0 && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-brand-secondary text-brand-secondary" />
                  <span className="text-sm">{product.rating.toFixed(1)}</span>
                  <span className="text-sm text-text-tertiary">({product.reviewCount} reviews)</span>
                </div>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-text-primary">{product.name}</h1>
            <p className="text-base text-text-secondary mb-6 font-medium leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="mb-6">
              {product.discountPrice ? (
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-brand-primary">
                    ₹{product.discountPrice}
                  </span>
                  <span className="text-2xl text-text-tertiary line-through">
                    ₹{product.price}
                  </span>
                  <span className="bg-success text-text-inverse px-3 py-1 rounded-lg text-sm font-semibold">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-4xl font-bold text-brand-primary">₹{product.price}</span>
              )}
            </div>

            {/* Prescription Compatibility Info */}
            <Card className="mb-6 bg-brand-primary/5 border-brand-primary/20 p-6">
              <h3 className="text-lg font-bold mb-4 text-text-primary flex items-center gap-2">
                <FileText className="w-5 h-5 text-brand-primary" />
                Prescription Compatibility
              </h3>
              <div className="space-y-3 text-sm text-text-secondary">
                <p className="font-semibold text-text-primary">
                  This frame is suitable for:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span>Single vision prescriptions</span>
                  </li>
                  {product.lensTypes?.includes('progressive') && (
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-primary" />
                      <span>Progressive lenses</span>
                    </li>
                  )}
                  {product.lensTypes?.includes('high-index') && (
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-primary" />
                      <span>High power prescriptions (-2.00 to -6.00)</span>
                    </li>
                  )}
                  {product.lensTypes?.includes('blue-light') && (
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-brand-primary" />
                      <span>Computer use and digital eye strain</span>
                    </li>
                  )}
                </ul>
                <p className="text-xs text-text-tertiary mt-4 italic leading-relaxed">
                  💡 Check with your doctor to ensure this frame is suitable for your specific prescription
                </p>
                <Link href="/prescriptions">
                  <Button variant="primary" size="normal" className="mt-4">
                    Use My Saved Prescription
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Doctor Recommended Badges */}
            <div className="mb-6 flex flex-wrap gap-2">
              {(product.category === 'computer-glasses' || product.lensTypes?.includes('blue-light')) && (
                <span className="inline-block px-3 py-1.5 bg-brand-primary/15 text-brand-primary rounded-lg text-xs font-semibold">
                  👨‍⚕️ Doctor Recommended for Digital Eye Strain
                </span>
              )}
              {product.lensTypes?.includes('high-index') && (
                <span className="inline-block px-3 py-1.5 bg-brand-primary/15 text-brand-primary rounded-lg text-xs font-semibold">
                  ✓ Good for High Power Lenses
                </span>
              )}
              {(product.material?.toLowerCase().includes('titanium') || product.material?.toLowerCase().includes('acetate')) && (
                <span className="inline-block px-3 py-1.5 bg-brand-primary/15 text-brand-primary rounded-lg text-xs font-semibold">
                  ⚖️ Lightweight for All-day Medical Use
                </span>
              )}
            </div>

            {/* Offers */}
            <div className="mb-6 space-y-2.5">
              <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                <span>💳</span>
                <span>EMI starting from ₹{Math.round((product.discountPrice || product.price) / 12)}/month</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                <span>🚚</span>
                <span>Free Home Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                <span>✓</span>
                <span>14 Days Return Policy</span>
              </div>
            </div>

            {/* Options */}
            {product.lensTypes && product.lensTypes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-text-secondary">
                  Lens Type
                </label>
                <Select
                  options={product.lensTypes.map((type: string) => ({
                    value: type,
                    label: type.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
                  }))}
                  value={selectedLensType}
                  onChange={(e) => setSelectedLensType(e.target.value)}
                />
              </div>
            )}

            {product.coatings && product.coatings.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-text-secondary">
                  Lens Coatings
                </label>
                <div className="space-y-2">
                  {product.coatings.map((coating: string) => (
                    <Checkbox
                      key={coating}
                      label={coating.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                      checked={selectedCoatings.includes(coating)}
                      onChange={() => toggleCoating(coating)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-text-secondary">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border border-border-primary rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-bg-hover"
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-bg-hover"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={addToCart}
                className="flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart - ₹{(product.discountPrice || product.price) * quantity}
              </Button>
              <Button
                variant="icon"
                size="large"
                onClick={toggleWishlist}
                className={isInWishlist ? 'text-error' : ''}
              >
                <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="icon" size="large">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Stock Status */}
            {product.inStock ? (
              <p className="text-success mb-6">✓ In Stock</p>
            ) : (
              <p className="text-error mb-6">✗ Out of Stock</p>
            )}

            {/* Specifications */}
            <Card className="p-6">
              <h3 className="text-lg font-bold mb-4 text-text-primary">Specifications</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-text-secondary">Frame Type:</span>
                  <span className="ml-2 capitalize">{product.frameType?.replace(/-/g, ' ')}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Material:</span>
                  <span className="ml-2 capitalize">{product.material?.replace(/-/g, ' ')}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Color:</span>
                  <span className="ml-2 capitalize">{product.color}</span>
                </div>
                <div>
                  <span className="text-text-secondary">Gender:</span>
                  <span className="ml-2 capitalize">{product.gender}</span>
                </div>
                {product.suitableFaceShapes && product.suitableFaceShapes.length > 0 && (
                  <div className="col-span-2">
                    <span className="text-text-secondary">Suitable Face Shapes:</span>
                    <span className="ml-2">
                      {product.suitableFaceShapes.map((shape: string) => shape.charAt(0).toUpperCase() + shape.slice(1)).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

