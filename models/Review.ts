import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
  productId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  rating: number
  title: string
  content: string
  images?: string[]
  helpful: number
  notHelpful: number
  verifiedPurchase: boolean
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema: Schema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: [String],
    helpful: {
      type: Number,
      default: 0,
    },
    notHelpful: {
      type: Number,
      default: 0,
    },
    verifiedPurchase: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// Compound index to prevent duplicate reviews
ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true })

// Index for product reviews
ReviewSchema.index({ productId: 1, rating: -1, createdAt: -1 })

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)

