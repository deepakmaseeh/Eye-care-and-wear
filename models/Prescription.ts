import mongoose, { Schema, Document } from 'mongoose'

export interface IPrescription extends Document {
  prescriptionId: string
  patientId: mongoose.Types.ObjectId
  doctorId: mongoose.Types.ObjectId
  consultationId: mongoose.Types.ObjectId
  issueDate: Date
  expiryDate: Date
  status: 'active' | 'expired' | 'archived'
  type: 'eyeglasses' | 'contact-lenses' | 'both'
  
  // Eye Prescription Details
  rightEye: {
    spherical?: number // Power
    cylinder?: number
    axis?: number
    addPower?: number
  }
  leftEye: {
    spherical?: number
    cylinder?: number
    axis?: number
    addPower?: number
  }
  pupillaryDistance?: number // PD in mm
  prism?: {
    right?: string
    left?: string
  }
  
  // Recommendations
  recommendations: {
    lensType: string[]
    frameType: string[]
    material: string[]
    coatings: string[]
    specialInstructions?: string
  }
  
  // Related Orders
  relatedOrders: mongoose.Types.ObjectId[]
  
  createdAt: Date
  updatedAt: Date
}

const PrescriptionSchema: Schema = new Schema(
  {
    prescriptionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    patientId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
    },
    consultationId: {
      type: Schema.Types.ObjectId,
      ref: 'Consultation',
      required: true,
    },
    issueDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'expired', 'archived'],
      default: 'active',
      index: true,
    },
    type: {
      type: String,
      enum: ['eyeglasses', 'contact-lenses', 'both'],
      default: 'eyeglasses',
    },
    rightEye: {
      spherical: Number,
      cylinder: Number,
      axis: Number,
      addPower: Number,
    },
    leftEye: {
      spherical: Number,
      cylinder: Number,
      axis: Number,
      addPower: Number,
    },
    pupillaryDistance: Number,
    prism: {
      right: String,
      left: String,
    },
    recommendations: {
      lensType: [String],
      frameType: [String],
      material: [String],
      coatings: [String],
      specialInstructions: String,
    },
    relatedOrders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
  },
  {
    timestamps: true,
  }
)

PrescriptionSchema.index({ patientId: 1, issueDate: -1 })
PrescriptionSchema.index({ doctorId: 1 })
PrescriptionSchema.index({ status: 1, expiryDate: 1 })
PrescriptionSchema.index({ prescriptionId: 1 })

export default mongoose.models.Prescription || mongoose.model<IPrescription>('Prescription', PrescriptionSchema)

