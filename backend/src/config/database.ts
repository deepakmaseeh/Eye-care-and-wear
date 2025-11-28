import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/eyewear-india'

const connectDB = async (): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('✅ MongoDB already connected')
      return
    }

    await mongoose.connect(MONGODB_URI)
    console.log('✅ MongoDB connected successfully')
  } catch (error: any) {
    console.error('❌ MongoDB connection error:', error.message)
    throw error
  }
}

// Handle connection events
mongoose.connection.on('disconnected', () => {
  console.log('⚠️ MongoDB disconnected')
})

mongoose.connection.on('error', (error) => {
  console.error('❌ MongoDB error:', error)
})

export default connectDB

