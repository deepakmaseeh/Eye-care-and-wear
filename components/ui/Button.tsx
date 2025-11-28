import React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'icon'
  size?: 'small' | 'normal' | 'large'
  fullWidth?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'normal',
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'font-semibold rounded-xl transition-all duration-250 ease-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:cursor-not-allowed'

          const variants = {
            primary:
              'bg-brand-primary text-text-inverse hover:bg-brand-primary-hover active:bg-brand-primary-active hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 shadow-md font-semibold',
            secondary:
              'bg-transparent border-2 border-border-primary text-text-primary hover:border-brand-primary hover:text-brand-primary hover:bg-brand-primary/10 font-semibold',
            icon: 'bg-bg-tertiary p-3 hover:bg-bg-hover',
          }

    const sizes = {
      small: 'px-3 py-1 text-sm',
      normal: 'px-6 py-3 text-base',
      large: 'px-8 py-4 text-lg',
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

