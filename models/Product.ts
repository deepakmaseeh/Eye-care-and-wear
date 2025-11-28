import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  description: string
  shortDescription?: string
  brand: string
  sku: string
  price: number
  costPrice?: number
  discountPrice?: number
  mrp?: number
  taxRate?: number
  images: Array<{
    url: string
    alt: string
  }>
  videoUrl?: string
  frameType: 'full-rim' | 'semi-rimless' | 'rimless' | 'aviator' | 'cat-eye' | 'round' | 'square' | 'rectangular'
  material: 'acetate' | 'titanium' | 'stainless-steel' | 'tr90' | 'memory-metal'
  color: string
  frameSpecs?: {
    width?: number
    lensWidth?: number
    bridgeWidth?: number
    templeLength?: number
    weight?: number
  }
  suitableFaceShapes: Array<'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'triangle'>
  lensTypes: Array<'single-vision' | 'bifocal' | 'progressive' | 'blue-light-blocking' | 'photochromic' | 'polarized'>
  availableCoatings?: Array<{
    type: 'anti-reflective' | 'scratch-resistant' | 'uv-protection' | 'blue-light-blocking'
    price: number
  }>
  features: string[]
  coatings: Array<'anti-reflective' | 'scratch-resistant' | 'uv-protection'>
  gender: 'men' | 'women' | 'unisex' | 'kids'
  category: 'glasses' | 'sunglasses' | 'computer-glasses' | 'accessories'
  rating: number
  reviewCount: number
  inStock: boolean
  quantity: number
  lowStockThreshold?: number
  warehouseLocation?: string
  barcode?: string
  status: 'draft' | 'active' | 'inactive'
  isFeatured: boolean
  isNew: boolean
  isOnSale: boolean
  promotionTag?: string
  tags: string[]
  metaTitle?: string
  metaDescription?: string
  slug: string
  keywords?: string[]
  publishedAt?: Date
  visibility: 'public' | 'private'
  createdAt: Date
  updatedAt: Date
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      index: true,
    },
    shortDescription: String,
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    costPrice: {
      type: Number,
      min: 0,
    },
    discountPrice: {
      type: Number,
      min: 0,
    },
    mrp: {
      type: Number,
      min: 0,
    },
    taxRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, default: '' },
      },
    ],
    videoUrl: String,
    frameType: {
      type: String,
      enum: ['full-rim', 'semi-rimless', 'rimless', 'aviator', 'cat-eye', 'round', 'square', 'rectangular'],
      required: true,
      index: true,
    },
    material: {
      type: String,
      enum: ['acetate', 'titanium', 'stainless-steel', 'tr90', 'memory-metal'],
      required: true,
      index: true,
    },
    color: {
      type: String,
      required: true,
      index: true,
    },
    frameSpecs: {
      width: Number,
      lensWidth: Number,
      bridgeWidth: Number,
      templeLength: Number,
      weight: Number,
    },
    suitableFaceShapes: [
      {
        type: String,
        enum: ['oval', 'round', 'square', 'heart', 'diamond', 'triangle'],
      },
    ],
    lensTypes: [
      {
        type: String,
        enum: ['single-vision', 'bifocal', 'progressive', 'blue-light-blocking', 'photochromic', 'polarized'],
      },
    ],
    availableCoatings: [
      {
        type: {
          type: String,
          enum: ['anti-reflective', 'scratch-resistant', 'uv-protection', 'blue-light-blocking'],
        },
        price: Number,
      },
    ],
    features: [String],
    coatings: [
      {
        type: String,
        enum: ['anti-reflective', 'scratch-resistant', 'uv-protection'],
      },
    ],
    gender: {
      type: String,
      enum: ['men', 'women', 'unisex', 'kids'],
      default: 'unisex',
      index: true,
    },
    category: {
      type: String,
      enum: ['glasses', 'sunglasses', 'computer-glasses', 'accessories'],
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    quantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: 0,
    },
    warehouseLocation: String,
    barcode: String,
    status: {
      type: String,
      enum: ['draft', 'active', 'inactive'],
      default: 'draft',
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    promotionTag: String,
    tags: [String],
    metaTitle: String,
    metaDescription: String,
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    keywords: [String],
    publishedAt: Date,
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
  },
  {
    timestamps: true,
  }
)

// Text search index
ProductSchema.index({ name: 'text', description: 'text', brand: 'text' })

// Compound indexes for common queries
ProductSchema.index({ category: 1, gender: 1, frameType: 1 })
ProductSchema.index({ price: 1, rating: -1 })

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema)

