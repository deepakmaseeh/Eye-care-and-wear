import { Router } from 'express'
import { authenticateAdmin } from '../../middleware/auth'
import Prescription from '../../../../models/Prescription'
import connectDB from '../../config/database'

const router = Router()

router.get('/', authenticateAdmin, async (req, res) => {
  try {
    await connectDB()

    const { search, status } = req.query

    const query: any = {}
    if (status) query.status = status

    const prescriptions = await Prescription.find(query)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name')
      .sort({ issueDate: -1 })
      .limit(100)

    let filtered = prescriptions
    if (search) {
      const searchLower = (search as string).toLowerCase()
      filtered = prescriptions.filter((prescription: any) => {
        const patient = prescription.patientId as any
        const doctor = prescription.doctorId as any
        return (
          patient?.name?.toLowerCase().includes(searchLower) ||
          patient?.email?.toLowerCase().includes(searchLower) ||
          doctor?.name?.toLowerCase().includes(searchLower) ||
          prescription.prescriptionId.toLowerCase().includes(searchLower)
        )
      })
    }

    res.json({ success: true, data: filtered })
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message })
  }
})

export default router

