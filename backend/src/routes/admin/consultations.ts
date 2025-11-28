import { Router } from 'express'
import { authenticateAdmin } from '../../middleware/auth'
import Consultation from '../../../../models/Consultation'
import connectDB from '../../config/database'

const router = Router()

router.get('/', authenticateAdmin, async (req: any, res) => {
  try {
    await connectDB()

    const { search, status, type } = req.query

    const query: any = {}
    if (status) query.status = status
    if (type) query.type = type

    if (req.admin?.role === 'clinic_manager' && req.admin.clinicId) {
      query.clinicId = req.admin.clinicId
    }

    const consultations = await Consultation.find(query)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name primarySpecialty')
      .sort({ scheduledDate: -1, scheduledTime: -1 })
      .limit(100)

    let filtered = consultations
    if (search) {
      const searchLower = (search as string).toLowerCase()
      filtered = consultations.filter((consultation: any) => {
        const patient = consultation.patientId as any
        const doctor = consultation.doctorId as any
        return (
          patient?.name?.toLowerCase().includes(searchLower) ||
          patient?.email?.toLowerCase().includes(searchLower) ||
          doctor?.name?.toLowerCase().includes(searchLower)
        )
      })
    }

    res.json({ success: true, data: filtered })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router

