# EyeWear India - Premium Eyewear E-Commerce Platform

A modern, dark-themed eyewear e-commerce platform optimized for the Indian market, built with Next.js 13, TypeScript, Tailwind CSS, and MongoDB.

## 🚀 Features

- **Dark Theme Design** - Premium dark theme optimized for reduced eye strain
- **Product Catalog** - Browse and filter eyewear products
- **User Authentication** - Sign up and login with JWT
- **Product Search** - Real-time search and advanced filtering
- **Responsive Design** - Mobile-first, works on all devices
- **TypeScript** - Full type safety
- **MongoDB Integration** - Scalable database with Mongoose

## 🛠️ Tech Stack

- **Frontend**: Next.js 13, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom dark theme

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eyewear
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/eyewear-india
   JWT_SECRET=your-secret-key-change-in-production
   ```

   For MongoDB Atlas (cloud):
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/eyewear-india?retryWrites=true&w=majority
   ```

4. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:4000](http://localhost:4000)

## 📁 Project Structure

```
eyewear/
├── app/
│   ├── api/              # Next.js API routes
│   │   ├── auth/        # Authentication endpoints
│   │   └── products/    # Product endpoints
│   ├── products/         # Product pages
│   ├── globals.css      # Global styles and design tokens
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Homepage
├── components/
│   ├── ui/              # Core UI components
│   └── Navbar.tsx       # Navigation component
├── lib/
│   ├── api-client.ts    # API client for frontend
│   ├── mongodb.ts       # MongoDB connection
│   └── jwt.ts          # JWT utilities
├── models/              # MongoDB models
│   ├── Product.ts
│   ├── User.ts
│   ├── Order.ts
│   └── Review.ts
└── scripts/
    └── seed-products.ts # Database seeding script
```

## 🔑 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/[id]` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

## 🎨 Design System

The application uses a carefully calibrated dark theme:
- **Background**: #121212 (primary), #1E1E1E (secondary)
- **Brand Colors**: #32B8C6 (teal), #E8A55C (gold)
- **Text**: #E8E8E8 (primary), #B4B4B4 (secondary)

See `app/globals.css` for all design tokens.

## 🗄️ Database Setup

### Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/eyewear-india`

### MongoDB Atlas (Free Tier)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Add to `.env.local` as `MONGODB_URI`

## 📝 Available Scripts

- `npm run dev` - Start development server (port 4000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run seed` - Seed database with sample products

## 🔒 Environment Variables

Required environment variables (create `.env.local`):

```env
MONGODB_URI=mongodb://localhost:27017/eyewear-india
JWT_SECRET=your-secret-key-here
```

## 🚧 Development Status

### ✅ Phase 1: Foundation & Setup - COMPLETE
- Next.js setup with TypeScript
- Tailwind CSS with dark theme
- Core UI components
- Navigation bar
- Design system

### ✅ Phase 2: Week 3 - Database & Backend API - COMPLETE
- MongoDB connection
- Database models (Product, User, Order, Review)
- API routes for products
- Authentication API
- Product filtering and search

### 🚧 Phase 2: Week 4 - In Progress
- Home page enhancements
- Product catalog page
- Product detail page

## 📚 Next Steps

1. Complete product catalog and detail pages
2. Implement shopping cart
3. Add wishlist functionality
4. Build checkout flow
5. Integrate Razorpay payment gateway
6. Add virtual try-on feature
7. Implement face shape guide
8. Add doctor finder

## 🤝 Contributing

This is a development project. Follow the Cursor AI Prompt specifications for feature implementation.

## 📄 License

ISC

## 🙏 Acknowledgments

Built following the comprehensive specifications in `Cursor-AI-Prompt` file.

