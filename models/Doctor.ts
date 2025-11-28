import mongoose, { Schema, Document } from 'mongoose'

export interface IDoctor extends Document {
  userId: mongoose.Types.ObjectId
  name: string
  email: string
  phone: string
  profilePhoto?: string
  dateOfBirth?: Date
  gender?: 'male' | 'female' | 'other'
  
  // Qualifications
  qualifications: string[]
  registrationNumber: string
  licenseNumber: string
  licenseDocument?: string
  licenseExpiryDate?: Date
  
  // Specialization
  primarySpecialty: string
  secondarySpecialties: string[]
  yearsOfExperience: number
  certifications: string[]
  
  // Clinic Assignment
  clinicId: mongoose.Types.ObjectId
  roleAtClinic: string
  departments: string[]
  operatingDays: string[]
  operatingHours: {
    start: string
    end: string
  }
  breakTime?: {
    start: string
    end: string
  }
  
  // Consultation Settings
  consultationSettings: {
    online: {
      enabled: boolean
      fee: number
      sessionDuration: number // minutes
    }
    inClinic: {
      enabled: boolean
      fee: number
    }
    homeVisit: {
      enabled: boolean
      fee: number
    }
    languages: string[]
  }
  
  // Availability
  maxAppointmentsPerDay: number
  slotDuration: number // minutes
  holidays: Date[]
  vacationDates: Array<{
    start: Date
    end: Date
  }>
  
  // Bank Account
  bankAccount: {
    bankName: string
    accountHolder: string
    accountNumber: string // encrypted
    ifsc: string
    accountType: string
    pan: string
    taxId?: string
  }
  
  // Communication Preferences
  communicationPreferences: {
    email: boolean
    sms: boolean
    whatsapp: boolean
    appointmentReminders: boolean
  }
  
  // Status
  accountStatus: 'active' | 'inactive' | 'suspended'
  verificationStatus: 'pending' | 'verified' | 'rejected'
  verificationNotes?: string
  verifiedAt?: Date
  verifiedBy?: mongoose.Types.ObjectId
  
  // Performance Metrics
  totalConsultations: number
  consultationsThisMonth: number
  averageRating: number
  patientReviewsCount: number
  cancellationRate: number
  responseTime: number // average in minutes
  
  createdAt: Date
  updatedAt: Date
}

const DoctorSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profilePhoto: String,
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    qualifications: [String],
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },
    licenseDocument: String,
    licenseExpiryDate: Date,
    primarySpecialty: {
      type: String,
      required: true,
    },
    secondarySpecialties: [String],
    yearsOfExperience: {
      type: Number,
      default: 0,
    },
    certifications: [String],
    clinicId: {
      type: Schema.Types.ObjectId,
      ref: 'Clinic',
      required: true,
    },
    roleAtClinic: String,
    departments: [String],
    operatingDays: [String],
    operatingHours: {
      start: String,
      end: String,
    },
    breakTime: {
      start: String,
      end: String,
    },
    consultationSettings: {
      online: {
        enabled: { type: Boolean, default: false },
        fee: { type: Number, default: 0 },
        sessionDuration: { type: Number, default: 30 },
      },
      inClinic: {
        enabled: { type: Boolean, default: false },
        fee: { type: Number, default: 0 },
      },
      homeVisit: {
        enabled: { type: Boolean, default: false },
        fee: { type: Number, default: 0 },
      },
      languages: [String],
    },
    maxAppointmentsPerDay: {
      type: Number,
      default: 20,
    },
    slotDuration: {
      type: Number,
      default: 30,
    },
    holidays: [Date],
    vacationDates: [
      {
        start: Date,
        end: Date,
      },
    ],
    bankAccount: {
      bankName: String,
      accountHolder: String,
      accountNumber: String,
      ifsc: String,
      accountType: String,
      pan: String,
      taxId: String,
    },
    communicationPreferences: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: true },
      whatsapp: { type: Boolean, default: false },
      appointmentReminders: { type: Boolean, default: true },
    },
    accountStatus: {
      type: String,
      enum: ['active', 'inactive', 'suspended'],
      default: 'inactive',
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verificationNotes: String,
    verifiedAt: Date,
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'AdminUser',
    },
    totalConsultations: {
      type: Number,
      default: 0,
    },
    consultationsThisMonth: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    patientReviewsCount: {
      type: Number,
      default: 0,
    },
    cancellationRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    responseTime: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

DoctorSchema.index({ email: 1 })
DoctorSchema.index({ licenseNumber: 1 })
DoctorSchema.index({ clinicId: 1 })
DoctorSchema.index({ verificationStatus: 1 })
DoctorSchema.index({ accountStatus: 1 })

export default mongoose.models.Doctor || mongoose.model<IDoctor>('Doctor', DoctorSchema)

