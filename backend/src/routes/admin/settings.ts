import { Router } from 'express'
import { authenticateAdmin, requireSuperAdmin } from '../../middleware/auth'
import Settings from '../../../../models/Settings'
import connectDB from '../../config/database'

const router = Router()

router.get('/', authenticateAdmin, requireSuperAdmin, async (req, res) => {
  try {
    await connectDB()

    const settings = await Settings.find({ category: 'general' })
    const settingsObj: any = {}
    settings.forEach((setting) => {
      settingsObj[setting.key] = setting.value
    })

    res.json({ success: true, data: settingsObj })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.post('/', authenticateAdmin, requireSuperAdmin, async (req: any, res) => {
  try {
    await connectDB()

    const body = req.body

    for (const [key, value] of Object.entries(body)) {
      await Settings.findOneAndUpdate(
        { key, category: 'general' },
        {
          key,
          value,
          category: 'general',
          updatedBy: req.admin.adminId,
        },
        { upsert: true, new: true }
      )
    }

    res.json({ success: true, message: 'Settings saved successfully' })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router

