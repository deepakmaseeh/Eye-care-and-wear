'use client'

import { useEffect, useState } from 'react'
import { Settings as SettingsIcon, Save, Eye, EyeOff } from 'lucide-react'

export default function SettingsPage() {
  const [adminUser, setAdminUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    platformName: 'EyeWear India',
    supportEmail: '',
    supportPhone: '',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    defaultShippingCost: '',
    freeShippingThreshold: '',
  })

  useEffect(() => {
    const user = localStorage.getItem('adminUser')
    if (user) {
      setAdminUser(JSON.parse(user))
    }

    // Check if super admin
    if (user) {
      const parsed = JSON.parse(user)
      if (parsed.role !== 'super_admin') {
        alert('Access denied. Super admin only.')
        window.location.href = '/admin'
        return
      }
    }

    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/settings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.data) {
          setSettings({ ...settings, ...data.data })
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert('Settings saved successfully')
      } else {
        alert('Failed to save settings')
      }
    } catch (error) {
      alert('An error occurred')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B6FA0]"></div>
      </div>
    )
  }

  if (!adminUser || adminUser.role !== 'super_admin') {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#6B7280]">Access denied. Super admin only.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#1F2937]">Settings</h1>
        <p className="text-[#6B7280] mt-1">Configure platform settings</p>
      </div>

      {/* General Settings */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h2 className="text-xl font-semibold text-[#1F2937] mb-4">General Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">
              Platform Name
            </label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">
              Support Email
            </label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">
              Support Phone
            </label>
            <input
              type="tel"
              value={settings.supportPhone}
              onChange={(e) => setSettings({ ...settings, supportPhone: e.target.value })}
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">Timezone</label>
            <select
              value={settings.timezone}
              onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
        </div>
      </div>

      {/* Shipping Settings */}
      <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
        <h2 className="text-xl font-semibold text-[#1F2937] mb-4">Shipping Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">
              Default Shipping Cost (₹)
            </label>
            <input
              type="number"
              value={settings.defaultShippingCost}
              onChange={(e) => setSettings({ ...settings, defaultShippingCost: e.target.value })}
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1F2937] mb-2">
              Free Shipping Threshold (₹)
            </label>
            <input
              type="number"
              value={settings.freeShippingThreshold}
              onChange={(e) =>
                setSettings({ ...settings, freeShippingThreshold: e.target.value })
              }
              className="w-full px-4 py-2 border border-[#D1D5DB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B6FA0]"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-[#1B6FA0] text-white rounded-lg hover:bg-[#154A7B] transition-colors flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Settings
        </button>
      </div>
    </div>
  )
}

