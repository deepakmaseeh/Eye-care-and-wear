import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export type AdminRole = 'super_admin' | 'admin' | 'clinic_manager' | 'doctor' | 'content_manager'

export interface IAdminUser extends Document {
  name: string
  email: string
  password: string
  role: AdminRole
  clinicId?: mongoose.Types.ObjectId
  permissions?: string[]
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const AdminUserSchema: Schema = new Schema(
  {
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
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'clinic_manager', 'doctor', 'content_manager'],
      required: true,
      default: 'admin',
    },
    clinicId: {
      type: Schema.Types.ObjectId,
      ref: 'Clinic',
    },
    permissions: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
)

// Hash password before saving
AdminUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// Compare password method
AdminUserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema)

