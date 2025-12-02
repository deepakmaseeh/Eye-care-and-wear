# Starting the Application

## Quick Start

### Windows (PowerShell)
```powershell
.\start-dev.ps1
```

### Linux/Mac (Bash)
```bash
chmod +x start-dev.sh
./start-dev.sh
```

### Manual Start

#### Terminal 1 - Backend
```bash
cd backend
npm install  # First time only
npm run dev
```
Backend will run on: **http://localhost:5000**

#### Terminal 2 - Frontend
```bash
npm install  # First time only
npm run dev
```
Frontend will run on: **http://localhost:4000**

## Prerequisites

1. **MongoDB Running**
   - Local: `mongodb://localhost:27017/eyewear-india`
   - Or MongoDB Atlas connection string

2. **Environment Variables**

   **Backend** (`backend/.env`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/eyewear-india
   JWT_SECRET=your-secret-key
   FRONTEND_URL=http://localhost:4000
   ```

   **Frontend** (`.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

## Access Points

- **Frontend**: http://localhost:4000
- **Backend API**: http://localhost:5000/api
- **Admin Panel**: http://localhost:4000/admin/login
- **Health Check**: http://localhost:5000/health

## First Time Setup

### 1. Create Admin User
```bash
cd backend
npm run seed:admin
```

Default credentials:
- Email: `admin@eyewearindia.com`
- Password: `Admin@123`

**⚠️ Change password after first login!**

### 2. Seed Products (Optional)
```bash
cd backend
npm run seed:products
```

## Troubleshooting

### Backend won't start
- Check MongoDB is running
- Verify `backend/.env` exists
- Check port 5000 is not in use

### Frontend won't start
- Check port 4000 is not in use
- Verify `.env.local` exists with `NEXT_PUBLIC_API_URL`
- Clear `.next` folder: `rm -rf .next` (Linux/Mac) or `Remove-Item -Recurse .next` (Windows)

### Can't connect to backend
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend

### MongoDB connection error
- Verify MongoDB is running
- Check connection string in `backend/.env`
- For Atlas: Ensure IP is whitelisted

## Stopping Servers

- **PowerShell/Bash**: Press `Ctrl+C` in each terminal
- **Windows Script**: Close the PowerShell windows
- **Linux/Mac Script**: Press `Ctrl+C` (stops both)

## Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
npm run build
npm start
```

