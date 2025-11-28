'use client'

import { Navbar, Footer } from '@/components'
import { Card } from '@/components/ui'
import { XCircle, Clock, CheckCircle, AlertCircle, Ban } from 'lucide-react'
import Link from 'next/link'

export default function CancellationPage() {
  const cancellationRules = [
    {
      type: 'Product Orders',
      timeLimit: 'Within 24 hours',
      conditions: [
        'Order not yet shipped',
        'Full refund processed',
        'No cancellation charges',
      ],
      icon: CheckCircle,
      color: 'success',
    },
    {
      type: 'Prescription Lenses',
      timeLimit: 'Before manufacturing starts',
      conditions: [
        'Cancellation within 12 hours of order',
        'Full refund if not in production',
        'Partial refund if production started',
      ],
      icon: AlertCircle,
      color: 'warning',
    },
    {
      type: 'Appointments',
      timeLimit: '24 hours before',
      conditions: [
        'Free cancellation before 24 hours',
        '50% refund if cancelled 12-24 hours before',
        'No refund if cancelled less than 12 hours before',
      ],
      icon: Clock,
      color: 'brand-primary',
    },
  ]

  const cancellationSteps = [
    {
      step: 1,
      title: 'Go to Orders',
      description: 'Log into your account and navigate to the "Orders" section.',
    },
    {
      step: 2,
      title: 'Select Order',
      description: 'Find the order you want to cancel and click on it.',
    },
    {
      step: 3,
      title: 'Click Cancel',
      description: 'Click the "Cancel Order" button and select your reason.',
    },
    {
      step: 4,
      title: 'Confirmation',
      description: 'You\'ll receive confirmation via email and SMS. Refund processed automatically.',
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <Ban className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Cancellation Policy
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Understand our cancellation policy and how to cancel your orders or appointments.
          </p>
        </div>

        {/* Cancellation Rules */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-text-primary text-center">
            Cancellation Rules
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cancellationRules.map((rule, index) => {
              const Icon = rule.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`w-6 h-6 ${
                      rule.color === 'success' ? 'text-success' : 
                      rule.color === 'warning' ? 'text-warning' : 
                      'text-brand-primary'
                    }`} />
                    <h3 className="text-xl font-bold text-text-primary">{rule.type}</h3>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-brand-primary mb-2">Time Limit: {rule.timeLimit}</p>
                  </div>
                  <ul className="space-y-2">
                    {rule.conditions.map((condition, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className={`mt-1 ${
                          rule.color === 'success' ? 'text-success' : 
                          rule.color === 'warning' ? 'text-warning' : 
                          'text-brand-primary'
                        }`}>•</span>
                        <span className="font-medium">{condition}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </section>

        {/* How to Cancel */}
        <section className="mb-12">
          <Card className="p-8 bg-brand-primary/5 border-brand-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">How to Cancel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cancellationSteps.map((step) => (
                <div key={step.step} className="text-center">
                  <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-text-inverse font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-text-primary">{step.title}</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Important Information */}
        <section className="mb-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-warning" />
              Important Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-error mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Cannot Cancel After Shipping</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Once your order is shipped, you cannot cancel it. However, you can return it using our 14-day return policy.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Refund Processing</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Refunds for cancelled orders are processed within 3-5 business days to your original payment method.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Instant Cancellation</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Orders cancelled within the time limit are processed immediately. You'll receive confirmation via email and SMS.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Prescription Lenses</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Custom prescription lenses can only be cancelled before manufacturing begins. Once production starts, cancellation may result in partial refund.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Cancellation Charges */}
        <section className="mb-12">
          <Card className="p-8 bg-brand-primary/5 border-brand-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Cancellation Charges</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                <div>
                  <h4 className="font-semibold text-text-primary">Within 24 hours (Product Orders)</h4>
                  <p className="text-sm text-text-secondary font-medium">No cancellation charges</p>
                </div>
                <span className="text-lg font-bold text-success">Free</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                <div>
                  <h4 className="font-semibold text-text-primary">Appointment (24+ hours before)</h4>
                  <p className="text-sm text-text-secondary font-medium">Full refund</p>
                </div>
                <span className="text-lg font-bold text-success">Free</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                <div>
                  <h4 className="font-semibold text-text-primary">Appointment (12-24 hours before)</h4>
                  <p className="text-sm text-text-secondary font-medium">50% refund</p>
                </div>
                <span className="text-lg font-bold text-warning">50%</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-bg-secondary rounded-lg">
                <div>
                  <h4 className="font-semibold text-text-primary">Appointment (Less than 12 hours)</h4>
                  <p className="text-sm text-text-secondary font-medium">No refund</p>
                </div>
                <span className="text-lg font-bold text-error">No Refund</span>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20 text-center">
          <h3 className="text-2xl font-bold mb-3 text-text-primary">Need Help with Cancellation?</h3>
          <p className="text-base text-text-secondary mb-6 font-medium">
            Contact our support team for assistance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-6 py-3 bg-brand-primary text-text-inverse rounded-lg font-semibold hover:bg-brand-primary-hover transition-colors">
                Contact Support
              </button>
            </Link>
            <Link href="/profile">
              <button className="px-6 py-3 bg-bg-secondary border border-border-primary text-text-primary rounded-lg font-semibold hover:bg-bg-tertiary transition-colors">
                View My Orders
              </button>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

