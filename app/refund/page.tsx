'use client'

import { Navbar, Footer } from '@/components'
import { Card } from '@/components/ui'
import { DollarSign, CheckCircle, Clock, AlertCircle, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function RefundPage() {
  const refundScenarios = [
    {
      scenario: 'Product Return',
      timeline: '5-7 business days',
      method: 'Original payment method',
      icon: CheckCircle,
      color: 'success',
    },
    {
      scenario: 'Cancelled Order',
      timeline: '3-5 business days',
      method: 'Original payment method',
      icon: Clock,
      color: 'brand-primary',
    },
    {
      scenario: 'Manufacturing Defect',
      timeline: '7-10 business days',
      method: 'Original payment method or replacement',
      icon: AlertCircle,
      color: 'warning',
    },
    {
      scenario: 'Prescription Error',
      timeline: '5-7 business days',
      method: 'Original payment method or free replacement',
      icon: CheckCircle,
      color: 'success',
    },
  ]

  const refundMethods = [
    {
      method: 'Credit/Debit Card',
      timeline: '5-7 business days',
      description: 'Refunded to the original card used for payment',
      icon: CreditCard,
    },
    {
      method: 'UPI',
      timeline: '2-3 business days',
      description: 'Refunded to the UPI ID used for payment',
      icon: '📱',
    },
    {
      method: 'Net Banking',
      timeline: '5-7 business days',
      description: 'Refunded to the bank account used for payment',
      icon: '🏦',
    },
    {
      method: 'Cash on Delivery',
      timeline: '7-10 business days',
      description: 'Refunded via bank transfer to your registered account',
      icon: '💵',
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <DollarSign className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Refund Policy
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Our transparent refund policy ensures you get your money back quickly and hassle-free.
          </p>
        </div>

        {/* Refund Summary */}
        <Card className="mb-12 p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-primary mb-2">14 Days</div>
              <p className="text-sm text-text-secondary font-medium">Return Window</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-primary mb-2">5-7 Days</div>
              <p className="text-sm text-text-secondary font-medium">Average Refund Time</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-primary mb-2">100%</div>
              <p className="text-sm text-text-secondary font-medium">Full Refund Guarantee</p>
            </div>
          </div>
        </Card>

        {/* Refund Scenarios */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-text-primary text-center">
            Refund Scenarios
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {refundScenarios.map((item, index) => {
              const Icon = item.icon
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Icon className={`w-6 h-6 ${
                      item.color === 'success' ? 'text-success' : 
                      item.color === 'warning' ? 'text-warning' : 
                      'text-brand-primary'
                    }`} />
                    <h3 className="text-xl font-bold text-text-primary">{item.scenario}</h3>
                  </div>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-primary" />
                      <span className="font-medium">Timeline: {item.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-brand-primary" />
                      <span className="font-medium">Method: {item.method}</span>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Refund Methods */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-text-primary text-center">
            Refund Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {refundMethods.map((method, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="text-4xl mb-4">{typeof method.icon === 'string' ? method.icon : <method.icon className="w-12 h-12 text-brand-primary mx-auto" />}</div>
                <h3 className="text-lg font-bold mb-2 text-text-primary">{method.method}</h3>
                <p className="text-sm font-semibold text-brand-primary mb-2">{method.timeline}</p>
                <p className="text-xs text-text-secondary font-medium">{method.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Refund Process */}
        <section className="mb-12">
          <Card className="p-8 bg-brand-primary/5 border-brand-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Refund Process</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-text-inverse font-bold text-sm flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Request Refund</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Initiate a return through your account or contact our support team. Provide order details and reason for return.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-text-inverse font-bold text-sm flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Product Verification</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    We'll arrange free pickup and verify the product condition. Refund is processed only after verification.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-text-inverse font-bold text-sm flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Refund Processing</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Once approved, refund is initiated to your original payment method. Processing time varies by payment method.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-text-inverse font-bold text-sm flex-shrink-0">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Refund Completion</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    You'll receive confirmation via email and SMS once the refund is completed. Check your account or bank statement.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Important Notes */}
        <Card className="mb-12 p-8">
          <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-warning" />
            Important Notes
          </h2>
          <div className="space-y-3 text-sm text-text-secondary">
            <p className="font-medium leading-relaxed">
              • Refunds are processed only for eligible returns. Prescription lenses cannot be returned unless there's a manufacturing defect.
            </p>
            <p className="font-medium leading-relaxed">
              • Original shipping charges are refunded only if the product is defective or incorrect.
            </p>
            <p className="font-medium leading-relaxed">
              • Return shipping charges (if any) are deducted from the refund amount.
            </p>
            <p className="font-medium leading-relaxed">
              • For Cash on Delivery orders, refunds are processed via bank transfer to your registered account.
            </p>
            <p className="font-medium leading-relaxed">
              • If you paid using a credit card, the refund may take an additional 2-3 business days to reflect in your statement.
            </p>
          </div>
        </Card>

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20 text-center">
          <h3 className="text-2xl font-bold mb-3 text-text-primary">Need Help with Refunds?</h3>
          <p className="text-base text-text-secondary mb-6 font-medium">
            Our support team is here to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-6 py-3 bg-brand-primary text-text-inverse rounded-lg font-semibold hover:bg-brand-primary-hover transition-colors">
                Contact Support
              </button>
            </Link>
            <Link href="/returns">
              <button className="px-6 py-3 bg-bg-secondary border border-border-primary text-text-primary rounded-lg font-semibold hover:bg-bg-tertiary transition-colors">
                View Return Policy
              </button>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

