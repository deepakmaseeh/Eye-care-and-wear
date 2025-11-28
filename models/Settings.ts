import mongoose, { Schema, Document } from 'mongoose'

export interface ISettings extends Document {
  key: string
  value: any
  category: string
  description?: string
  updatedBy: mongoose.Types.ObjectId
  updatedAt: Date
}

const SettingsSchema: Schema = new Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    value: Schema.Types.Mixed,
    category: {
      type: String,
      required: true,
      index: true,
    },
    description: String,
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'AdminUser',
    },
  },
  {
    timestamps: true,
  }
)

SettingsSchema.index({ category: 1, key: 1 })

export default mongoose.models.Settings || mongoose.model<ISettings>('Settings', SettingsSchema)

