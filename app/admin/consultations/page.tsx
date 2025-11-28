'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Calendar, Clock, User, Stethoscope, Filter } from 'lucide-react'

interface Consultation {
  _id: string
  consultationId: string
  patientId: {
    name: string
    email: string
  }
  doctorId: {
    name: string
    primarySpecialty: string
  }
  type: string
  scheduledDate: string
  scheduledTime: string
  status: string
  fee: number
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    dateRange: '',
  })

  useEffect(() => {
    fetchConsultations()
  }, [searchTerm, filters])

  const fetchConsultations = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filters.status) params.append('status', filters.status)
      if (filters.type) params.append('type', filters.type)

      const response = await fetch(`/api/admin/consultations?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setConsultations(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch consultations:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-[#FEF3C7] text-[#92400E]',
      'in-progress': 'bg-[#E0E7FF] text-[#3730A3]',
      completed: 'bg-[#DCFCE7] text-[#166534]',
      cancelled: 'bg-[#FEE2E2] text-[#991B1B]',
      'no-show': 'bg-[#F3F4F6] text-[#374151]',
    }
    return colors[status] || 'bg-[#F3F4F6] text-[#374151]'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Consultations</h1>
        <p className="text-[#6B7280] mt-1">Manage appointments and consultations</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by patient name, doctor name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no-show">No Show</option>
          </select>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
          >
            <option value="">All Types</option>
            <option value="online">Online</option>
            <option value="in-clinic">In-Clinic</option>
            <option value="home">Home Visit</option>
          </select>
        </div>
      </div>

      {/* Consultations Table */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B6FA0]"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-[#E5E7EB] overflow-hidden">
          <table className="w-full">
            <thead className="bg-[#F9FAFB] border-b border-[#E5E7EB]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-[#6B7280] uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {consultations.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[#6B7280]">
                    No consultations found
                  </td>
                </tr>
              ) : (
                consultations.map((consultation) => (
                  <tr key={consultation._id} className="hover:bg-[#F9FAFB]">
                    <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">
                      #{consultation.consultationId.slice(-8)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#1F2937]">
                        {consultation.patientId?.name || 'N/A'}
                      </div>
                      <div className="text-xs text-[#6B7280]">
                        {consultation.patientId?.email || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#1F2937]">
                        {consultation.doctorId?.name || 'N/A'}
                      </div>
                      <div className="text-xs text-[#6B7280]">
                        {consultation.doctorId?.primarySpecialty || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280] capitalize">
                      {consultation.type}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-[#1F2937]">
                        {new Date(consultation.scheduledDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-[#6B7280]">{consultation.scheduledTime}</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">
                      ₹{consultation.fee.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(
                          consultation.status
                        )}`}
                      >
                        {consultation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/consultations/${consultation._id}`}
                        className="text-[#1B6FA0] hover:text-[#154A7B] inline-flex items-center gap-1"
                      >
                        <Calendar className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

