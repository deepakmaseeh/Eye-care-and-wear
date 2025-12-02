import React from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'product'
  hover?: boolean
  children: React.ReactNode
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = false, className, children, ...props }, ref) => {
    const baseStyles =
      'bg-bg-secondary border border-border-primary rounded-2xl transition-all duration-250 ease-smooth'

    const variants = {
      default: 'p-6',
      product: 'p-0 overflow-hidden',
    }

    const hoverStyles = hover
      ? 'hover:border-brand-primary hover:shadow-dark-md hover:-translate-y-1'
      : ''

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], hoverStyles, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

