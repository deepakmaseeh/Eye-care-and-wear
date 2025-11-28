'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Plus, Edit, Eye, CheckCircle, XCircle, Filter } from 'lucide-react'

interface Doctor {
  _id: string
  name: string
  email: string
  phone: string
  primarySpecialty: string
  yearsOfExperience: number
  clinicId: {
    name: string
  }
  verificationStatus: string
  accountStatus: string
  averageRating: number
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    status: '',
    verificationStatus: '',
    specialty: '',
  })

  useEffect(() => {
    fetchDoctors()
  }, [searchTerm, filters])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('adminToken')
      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (filters.status) params.append('status', filters.status)
      if (filters.verificationStatus) params.append('verificationStatus', filters.verificationStatus)
      if (filters.specialty) params.append('specialty', filters.specialty)

      const response = await fetch(`/api/admin/doctors?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setDoctors(data.data || [])
      }
    } catch (error) {
      console.error('Failed to fetch doctors:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVerify = async (doctorId: string) => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch(`/api/admin/doctors/${doctorId}/verify`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        fetchDoctors()
      }
    } catch (error) {
      console.error('Failed to verify doctor:', error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">Doctors</h1>
          <p className="text-[#6B7280] mt-1">Manage doctors and their profiles</p>
        </div>
        <Link
          href="/admin/doctors/new"
          className="bg-[#1B6FA0] text-white px-4 py-2 rounded-lg hover:bg-[#154A7B] transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Doctor
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by name, email, license number..."
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
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>

          <select
            value={filters.verificationStatus}
            onChange={(e) => setFilters({ ...filters, verificationStatus: e.target.value })}
            className="px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
          >
            <option value="">Verification Status</option>
            <option value="pending">Pending</option>
            <option value="verified">Verified</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Doctors Table */}
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
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Specialty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Clinic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-[#6B7280] uppercase">
                  Verification
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
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-[#6B7280]">
                    No doctors found
                  </td>
                </tr>
              ) : (
                doctors.map((doctor) => (
                  <tr key={doctor._id} className="hover:bg-[#F9FAFB]">
                    <td className="px-6 py-4 text-sm font-medium text-[#1F2937]">
                      {doctor.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">{doctor.email}</td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {doctor.primarySpecialty}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {doctor.yearsOfExperience} years
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6B7280]">
                      {doctor.clinicId?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4">
                      {doctor.verificationStatus === 'verified' ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-[#DCFCE7] text-[#166534] flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" />
                          Verified
                        </span>
                      ) : doctor.verificationStatus === 'pending' ? (
                        <button
                          onClick={() => handleVerify(doctor._id)}
                          className="px-2 py-1 text-xs rounded-full bg-[#FEF3C7] text-[#92400E] hover:bg-[#FDE68A] transition-colors"
                        >
                          Verify
                        </button>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-[#FEE2E2] text-[#991B1B]">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          doctor.accountStatus === 'active'
                            ? 'bg-[#DCFCE7] text-[#166534]'
                            : doctor.accountStatus === 'suspended'
                            ? 'bg-[#FEE2E2] text-[#991B1B]'
                            : 'bg-[#F3F4F6] text-[#374151]'
                        }`}
                      >
                        {doctor.accountStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/doctors/${doctor._id}`}
                          className="text-[#1B6FA0] hover:text-[#154A7B]"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/doctors/${doctor._id}/edit`}
                          className="text-[#1B6FA0] hover:text-[#154A7B]"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
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

