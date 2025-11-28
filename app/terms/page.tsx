'use client'

import { Navbar, Footer } from '@/components'
import { Card } from '@/components/ui'
import { FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using EyeWear India\'s website and services, you accept and agree to be bound by these Terms of Service.',
        'If you do not agree to these terms, please do not use our services.',
        'We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.',
      ],
    },
    {
      title: 'Use of Services',
      content: [
        'Our services are intended for users aged 18 and above. Users under 18 must have parental consent.',
        'You agree to provide accurate, current, and complete information when creating an account or booking services.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our website.',
      ],
    },
    {
      title: 'Medical Services',
      content: [
        'EyeWear India connects you with certified eye care professionals. We do not provide medical advice directly.',
        'Consultations are provided by licensed doctors. We are not responsible for medical decisions made by doctors.',
        'Prescriptions are issued by qualified medical professionals based on their clinical judgment.',
        'In case of medical emergencies, please contact emergency services immediately. Do not rely solely on online consultations.',
      ],
    },
    {
      title: 'Product Orders',
      content: [
        'All product descriptions, images, and prices are subject to change without notice.',
        'We reserve the right to refuse or cancel orders for any reason, including product unavailability or pricing errors.',
        'Prescription lenses are custom-made based on your prescription. Returns are limited to manufacturing defects only.',
        'Delivery times are estimates and not guaranteed. We are not liable for delays due to circumstances beyond our control.',
      ],
    },
    {
      title: 'Payment Terms',
      content: [
        'All prices are in Indian Rupees (INR) unless otherwise stated.',
        'Payment must be made at the time of order placement, except for Cash on Delivery orders.',
        'We accept major credit/debit cards, UPI, net banking, and cash on delivery (subject to limits).',
        'Refunds will be processed to the original payment method within 5-7 business days after approval.',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        'All content on this website, including text, graphics, logos, and software, is the property of EyeWear India.',
        'You may not reproduce, distribute, or create derivative works without our written permission.',
        'Trademarks and service marks displayed on the site are the property of their respective owners.',
      ],
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <Scale className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Terms of Service
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Last updated: January 2024. Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-12 p-8 bg-brand-primary/5 border-brand-primary/20">
          <p className="text-base text-text-secondary font-medium leading-relaxed">
            These Terms of Service ("Terms") govern your access to and use of EyeWear India's website, 
            mobile application, and services. By using our services, you agree to comply with and be bound 
            by these Terms. If you disagree with any part of these terms, you may not access our services.
          </p>
        </Card>

        {/* Terms Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => (
            <Card key={index} className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-brand-primary" />
                <h2 className="text-2xl font-bold text-text-primary">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-brand-primary mt-1 flex-shrink-0" />
                    <span className="font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Limitation of Liability */}
        <Card className="mb-12 p-8">
          <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-warning" />
            Limitation of Liability
          </h2>
          <div className="space-y-3 text-sm text-text-secondary">
            <p className="font-medium leading-relaxed">
              EyeWear India shall not be liable for any indirect, incidental, special, consequential, or punitive 
              damages resulting from your use of or inability to use our services.
            </p>
            <p className="font-medium leading-relaxed">
              Our total liability for any claims arising from your use of our services shall not exceed the amount 
              you paid to us in the 12 months preceding the claim.
            </p>
            <p className="font-medium leading-relaxed">
              We are not responsible for any loss or damage resulting from unauthorized access to your account or 
              data transmission errors.
            </p>
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
          <h3 className="text-xl font-bold mb-3 text-text-primary">Questions About Terms?</h3>
          <p className="text-base text-text-secondary mb-4 font-medium">
            If you have questions about these Terms of Service, please contact us:
          </p>
          <div className="space-y-2 text-sm text-text-secondary">
            <p className="font-medium">Email: legal@eyewearindia.com</p>
            <p className="font-medium">Phone: 1800-123-456</p>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

