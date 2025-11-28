'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, FileText, Download, Archive, Filter } from 'lucide-react'

interface Prescription {
  _id: string
  prescriptionId: string
  patientId: {
    name: string
    email: string
  }
  doctorId: {
    name: string
  }
  issueDate: string
  expiryDate: string
  status: string
  type: string
}

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    doctor: '',
    dateRange: '',
  })

  useEffect(() => {
    fetchPrescriptions()
  }, [searchTerm, filters])

  const fetchPrescriptions = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filters.status) params.append('status', filters.status)

      const response = await fetch(`/api/admin/prescriptions?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setPrescriptions(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch prescriptions:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Prescriptions</h1>
        <p className="text-[#6B7280] mt-1">Manage medical prescriptions</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by patient name, doctor name, prescription ID..."
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
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Prescriptions Table */}
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
                  Prescription ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Issue Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Expiry Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Type
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
              {prescriptions.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[#6B7280]">
                    No prescriptions found
                  </td>
                </tr>
              ) : (
                prescriptions.map((prescription) => (
                  <tr key={prescription._id} className="hover:bg-[#F9FAFB]">
                    <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">
                      #{prescription.prescriptionId.slice(-8)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-[#1F2937]">
                        {prescription.patientId?.name || 'N/A'}
                      </div>
                      <div className="text-xs text-[#6B7280]">
                        {prescription.patientId?.email || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {prescription.doctorId?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {new Date(prescription.issueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {new Date(prescription.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280] capitalize">
                      {prescription.type}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          prescription.status === 'active'
                            ? 'bg-[#DCFCE7] text-[#166534]'
                            : prescription.status === 'expired'
                            ? 'bg-[#FEE2E2] text-[#991B1B]'
                            : 'bg-[#F3F4F6] text-[#374151]'
                        }`}
                      >
                        {prescription.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/prescriptions/${prescription._id}`}
                          className="text-[#1B6FA0] hover:text-[#154A7B]"
                        >
                          <FileText className="w-4 h-4" />
                        </Link>
                        <button className="text-[#1B6FA0] hover:text-[#154A7B]">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
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

