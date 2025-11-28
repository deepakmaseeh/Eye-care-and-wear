'use client'

import { Navbar, Footer } from '@/components'
import { Card } from '@/components/ui'
import { Shield, CheckCircle, Clock, AlertTriangle, FileText, Award } from 'lucide-react'
import Link from 'next/link'

export default function WarrantyPage() {
  const warrantyTypes = [
    {
      type: 'Frame Warranty',
      duration: '1 Year',
      coverage: [
        'Manufacturing defects',
        'Frame breakage due to material issues',
        'Hinge and temple problems',
        'Coating defects',
      ],
      notCovered: [
        'Normal wear and tear',
        'Accidental damage',
        'Damage from misuse',
        'Scratches from normal use',
      ],
      icon: '👓',
    },
    {
      type: 'Lens Warranty',
      duration: '6 Months',
      coverage: [
        'Manufacturing defects',
        'Lens coating issues',
        'Prescription errors (if verified)',
        'Scratches within 30 days',
      ],
      notCovered: [
        'Scratches after 30 days',
        'Damage from drops or impacts',
        'Damage from chemicals',
        'Prescription changes',
      ],
      icon: '🔍',
    },
    {
      type: 'Extended Warranty',
      duration: '2-3 Years',
      coverage: [
        'All standard warranty coverage',
        'Accidental damage protection',
        'Free repairs and replacements',
        'Priority customer support',
      ],
      notCovered: [
        'Loss or theft',
        'Intentional damage',
        'Unauthorized modifications',
      ],
      icon: '⭐',
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
            Warranty Information
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Comprehensive warranty coverage for your eyewear. We stand behind the quality of our products.
          </p>
        </div>

        {/* Warranty Types */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {warrantyTypes.map((warranty, index) => (
              <Card key={index} className="p-6">
                <div className="text-4xl mb-4 text-center">{warranty.icon}</div>
                <h2 className="text-xl font-bold mb-2 text-text-primary text-center">{warranty.type}</h2>
                <div className="text-center mb-4">
                  <span className="inline-block px-3 py-1 bg-brand-primary/15 text-brand-primary rounded-full text-sm font-semibold">
                    {warranty.duration}
                  </span>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-success mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Covered
                  </h3>
                  <ul className="space-y-1.5 text-xs text-text-secondary">
                    {warranty.coverage.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-success mt-1">✓</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border-primary pt-4">
                  <h3 className="text-sm font-semibold text-error mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Not Covered
                  </h3>
                  <ul className="space-y-1.5 text-xs text-text-secondary">
                    {warranty.notCovered.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-error mt-1">✗</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Warranty Claim Process */}
        <section className="mb-12">
          <Card className="p-8 bg-brand-primary/5 border-brand-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-3">
              <FileText className="w-6 h-6 text-brand-primary" />
              How to Claim Warranty
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-text-inverse font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Contact Support</h4>
                    <p className="text-sm text-text-secondary font-medium">
                      Reach out to our support team via email, phone, or through your account dashboard.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-text-inverse font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Provide Details</h4>
                    <p className="text-sm text-text-secondary font-medium">
                      Share your order number, product details, and photos of the issue. Our team will verify warranty eligibility.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-text-inverse font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Ship Product (if needed)</h4>
                    <p className="text-sm text-text-secondary font-medium">
                      If required, we'll arrange free pickup. For minor issues, we may resolve remotely.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center text-text-inverse font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Resolution</h4>
                    <p className="text-sm text-text-secondary font-medium">
                      We'll repair, replace, or refund based on the issue. Resolution typically takes 7-14 business days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Important Notes */}
        <section className="mb-12">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-warning" />
              Important Warranty Notes
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Warranty Period</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Warranty starts from the date of delivery. Keep your order confirmation and invoice for warranty claims.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Original Purchase Required</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Warranty is valid only for products purchased directly from EyeWear India. Products from third-party sellers are not covered.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-text-primary mb-1">Extended Warranty</h4>
                  <p className="text-sm text-text-secondary font-medium">
                    Extended warranty plans can be purchased at checkout or within 30 days of purchase. They provide additional coverage and peace of mind.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <Card className="p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20 text-center">
          <h3 className="text-2xl font-bold mb-3 text-text-primary">Need Warranty Support?</h3>
          <p className="text-base text-text-secondary mb-6 font-medium">
            Our team is ready to help with your warranty claims
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-6 py-3 bg-brand-primary text-text-inverse rounded-lg font-semibold hover:bg-brand-primary-hover transition-colors">
                Contact Support
              </button>
            </Link>
            <a href="tel:+911800123456">
              <button className="px-6 py-3 bg-bg-secondary border border-border-primary text-text-primary rounded-lg font-semibold hover:bg-bg-tertiary transition-colors">
                Call: 1800-123-456
              </button>
            </a>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

