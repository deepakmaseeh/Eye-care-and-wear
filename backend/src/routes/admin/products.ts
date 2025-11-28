import { Router } from 'express'
import { authenticateAdmin, requireAdmin } from '../../middleware/auth'
import Product from '../../../../models/Product'
import connectDB from '../../config/database'

const router = Router()

// Get all products (admin)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    await connectDB()

    const { search, category, status, stockStatus, page = '1', limit = '50' } = req.query

    const query: any = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { sku: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
      ]
    }

    if (category) query.category = category
    if (status) query.status = status

    if (stockStatus === 'in-stock') {
      query.quantity = { $gt: 0 }
    } else if (stockStatus === 'low-stock') {
      query.quantity = { $gt: 0, $lte: 10 }
    } else if (stockStatus === 'out-of-stock') {
      query.quantity = 0
    }

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string)
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit as string))
      .select('-description')

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

// Create product
router.post('/', authenticateAdmin, requireAdmin, async (req, res) => {
  try {
    await connectDB()

    const body = req.body

    // Generate slug
    const slug = body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const product = new Product({
      ...body,
      slug,
    })

    await product.save()

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product created successfully',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Get single product
router.get('/:id', authenticateAdmin, async (req, res) => {
  try {
    await connectDB()

    const product = await Product.findById(req.params.id)

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

// Update product
router.put('/:id', authenticateAdmin, requireAdmin, async (req, res) => {
  try {
    await connectDB()

    const body = req.body

    if (body.name) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: body },
      { new: true, runValidators: true }
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      })
    }

    res.json({
      success: true,
      data: product,
      message: 'Product updated successfully',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Delete product
router.delete('/:id', authenticateAdmin, requireAdmin, async (req, res) => {
  try {
    await connectDB()

    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      })
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Inventory stats
router.get('/inventory/stats', authenticateAdmin, async (req, res) => {
  try {
    await connectDB()

    const [totalProducts, inStock, lowStock, outOfStock, lowStockProducts] = await Promise.all([
      Product.countDocuments(),
      Product.countDocuments({ quantity: { $gt: 0 } }),
      Product.countDocuments({
        $expr: {
          $and: [
            { $gt: ['$quantity', 0] },
            { $lte: ['$quantity', '$lowStockThreshold'] },
          ],
        },
      }),
      Product.countDocuments({ quantity: 0 }),
      Product.find({
        $expr: {
          $and: [
            { $gt: ['$quantity', 0] },
            { $lte: ['$quantity', '$lowStockThreshold'] },
          ],
        },
      })
        .select('name sku quantity lowStockThreshold price')
        .sort({ quantity: 1 })
        .limit(50),
    ])

    const inventoryValue = await Product.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: {
              $multiply: ['$quantity', '$costPrice'],
            },
          },
        },
      },
    ])

    res.json({
      success: true,
      data: {
        stats: {
          totalProducts,
          inStock,
          lowStock,
          outOfStock,
          totalValue: inventoryValue[0]?.total || 0,
        },
        lowStockProducts,
      },
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

export default router

