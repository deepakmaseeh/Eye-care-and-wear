'use client'

import { useState } from 'react'
import { Navbar, Footer } from '@/components'
import { Card, Button, Input } from '@/components/ui'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement form submission
    alert('Thank you for contacting us! We will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['1800-123-456', '+91-9876543210'],
      description: 'Call us for immediate assistance',
      color: 'brand-primary',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['support@eyewearindia.com', 'info@eyewearindia.com'],
      description: 'Send us an email anytime',
      color: 'brand-primary',
    },
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['123 Eye Care Street', 'Connaught Place, New Delhi - 110001'],
      description: 'Visit us at our headquarters',
      color: 'brand-secondary',
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Sat: 9:00 AM - 8:00 PM', 'Sunday: 10:00 AM - 6:00 PM'],
      description: 'We\'re here to help',
      color: 'brand-secondary',
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <MessageCircle className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Contact Us
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Have a question? We're here to help. Reach out to us through any of the methods below.
          </p>
        </div>

        {/* Contact Methods */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <Card key={index} className="p-6 text-center">
                  <div className={`w-16 h-16 ${method.color === 'brand-primary' ? 'bg-brand-primary/15' : 'bg-brand-secondary/15'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className={`w-8 h-8 ${method.color === 'brand-primary' ? 'text-brand-primary' : 'text-brand-secondary'}`} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-text-primary">{method.title}</h3>
                  <div className="space-y-1 mb-3">
                    {method.details.map((detail, i) => (
                      <p key={i} className="text-sm text-text-secondary font-medium">{detail}</p>
                    ))}
                  </div>
                  <p className="text-xs text-text-tertiary font-medium">{method.description}</p>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 text-text-primary">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Name</label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Email</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Phone</label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91-9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Subject</label>
                  <Input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="What is this regarding?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-text-secondary">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="w-full bg-bg-tertiary border border-border-primary rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-primary focus:bg-bg-hover focus:ring-2 focus:ring-brand-primary/10 transition-all duration-250 min-h-[120px] resize-none"
                    required
                  />
                </div>
                <Button type="submit" variant="primary" size="large" fullWidth>
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Card>

            <div className="space-y-6">
              <Card className="p-8 bg-brand-primary/5 border-brand-primary/20">
                <h3 className="text-xl font-bold mb-4 text-text-primary">Why Contact Us?</h3>
                <ul className="space-y-3 text-sm text-text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1">•</span>
                    <span className="font-medium">Questions about our eye care services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1">•</span>
                    <span className="font-medium">Help with booking appointments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1">•</span>
                    <span className="font-medium">Product inquiries and recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1">•</span>
                    <span className="font-medium">Shipping and delivery questions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1">•</span>
                    <span className="font-medium">Returns, refunds, and warranty claims</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-brand-primary mt-1">•</span>
                    <span className="font-medium">Technical support and account issues</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-8">
                <h3 className="text-xl font-bold mb-4 text-text-primary">Response Time</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-text-primary mb-1">Email Support</p>
                    <p className="text-sm text-text-secondary font-medium">Within 24 hours</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary mb-1">Phone Support</p>
                    <p className="text-sm text-text-secondary font-medium">Immediate (during business hours)</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text-primary mb-1">Live Chat</p>
                    <p className="text-sm text-text-secondary font-medium">Available 24/7</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

