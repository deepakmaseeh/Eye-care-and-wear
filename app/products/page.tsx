
'use client'

import { Navbar, Footer } from '@/components'

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container-custom py-12">
        <h1>Products Page</h1>
        <p>This is the products listing page.</p>
      </main>
      <Footer />
    </div>
  )
}
