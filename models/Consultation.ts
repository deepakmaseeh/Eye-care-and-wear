import mongoose, { Schema, Document } from 'mongoose'

export interface IConsultation extends Document {
  consultationId: string
  patientId: mongoose.Types.ObjectId
  doctorId: mongoose.Types.ObjectId
  clinicId: mongoose.Types.ObjectId
  type: 'online' | 'in-clinic' | 'home'
  scheduledDate: Date
  scheduledTime: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
  consultationNotes?: {
    doctorNotes?: string
    diagnosis?: string
    treatment?: string
    medicines?: Array<{
      name: string
      dosage: string
      frequency: string
      duration: string
    }>
    followUp?: {
      required: boolean
      date?: Date
      notes?: string
    }
  }
  prescriptionId?: mongoose.Types.ObjectId
  fee: number
  paymentStatus: 'pending' | 'completed' | 'refunded'
  reminders: Array<{
    type: 'email' | 'sms' | 'whatsapp' | 'push'
    sentAt: Date
    status: 'sent' | 'failed'
  }>
  rescheduledFrom?: mongoose.Types.ObjectId
  cancellationReason?: string
  cancelledAt?: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

const ConsultationSchema: Schema = new Schema(
  {
    consultationId: {
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
    clinicId: {
      type: Schema.Types.ObjectId,
      ref: 'Clinic',
      required: true,
    },
    type: {
      type: String,
      enum: ['online', 'in-clinic', 'home'],
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    scheduledTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in-progress', 'completed', 'cancelled', 'no-show'],
      default: 'pending',
      index: true,
    },
    consultationNotes: {
      doctorNotes: String,
      diagnosis: String,
      treatment: String,
      medicines: [
        {
          name: String,
          dosage: String,
          frequency: String,
          duration: String,
        },
      ],
      followUp: {
        required: { type: Boolean, default: false },
        date: Date,
        notes: String,
      },
    },
    prescriptionId: {
      type: Schema.Types.ObjectId,
      ref: 'Prescription',
    },
    fee: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'refunded'],
      default: 'pending',
    },
    reminders: [
      {
        type: {
          type: String,
          enum: ['email', 'sms', 'whatsapp', 'push'],
        },
        sentAt: Date,
        status: {
          type: String,
          enum: ['sent', 'failed'],
        },
      },
    ],
    rescheduledFrom: {
      type: Schema.Types.ObjectId,
      ref: 'Consultation',
    },
    cancellationReason: String,
    cancelledAt: Date,
    completedAt: Date,
  },
  {
    timestamps: true,
  }
)

ConsultationSchema.index({ patientId: 1, createdAt: -1 })
ConsultationSchema.index({ doctorId: 1, scheduledDate: 1 })
ConsultationSchema.index({ status: 1, scheduledDate: 1 })
ConsultationSchema.index({ consultationId: 1 })

export default mongoose.models.Consultation || mongoose.model<IConsultation>('Consultation', ConsultationSchema)

