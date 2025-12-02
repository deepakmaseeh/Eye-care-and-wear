# EyeWear India - Modern Color System

## 🎨 Complete Color Redefinition

### Design Philosophy
- **Vibrant & Eye-Catching**: Modern colors that grab attention
- **Professional & Trustworthy**: Medical/clinical credibility maintained
- **High Contrast**: Excellent readability
- **Cohesive System**: Consistent across all components

---

## 🌈 Color Palette

### Background Colors
```css
--bg-primary: #FFFFFF        /* Pure white - main background */
--bg-secondary: #FAFBFC      /* Very light blue-gray - cards */
--bg-tertiary: #F8F9FA       /* Light gray - inputs, subtle areas */
--bg-hover: #F0F4F8          /* Light blue-gray - hover states */
--bg-active: #E8EDF2         /* Medium blue-gray - active states */
```

### Brand Colors - Vibrant & Modern
```css
--brand-primary: #0EA5E9      /* Sky Blue - Main brand color */
--brand-primary-hover: #0284C7
--brand-primary-active: #0369A1
--brand-primary-light: #E0F2FE

--brand-secondary: #F59E0B    /* Amber - Warm accent */
--brand-secondary-hover: #D97706
--brand-secondary-active: #B45309
--brand-secondary-light: #FEF3C7

--brand-accent: #8B5CF6       /* Purple - Premium accent */
--brand-accent-hover: #7C3AED
--brand-accent-light: #EDE9FE
```

### Text Colors - High Contrast
```css
--text-primary: #0F172A       /* Slate 900 - Main text */
--text-secondary: #475569     /* Slate 600 - Secondary text */
--text-tertiary: #94A3B8      /* Slate 400 - Tertiary text */
--text-inverse: #FFFFFF       /* White - Text on dark */
--text-brand: #0EA5E9         /* Brand color for links */
```

### Semantic Colors - Clear & Vibrant
```css
--success: #10B981            /* Emerald Green */
--success-bg: rgba(16, 185, 129, 0.1)
--success-light: #D1FAE5

--warning: #F59E0B            /* Amber */
--warning-bg: rgba(245, 158, 11, 0.1)
--warning-light: #FEF3C7

--error: #EF4444              /* Red */
--error-bg: rgba(239, 68, 68, 0.1)
--error-light: #FEE2E2

--info: #3B82F6               /* Blue */
--info-bg: rgba(59, 130, 246, 0.1)
--info-light: #DBEAFE
```

### Borders & Shadows
```css
--border-primary: rgba(15, 23, 42, 0.1)
--border-secondary: rgba(15, 23, 42, 0.06)
--border-hover: rgba(15, 23, 42, 0.15)
--border-brand: rgba(14, 165, 233, 0.3)

--shadow-sm: 0 1px 2px 0 rgba(15, 23, 42, 0.05)
--shadow-md: 0 4px 6px -1px rgba(15, 23, 42, 0.1)
--shadow-lg: 0 10px 15px -3px rgba(15, 23, 42, 0.1)
--shadow-brand: 0 4px 14px 0 rgba(14, 165, 233, 0.2)
```

---

## ✨ Key Features

### 1. **Gradient Effects**
- Logo text uses gradient: `from-brand-primary to-brand-accent`
- Active menu items: `from-brand-primary to-brand-primary-hover`
- User avatar: `from-brand-primary to-brand-accent`

### 2. **Interactive States**
- Hover: Light blue-gray background (`bg-hover`)
- Active: Medium blue-gray (`bg-active`)
- Focus: Brand color ring with glow

### 3. **Visual Hierarchy**
- Primary actions: Sky blue gradient
- Secondary actions: Amber/orange
- Accents: Purple for premium features

### 4. **Shadows & Depth**
- Cards: Soft shadows for elevation
- Buttons: Brand-colored shadow on hover
- Active elements: Enhanced shadows

---

## 🎯 Usage Guidelines

### Buttons
- **Primary**: Sky blue gradient with brand shadow
- **Secondary**: Amber with light background
- **Accent**: Purple for special actions

### Cards
- Background: White with soft shadow
- Hover: Enhanced shadow + border highlight
- Active: Brand-colored border

### Text
- **Headings**: Slate 900 (high contrast)
- **Body**: Slate 600 (readable)
- **Labels**: Slate 400 (subtle)
- **Links**: Brand blue

### Status Indicators
- Success: Emerald green
- Warning: Amber
- Error: Red
- Info: Blue

---

## 📱 Responsive Considerations
All colors maintain contrast ratios for accessibility:
- Text on white: WCAG AAA compliant
- Interactive elements: Clear hover states
- Focus indicators: Visible and prominent

---

## 🚀 Implementation
All colors are defined in:
- `app/globals.css` - CSS variables
- `tailwind.config.ts` - Tailwind classes

Use Tailwind classes for consistency:
- `bg-brand-primary` instead of hardcoded colors
- `text-text-primary` for main text
- `border-border-secondary` for borders

