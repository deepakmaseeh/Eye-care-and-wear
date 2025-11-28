'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Navbar, Footer } from '@/components'
import { Button, Card } from '@/components/ui'
import { apiClient } from '@/lib/api-client'
import { Star, ArrowRight, Eye, FileText, Stethoscope, Calendar, CheckCircle, Truck, User, MapPin, Award } from 'lucide-react'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await apiClient.products.getAll({ limit: '8', sortBy: 'rating', sortOrder: 'desc' })
      if (response.success && response.data) {
        setFeaturedProducts(response.data.products || [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  // Sample doctor data for homepage
  const topDoctors = [
    {
      id: 1,
      name: 'Dr. Priya Sharma',
      qualification: 'MD Ophthalmology',
      specialization: 'Retina & Diabetic Eye Care',
      experience: 12,
      fee: 499,
      rating: 4.8,
      reviewCount: 234,
      location: 'Mumbai',
      availableToday: true,
      onlineConsultation: true,
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      qualification: 'MS Ophthalmology',
      specialization: 'Cataract & Refractive Surgery',
      experience: 15,
      fee: 599,
      rating: 4.9,
      reviewCount: 312,
      location: 'Delhi',
      availableToday: true,
      onlineConsultation: true,
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      qualification: 'MD Ophthalmology',
      specialization: 'Pediatric Ophthalmology',
      experience: 10,
      fee: 449,
      rating: 4.7,
      reviewCount: 189,
      location: 'Bangalore',
      availableToday: false,
      onlineConsultation: true,
    },
  ]

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      city: 'Delhi',
      rating: 5,
      text: 'Got my eyes checked online, received prescription, and ordered perfect frames - all in one place! Excellent service.',
      image: '👨',
    },
    {
      name: 'Priya Sharma',
      city: 'Mumbai',
      rating: 5,
      text: 'The doctor consultation was thorough and the prescription-based frame recommendations were spot on.',
      image: '👩',
    },
    {
      name: 'Amit Patel',
      city: 'Bangalore',
      rating: 5,
      text: 'Love how seamlessly I could consult a doctor, get my prescription, and buy eyewear all on this platform.',
      image: '👨',
    },
  ]

  const brands = ['Ray-Ban', 'Lenskart', 'Titan Eye+', 'IDEE', 'Fastrack', 'Vincent Chase']

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section - Doctor First */}
        <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-brand-primary/5 via-bg-secondary to-bg-primary overflow-hidden">
          <div className="container-custom text-center z-10 relative py-20">
            <div className="inline-block mb-6 px-4 py-2 bg-brand-primary/15 text-brand-primary rounded-full text-sm font-semibold">
              Online Eye Checkup, Prescription & Eyewear in One Place
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 text-text-primary">
              Get Your Eyes Checked by{' '}
              <span className="text-brand-primary">Certified Eye Doctors</span>
            </h1>
            
            <p className="text-base md:text-lg text-text-secondary mb-10 max-w-3xl mx-auto font-medium leading-relaxed">
              Consult an eye doctor online or in-clinic, get your prescription, then choose the perfect eyewear. 
              Medical care and eyewear shopping seamlessly connected.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/eye-checkup">
                <Button size="large" variant="primary" className="bg-brand-primary hover:bg-brand-primary-hover">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Eye Checkup
                </Button>
              </Link>
              <Link href="/online-consultation">
                <Button size="large" variant="primary" className="bg-brand-primary hover:bg-brand-primary-hover">
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Start Online Consultation
                </Button>
              </Link>
            </div>

            <div className="mb-8">
              <Link href="/products">
                <Button size="normal" variant="secondary" className="text-text-secondary">
                  I Already Have a Prescription – Browse Eyewear
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-20">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">500+</div>
                <div className="text-sm text-text-secondary font-medium">Certified Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">50K+</div>
                <div className="text-sm text-text-secondary font-medium">Eye Checkups</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">2000+</div>
                <div className="text-sm text-text-secondary font-medium">Premium Frames</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-brand-primary mb-2">4.8★</div>
                <div className="text-sm text-text-secondary font-medium">Average Rating</div>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl -z-10" />
        </section>

        {/* Choose Your Path Section */}
        <section className="py-20 bg-bg-secondary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-text-primary">
                Choose Your Path
              </h2>
              <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium">
                Start your eye care journey with the option that fits your needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link href="/eye-checkup">
                <Card hover className="text-center cursor-pointer h-full p-8 border-2 border-brand-primary/20 hover:border-brand-primary transition-all">
                  <div className="w-20 h-20 bg-brand-primary/15 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Eye className="w-10 h-10 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">I need an eye checkup</h3>
                  <p className="text-sm text-text-secondary mb-6 font-medium leading-relaxed">
                    Book an appointment for a comprehensive eye examination by certified doctors
                  </p>
                  <Button variant="primary" size="normal" className="w-full">
                    Book Checkup <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </Link>

              <Link href="/online-consultation">
                <Card hover className="text-center cursor-pointer h-full p-8 border-2 border-brand-primary/20 hover:border-brand-primary transition-all">
                  <div className="w-20 h-20 bg-brand-primary/15 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Stethoscope className="w-10 h-10 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">I want to consult a doctor online</h3>
                  <p className="text-sm text-text-secondary mb-6 font-medium leading-relaxed">
                    Video consultation with eye doctors from the comfort of your home
                  </p>
                  <Button variant="primary" size="normal" className="w-full">
                    Start Consultation <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </Link>

              <Link href="/products">
                <Card hover className="text-center cursor-pointer h-full p-8 border-2 border-brand-secondary/20 hover:border-brand-secondary transition-all">
                  <div className="w-20 h-20 bg-brand-secondary/15 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="w-10 h-10 text-brand-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-text-primary">I already have a prescription</h3>
                  <p className="text-sm text-text-secondary mb-6 font-medium leading-relaxed">
                    Browse our eyewear collection and find frames compatible with your prescription
                  </p>
                  <Button variant="secondary" size="normal" className="w-full">
                    Browse Eyewear <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-bg-primary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-text-primary">
                How It Works
              </h2>
              <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium">
                Simple steps from eye checkup to perfect eyewear
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {[
                { step: '1', title: 'Check Eyes', icon: Eye, desc: 'Book an eye checkup online or visit clinic', isMedical: true },
                { step: '2', title: 'Get Prescription', icon: FileText, desc: 'Receive your prescription from certified doctor', isMedical: true },
                { step: '3', title: 'Choose Eyewear', icon: '👓', desc: 'Select frames recommended for your prescription', isMedical: false },
                { step: '4', title: 'Home Delivery', icon: Truck, desc: 'Get your eyewear delivered to your doorstep', isMedical: false },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className={`w-20 h-20 ${item.isMedical ? 'bg-brand-primary/15' : 'bg-brand-secondary/15'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {typeof item.icon === 'string' ? (
                      <span className="text-4xl">{item.icon}</span>
                    ) : (
                      <item.icon className={`w-10 h-10 ${item.isMedical ? 'text-brand-primary' : 'text-brand-secondary'}`} />
                    )}
                  </div>
                  <div className={`text-xs font-semibold ${item.isMedical ? 'text-brand-primary' : 'text-brand-secondary'} mb-2`}>Step {item.step}</div>
                  <h3 className="text-lg font-bold mb-2 text-text-primary">{item.title}</h3>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Eye Doctors Section */}
        <section className="py-20 bg-bg-secondary">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2 text-text-primary">
                  Top Eye Doctors Near You
                </h2>
                <p className="text-base text-text-secondary font-medium">
                  Connect with certified eye care professionals
                </p>
              </div>
              <Link href="/find-doctor">
                <Button variant="primary" size="normal">
                  View All Doctors <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topDoctors.map((doctor) => (
                <Card key={doctor.id} hover className="cursor-pointer">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-brand-primary/15 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                      👨‍⚕️
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-text-primary mb-1">{doctor.name}</h3>
                      <p className="text-sm text-text-secondary mb-1">{doctor.qualification}</p>
                      <p className="text-sm text-brand-primary font-medium">{doctor.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-brand-secondary text-brand-secondary" />
                      <span className="font-semibold">{doctor.rating}</span>
                      <span className="text-sm text-text-tertiary">({doctor.reviewCount})</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <MapPin className="w-4 h-4" />
                      {doctor.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Award className="w-4 h-4" />
                      {doctor.experience} years experience
                    </div>
                    <span className="text-lg font-bold text-brand-primary">₹{doctor.fee}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctor.availableToday && (
                      <span className="px-2 py-1 bg-success-bg text-success rounded text-xs font-medium">
                        Available Today
                      </span>
                    )}
                    {doctor.onlineConsultation && (
                      <span className="px-2 py-1 bg-info-bg text-info rounded text-xs font-medium">
                        Online Consultation
                      </span>
                    )}
                  </div>
                  <Link href={`/find-doctor?doctor=${doctor.id}`}>
                    <Button variant="primary" size="normal" fullWidth>
                      Book Appointment
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Prescription → Recommended Lenses Section */}
        <section className="py-20 bg-bg-primary">
          <div className="container-custom">
            <Card className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 border-brand-primary/30 shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-heading mb-4 text-text-primary">
                    Your Prescription → Recommended Lenses
                  </h2>
                  <p className="text-base text-text-secondary mb-6 font-medium leading-relaxed">
                    Our doctors analyze your prescription and recommend the best lens types for your vision needs. 
                    Whether you need single vision, progressive, or specialized lenses, we guide you to the right choice.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      'Single Vision Lenses for basic correction',
                      'Progressive Lenses for presbyopia',
                      'High-Index Lenses for strong prescriptions',
                      'Blue Light Blocking for digital eye strain',
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-brand-primary flex-shrink-0" />
                        <span className="text-text-secondary font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/prescriptions">
                    <Button variant="primary" size="large">
                      Upload Your Prescription
                    </Button>
                  </Link>
                </div>
                <div className="relative h-64 bg-bg-primary rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-20 h-20 text-brand-primary mx-auto mb-4 opacity-50" />
                    <p className="text-text-secondary font-medium">Prescription Analysis</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Eyeglasses & Sunglasses Showcase */}
        <section className="py-20 bg-bg-secondary">
          <div className="container-custom">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-2 text-text-primary">
                  Popular Eyewear Frames
                </h2>
                <p className="text-base text-text-secondary font-medium">
                  Doctor-recommended frames for your prescription
                </p>
              </div>
              <Link href="/products">
                <Button variant="secondary" size="normal">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-64 bg-bg-tertiary rounded-lg mb-4" />
                    <div className="h-4 bg-bg-tertiary rounded mb-2" />
                    <div className="h-4 bg-bg-tertiary rounded w-2/3" />
                  </Card>
                ))}
              </div>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts.slice(0, 4).map((product: any) => (
                  <Link key={product._id} href={`/products/${product._id}`}>
                    <Card hover className="overflow-hidden">
                      <div className="relative h-64 bg-bg-tertiary mb-4">
                        {product.images?.[0]?.url ? (
                          <Image
                            src={product.images[0].url}
                            alt={product.images[0].alt || product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-text-tertiary">
                            No Image
                          </div>
                        )}
                        {product.discountPrice && (
                          <span className="absolute top-2 right-2 bg-error text-text-inverse px-2 py-1 rounded text-xs font-semibold">
                            Sale
                          </span>
                        )}
                        {(product.category === 'computer-glasses' || product.lensTypes?.includes('blue-light')) && (
                          <span className="absolute top-2 left-2 bg-brand-primary text-text-inverse px-2 py-1 rounded text-xs font-semibold">
                            Doctor Recommended
                          </span>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2 text-text-primary">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          {product.discountPrice ? (
                            <>
                              <span className="text-brand-primary font-bold">
                                ₹{product.discountPrice}
                              </span>
                              <span className="text-text-tertiary line-through text-sm">
                                ₹{product.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-brand-primary font-bold">₹{product.price}</span>
                          )}
                        </div>
                        {product.rating > 0 && (
                          <div className="flex items-center gap-1 text-sm text-text-secondary">
                            <Star className="w-4 h-4 fill-brand-secondary text-brand-secondary" />
                            <span>{product.rating.toFixed(1)}</span>
                            <span className="text-text-tertiary">({product.reviewCount})</span>
                          </div>
                        )}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-text-secondary">
                <p>No products available yet. Add products to see them here.</p>
              </div>
            )}
          </div>
        </section>

        {/* Eye Health Articles */}
        <section className="py-20 bg-bg-primary">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4 text-text-primary">
                Eye Health Articles
              </h2>
              <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto font-medium">
                Expert advice for maintaining healthy vision
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: '💻',
                  title: 'Digital Eye Strain Prevention',
                  description: 'Protect your eyes from digital screens with blue light blocking glasses and proper habits.',
                  link: '/health',
                },
                {
                  icon: '☀️',
                  title: 'UV Protection Guide',
                  description: 'Keep your eyes safe from harmful UV rays with quality sunglasses and proper eye care.',
                  link: '/health',
                },
                {
                  icon: '👓',
                  title: 'Understanding Your Prescription',
                  description: 'Learn how to read your prescription and choose the right lenses for your vision needs.',
                  link: '/health',
                },
              ].map((item) => (
                <Link key={item.title} href={item.link}>
                  <Card hover className="h-full">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-bold mb-2 text-text-primary">{item.title}</h3>
                    <p className="text-sm text-text-secondary mb-4 font-medium leading-relaxed">{item.description}</p>
                    <span className="text-brand-primary text-sm font-medium">
                      Read More →
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/health">
                <Button variant="primary" size="normal">
                  View All Articles <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Customer Testimonials */}
        <section className="py-20 bg-bg-secondary">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-center text-text-primary">
              What Our Patients Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-primary/15 rounded-full flex items-center justify-center text-2xl">
                      {testimonial.image}
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary">{testimonial.name}</h4>
                      <p className="text-sm text-text-secondary">{testimonial.city}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-secondary text-brand-secondary" />
                    ))}
                  </div>
                  <p className="text-sm text-text-secondary font-medium leading-relaxed">{testimonial.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted Brands */}
        <section className="py-20 bg-bg-primary">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-10 text-center text-text-primary">
              Trusted Brands
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-opacity">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="text-2xl font-bold text-text-secondary hover:text-brand-primary transition-colors cursor-pointer"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
