'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, Heart, User, Menu, X, Sun, Moon } from 'lucide-react'
import { Button } from './ui/Button'
import { cn } from '@/lib/utils'
import { CartManager } from '@/lib/cart'
import { WishlistManager } from '@/lib/wishlist'
import { useAuth } from '@/lib/auth-context'
import { useTheme } from '@/lib/theme-context'

const UserMenu: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (!isAuthenticated) {
    return (
      <Link
        href="/auth/login"
        className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
        aria-label="User account"
      >
        <User className="w-5 h-5 text-text-primary" />
      </Link>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
        aria-label="User account"
      >
        <User className="w-5 h-5 text-text-primary" />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-bg-secondary border border-border-secondary rounded-xl shadow-lg z-50">
          <div className="p-4 border-b border-border-primary">
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-xs text-text-secondary">{user?.email}</p>
          </div>
          <div className="p-2">
            <Link
              href="/profile"
              className="block px-3 py-2 text-sm hover:bg-bg-tertiary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
            <Link
              href="/orders"
              className="block px-3 py-2 text-sm hover:bg-bg-tertiary rounded-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Orders
            </Link>
            <button
              onClick={() => {
                logout()
                setIsOpen(false)
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-bg-tertiary rounded-lg transition-colors text-error"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const updateCounts = () => {
      setCartCount(CartManager.getItemCount())
      setWishlistCount(WishlistManager.getItemCount())
    }
    updateCounts()
    // Update counts when storage changes
    window.addEventListener('storage', updateCounts)
    const interval = setInterval(updateCounts, 1000) // Check every second
    return () => {
      window.removeEventListener('storage', updateCounts)
      clearInterval(interval)
    }
  }, [])

  const navLinks = [
    { href: '/eye-checkup', label: 'Book Eye Checkup', medical: true },
    { href: '/online-consultation', label: 'Online Consultation', medical: true },
    { href: '/find-doctor', label: 'Find Eye Doctor', medical: true },
    { href: '/prescriptions', label: 'Prescriptions & Reports', medical: true },
    { href: '/products', label: 'Eyeglasses & Sunglasses', medical: false },
    { href: '/health', label: 'Eye Health Articles', medical: true },
  ]

  return (
    <nav className="sticky top-0 z-[1020] bg-bg-secondary/98 backdrop-blur-md border-b border-border-secondary shadow-sm mb-6">
      {/* Main Navigation Bar */}
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="text-xl font-bold font-heading text-brand-primary">
              👓 EyeWear India
            </span>
            <span className="hidden sm:inline-block text-xs bg-brand-primary/15 text-brand-primary px-2 py-1 rounded-full">
              Online Eye Clinic & Store
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search frames, brands..."
                className="w-full bg-bg-tertiary border border-border-primary rounded-xl pl-12 pr-4 py-3 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-primary focus:bg-bg-hover focus:ring-2 focus:ring-brand-primary/10 transition-all duration-250"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Icon - Mobile */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 text-text-primary" />
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-text-primary" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-text-inverse text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5 text-text-primary" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-text-inverse text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
              aria-label="Toggle theme"
              type="button"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-text-primary" />
              )}
            </button>

            {/* User */}
            <UserMenu />

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-bg-tertiary transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-text-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Menu */}
      <div className="border-t border-border-secondary bg-bg-secondary/98 backdrop-blur-md shadow-sm">
        <div className="container-custom">
          <div className="hidden md:flex items-center gap-8 lg:gap-10 overflow-x-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-4 px-2 text-sm font-medium transition-colors whitespace-nowrap group",
                  link.medical 
                    ? "text-text-secondary hover:text-brand-primary" 
                    : "text-text-secondary hover:text-brand-secondary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-250 group-hover:w-full",
                  link.medical ? "bg-brand-primary" : "bg-brand-secondary"
                )} />
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-1 animate-in slide-in-from-top duration-250">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block py-3 px-4 rounded-lg transition-colors",
                    link.medical
                      ? "text-text-secondary hover:text-brand-primary hover:bg-brand-primary/5"
                      : "text-text-secondary hover:text-brand-secondary hover:bg-brand-secondary/5"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

