# EyeWear India - Development Startup Script
# Starts both backend and frontend servers

Write-Host "🚀 Starting EyeWear India Development Servers..." -ForegroundColor Cyan
Write-Host ""

# Check if backend dependencies are installed
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}

# Check if frontend dependencies are installed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

# Check if backend .env exists
if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠️  Backend .env file not found!" -ForegroundColor Red
    Write-Host "Creating backend/.env from template..." -ForegroundColor Yellow
    
    $envContent = @"
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/eyewear-india
JWT_SECRET=eyewear-india-secret-key-change-in-production
JWT_EXPIRES_IN=7d
ADMIN_JWT_EXPIRES_IN=30m
FRONTEND_URL=http://localhost:4000
ADMIN_EMAIL=admin@eyewearindia.com
ADMIN_PASSWORD=Admin@123
"@
    
    Set-Content -Path "backend\.env" -Value $envContent
    Write-Host "✅ Created backend/.env" -ForegroundColor Green
}

# Check if frontend .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "⚠️  Frontend .env.local not found!" -ForegroundColor Yellow
    Write-Host "Creating .env.local..." -ForegroundColor Yellow
    
    $envContent = @"
NEXT_PUBLIC_API_URL=http://localhost:5000/api
"@
    
    Set-Content -Path ".env.local" -Value $envContent
    Write-Host "✅ Created .env.local" -ForegroundColor Green
}

Write-Host ""
Write-Host "🔧 Starting Backend Server (Port 5000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev" -WindowStyle Normal

Start-Sleep -Seconds 3

Write-Host "🎨 Starting Frontend Server (Port 4000)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Servers are starting in separate windows!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Backend API: http://localhost:5000/api" -ForegroundColor Yellow
Write-Host "📍 Frontend: http://localhost:4000" -ForegroundColor Yellow
Write-Host "📍 Admin Panel: http://localhost:4000/admin/login" -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Tip: Make sure MongoDB is running!" -ForegroundColor Cyan
Write-Host ""

