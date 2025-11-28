'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar, Footer } from '@/components'
import { Button, Input, Card } from '@/components/ui'
import { useAuth } from '@/lib/auth-context'
import Link from 'next/link'
import { User, Mail, Phone, MapPin, Edit, Save, X } from 'lucide-react'

export default function ProfilePage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Load user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
      })
    }
  }, [isAuthenticated, user, router])

  const handleSave = async () => {
    setLoading(true)
    try {
      // TODO: Call API to update profile
      // await apiClient.user.updateProfile(formData)
      setIsEditing(false)
      alert('Profile updated successfully!')
    } catch (error) {
      alert('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-heading mb-8">My Profile</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold font-heading">Personal Information</h2>
                  {!isEditing ? (
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => setIsEditing(false)}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        size="small"
                        onClick={handleSave}
                        disabled={loading}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    icon={<User className="w-5 h-5" />}
                  />

                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    icon={<Mail className="w-5 h-5" />}
                  />

                  <Input
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    icon={<Phone className="w-5 h-5" />}
                  />
                </div>
              </Card>

              <Card>
                <h2 className="text-2xl font-semibold font-heading mb-6">Address</h2>
                <div className="space-y-4">
                  <Input
                    label="Address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    icon={<MapPin className="w-5 h-5" />}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      disabled={!isEditing}
                    />
                    <Input
                      label="State"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <Input
                    label="Pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/orders">
                    <Button variant="secondary" size="normal" fullWidth>
                      My Orders
                    </Button>
                  </Link>
                  <Link href="/wishlist">
                    <Button variant="secondary" size="normal" fullWidth>
                      My Wishlist
                    </Button>
                  </Link>
                  <Link href="/auth/change-password">
                    <Button variant="secondary" size="normal" fullWidth>
                      Change Password
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

