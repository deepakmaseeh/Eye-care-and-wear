'use client'

import { Navbar, Footer } from '@/components'
import { Card } from '@/components/ui'
import { Truck, MapPin, Clock, Package, CheckCircle, AlertCircle } from 'lucide-react'

export default function ShippingPage() {
  const shippingZones = [
    {
      zone: 'Metro Cities',
      cities: ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune'],
      delivery: '2-3 business days',
      cost: 'Free',
      icon: '🚚',
    },
    {
      zone: 'Tier 1 Cities',
      cities: ['Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore'],
      delivery: '3-5 business days',
      cost: 'Free',
      icon: '📦',
    },
    {
      zone: 'Tier 2 & 3 Cities',
      cities: ['All other cities'],
      delivery: '5-7 business days',
      cost: 'Free (above ₹999)',
      icon: '🏠',
    },
  ]

  const shippingOptions = [
    {
      name: 'Standard Delivery',
      time: '5-7 business days',
      cost: 'Free on orders above ₹999',
      icon: Package,
      description: 'Regular shipping with tracking',
    },
    {
      name: 'Express Delivery',
      time: '3-5 business days',
      cost: '₹199',
      icon: Truck,
      description: 'Faster delivery for urgent needs',
    },
    {
      name: 'Same Day Delivery',
      time: 'Same day (select cities)',
      cost: '₹299',
      icon: Clock,
      description: 'Available in metro cities only',
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <Truck className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Shipping Information
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Fast, reliable, and free shipping across India. Get your eyewear delivered safely to your doorstep.
          </p>
        </div>

        {/* Shipping Options */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-text-primary text-center">
            Shipping Options
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingOptions.map((option, index) => {
              const Icon = option.icon
              return (
                <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-brand-primary/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-text-primary">{option.name}</h3>
                  <p className="text-lg font-semibold text-brand-primary mb-2">{option.time}</p>
                  <p className="text-sm font-semibold text-text-secondary mb-3">{option.cost}</p>
                  <p className="text-sm text-text-secondary font-medium">{option.description}</p>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Delivery Zones */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-8 text-text-primary text-center">
            Delivery Zones & Timeline
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingZones.map((zone, index) => (
              <Card key={index} className="p-6">
                <div className="text-4xl mb-4 text-center">{zone.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-text-primary text-center">{zone.zone}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Clock className="w-4 h-4 text-brand-primary" />
                    <span className="font-medium">{zone.delivery}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Package className="w-4 h-4 text-brand-primary" />
                    <span className="font-medium">{zone.cost}</span>
                  </div>
                </div>
                <div className="border-t border-border-primary pt-4">
                  <p className="text-xs font-semibold text-text-tertiary mb-2">Cities:</p>
                  <p className="text-sm text-text-secondary font-medium">{zone.cities.join(', ')}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Information */}
        <section className="mb-12">
          <Card className="p-8 bg-brand-primary/5 border-brand-primary/20">
            <h2 className="text-2xl font-bold mb-6 text-text-primary flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-brand-primary" />
              Important Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Free Shipping</h4>
                    <p className="text-sm text-text-secondary font-medium">
                      Free shipping on all orders above ₹999. For orders below ₹999, a shipping charge of ₹99 applies.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Order Tracking</h4>
                    <p className="text-sm text-text-secondary font-medium">
                      Track your order in real-time. You'll receive tracking details via email and SMS once your order is shipped.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Secure Packaging</h4>
                    <p className="text-sm text-text-secondary font-medium">
                      All eyewear is carefully packaged in protective cases and boxes to ensure safe delivery.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Processing Time</h4>
                    <p className="text-sm text-text-secondary font-medium">
                      Orders are processed within 1-2 business days. Prescription lenses may take an additional 2-3 days for manufacturing.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Delivery Attempts</h4>
                    <p className="text-sm text-text-secondary font-medium">
                      We make up to 3 delivery attempts. If unsuccessful, you can reschedule or collect from the nearest pickup point.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-text-primary mb-1">Cash on Delivery</h4>
                    <p className="text-sm text-text-secondary font-medium">
                      COD available for orders up to ₹5000. Payment must be made in exact change at the time of delivery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Contact Section */}
        <Card className="p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20 text-center">
          <MapPin className="w-12 h-12 text-brand-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-3 text-text-primary">Need Help with Shipping?</h3>
          <p className="text-base text-text-secondary mb-6 font-medium">
            Contact our shipping support team for any queries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <button className="px-6 py-3 bg-brand-primary text-text-inverse rounded-lg font-semibold hover:bg-brand-primary-hover transition-colors">
                Contact Support
              </button>
            </a>
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

