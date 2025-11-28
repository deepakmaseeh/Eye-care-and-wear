'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Navbar, Footer } from '@/components'
import { Button, Card, Input, Select } from '@/components/ui'
import { Video, Clock, CheckCircle, User, Calendar } from 'lucide-react'

export default function OnlineConsultationPage() {
  const [selectedDoctor, setSelectedDoctor] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  const doctors = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      qualification: 'MD Ophthalmology',
      specialization: 'Retina & Diabetic Eye Care',
      experience: 12,
      fee: 499,
      rating: 4.8,
      available: true,
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      qualification: 'MS Ophthalmology',
      specialization: 'Cataract & Refractive Surgery',
      experience: 15,
      fee: 599,
      rating: 4.9,
      available: true,
    },
    {
      id: '3',
      name: 'Dr. Anjali Patel',
      qualification: 'MD Ophthalmology',
      specialization: 'Pediatric Ophthalmology',
      experience: 10,
      fee: 449,
      rating: 4.7,
      available: true,
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <Video className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Online Eye Consultation
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Consult with certified eye doctors via video call. Get prescriptions, medical advice, and eyewear recommendations from the comfort of your home.
          </p>
        </div>

        {/* How It Works */}
        <Card className="max-w-4xl mx-auto mb-12 bg-brand-primary/5 border-brand-primary/20 p-6">
          <h2 className="text-2xl font-bold font-heading mb-8 text-text-primary text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Choose Doctor', icon: '👨‍⚕️' },
              { step: '2', title: 'Book Slot', icon: '📅' },
              { step: '3', title: 'Video Call', icon: '📹' },
              { step: '4', title: 'Get Prescription', icon: '📋' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                  {item.icon}
                </div>
                <div className="text-sm font-semibold text-brand-primary mb-1">Step {item.step}</div>
                <div className="text-sm text-text-secondary font-medium">{item.title}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Available Doctors */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-8 text-text-primary">Available Doctors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {doctors.map((doctor) => (
              <Card key={doctor.id} hover className="cursor-pointer p-6" onClick={() => setSelectedDoctor(doctor.id)}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-brand-primary/15 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    👨‍⚕️
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-1">{doctor.name}</h3>
                    <p className="text-sm text-text-secondary font-medium">{doctor.qualification}</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary mb-3 font-medium">{doctor.specialization}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-text-secondary">{doctor.experience} years experience</span>
                  <span className="text-sm font-semibold text-brand-primary">★ {doctor.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-text-primary">₹{doctor.fee}</span>
                  <Button variant="primary" size="small">
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        {selectedDoctor && (
          <Card className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold font-heading mb-6 text-text-primary">Book Consultation</h2>
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
                    { value: '18:00', label: '6:00 PM' },
                    { value: '19:00', label: '7:00 PM' },
                  ]}
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                />
              </div>
              <Button variant="primary" size="large" fullWidth disabled={!selectedDate || !selectedTime}>
                Confirm Booking - ₹{doctors.find(d => d.id === selectedDoctor)?.fee}
              </Button>
            </div>
          </Card>
        )}

        {/* Benefits */}
        <section className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-center text-text-primary">
            Benefits of Online Consultation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏠',
                title: 'From Home',
                description: 'Consult from anywhere, no travel required',
              },
              {
                icon: '⏰',
                title: 'Flexible Timing',
                description: 'Book slots that fit your schedule',
              },
              {
                icon: '💾',
                title: 'Digital Records',
                description: 'All prescriptions saved in your account',
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

