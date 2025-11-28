import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react'
import { Button, Input } from './ui'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-bg-secondary border-t border-border-secondary mt-16 shadow-sm">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
          {/* Eye Care Services */}
          <div>
            <h3 className="text-base font-bold mb-3 font-heading text-text-primary">Eye Care Services</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/eye-checkup" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Book Eye Checkup
                </Link>
              </li>
              <li>
                <Link href="/online-consultation" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Online Consultation
                </Link>
              </li>
              <li>
                <Link href="/find-doctor" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Find Eye Doctor
                </Link>
              </li>
              <li>
                <Link href="/prescriptions" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Prescriptions & Reports
                </Link>
              </li>
              <li>
                <Link href="/health" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Eye Health Articles
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop Eyewear */}
          <div>
            <h3 className="text-base font-bold mb-3 font-heading text-text-primary">Shop Eyewear</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/products?category=glasses" className="text-text-secondary hover:text-brand-secondary transition-colors">
                  Eyeglasses
                </Link>
              </li>
              <li>
                <Link href="/products?category=sunglasses" className="text-text-secondary hover:text-brand-secondary transition-colors">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link href="/products?category=computer-glasses" className="text-text-secondary hover:text-brand-secondary transition-colors">
                  Computer Glasses
                </Link>
              </li>
              <li>
                <Link href="/face-shape-guide" className="text-text-secondary hover:text-brand-secondary transition-colors">
                  Face Shape Guide
                </Link>
              </li>
              <li>
                <Link href="/deals" className="text-text-secondary hover:text-brand-secondary transition-colors">
                  Deals & Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base font-bold mb-3 font-heading text-text-primary">Support</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/faq" className="text-text-secondary hover:text-brand-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-text-secondary hover:text-brand-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-base font-bold mb-3 font-heading text-text-primary">Legal</h3>
            <ul className="space-y-1.5 text-sm">
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation" className="text-text-secondary hover:text-brand-primary transition-colors">
                  Cancellation Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-base font-bold mb-3 font-heading text-text-primary">Newsletter</h3>
            <p className="text-xs text-text-secondary mb-3">
              Subscribe to get special offers and updates
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="mb-2"
              />
              <Button variant="primary" size="small" fullWidth>
                Subscribe
              </Button>
            </form>
            <div className="flex gap-2 mt-4">
              <a href="#" className="p-2 bg-bg-tertiary rounded-lg hover:bg-bg-hover transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-bg-tertiary rounded-lg hover:bg-bg-hover transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-bg-tertiary rounded-lg hover:bg-bg-hover transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-bg-tertiary rounded-lg hover:bg-bg-hover transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods & Copyright */}
        <div className="border-t border-border-secondary pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <div className="text-xs text-text-tertiary">
              <p>&copy; {new Date().getFullYear()} EyeWear India. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-2 text-text-tertiary text-xs">
              <span>We accept:</span>
              <span className="px-2 py-0.5 bg-bg-tertiary rounded text-xs">💳 Cards</span>
              <span className="px-2 py-0.5 bg-bg-tertiary rounded text-xs">📱 UPI</span>
              <span className="px-2 py-0.5 bg-bg-tertiary rounded text-xs">🏦 Net Banking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

