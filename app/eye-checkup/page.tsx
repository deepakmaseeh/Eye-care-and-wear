'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar, Footer } from '@/components'
import { Button, Card, Input, Select, Radio } from '@/components/ui'
import { Calendar, Clock, MapPin, Video, Stethoscope, CheckCircle } from 'lucide-react'

export default function EyeCheckupPage() {
  const [checkupType, setCheckupType] = useState<'online' | 'clinic' | ''>('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <Stethoscope className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Book Your Eye Checkup
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Get a comprehensive eye examination by certified eye doctors. Choose between online consultation or visit our clinic.
          </p>
        </div>

        {/* Choose Checkup Type */}
        <Card className="max-w-4xl mx-auto mb-10 p-6">
          <h2 className="text-2xl font-bold font-heading mb-6 text-text-primary">Choose Checkup Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => setCheckupType('online')}
              className={`p-6 border-2 rounded-xl text-left transition-all ${
                checkupType === 'online'
                  ? 'border-brand-primary bg-brand-primary/5'
                  : 'border-border-primary hover:border-brand-primary'
              }`}
            >
              <Video className="w-8 h-8 text-brand-primary mb-4" />
              <h3 className="text-lg font-bold mb-2 text-text-primary">Online Consultation</h3>
              <p className="text-text-secondary text-sm mb-4 font-medium leading-relaxed">
                Video consultation with certified eye doctors from the comfort of your home
              </p>
              <ul className="text-sm text-text-secondary space-y-2.5">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                  <span>Available 24/7</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                  <span>Digital prescription</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                  <span>₹299 - ₹599</span>
                </li>
              </ul>
            </button>

            <button
              onClick={() => setCheckupType('clinic')}
              className={`p-6 border-2 rounded-xl text-left transition-all ${
                checkupType === 'clinic'
                  ? 'border-brand-primary bg-brand-primary/5'
                  : 'border-border-primary hover:border-brand-primary'
              }`}
            >
              <MapPin className="w-8 h-8 text-brand-primary mb-4" />
              <h3 className="text-lg font-bold mb-2 text-text-primary">In-Clinic Visit</h3>
              <p className="text-text-secondary text-sm mb-4 font-medium leading-relaxed">
                Visit our clinic for a comprehensive eye examination with advanced equipment
              </p>
              <ul className="text-sm text-text-secondary space-y-2.5">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                  <span>Advanced equipment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                  <span>Same-day results</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                  <span>₹499 - ₹999</span>
                </li>
              </ul>
            </button>
          </div>
        </Card>

        {/* Booking Form */}
        {checkupType && (
          <Card className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold font-heading mb-6 text-text-primary">
              {checkupType === 'online' ? 'Schedule Online Consultation' : 'Book Clinic Appointment'}
            </h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-text-secondary">Select Date</label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-text-secondary">Select Time</label>
                <Select
                  options={[
                    { value: '', label: 'Choose time slot' },
                    { value: '09:00', label: '9:00 AM' },
                    { value: '10:00', label: '10:00 AM' },
                    { value: '11:00', label: '11:00 AM' },
                    { value: '14:00', label: '2:00 PM' },
                    { value: '15:00', label: '3:00 PM' },
                    { value: '16:00', label: '4:00 PM' },
                    { value: '17:00', label: '5:00 PM' },
                  ]}
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>

              {checkupType === 'clinic' && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Select Location</label>
                  <Select
                    options={[
                      { value: '', label: 'Choose clinic location' },
                      { value: 'delhi', label: 'Delhi - Connaught Place' },
                      { value: 'mumbai', label: 'Mumbai - Andheri' },
                      { value: 'bangalore', label: 'Bangalore - Koramangala' },
                      { value: 'hyderabad', label: 'Hyderabad - Hitech City' },
                    ]}
                  />
                </div>
              )}

              <Button
                variant="primary"
                size="large"
                fullWidth
                disabled={!selectedDate || !selectedTime}
              >
                {checkupType === 'online' ? 'Book Online Consultation' : 'Book Clinic Appointment'}
              </Button>
            </div>
          </Card>
        )}

        {/* Benefits Section */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-center text-text-primary">
            Why Get Your Eyes Checked?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '👁️',
                title: 'Early Detection',
                description: 'Detect eye conditions early before they become serious problems',
              },
              {
                icon: '📋',
                title: 'Accurate Prescription',
                description: 'Get the correct prescription for your vision needs',
              },
              {
                icon: '💊',
                title: 'Medical Advice',
                description: 'Receive expert advice on eye care and medications if needed',
              },
            ].map((benefit) => (
              <Card key={benefit.title} className="text-center p-6">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-text-primary">{benefit.title}</h3>
                <p className="text-sm text-text-secondary font-medium leading-relaxed">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

