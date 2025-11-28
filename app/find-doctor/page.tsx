'use client'

import { useState } from 'react'
import { Navbar, Footer } from '@/components'
import { Button, Card, Input, Select } from '@/components/ui'
import { MapPin, Star, Phone, Mail, Clock, Award, Stethoscope } from 'lucide-react'

export default function FindDoctorPage() {
  const [searchParams, setSearchParams] = useState({
    city: '',
    state: '',
    specialty: '',
  })

  // Sample doctor data (replace with API call)
  const doctors = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialty: 'Ophthalmologist',
      qualification: 'MBBS, MS (Ophthalmology)',
      experience: 15,
      clinicName: 'Vision Care Clinic',
      location: 'Delhi',
      address: '123 Main Street, Connaught Place',
      phone: '+91-9876543210',
      email: 'dr.rajesh@example.com',
      consultationFee: 500,
      rating: 4.5,
      reviewCount: 120,
      availableToday: true,
      onlineConsultation: true,
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Optometrist',
      qualification: 'B.Optom, M.Optom',
      experience: 10,
      clinicName: 'Eye Health Center',
      location: 'Mumbai',
      address: '456 Marine Drive, Andheri',
      phone: '+91-9876543211',
      email: 'dr.priya@example.com',
      consultationFee: 400,
      rating: 4.7,
      reviewCount: 89,
      availableToday: false,
      onlineConsultation: true,
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      specialty: 'Ophthalmologist',
      qualification: 'MBBS, MS, DNB',
      experience: 20,
      clinicName: 'Advanced Eye Care',
      location: 'Bangalore',
      address: '789 MG Road, Koramangala',
      phone: '+91-9876543212',
      email: 'dr.amit@example.com',
      consultationFee: 600,
      rating: 4.8,
      reviewCount: 234,
      availableToday: true,
      onlineConsultation: false,
    },
  ]

  const handleSearch = () => {
    // TODO: Implement search functionality
    console.log('Searching doctors with:', searchParams)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-block mb-6">
            <Stethoscope className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Find an Eye Doctor Near You
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Connect with certified eye care professionals in your area. Book appointments, get prescriptions, and receive expert medical advice.
          </p>
        </section>

        {/* Search Section */}
        <Card className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="City or Pincode"
              value={searchParams.city}
              onChange={(e) => setSearchParams({ ...searchParams, city: e.target.value })}
            />
            <Input
              placeholder="State"
              value={searchParams.state}
              onChange={(e) => setSearchParams({ ...searchParams, state: e.target.value })}
            />
            <Select
              options={[
                { value: '', label: 'All Specialties' },
                { value: 'ophthalmologist', label: 'Ophthalmologist' },
                { value: 'optometrist', label: 'Optometrist' },
                { value: 'optician', label: 'Optician' },
              ]}
              value={searchParams.specialty}
              onChange={(e) => setSearchParams({ ...searchParams, specialty: e.target.value })}
            />
            <Button variant="primary" onClick={handleSearch} fullWidth>
              Search
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { label: 'Available Today', type: 'availability' },
              { label: 'Online Consultation', type: 'mode' },
              { label: 'In-Clinic', type: 'mode' },
              { label: 'Top Rated', type: 'rating' },
            ].map((filter) => (
              <button
                key={filter.label}
                className="px-3 py-1 bg-bg-tertiary hover:bg-brand-primary/10 border border-border-primary hover:border-brand-primary rounded-lg text-sm transition-colors text-text-secondary hover:text-brand-primary font-medium"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </Card>

        {/* Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <div className="aspect-square bg-bg-tertiary rounded-lg flex items-center justify-center">
                <div className="text-center text-text-tertiary">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Google Maps Integration</p>
                  <p className="text-xs mt-2">(To be implemented)</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Doctor List */}
          <div className="lg:col-span-2 space-y-4">
            {doctors.map((doctor) => (
              <Card key={doctor.id} hover>
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-brand-primary/15 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                    👨‍⚕️
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold font-heading mb-1.5 text-text-primary">{doctor.name}</h3>
                        <p className="text-sm text-text-secondary mb-1.5 font-medium">
                          {doctor.specialty} • {doctor.qualification}
                        </p>
                        <p className="text-sm text-text-secondary font-medium">
                          {doctor.experience} years of experience
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 fill-brand-secondary text-brand-secondary" />
                          <span className="font-semibold">{doctor.rating}</span>
                          <span className="text-text-tertiary text-sm">({doctor.reviewCount})</span>
                        </div>
                        <p className="text-sm text-text-secondary">₹{doctor.consultationFee}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                        <Award className="w-4 h-4" />
                        <span className="font-semibold">{doctor.clinicName}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-text-secondary font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>{doctor.address}, {doctor.location}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {doctor.availableToday && (
                        <span className="px-2 py-1 bg-success-bg text-success rounded text-xs">
                          Available Today
                        </span>
                      )}
                      {doctor.onlineConsultation && (
                        <span className="px-2 py-1 bg-info-bg text-info rounded text-xs">
                          Online Consultation
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="primary" size="small">
                        Book Appointment
                      </Button>
                      <Button variant="secondary" size="small">
                        View Profile
                      </Button>
                      <Button variant="icon" size="small">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

