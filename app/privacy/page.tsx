'use client'

import { Navbar, Footer } from '@/components'
import { Card } from '@/components/ui'
import { Shield, Lock, Eye, FileText, AlertCircle } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: FileText,
      content: [
        'Personal Information: Name, email address, phone number, date of birth, and address when you create an account or book appointments.',
        'Health Information: Eye prescriptions, medical history, and consultation records that you provide or are generated during consultations.',
        'Payment Information: Credit/debit card details, billing address, and transaction history (processed through secure payment gateways).',
        'Usage Data: Information about how you interact with our website, including pages visited, time spent, and device information.',
        'Cookies: We use cookies to enhance your experience, analyze site traffic, and personalize content.',
      ],
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        'To provide eye care services, book appointments, and connect you with certified doctors.',
        'To process orders, deliver products, and manage your prescriptions.',
        'To send appointment reminders, order updates, and important health-related communications.',
        'To improve our services, website functionality, and user experience.',
        'To comply with legal obligations and protect our rights and safety.',
      ],
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        'We implement industry-standard security measures including SSL encryption, secure servers, and regular security audits.',
        'Your health information is encrypted and stored securely, accessible only to authorized medical professionals.',
        'Payment information is processed through PCI-DSS compliant payment gateways. We do not store complete card details.',
        'We regularly update our security protocols to protect against unauthorized access, data breaches, and cyber threats.',
        'Access to personal data is restricted to authorized personnel only, on a need-to-know basis.',
      ],
    },
    {
      title: 'Data Sharing',
      icon: Shield,
      content: [
        'We share your information with certified doctors and medical professionals to provide eye care services.',
        'We may share data with service providers (payment processors, shipping partners) necessary for order fulfillment.',
        'We do not sell your personal information to third parties for marketing purposes.',
        'We may disclose information if required by law, court order, or to protect our rights and safety.',
        'Aggregated, anonymized data may be used for research and analytics purposes.',
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
            <Shield className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Last updated: January 2024. We are committed to protecting your privacy and personal information.
          </p>
        </div>

        {/* Introduction */}
        <Card className="mb-12 p-8 bg-brand-primary/5 border-brand-primary/20">
          <p className="text-base text-text-secondary font-medium leading-relaxed mb-4">
            At EyeWear India, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our website and services. Please read 
            this policy carefully to understand our practices regarding your personal data.
          </p>
          <p className="text-base text-text-secondary font-medium leading-relaxed">
            By using our services, you agree to the collection and use of information in accordance with this 
            policy. If you do not agree with our policies and practices, please do not use our services.
          </p>
        </Card>

        {/* Policy Sections */}
        <div className="space-y-8 mb-12">
          {sections.map((section, index) => {
            const Icon = section.icon
            return (
              <Card key={index} className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-6 h-6 text-brand-primary" />
                  <h2 className="text-2xl font-bold text-text-primary">{section.title}</h2>
                </div>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <span className="text-brand-primary mt-1 flex-shrink-0">•</span>
                      <span className="font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )
          })}
        </div>

        {/* Your Rights */}
        <Card className="mb-12 p-8">
          <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-brand-primary" />
            Your Rights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Access</h3>
                <p className="text-sm text-text-secondary font-medium">
                  You have the right to access and review your personal information stored with us.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Correction</h3>
                <p className="text-sm text-text-secondary font-medium">
                  You can update or correct your personal information at any time through your account settings.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Deletion</h3>
                <p className="text-sm text-text-secondary font-medium">
                  You can request deletion of your account and personal data, subject to legal and medical record retention requirements.
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Data Portability</h3>
                <p className="text-sm text-text-secondary font-medium">
                  You can request a copy of your data in a machine-readable format.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Opt-Out</h3>
                <p className="text-sm text-text-secondary font-medium">
                  You can opt-out of marketing communications while still receiving essential service-related messages.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Complaints</h3>
                <p className="text-sm text-text-secondary font-medium">
                  You have the right to file a complaint with relevant data protection authorities.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact */}
        <Card className="p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
          <h3 className="text-xl font-bold mb-3 text-text-primary">Questions About Privacy?</h3>
          <p className="text-base text-text-secondary mb-4 font-medium">
            If you have any questions about this Privacy Policy or our data practices, please contact us:
          </p>
          <div className="space-y-2 text-sm text-text-secondary">
            <p className="font-medium">Email: privacy@eyewearindia.com</p>
            <p className="font-medium">Phone: 1800-123-456</p>
            <p className="font-medium">Address: 123 Eye Care Street, Connaught Place, New Delhi - 110001</p>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

