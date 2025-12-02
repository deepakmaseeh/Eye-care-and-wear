import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Product from '../models/Product'

const sampleProducts = [
  {
    name: 'Classic Black Full Rim Frames',
    description: 'Timeless black acetate frames perfect for everyday wear. Durable and comfortable with a modern design.',
    brand: 'Eyewear Co',
    price: 2999,
    discountPrice: 2499,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800',
        alt: 'Classic Black Frames',
      },
    ],
    frameType: 'full-rim',
    material: 'acetate',
    color: 'black',
    suitableFaceShapes: ['oval', 'round', 'square'],
    lensTypes: ['single-vision', 'blue-light-blocking'],
    features: ['Lightweight', 'Durable', 'Comfortable fit'],
    coatings: ['anti-reflective', 'scratch-resistant'],
    gender: 'unisex',
    category: 'glasses',
    rating: 4.5,
    reviewCount: 234,
    inStock: true,
    quantity: 50,
  },
  {
    name: 'Tortoiseshell Aviator Sunglasses',
    description: 'Stylish tortoiseshell aviator sunglasses with UV protection. Perfect for sunny days.',
    brand: 'SunStyle',
    price: 3999,
    discountPrice: 3299,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800',
        alt: 'Tortoiseshell Aviator Sunglasses',
      },
    ],
    frameType: 'aviator',
    material: 'acetate',
    color: 'tortoiseshell',
    suitableFaceShapes: ['oval', 'heart', 'diamond'],
    lensTypes: ['polarized'],
    features: ['UV Protection', 'Polarized lenses', 'Stylish design'],
    coatings: ['uv-protection'],
    gender: 'unisex',
    category: 'sunglasses',
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    quantity: 30,
  },
  {
    name: 'Blue Light Blocking Computer Glasses',
    description: 'Protect your eyes from digital screens with these blue light blocking glasses. Perfect for long work hours.',
    brand: 'TechVision',
    price: 2499,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800',
        alt: 'Blue Light Blocking Glasses',
      },
    ],
    frameType: 'semi-rimless',
    material: 'titanium',
    color: 'silver',
    suitableFaceShapes: ['oval', 'round', 'square'],
    lensTypes: ['blue-light-blocking'],
    features: ['Blue light protection', 'Lightweight titanium', 'Anti-glare'],
    coatings: ['anti-reflective', 'scratch-resistant'],
    gender: 'unisex',
    category: 'computer-glasses',
    rating: 4.6,
    reviewCount: 312,
    inStock: true,
    quantity: 75,
  },
  {
    name: 'Gold Round Frames',
    description: 'Luxurious gold round frames with a vintage-inspired design. Perfect for a sophisticated look.',
    brand: 'Luxury Eyewear',
    price: 5999,
    discountPrice: 4999,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800',
        alt: 'Gold Round Frames',
      },
    ],
    frameType: 'round',
    material: 'titanium',
    color: 'gold',
    suitableFaceShapes: ['square', 'heart', 'diamond'],
    lensTypes: ['single-vision', 'progressive'],
    features: ['Premium materials', 'Vintage design', 'Comfortable'],
    coatings: ['anti-reflective', 'scratch-resistant', 'uv-protection'],
    gender: 'unisex',
    category: 'glasses',
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    quantity: 25,
  },
  {
    name: 'Crystal Clear Rimless Frames',
    description: 'Modern rimless frames with crystal clear design. Minimalist and lightweight.',
    brand: 'Minimalist',
    price: 4499,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800',
        alt: 'Crystal Clear Rimless Frames',
      },
    ],
    frameType: 'rimless',
    material: 'titanium',
    color: 'crystal',
    suitableFaceShapes: ['oval', 'round'],
    lensTypes: ['single-vision', 'progressive'],
    features: ['Ultra lightweight', 'Rimless design', 'Modern look'],
    coatings: ['anti-reflective', 'scratch-resistant'],
    gender: 'unisex',
    category: 'glasses',
    rating: 4.4,
    reviewCount: 98,
    inStock: true,
    quantity: 40,
  },
]

async function seedProducts() {
  try {
    await connectDB()
    console.log('Connected to MongoDB')

    // Clear existing products (optional - remove if you want to keep existing data)
    // await Product.deleteMany({})
    // console.log('Cleared existing products')

    // Insert sample products
    const products = await Product.insertMany(sampleProducts)
    console.log(`✅ Seeded ${products.length} products successfully!`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding products:', error)
    process.exit(1)
  }
}

seedProducts()



