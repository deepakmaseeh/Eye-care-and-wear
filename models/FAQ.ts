import mongoose, { Schema, Document } from 'mongoose'

export interface IFAQ extends Document {
  question: string
  answer: string
  category: string
  displayOrder: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const FAQSchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

FAQSchema.index({ category: 1, displayOrder: 1 })
FAQSchema.index({ isActive: 1 })

export default mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FAQSchema)

