'use client'

import { Navbar, Footer } from '@/components'
import { Card } from '@/components/ui'
import { Heart, Eye, Users, Award, Target, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  const values = [
    {
      icon: Eye,
      title: 'Vision First',
      description: 'We prioritize your eye health above everything. Every decision we make is centered around providing the best care for your vision.',
      color: 'brand-primary',
    },
    {
      icon: Heart,
      title: 'Patient Care',
      description: 'Your comfort and satisfaction are our top priorities. We go the extra mile to ensure you have the best experience.',
      color: 'brand-primary',
    },
    {
      icon: Shield,
      title: 'Trust & Quality',
      description: 'We partner only with certified doctors and trusted manufacturers to ensure the highest quality products and services.',
      color: 'brand-primary',
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate to bring you the latest in eye care technology and eyewear solutions.',
      color: 'brand-secondary',
    },
  ]

  const stats = [
    { number: '500+', label: 'Certified Doctors', icon: Users },
    { number: '50K+', label: 'Eye Checkups', icon: Eye },
    { number: '2000+', label: 'Premium Frames', icon: Award },
    { number: '4.8★', label: 'Average Rating', icon: Heart },
  ]

  const milestones = [
    {
      year: '2020',
      title: 'Founded',
      description: 'EyeWear India was founded with a vision to make quality eye care accessible to everyone.',
    },
    {
      year: '2021',
      title: 'Online Platform Launch',
      description: 'Launched our digital platform connecting patients with certified eye doctors across India.',
    },
    {
      year: '2022',
      title: '100+ Doctors',
      description: 'Reached a milestone of 100+ certified eye care professionals on our platform.',
    },
    {
      year: '2023',
      title: 'National Expansion',
      description: 'Expanded services to all major cities in India with same-day delivery options.',
    },
    {
      year: '2024',
      title: '500+ Doctors',
      description: 'Grew to 500+ doctors and completed 50,000+ eye checkups, becoming India\'s leading online eye care platform.',
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            About EyeWear India
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto font-medium leading-relaxed">
            India's leading online eye care platform. We connect you with certified eye doctors, 
            provide comprehensive eye care services, and help you find the perfect eyewear.
          </p>
        </div>

        {/* Mission & Vision */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 bg-gradient-to-br from-brand-primary/5 to-brand-primary/10 border-brand-primary/20">
              <Target className="w-12 h-12 text-brand-primary mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-text-primary">Our Mission</h2>
              <p className="text-base text-text-secondary font-medium leading-relaxed">
                To make quality eye care accessible, affordable, and convenient for everyone in India. 
                We believe that good vision is a fundamental right, and we're committed to providing 
                the best eye care services and eyewear solutions.
              </p>
            </Card>
            <Card className="p-8 bg-gradient-to-br from-brand-secondary/5 to-brand-secondary/10 border-brand-secondary/20">
              <Eye className="w-12 h-12 text-brand-secondary mb-4" />
              <h2 className="text-2xl font-bold mb-4 text-text-primary">Our Vision</h2>
              <p className="text-base text-text-secondary font-medium leading-relaxed">
                To become India's most trusted eye care platform, where millions of people can 
                easily access certified eye doctors, get accurate prescriptions, and find the 
                perfect eyewear that combines style, comfort, and medical precision.
              </p>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="p-6 text-center">
                  <div className="w-16 h-16 bg-brand-primary/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-brand-primary" />
                  </div>
                  <div className="text-3xl font-bold text-brand-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-text-secondary font-medium">{stat.label}</div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-text-primary text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${value.color === 'brand-primary' ? 'bg-brand-primary/15' : 'bg-brand-secondary/15'} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${value.color === 'brand-primary' ? 'text-brand-primary' : 'text-brand-secondary'}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-text-primary">{value.title}</h3>
                      <p className="text-sm text-text-secondary font-medium leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Our Story</h2>
            <p className="text-base text-text-secondary font-medium leading-relaxed mb-6">
              EyeWear India was born from a simple observation: accessing quality eye care in India 
              was often inconvenient, expensive, and time-consuming. Many people delayed getting their 
              eyes checked, leading to preventable vision problems.
            </p>
            <p className="text-base text-text-secondary font-medium leading-relaxed mb-6">
              We set out to change this by creating a platform that seamlessly connects patients with 
              certified eye doctors, makes prescriptions easily accessible, and helps people find the 
              perfect eyewear. Today, we're proud to be India's leading online eye care platform, 
              having helped thousands of people improve their vision and eye health.
            </p>
            <p className="text-base text-text-secondary font-medium leading-relaxed">
              Our journey continues as we expand our network of doctors, improve our technology, 
              and work towards making quality eye care accessible to every corner of India.
            </p>
          </Card>
        </section>

        {/* Milestones */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-text-primary text-center">
            Our Journey
          </h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-brand-primary/15 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-lg font-bold text-brand-primary">{milestone.year}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 text-text-primary">{milestone.title}</h3>
                    <p className="text-sm text-text-secondary font-medium leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20 text-center">
          <h3 className="text-2xl font-bold mb-3 text-text-primary">Join Us on Our Mission</h3>
          <p className="text-base text-text-secondary mb-6 font-medium">
            Experience the future of eye care. Book your checkup today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/eye-checkup">
              <button className="px-6 py-3 bg-brand-primary text-text-inverse rounded-lg font-semibold hover:bg-brand-primary-hover transition-colors">
                Book Eye Checkup
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-6 py-3 bg-bg-secondary border border-border-primary text-text-primary rounded-lg font-semibold hover:bg-bg-tertiary transition-colors">
                Contact Us
              </button>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

