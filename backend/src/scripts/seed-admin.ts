import dotenv from 'dotenv'
import connectDB from '../config/database'
import AdminUser from '../../../models/AdminUser'

dotenv.config()

async function seedAdmin() {
  try {
    await connectDB()

    const adminData = {
      name: 'Super Admin',
      email: process.env.ADMIN_EMAIL || 'admin@eyewearindia.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123',
      role: 'super_admin' as const,
      isActive: true,
    }

    // Check if admin already exists
    const existingAdmin = await AdminUser.findOne({ email: adminData.email })
    if (existingAdmin) {
      console.log('⚠️ Admin user already exists with email:', adminData.email)
      console.log('To create a new admin, use a different email or delete the existing one.')
      process.exit(0)
    }

    // Create admin user
    const admin = new AdminUser(adminData)
    await admin.save()

    console.log('✅ Super Admin created successfully!')
    console.log('📧 Email:', adminData.email)
    console.log('🔑 Password:', adminData.password)
    console.log('⚠️  Please change the password after first login!')
    console.log('\n🚀 You can now login at: http://localhost:4000/admin/login')

    process.exit(0)
  } catch (error: any) {
    console.error('❌ Error seeding admin:', error.message)
    process.exit(1)
  }
}

seedAdmin()

