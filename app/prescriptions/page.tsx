'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Navbar, Footer } from '@/components'
import { Button, Card, Input } from '@/components/ui'
import { useAuth } from '@/lib/auth-context'
import { FileText, Upload, Eye, Calendar, User, Search, CheckCircle } from 'lucide-react'

export default function PrescriptionsPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()
  const [uploading, setUploading] = useState(false)

  // Sample prescriptions data
  const prescriptions = [
    {
      id: '1',
      date: '2024-01-15',
      doctorName: 'Dr. Priya Sharma',
      prescriptionType: 'Eyeglasses',
      rightEye: '-2.50',
      leftEye: '-2.75',
      notes: 'Single vision lenses recommended',
    },
    {
      id: '2',
      date: '2023-12-10',
      doctorName: 'Dr. Rajesh Kumar',
      prescriptionType: 'Computer Glasses',
      rightEye: '-1.50',
      leftEye: '-1.75',
      notes: 'Blue light blocking recommended',
    },
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom py-16">
          <Card className="max-w-md mx-auto text-center">
            <FileText className="w-16 h-16 text-brand-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-heading mb-4">Sign In Required</h2>
            <p className="text-text-secondary mb-6">
              Please sign in to view and manage your prescriptions
            </p>
            <Link href="/auth/login">
              <Button variant="primary" size="large">
                Sign In
              </Button>
            </Link>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    // TODO: Implement prescription upload
    setTimeout(() => {
      setUploading(false)
      alert('Prescription uploaded successfully!')
    }, 2000)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2 text-text-primary">
              Prescriptions & Reports
            </h1>
            <p className="text-base text-text-secondary font-medium">
              Manage your eye prescriptions and get personalized eyewear recommendations
            </p>
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleUpload}
              className="hidden"
            />
            <Button variant="primary" size="normal" disabled={uploading}>
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Prescription'}
            </Button>
          </label>
        </div>

        {/* Upload Prescription Card */}
        <Card className="mb-10 bg-brand-primary/5 border-brand-primary/20 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-brand-primary/15 rounded-full flex items-center justify-center flex-shrink-0">
              <FileText className="w-8 h-8 text-brand-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold mb-2 text-text-primary">New Prescription?</h3>
              <p className="text-sm text-text-secondary mb-4 font-medium leading-relaxed">
                Upload your prescription to get personalized frame and lens recommendations
              </p>
              <label className="inline-block cursor-pointer">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleUpload}
                  className="hidden"
                />
                <Button variant="secondary" size="normal">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Now
                </Button>
              </label>
            </div>
          </div>
        </Card>

        {/* Prescriptions List */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold font-heading mb-8 text-text-primary">Your Prescriptions</h2>
          {prescriptions.length > 0 ? (
            <div className="space-y-4">
              {prescriptions.map((prescription) => (
                <Card key={prescription.id} hover className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 bg-brand-primary/15 rounded-full flex items-center justify-center flex-shrink-0">
                          <Eye className="w-6 h-6 text-brand-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-text-primary mb-1.5">{prescription.prescriptionType}</h3>
                          <div className="flex items-center gap-4 text-sm text-text-secondary font-medium">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {prescription.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {prescription.doctorName}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-5">
                        <div className="bg-bg-tertiary p-4 rounded-lg">
                          <div className="text-xs text-text-secondary mb-1.5 font-medium">Right Eye</div>
                          <div className="text-lg font-bold text-text-primary">{prescription.rightEye}</div>
                        </div>
                        <div className="bg-bg-tertiary p-4 rounded-lg">
                          <div className="text-xs text-text-secondary mb-1.5 font-medium">Left Eye</div>
                          <div className="text-lg font-bold text-text-primary">{prescription.leftEye}</div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-text-secondary mb-5 font-medium leading-relaxed">{prescription.notes}</p>
                      
                      <div className="flex gap-3">
                        <Link href={`/products?prescription=${prescription.id}`}>
                          <Button variant="primary" size="small">
                            <Search className="w-4 h-4 mr-2" />
                            Find Compatible Frames
                          </Button>
                        </Link>
                        <Button variant="secondary" size="small">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <FileText className="w-16 h-16 text-text-tertiary mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2 text-text-primary">No Prescriptions Yet</h3>
              <p className="text-text-secondary mb-6">
                Upload your first prescription to get started
              </p>
              <label className="inline-block cursor-pointer">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleUpload}
                  className="hidden"
                />
                <Button variant="primary" size="normal">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Prescription
                </Button>
              </label>
            </Card>
          )}
        </div>

        {/* Information Card */}
        <Card className="bg-brand-primary/5 border-brand-primary/20 p-6">
          <h3 className="text-lg font-bold mb-4 text-text-primary">How Prescriptions Help</h3>
          <ul className="space-y-3 text-sm text-text-secondary">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
              <span className="font-medium leading-relaxed">Get personalized frame recommendations based on your prescription power</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
              <span className="font-medium leading-relaxed">Automatic lens type suggestions (single vision, progressive, etc.)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
              <span className="font-medium leading-relaxed">Track your prescription history and vision changes over time</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
              <span className="font-medium leading-relaxed">Easy access to prescriptions when ordering eyewear</span>
            </li>
          </ul>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

