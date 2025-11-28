import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  role?: 'user' | 'admin' | 'doctor'
  profile?: {
    phone?: string
    dateOfBirth?: Date
    gender?: 'male' | 'female' | 'other'
    faceShape?: 'oval' | 'round' | 'square' | 'heart' | 'diamond' | 'triangle'
  }
  addresses: Array<{
    street: string
    city: string
    state: string
    pincode: string
    country: string
    isDefault: boolean
  }>
  preferences: {
    preferredFrameTypes?: string[]
    preferredColors?: string[]
    priceRange?: {
      min: number
      max: number
    }
  }
  wishlist: mongoose.Types.ObjectId[]
  isVerified: boolean
  status: 'active' | 'suspended' | 'deleted'
  createdAt: Date
  updatedAt: Date
  lastLogin?: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'doctor'],
      default: 'user',
    },
    profile: {
      phone: String,
      dateOfBirth: Date,
      gender: {
        type: String,
        enum: ['male', 'female', 'other'],
      },
      faceShape: {
        type: String,
        enum: ['oval', 'round', 'square', 'heart', 'diamond', 'triangle'],
      },
    },
    addresses: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        country: { type: String, default: 'India' },
        isDefault: { type: Boolean, default: false },
      },
    ],
    preferences: {
      preferredFrameTypes: [String],
      preferredColors: [String],
      priceRange: {
        min: Number,
        max: Number,
      },
    },
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'deleted'],
      default: 'active',
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
)

// Hash password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

