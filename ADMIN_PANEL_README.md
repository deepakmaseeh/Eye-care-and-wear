# EyeWear India - Admin Control Center

## Overview

A comprehensive admin panel for managing the EyeWear India platform, built with Next.js 14+, React 18+, TypeScript, and Tailwind CSS.

## Features

### ✅ Completed Modules

1. **Authentication & Authorization**
   - Admin login system
   - JWT-based authentication
   - Role-based access control (Super Admin, Admin, Clinic Manager, Doctor, Content Manager)
   - 30-minute session timeout

2. **Dashboard**
   - Overview cards (Users, Doctors, Orders, Consultations)
   - Revenue metrics
   - Quick actions panel
   - Recent activity feed

3. **Products & Inventory Management**
   - Product listing with search and filters
   - Add/Edit product form
   - Inventory dashboard
   - Low stock alerts
   - Stock management

4. **Doctors & Clinics Management**
   - Doctor listing
   - Doctor verification system
   - Clinic management
   - Performance metrics

5. **Orders & Fulfillment**
   - Order listing with filters
   - Order status management
   - Payment status tracking
   - Fulfillment workflows

6. **Consultations & Appointments**
   - Consultation listing
   - Appointment management
   - Status tracking
   - Patient and doctor information

7. **Prescriptions**
   - Prescription listing
   - View prescription details
   - Status management (Active/Expired/Archived)

8. **Customers Management**
   - Customer listing
   - Customer profiles
   - Order history
   - Spending analytics

9. **Content Management**
   - Articles management
   - FAQs management
   - Resources management

10. **Analytics & Reports**
    - Sales analytics
    - Customer metrics
    - Product metrics
    - Export functionality

11. **Settings & Configuration** (Super Admin Only)
    - General settings
    - Shipping configuration
    - Platform configuration

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT
- **Icons**: Lucide React

## File Structure

```
app/
├── admin/
│   ├── layout.tsx          # Admin layout with sidebar
│   ├── login/
│   │   └── page.tsx        # Admin login page
│   ├── page.tsx            # Dashboard
│   ├── products/
│   │   ├── page.tsx        # Products listing
│   │   ├── new/
│   │   │   └── page.tsx    # Add product
│   │   └── inventory/
│   │       └── page.tsx    # Inventory dashboard
│   ├── doctors/
│   │   └── page.tsx        # Doctors listing
│   ├── orders/
│   │   └── page.tsx        # Orders listing
│   ├── consultations/
│   │   └── page.tsx        # Consultations listing
│   ├── prescriptions/
│   │   └── page.tsx        # Prescriptions listing
│   ├── customers/
│   │   └── page.tsx        # Customers listing
│   ├── content/
│   │   └── page.tsx        # Content management
│   ├── analytics/
│   │   └── page.tsx        # Analytics dashboard
│   └── settings/
│       └── page.tsx         # Settings (Super Admin)

api/
└── admin/
    ├── auth/
    │   ├── login/
    │   │   └── route.ts    # Admin login API
    │   └── me/
    │       └── route.ts     # Get current admin
    ├── dashboard/
    │   └── stats/
    │       └── route.ts     # Dashboard stats
    ├── products/
    │   ├── route.ts         # Products CRUD
    │   ├── [id]/
    │   │   └── route.ts     # Single product
    │   └── inventory/
    │       └── route.ts     # Inventory stats
    ├── doctors/
    │   ├── route.ts         # Doctors CRUD
    │   └── [id]/
    │       └── verify/
    │           └── route.ts # Verify doctor
    ├── orders/
    │   └── route.ts         # Orders listing
    ├── consultations/
    │   └── route.ts         # Consultations listing
    ├── prescriptions/
    │   └── route.ts         # Prescriptions listing
    ├── customers/
    │   └── route.ts         # Customers listing
    ├── analytics/
    │   └── route.ts         # Analytics data
    └── settings/
        └── route.ts         # Settings CRUD

components/
└── admin/
    ├── AdminSidebar.tsx     # Sidebar navigation
    └── AdminHeader.tsx      # Header with user menu

models/
├── AdminUser.ts             # Admin user model
├── Doctor.ts                # Doctor model
├── Clinic.ts                # Clinic model
├── Consultation.ts          # Consultation model
├── Prescription.ts          # Prescription model
├── Article.ts               # Article model
├── FAQ.ts                   # FAQ model
├── Coupon.ts                # Coupon model
└── Settings.ts              # Settings model

lib/
├── admin-auth.ts            # Admin authentication utilities
└── admin-jwt.ts             # Admin JWT utilities
```

## Access Levels

### Super Admin
- Full access to all modules
- Settings configuration
- User management
- All CRUD operations

### Admin
- Access to most modules
- Product management
- Order management
- Doctor management
- No access to settings

### Clinic Manager
- Limited to their clinic
- View clinic doctors
- Manage clinic consultations
- View clinic orders

### Content Manager
- Content management only
- Articles, FAQs, Resources

### Doctor
- View own consultations
- Manage own appointments
- View own prescriptions

## Color Palette

- **Primary Action**: #1B6FA0 (Medical Blue)
- **Success**: #00A86B (Green)
- **Warning**: #FF6B35 (Orange-Red)
- **Danger**: #DC3545 (Red)
- **Background**: #F5F7FA (Light Gray)
- **Sidebar**: #2C3E50 (Dark Navy)
- **Text Primary**: #1F2937 (Dark Gray)
- **Text Secondary**: #6B7280 (Light Gray)

## Getting Started

1. **Access Admin Panel**
   ```
   Navigate to: http://localhost:4000/admin/login
   ```

2. **Create First Admin User**
   You'll need to create an admin user directly in the database or through a seed script.

3. **Login**
   - Use admin email and password
   - Session expires after 30 minutes

## API Endpoints

### Authentication
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/auth/me` - Get current admin

### Dashboard
- `GET /api/admin/dashboard/stats` - Dashboard statistics

### Products
- `GET /api/admin/products` - List products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/[id]` - Get product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `GET /api/admin/products/inventory` - Inventory stats

### Doctors
- `GET /api/admin/doctors` - List doctors
- `POST /api/admin/doctors` - Create doctor
- `POST /api/admin/doctors/[id]/verify` - Verify doctor

### Orders
- `GET /api/admin/orders` - List orders

### Consultations
- `GET /api/admin/consultations` - List consultations

### Prescriptions
- `GET /api/admin/prescriptions` - List prescriptions

### Customers
- `GET /api/admin/customers` - List customers

### Analytics
- `GET /api/admin/analytics` - Get analytics data

### Settings
- `GET /api/admin/settings` - Get settings (Super Admin)
- `POST /api/admin/settings` - Update settings (Super Admin)

## Security Features

- JWT-based authentication
- Role-based access control
- Encrypted sensitive data
- Session timeout (30 minutes)
- HTTPS only (production)
- Audit logging (to be implemented)

## Future Enhancements

- [ ] Chart visualizations (using Chart.js or Recharts)
- [ ] Email template management
- [ ] SMS template management
- [ ] Advanced reporting with PDF export
- [ ] Bulk operations
- [ ] Activity log viewer
- [ ] Two-factor authentication for Super Admin
- [ ] Real-time notifications
- [ ] Advanced search with filters
- [ ] Data export (CSV/Excel)

## Notes

- All admin routes are protected by authentication middleware
- Role-based access is enforced at both UI and API levels
- The admin panel is optimized for desktop (minimum 1024px width)
- All forms include validation
- Error handling is implemented throughout

## Support

For issues or questions, refer to the main project README or contact the development team.

