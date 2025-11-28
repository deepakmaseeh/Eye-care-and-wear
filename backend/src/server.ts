import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import connectDB from './config/database'
import errorHandler from './middleware/errorHandler'

// Import routes
import authRoutes from './routes/auth'
import adminAuthRoutes from './routes/admin/auth'
import productRoutes from './routes/products'
import adminProductRoutes from './routes/admin/products'
import adminDashboardRoutes from './routes/admin/dashboard'
import adminDoctorRoutes from './routes/admin/doctors'
import adminOrderRoutes from './routes/admin/orders'
import adminConsultationRoutes from './routes/admin/consultations'
import adminPrescriptionRoutes from './routes/admin/prescriptions'
import adminCustomerRoutes from './routes/admin/customers'
import adminAnalyticsRoutes from './routes/admin/analytics'
import adminSettingsRoutes from './routes/admin/settings'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:4000',
  credentials: true,
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/admin/auth', adminAuthRoutes)
app.use('/api/products', productRoutes)
app.use('/api/admin/products', adminProductRoutes)
app.use('/api/admin/dashboard', adminDashboardRoutes)
app.use('/api/admin/doctors', adminDoctorRoutes)
app.use('/api/admin/orders', adminOrderRoutes)
app.use('/api/admin/consultations', adminConsultationRoutes)
app.use('/api/admin/prescriptions', adminPrescriptionRoutes)
app.use('/api/admin/customers', adminCustomerRoutes)
app.use('/api/admin/analytics', adminAnalyticsRoutes)
app.use('/api/admin/settings', adminSettingsRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  })
})

// Error handler
app.use(errorHandler)

// Connect to database and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Backend server running on port ${PORT}`)
      console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`🔗 API: http://localhost:${PORT}/api`)
    })
  })
  .catch((error) => {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  })

export default app

