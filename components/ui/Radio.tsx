import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <label className={cn('flex items-center gap-3 cursor-pointer group', className)}>
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            className="sr-only peer"
            {...props}
          />
          <div className="w-5 h-5 border-2 border-border-primary rounded-full peer-checked:bg-brand-primary peer-checked:border-brand-primary transition-all duration-250 ease-smooth group-hover:border-brand-primary flex items-center justify-center">
            <div className="w-2 h-2 bg-text-inverse rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-250" />
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

Radio.displayName = 'Radio'



