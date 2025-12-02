import mongoose, { Schema, Document } from 'mongoose'

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId
  items: Array<{
    productId: mongoose.Types.ObjectId
    name: string
    price: number
    quantity: number
    lensType?: string
    coatings?: string[]
  }>
  subtotal: number
  discount: number
  tax: number
  total: number
  shippingAddress: {
    street: string
    city: string
    state: string
    pincode: string
    country: string
  }
  billingAddress?: {
    street: string
    city: string
    state: string
    pincode: string
    country: string
  }
  paymentMethod: 'razorpay' | 'cod' | 'upi'
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded'
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  tracking?: {
    carrier?: string
    trackingNumber?: string
    estimatedDelivery?: Date
  }
  razorpayOrderId?: string
  razorpayPaymentId?: string
  razorpaySignature?: string
  createdAt: Date
  updatedAt: Date
}

const OrderSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, min: 1 },
        lensType: String,
        coatings: [String],
      },
    ],
    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: 'India' },
    },
    billingAddress: {
      street: String,
      city: String,
      state: String,
      pincode: String,
      country: String,
    },
    paymentMethod: {
      type: String,
      enum: ['razorpay', 'cod', 'upi'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    orderStatus: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
      index: true,
    },
    tracking: {
      carrier: String,
      trackingNumber: String,
      estimatedDelivery: Date,
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
  },
  {
    timestamps: true,
  }
)

// Indexes for efficient queries
OrderSchema.index({ userId: 1, createdAt: -1 })
OrderSchema.index({ orderStatus: 1, paymentStatus: 1 })

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)



