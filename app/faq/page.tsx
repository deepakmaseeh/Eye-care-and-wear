'use client'

import { useState } from 'react'
import { Navbar, Footer } from '@/components'
import { Card } from '@/components/ui'
import { HelpCircle, ChevronDown, ChevronUp, Eye, Stethoscope, ShoppingBag, Truck, Shield, FileText } from 'lucide-react'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqCategories = [
    {
      icon: Eye,
      title: 'Eye Care & Consultations',
      color: 'brand-primary',
      questions: [
        {
          q: 'How do I book an eye checkup?',
          a: 'You can book an eye checkup by clicking on "Book Eye Checkup" in the navigation menu. Choose between online consultation or in-clinic visit, select your preferred date and time, and complete the booking process.',
        },
        {
          q: 'What is the difference between online and in-clinic consultation?',
          a: 'Online consultation allows you to consult with certified eye doctors via video call from your home, while in-clinic visits provide comprehensive eye examinations with advanced equipment at our physical locations. Both options provide digital prescriptions.',
        },
        {
          q: 'How do I upload my prescription?',
          a: 'Go to "Prescriptions & Reports" page, click "Upload Prescription", and upload an image or PDF of your prescription. Our system will analyze it and provide personalized frame recommendations.',
        },
        {
          q: 'Are the doctors certified?',
          a: 'Yes, all our doctors are certified and registered eye care professionals. You can view their qualifications, experience, and specializations on their profile pages.',
        },
      ],
    },
    {
      icon: ShoppingBag,
      title: 'Eyewear & Products',
      color: 'brand-secondary',
      questions: [
        {
          q: 'How do I choose the right frames for my prescription?',
          a: 'After uploading your prescription, our system automatically recommends frames compatible with your lens type and power. You can also use our face shape guide and virtual try-on feature to find the perfect frames.',
        },
        {
          q: 'What lens types are available?',
          a: 'We offer single vision, progressive, high-index, blue light blocking, and specialized lenses. Your doctor will recommend the best lens type based on your prescription during consultation.',
        },
        {
          q: 'Do you offer prescription lenses?',
          a: 'Yes, we offer prescription lenses for all frame types. You can select your lens type and coatings during the checkout process, and we\'ll ensure they match your prescription requirements.',
        },
        {
          q: 'Can I try frames before buying?',
          a: 'Yes! We offer a virtual try-on feature that uses your device camera to show how frames look on you. You can also visit our physical stores for in-person try-ons.',
        },
      ],
    },
    {
      icon: Truck,
      title: 'Shipping & Delivery',
      color: 'brand-primary',
      questions: [
        {
          q: 'What are your shipping options?',
          a: 'We offer free home delivery across India. Standard delivery takes 5-7 business days, while express delivery (3-5 days) is available for an additional charge. We also provide same-day delivery in select cities.',
        },
        {
          q: 'How much does shipping cost?',
          a: 'We offer free shipping on all orders above ₹999. For orders below this amount, a nominal shipping charge of ₹99 applies. Express delivery charges vary by location.',
        },
        {
          q: 'Can I track my order?',
          a: 'Yes, once your order is shipped, you\'ll receive a tracking number via email and SMS. You can track your order status in real-time through your account dashboard.',
        },
        {
          q: 'Do you ship internationally?',
          a: 'Currently, we only ship within India. We\'re working on expanding our international shipping services in the near future.',
        },
      ],
    },
    {
      icon: Shield,
      title: 'Returns & Warranty',
      color: 'brand-secondary',
      questions: [
        {
          q: 'What is your return policy?',
          a: 'We offer a 14-day return policy. If you\'re not satisfied with your purchase, you can return it in original condition with all tags and packaging. Prescription lenses cannot be returned unless there\'s a manufacturing defect.',
        },
        {
          q: 'How do I return a product?',
          a: 'Log into your account, go to "Orders", select the order you want to return, and click "Return". We\'ll arrange a free pickup. Once approved, your refund will be processed within 5-7 business days.',
        },
        {
          q: 'What warranty do you provide?',
          a: 'All frames come with a 1-year manufacturer warranty covering manufacturing defects. Prescription lenses have a 6-month warranty. Extended warranty options are available at checkout.',
        },
        {
          q: 'What if my glasses break?',
          a: 'If your glasses break due to a manufacturing defect within the warranty period, we\'ll repair or replace them free of charge. Accidental damage may be covered under our extended warranty plans.',
        },
      ],
    },
    {
      icon: FileText,
      title: 'Account & Payments',
      color: 'brand-primary',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit/debit cards, UPI, net banking, and cash on delivery. We also offer EMI options for orders above ₹5000 through our partner banks.',
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, all payments are processed through secure, encrypted payment gateways. We never store your complete card details on our servers. Your financial information is completely safe.',
        },
        {
          q: 'Can I cancel my order?',
          a: 'You can cancel your order within 24 hours of placing it, provided it hasn\'t been shipped yet. Once shipped, you can return it using our 14-day return policy.',
        },
        {
          q: 'How do I update my prescription?',
          a: 'Go to "Prescriptions & Reports" in your account, click "Upload Prescription", and add your new prescription. You can link it to future orders during checkout.',
        },
      ],
    },
  ]

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <HelpCircle className="w-16 h-16 text-brand-primary mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 text-text-primary">
            Frequently Asked Questions
          </h1>
          <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium leading-relaxed">
            Find answers to common questions about our eye care services, eyewear products, shipping, and more.
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqCategories.map((category, categoryIndex) => {
            const Icon = category.icon
            return (
              <div key={categoryIndex}>
                <Card className="p-6 mb-4">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 ${category.color === 'brand-primary' ? 'bg-brand-primary/15' : 'bg-brand-secondary/15'} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${category.color === 'brand-primary' ? 'text-brand-primary' : 'text-brand-secondary'}`} />
                    </div>
                    <h2 className="text-2xl font-bold text-text-primary">{category.title}</h2>
                  </div>
                  
                  <div className="space-y-3">
                    {category.questions.map((faq, index) => {
                      const globalIndex = categoryIndex * 4 + index
                      const isOpen = openIndex === globalIndex
                      return (
                        <div key={index} className="border border-border-primary rounded-lg overflow-hidden">
                          <button
                            onClick={() => toggleQuestion(globalIndex)}
                            className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-bg-tertiary transition-colors"
                          >
                            <span className="font-semibold text-text-primary pr-4">{faq.q}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-brand-primary flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-text-tertiary flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-5 py-4 bg-bg-tertiary/50 border-t border-border-primary">
                              <p className="text-sm text-text-secondary font-medium leading-relaxed">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Contact Support CTA */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/20 text-center">
          <h3 className="text-2xl font-bold mb-3 text-text-primary">Still have questions?</h3>
          <p className="text-base text-text-secondary mb-6 font-medium">
            Our support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="inline-block">
              <button className="px-6 py-3 bg-brand-primary text-text-inverse rounded-lg font-semibold hover:bg-brand-primary-hover transition-colors">
                Contact Support
              </button>
            </a>
            <a href="tel:+911800123456" className="inline-block">
              <button className="px-6 py-3 bg-bg-secondary border border-border-primary text-text-primary rounded-lg font-semibold hover:bg-bg-tertiary transition-colors">
                Call Us: 1800-123-456
              </button>
            </a>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

