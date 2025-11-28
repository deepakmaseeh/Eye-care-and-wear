import { Router } from 'express'
import { authenticateAdmin, requireAdmin } from '../../middleware/auth'
import Doctor from '../../../../models/Doctor'
import connectDB from '../../config/database'

const router = Router()

router.get('/', authenticateAdmin, async (req: any, res) => {
  try {
    await connectDB()

    const { search, status, verificationStatus, specialty } = req.query

    const query: any = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { licenseNumber: { $regex: search, $options: 'i' } },
      ]
    }

    if (status) query.accountStatus = status
    if (verificationStatus) query.verificationStatus = verificationStatus
    if (specialty) query.primarySpecialty = specialty

    if (req.admin?.role === 'clinic_manager' && req.admin.clinicId) {
      query.clinicId = req.admin.clinicId
    }

    const doctors = await Doctor.find(query)
      .populate('clinicId', 'name')
      .sort({ createdAt: -1 })
      .limit(100)

    res.json({ success: true, data: doctors })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.post('/', authenticateAdmin, requireAdmin, async (req, res) => {
  try {
    await connectDB()
    const doctor = new Doctor(req.body)
    await doctor.save()
    res.status(201).json({ success: true, data: doctor })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

router.post('/:id/verify', authenticateAdmin, requireAdmin, async (req: any, res) => {
  try {
    await connectDB()
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {
        verificationStatus: 'verified',
        verifiedAt: new Date(),
        verifiedBy: req.admin.adminId,
        accountStatus: 'active',
      },
      { new: true }
    )
    if (!doctor) return res.status(404).json({ success: false, error: 'Doctor not found' })
    res.json({ success: true, data: doctor })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router

