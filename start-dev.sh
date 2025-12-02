#!/bin/bash
# EyeWear India - Development Startup Script (Linux/Mac)
# Starts both backend and frontend servers

echo "🚀 Starting EyeWear India Development Servers..."
echo ""

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
fi

# Check if frontend dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Check if backend .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Backend .env file not found!"
    echo "Creating backend/.env from template..."
    
    cat > backend/.env << EOF
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/eyewear-india
JWT_SECRET=eyewear-india-secret-key-change-in-production
JWT_EXPIRES_IN=7d
ADMIN_JWT_EXPIRES_IN=30m
FRONTEND_URL=http://localhost:4000
ADMIN_EMAIL=admin@eyewearindia.com
ADMIN_PASSWORD=Admin@123
EOF
    
    echo "✅ Created backend/.env"
fi

# Check if frontend .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚠️  Frontend .env.local not found!"
    echo "Creating .env.local..."
    
    echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
    echo "✅ Created .env.local"
fi

echo ""
echo "🔧 Starting Backend Server (Port 5000)..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..

sleep 3

echo "🎨 Starting Frontend Server (Port 4000)..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Servers are starting!"
echo ""
echo "📍 Backend API: http://localhost:5000/api"
echo "📍 Frontend: http://localhost:4000"
echo "📍 Admin Panel: http://localhost:4000/admin/login"
echo ""
echo "💡 Tip: Make sure MongoDB is running!"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT
wait

