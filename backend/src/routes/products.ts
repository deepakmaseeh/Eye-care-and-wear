import { Router } from 'express'
import Product from '../../../models/Product'
import connectDB from '../config/database'

const router = Router()

// Get all products
router.get('/', async (req, res) => {
  try {
    await connectDB()

    const {
      category,
      gender,
      frameType,
      material,
      search,
      page = '1',
      limit = '12',
    } = req.query

    const query: any = { status: 'active' }

    if (category) query.category = category
    if (gender) query.gender = gender
    if (frameType) query.frameType = frameType
    if (material) query.material = material
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ]
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .lean()

    const total = await Product.countDocuments(query)

    res.json({
      success: true,
      data: products,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Get single product
router.get('/:id', async (req, res) => {
  try {
    await connectDB()

    const product = await Product.findById(req.params.id).lean()

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      })
    }

    res.json({
      success: true,
      data: product,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

export default router

