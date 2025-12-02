'use client'

import Link from 'next/link'
import { Navbar, Footer } from '@/components'
import { Card, Button } from '@/components/ui'
import { Eye, Monitor, Sun, BookOpen, Shield, Heart } from 'lucide-react'

const categories = [
  {
    icon: Eye,
    title: 'Vision Problems',
    subcategories: ['Myopia', 'Hyperopia', 'Astigmatism', 'Presbyopia'],
  },
  {
    icon: Monitor,
    title: 'Digital Eye Strain',
    subcategories: ['Blue Light', 'Screen Time', 'Eye Exercises'],
  },
  {
    icon: Sun,
    title: 'Eye Conditions',
    subcategories: ['Dry Eyes', 'Cataracts', 'Glaucoma'],
  },
  {
    icon: BookOpen,
    title: 'Eyewear Guide',
    subcategories: ['Lens Types', 'Frames', 'Coatings'],
  },
  {
    icon: Shield,
    title: 'Prevention',
    subcategories: ['UV Protection', 'Regular Check-ups'],
  },
]

const articles = [
  {
    id: 1,
    title: 'Understanding Common Eye Conditions',
    category: 'Vision Problems',
    excerpt: 'Learn about common eye conditions like myopia, hyperopia, astigmatism, and presbyopia. Understand symptoms, causes, and treatment options.',
    image: '👁️',
    date: '2024-01-15',
  },
  {
    id: 2,
    title: 'Digital Eye Strain Prevention',
    category: 'Digital Eye Strain',
    excerpt: 'Tips to reduce eye strain from prolonged screen time. Learn about the 20-20-20 rule and other effective strategies.',
    image: '💻',
    date: '2024-01-10',
  },
  {
    id: 3,
    title: 'Importance of Regular Eye Exams',
    category: 'Prevention',
    excerpt: 'Why regular eye exams are crucial for maintaining good vision. Learn when and how often you should get your eyes checked.',
    image: '🔍',
    date: '2024-01-05',
  },
  {
    id: 4,
    title: 'Choosing the Right Eyewear',
    category: 'Eyewear Guide',
    excerpt: 'A comprehensive guide to selecting frames and lenses that suit your needs, face shape, and lifestyle.',
    image: '👓',
    date: '2024-01-01',
  },
]

export default function EyeHealthPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="container-custom py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Eye Health & Care Guide
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Expert advice for maintaining healthy vision
          </p>
        </section>

        {/* Categories Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-heading mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <Card key={category.title} hover className="h-full">
                  <Icon className="w-12 h-12 text-brand-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link
                          href={`/health/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                          className="text-text-secondary hover:text-brand-primary transition-colors text-sm"
                        >
                          → {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Articles Grid */}
        <section>
          <h2 className="text-3xl font-bold font-heading mb-8 text-center">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((article) => (
              <Link key={article.id} href={`/health/articles/${article.id}`}>
                <Card hover className="h-full">
                  <div className="text-4xl mb-4 text-center">{article.image}</div>
                  <span className="inline-block px-2 py-1 bg-brand-primary/15 text-brand-primary rounded text-xs font-semibold mb-2">
                    {article.category}
                  </span>
                  <h3 className="font-semibold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-sm text-text-secondary mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-text-tertiary">{article.date}</span>
                    <span className="text-brand-primary text-sm font-medium">Read More →</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}



