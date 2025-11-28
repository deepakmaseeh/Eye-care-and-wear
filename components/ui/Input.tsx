import React from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-bg-tertiary border border-border-primary rounded-xl py-4 text-text-primary placeholder:text-text-tertiary',
              icon ? 'pl-12 pr-4' : 'px-4',
              'focus:outline-none focus:border-brand-primary focus:bg-bg-hover focus:ring-2 focus:ring-brand-primary/10',
              'transition-all duration-250 ease-smooth',
              error && 'border-error focus:border-error focus:ring-error/10',
              className
            )}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-error">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

