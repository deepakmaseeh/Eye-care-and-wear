# Backend Setup Guide

## Project Structure

```
eyewear/
├── backend/                 # Backend API Server (Express.js)
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── middleware/     # Express middleware
│   │   ├── routes/         # API routes
│   │   │   ├── admin/     # Admin routes
│   │   │   └── ...
│   │   ├── utils/          # Utility functions
│   │   └── scripts/        # Seed scripts
│   ├── package.json
│   └── tsconfig.json
├── models/                 # Shared MongoDB models
├── app/                    # Frontend (Next.js)
└── components/             # Frontend components
```

## Installation

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create `backend/.env` file:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/eyewear-india

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
ADMIN_JWT_EXPIRES_IN=30m

# CORS
FRONTEND_URL=http://localhost:4000

# Admin Seed (optional)
ADMIN_EMAIL=admin@eyewearindia.com
ADMIN_PASSWORD=Admin@123
```

### 3. Install Frontend Dependencies

```bash
# From root directory
npm install
```

### 4. Frontend Environment Variables

Create `.env.local` in root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
Frontend will run on `http://localhost:4000`

### Production Mode

**Build Backend:**
```bash
cd backend
npm run build
npm start
```

**Build Frontend:**
```bash
npm run build
npm start
```

## Creating First Admin User

```bash
cd backend
npm run seed:admin
```

Or set environment variables:
```bash
ADMIN_EMAIL=admin@eyewearindia.com ADMIN_PASSWORD=Admin@123 npm run seed:admin
```

Default credentials:
- Email: `admin@eyewearindia.com`
- Password: `Admin@123`

**⚠️ Change password after first login!**

## API Endpoints

### Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-backend-domain.com/api`

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/admin/auth/login` - Admin login
- `GET /api/admin/auth/me` - Get current admin

### Admin Endpoints
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/products` - List products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/inventory/stats` - Inventory stats
- `GET /api/admin/doctors` - List doctors
- `POST /api/admin/doctors/:id/verify` - Verify doctor
- `GET /api/admin/orders` - List orders
- `GET /api/admin/consultations` - List consultations
- `GET /api/admin/prescriptions` - List prescriptions
- `GET /api/admin/customers` - List customers
- `GET /api/admin/analytics` - Analytics data
- `GET /api/admin/settings` - Get settings (Super Admin)
- `POST /api/admin/settings` - Update settings (Super Admin)

## Deployment

### Backend Deployment (e.g., Railway, Render, Heroku)

1. Set environment variables in your hosting platform
2. Build command: `npm run build`
3. Start command: `npm start`
4. Ensure PORT is set correctly

### Frontend Deployment (e.g., Vercel, Netlify)

1. Set `NEXT_PUBLIC_API_URL` to your backend URL
2. Deploy as usual

### Separate Hosting Benefits

- **Scalability**: Scale backend and frontend independently
- **Security**: Backend can be on private network
- **Performance**: Optimize each service separately
- **Cost**: Use different hosting tiers
- **Maintenance**: Update services independently

## Troubleshooting

### Backend won't start
- Check MongoDB connection string
- Verify PORT is not in use
- Check environment variables

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings in backend
- Ensure backend is running

### Authentication issues
- Verify JWT_SECRET matches in both environments
- Check token expiration settings
- Clear localStorage and re-login

## Development Tips

1. **Hot Reload**: Backend uses `ts-node-dev` for hot reload
2. **TypeScript**: Both frontend and backend use TypeScript
3. **Shared Models**: Models are in root `models/` folder, shared between frontend and backend
4. **API Client**: Frontend uses `lib/api-client.ts` for all API calls

## Next Steps

1. ✅ Backend structure created
2. ✅ API routes implemented
3. ✅ Admin seed script ready
4. ✅ Frontend API client updated
5. ✅ Charts library added
6. ⏳ Add more detailed routes as needed
7. ⏳ Implement file uploads
8. ⏳ Add email/SMS services
9. ⏳ Set up CI/CD

