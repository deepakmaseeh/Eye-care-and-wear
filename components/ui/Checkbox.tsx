import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className={cn('flex items-center gap-3 cursor-pointer group', className)}>
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            className="sr-only peer"
            {...props}
          />
          <div className="w-5 h-5 border-2 border-border-primary rounded peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-all duration-250 ease-smooth group-hover:border-brand-primary flex items-center justify-center">
            <Check
              className="w-3.5 h-3.5 text-text-inverse opacity-0 peer-checked:opacity-100 transition-opacity duration-250"
              strokeWidth={3}
            />
          </div>
        </div>
        {label && (
          <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
            {label}
          </span>
        )}
      </label>
    )
  }
)

Checkbox.displayName = 'Checkbox'

