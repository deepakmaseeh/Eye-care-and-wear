'use client'

import { Navbar, Footer } from '@/components'
import { Card } from '@/components/ui'
import { RotateCcw, CheckCircle, XCircle, Clock, Package, AlertCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Log into your account and go to "Orders" section. Select the order you want to return and click "Return".',
      icon: Package,
    },
    {
      step: 2,
      title: 'Select Reason',
      description: 'Choose the reason for return from the dropdown menu. This helps us improve our service.',
      icon: AlertCircle,
    },
    {
      step: 3,
      title: 'Schedule Pickup',
      description: 'We\'ll arrange a free pickup from your address. You\'ll receive a confirmation with pickup date and time.',
      icon: Clock,
    },
    {
      step: 4,
      title: 'Get Refund',
      description: 'Once we receive and verify the product, your refund will be processed within 5-7 business days.',
      icon: CheckCircle,
    },
  ]

  const returnConditions = [
    {
      title: 'Eligible for Return',
      items: [
        'Product in original condition with all tags',
        'Original packaging and case included',
        'Returned within 14 days of delivery',
        'Non-prescription frames and sunglasses',
      ],
      icon: CheckCircle,
      color: 'success',
    },
    {
      title: 'Not Eligible for Return',
      items: [
        'Prescription lenses (unless manufacturing defect)',
        'Damaged or used products',
        'Products without original packaging',
        'Returns after 14 days',
        'Customized or engraved products',
      ],
      icon: XCircle,
      color: 'error',
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <RotateCcw className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Returns & Exchanges
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Easy returns within 14 days. We make the return process simple and hassle-free.
          </p>
        </div>

        {/* Return Policy Summary */}
        <Card className="mb-12 p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-primary mb-2">14 Days</div>
              <p className="text-sm text-text-secondary font-medium">Return Window</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-primary mb-2">Free</div>
              <p className="text-sm text-text-secondary font-medium">Pickup Service</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-primary mb-2">5-7 Days</div>
              <p className="text-sm text-text-secondary font-medium">Refund Processing</p>
            </div>
          </div>
        </Card>

        {/* Return Process */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-text-primary text-center">
            How to Return
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step) => {
              const Icon = step.icon
              return (
                <Card key={step.step} className="p-6 text-center relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-brand-primary text-text-inverse rounded-full flex items-center justify-center font-bold text-sm">
                    {step.step}
                  </div>
                  <div className="w-16 h-16 bg-brand-primary/15 rounded-full flex items-center justify-center mx-auto mb-4 mt-4">
                    <Icon className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-text-primary">{step.title}</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">{step.description}</p>
                  {step.step < 4 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 text-brand-primary" />
                  )}
                </Card>
              )
            })}
          </div>
        </section>

        {/* Return Conditions */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-text-primary text-center">
            Return Conditions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {returnConditions.map((condition, index) => {
              const Icon = condition.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`w-6 h-6 ${
                      condition.color === 'success' ? 'text-success' : 'text-error'
                    }`} />
                    <h3 className="text-xl font-bold text-text-primary">{condition.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {condition.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className={`mt-1 ${
                          condition.color === 'success' ? 'text-success' : 'text-error'
                        }`}>•</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Exchange Policy */}
        <section className="mb-12">
          <Card className="p-8 bg-brand-primary/5 border-brand-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-3">
              <Package className="w-6 h-6 text-brand-primary" />
              Exchange Policy
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Size Exchange</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    If the frame size doesn't fit, you can exchange it for a different size within 14 days. Size exchanges are free of charge.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Style Exchange</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    You can exchange for a different style if the product is unused and in original condition. Price difference will be adjusted.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Exchange Process</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Follow the same return process and mention "Exchange" as the reason. We'll ship the replacement once we receive your return.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Refund Information */}
        <section className="mb-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Refund Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-text-primary mb-3">Refund Methods</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span className="font-medium">Original payment method (5-7 business days)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span className="font-medium">Store credit (instant)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span className="font-medium">Bank transfer (7-10 business days)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-3">What Gets Refunded?</h3>
                <ul className="space-y-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span className="font-medium">Full product price</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-brand-primary" />
                    <span className="font-medium">Original shipping charges (if applicable)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <XCircle className="w-4 h-4 text-error" />
                    <span className="font-medium">Return shipping charges (if any)</span>
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20 text-center">
          <h3 className="text-2xl font-bold mb-3 text-text-primary">Need Help with Returns?</h3>
          <p className="text-base text-text-secondary mb-6 font-medium">
            Our support team is here to assist you
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

