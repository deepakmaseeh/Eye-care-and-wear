import mongoose, { Schema, Document } from 'mongoose'

export interface IArticle extends Document {
  title: string
  slug: string
  category: string
  author: mongoose.Types.ObjectId
  featuredImage?: string
  content: string
  excerpt?: string
  metaTitle?: string
  metaDescription?: string
  tags: string[]
  isFeatured: boolean
  status: 'draft' | 'published' | 'archived'
  publishedAt?: Date
  views: number
  createdAt: Date
  updatedAt: Date
}

const ArticleSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'AdminUser',
      required: true,
    },
    featuredImage: String,
    content: {
      type: String,
      required: true,
    },
    excerpt: String,
    metaTitle: String,
    metaDescription: String,
    tags: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
      index: true,
    },
    publishedAt: Date,
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

ArticleSchema.index({ title: 'text', content: 'text' })
ArticleSchema.index({ status: 1, publishedAt: -1 })
ArticleSchema.index({ category: 1 })

export default mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema)

