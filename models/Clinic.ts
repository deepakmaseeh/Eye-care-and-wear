import mongoose, { Schema, Document } from 'mongoose'

export interface IClinic extends Document {
  name: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
    country: string
  }
  coordinates?: {
    latitude: number
    longitude: number
  }
  website?: string
  logo?: string
  description: string
  hours: {
    [key: string]: {
      open: string
      close: string
      closed?: boolean
    }
  }
  specialties: string[]
  facilities: string[]
  doctors: mongoose.Types.ObjectId[]
  status: 'active' | 'inactive' | 'suspended'
  createdAt: Date
  updatedAt: Date
}

const ClinicSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, default: 'India' },
    },
    coordinates: {
      latitude: Number,
      longitude: Number,
    },
    website: String,
    logo: String,
    description: String,
    hours: {
      type: Map,
      of: {
        open: String,
        close: String,
        closed: Boolean,
      },
    },
    specialties: [String],
    facilities: [String],
    doctors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
      },
    ],
    status: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
)

ClinicSchema.index({ name: 'text', city: 'text', state: 'text' })
ClinicSchema.index({ status: 1 })

export default mongoose.models.Clinic || mongoose.model<IClinic>('Clinic', ClinicSchema)

