import mongoose, { Schema, Document } from 'mongoose'

export interface ICoupon extends Document {
  code: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minOrderValue: number
  maxDiscountValue?: number
  usageLimit?: number
  perCustomerLimit?: number
  expiryDate?: Date
  applicableTo: 'all' | 'category' | 'products'
  categories?: string[]
  products?: mongoose.Types.ObjectId[]
  isActive: boolean
  timesUsed: number
  totalDiscount: number
  createdAt: Date
  updatedAt: Date
}

const CouponSchema: Schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderValue: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxDiscountValue: Number,
    usageLimit: Number,
    perCustomerLimit: Number,
    expiryDate: Date,
    applicableTo: {
      type: String,
      enum: ['all', 'category', 'products'],
      default: 'all',
    },
    categories: [String],
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    timesUsed: {
      type: Number,
      default: 0,
    },
    totalDiscount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

CouponSchema.index({ code: 1, isActive: 1 })
CouponSchema.index({ expiryDate: 1 })

export default mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema)

