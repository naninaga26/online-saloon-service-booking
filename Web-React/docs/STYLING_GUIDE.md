# 🎨 Styling Guide

A comprehensive guide for styling the React salon booking application using Tailwind CSS. This guide covers configuration, patterns, responsive design, and best practices.

## 📋 Table of Contents

- [🎯 Styling Philosophy](#-styling-philosophy)
- [⚙️ Tailwind CSS Configuration](#️-tailwind-css-configuration)
- [🎨 Utility-First Approach](#-utility-first-approach)
- [🧩 Component Styling Patterns](#-component-styling-patterns)
- [🔷 Radix UI Component Pattern](#-radix-ui-component-pattern)
- [📱 Responsive Design](#-responsive-design)
- [🎭 Custom Colors & Themes](#-custom-colors--themes)
- [🌙 Dark Mode Support](#-dark-mode-support)
- [♿ Accessibility Considerations](#-accessibility-considerations)
- [🎪 Common UI Patterns](#-common-ui-patterns)
- [✨ Animation & Transitions](#-animation--transitions)
- [🛠️ Utility Functions](#️-utility-functions)
- [📝 Best Practices](#-best-practices)

---

## 🎯 Styling Philosophy

Our styling approach follows these principles:

1. **Utility-First**: Use Tailwind CSS utility classes as the primary styling method
2. **Component-Based**: Create reusable styled components for consistency
3. **Responsive by Default**: Mobile-first responsive design
4. **Accessibility First**: Ensure all styles support accessibility features
5. **Performance**: Minimize CSS bundle size through PurgeCSS
6. **Maintainability**: Use consistent naming and organization patterns

---

## ⚙️ Tailwind CSS Configuration

### Installation

This project uses **Tailwind CSS v4** with the new `@tailwindcss/postcss` plugin.

```bash
npm install -D tailwindcss@next @tailwindcss/postcss@next
```

### Tailwind v4 Configuration

**Important**: Tailwind v4 uses PostCSS-only configuration. No `tailwind.config.js` file is needed.

### PostCSS Configuration

**postcss.config.mjs:**

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### CSS Entry Point with Tailwind v4 @theme

**src/index.css:**

Tailwind v4 uses the new `@theme` directive to define custom design tokens as CSS custom properties.

```css
@import "tailwindcss";

/* Theme Configuration - Tailwind v4 @theme directive */
@theme {
  /* Primary Colors (Blue) - Inspired by Luzo */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;

  /* Secondary Colors (Purple/Violet) */
  --color-secondary-50: #faf5ff;
  --color-secondary-100: #f3e8ff;
  --color-secondary-200: #e9d5ff;
  --color-secondary-300: #d8b4fe;
  --color-secondary-400: #c084fc;
  --color-secondary-500: #a855f7;
  --color-secondary-600: #9333ea;
  --color-secondary-700: #7e22ce;
  --color-secondary-800: #6b21a8;
  --color-secondary-900: #581c87;
  --color-secondary-950: #3b0764;

  /* Success Colors */
  --color-success-50: #f0fdf4;
  --color-success-100: #dcfce7;
  --color-success-200: #bbf7d0;
  --color-success-500: #22c55e;
  --color-success-700: #15803d;

  /* Warning Colors */
  --color-warning-50: #fffbeb;
  --color-warning-100: #fef3c7;
  --color-warning-200: #fde68a;
  --color-warning-500: #f59e0b;
  --color-warning-700: #b45309;

  /* Error Colors */
  --color-error-50: #fef2f2;
  --color-error-100: #fee2e2;
  --color-error-200: #fecaca;
  --color-error-500: #ef4444;
  --color-error-700: #b91c1c;

  /* Info Colors */
  --color-info-50: #eff6ff;
  --color-info-100: #dbeafe;
  --color-info-200: #bfdbfe;
  --color-info-500: #3b82f6;
  --color-info-700: #1d4ed8;
}

/* Custom global styles */
```

**Key Differences from Tailwind v3:**

1. **No `@tailwind` directives** - Use `@import "tailwindcss"` instead
2. **No `@layer` directive** - Tailwind v4 handles layers automatically
3. **Use `@theme` for custom design tokens** - Replaces the `theme.extend` in config file
4. **CSS custom properties** - All theme values are defined as `--color-*`, `--spacing-*`, etc.

**Usage in Components:**

```typescript
// Theme colors are automatically available
<div className="bg-primary-600 text-white">
  Primary background
</div>

<div className="text-secondary-600 hover:text-secondary-700">
  Secondary text
</div>
```

---

## 🎨 Utility-First Approach

### Basic Usage

```typescript
// ✅ Good - Utility classes
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
  Click me
</button>

// ❌ Avoid - Inline styles
<button style={{ padding: '0.5rem 1rem', backgroundColor: '#0284c7' }}>
  Click me
</button>
```

### Conditional Classes

```typescript
import { cn } from '@/utils/helpers';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', isLoading }) => {
  return (
    <button
      className={cn(
        // Base styles
        'rounded-lg font-medium transition-all',
        // Variant styles
        variant === 'primary' && 'bg-primary-600 text-white hover:bg-primary-700',
        variant === 'secondary' && 'bg-secondary-600 text-white hover:bg-secondary-700',
        // Size styles
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        // State styles
        isLoading && 'opacity-50 cursor-wait'
      )}
    >
      Button
    </button>
  );
};
```

### Utility Helper Function

```typescript
// src/utils/helpers.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names with tailwind-merge to handle conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage
cn('px-4 py-2', isActive && 'bg-blue-500', className);
```

---

## 🧩 Component Styling Patterns

### Button Component

```typescript
// src/components/common/Button/Button.tsx
import React from 'react';
import { cn } from '@/utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 active:bg-primary-800',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        isLoading && 'cursor-wait',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span>{leftIcon}</span>}
          {children}
          {rightIcon && <span>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
```

### Card Component

```typescript
// src/components/common/Card/Card.tsx
import React from 'react';
import { cn } from '@/utils/helpers';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'glass';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className,
  onClick
}) => {
  const baseStyles = 'rounded-lg';

  const variants = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-transparent border-2 border-gray-300',
    elevated: 'bg-white shadow-card',
    glass: 'glass'
  };

  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8'
  };

  return (
    <div
      className={cn(
        baseStyles,
        variants[variant],
        paddings[padding],
        hover && 'transition-all duration-200 hover:shadow-card-hover cursor-pointer',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};
```

### Input Component

```typescript
// src/components/common/Input/Input.tsx
import React, { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className,
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2 border rounded-lg transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            'placeholder:text-gray-400',
            error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

      {hint && !error && (
        <p className="mt-1 text-sm text-gray-500">{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
```

---

## 🔷 Radix UI Component Pattern

### Overview

This project uses [Radix UI](https://www.radix-ui.com/) primitives for accessible, unstyled components. We follow a specific pattern to create reusable styled components:

1. **Wrap Radix primitives** with fully-styled component versions
2. **Include all base styling** (hover states, focus rings, responsive sizing, transitions)
3. **Support className override** via the `cn()` helper for customization
4. **Use forwardRef** for proper ref handling
5. **Export individual components** for flexibility

### Core Principles

- **Mobile-first responsive design** - No separate mobile/desktop code
- **Fully styled by default** - Components work out of the box
- **Customizable via className** - Override styles when needed
- **Accessible by default** - Radix handles ARIA attributes and keyboard navigation

### Reference Implementation: NavigationMenu

The NavigationMenu component is the reference implementation for this pattern.

**File Structure:**

```
src/components/common/NavigationMenu/
├── NavigationMenu.tsx    # All styled components
└── index.ts              # Exports
```

**src/components/common/NavigationMenu/NavigationMenu.tsx:**

```typescript
import React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/helpers';

// NavigationMenuRoot - Wrapper component
const NavigationMenuRoot = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn('relative z-10 flex w-full justify-center', className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
));
NavigationMenuRoot.displayName = 'NavigationMenuRoot';

// NavigationMenuTrigger - Dropdown trigger with auto-chevron
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
    showChevron?: boolean;
  }
>(({ className, children, showChevron = true, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      // Layout & spacing
      'group inline-flex items-center gap-1 px-3 py-2',
      // Typography - mobile-first responsive
      'text-sm sm:text-base font-medium text-gray-700',
      // Hover states
      'hover:text-primary-600 hover:bg-gray-50',
      // Visual styling
      'rounded-lg transition-colors',
      // Focus states for accessibility
      'focus:outline-none focus:ring-2 focus:ring-primary-500',
      // Disabled state
      'disabled:pointer-events-none disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    {showChevron && (
      <ChevronDown
        className="relative top-[1px] ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    )}
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

// Export all styled components
export {
  NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
```

### Pattern Breakdown

#### 1. Wrap Radix Primitive

```typescript
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(/* styles */, className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Trigger>
));
```

**Key Points:**
- Use `React.forwardRef` for ref forwarding
- Destructure `className` from props
- Spread remaining `...props` to preserve all Radix functionality
- Pass `className` last in `cn()` so custom classes override defaults

#### 2. Mobile-First Responsive Styling

```typescript
className={cn(
  // Base mobile styles
  'text-sm font-medium',
  // Tablet and up
  'sm:text-base',
  // Desktop
  'lg:gap-4',
  className
)}
```

**Do NOT create separate mobile/desktop implementations:**

```typescript
// ❌ BAD - Code duplication
{isMobile ? (
  <MobileMenu />
) : (
  <DesktopMenu />
)}

// ✅ GOOD - Single implementation with responsive classes
<Menu className="flex-col md:flex-row text-sm md:text-base" />
```

#### 3. Include All Base Styling

Every styled component should include:

- **Layout**: `flex`, `inline-flex`, `grid`, spacing (`gap`, `px`, `py`)
- **Typography**: `text-sm sm:text-base`, `font-medium`
- **Colors**: `text-gray-700`, `bg-primary-600`
- **Hover states**: `hover:text-primary-600`, `hover:bg-gray-50`
- **Focus states**: `focus:outline-none focus:ring-2 focus:ring-primary-500`
- **Transitions**: `transition-colors`, `transition-all`, `duration-200`
- **Visual**: `rounded-lg`, `shadow-card`
- **Disabled**: `disabled:opacity-50 disabled:cursor-not-allowed`

#### 4. Support Custom Props

Add component-specific props when needed:

```typescript
interface NavigationMenuTriggerProps
  extends React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> {
  showChevron?: boolean;  // Custom prop
}

const NavigationMenuTrigger = React.forwardRef<...>({
  showChevron = true,  // Default value
  ...
}) => (
  // Component implementation
  {showChevron && <ChevronDown />}
);
```

#### 5. Set displayName

Always set `displayName` for better debugging and React DevTools:

```typescript
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';
```

### Usage in Feature Components

**Before** (Navbar without common components):

```typescript
// 133 lines of repetitive styling
<NavigationMenuPrimitive.Trigger
  className="group inline-flex items-center gap-1 px-3 py-2 text-sm sm:text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
>
  Services
  <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
</NavigationMenuPrimitive.Trigger>
```

**After** (Using common NavigationMenu):

```typescript
// 103 lines, clean and maintainable
import {
  NavigationMenuRoot,
  NavigationMenuTrigger,
  NavigationMenuContent,
  // ... other components
} from '@/components/common';

<NavigationMenuTrigger>Services</NavigationMenuTrigger>

// Custom styling when needed
<NavigationMenuTrigger className="text-red-600">
  Special Item
</NavigationMenuTrigger>

// Disable auto-chevron if needed
<NavigationMenuTrigger showChevron={false}>
  No Arrow
</NavigationMenuTrigger>
```

### Benefits

1. **DRY (Don't Repeat Yourself)** - Styling defined once, used everywhere
2. **Consistency** - All instances look the same by default
3. **Maintainability** - Update styling in one place
4. **Flexibility** - Override with custom classes when needed
5. **Mobile-first** - Responsive by default, no code duplication
6. **Accessible** - Radix handles ARIA, keyboard nav, focus management
7. **Type-safe** - Full TypeScript support with prop types

### Creating New Radix Components

When adding a new Radix UI component, follow this checklist:

1. **Install the Radix package**
   ```bash
   npm install @radix-ui/react-[component-name]
   ```

2. **Create component file**
   ```
   src/components/common/[ComponentName]/[ComponentName].tsx
   ```

3. **Import Radix primitive**
   ```typescript
   import * as ComponentPrimitive from '@radix-ui/react-[component-name]';
   ```

4. **Wrap each primitive** with styled version using `forwardRef`

5. **Add base styling** (layout, colors, hover, focus, transitions, responsive)

6. **Support className override** via `cn()` helper

7. **Add custom props** if needed (e.g., `showChevron`, `variant`)

8. **Set displayName** for each component

9. **Export from index.ts**

10. **Add to common/index.ts** for easy imports

### Radix UI Components in Use

Current Radix UI components in the project:

- **NavigationMenu** - Main navigation with dropdowns (reference implementation)
- **Dialog** - Modals and dialogs
- **DropdownMenu** - User menu, action menus
- **Select** - Form select inputs
- **Avatar** - User avatars with fallback
- **Checkbox** - Form checkboxes
- **Switch** - Toggle switches
- **Tooltip** - Hover tooltips
- **Separator** - Divider lines
- **Label** - Form labels
- **Slot** - Composition primitive for `asChild` pattern

All follow the same pattern: styled wrappers with className override support.

### Text Component - Typography Pattern

**IMPORTANT**: Never use raw HTML text tags (`h1`-`h6`, `p`, `span`) directly. Always use the `Text` component for consistent typography.

The `Text` component is a polymorphic typography component that replaces all text HTML elements with a consistent, responsive, and themeable system.

**src/components/common/Text/Text.tsx:**

```typescript
import React from 'react';
import { cn } from '@/utils/helpers';

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

type TextVariant =
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body-lg' | 'body' | 'body-sm'
  | 'caption' | 'overline';

type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

type TextColor = 'primary' | 'secondary' | 'muted' | 'success' | 'warning' | 'error' | 'info';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: TextElement;          // HTML element to render (default: auto-selected based on variant)
  variant?: TextVariant;     // Typography variant (default: 'body')
  weight?: TextWeight;       // Font weight (default: varies by variant)
  color?: TextColor;         // Theme color (default: inherits)
  truncate?: boolean;        // Truncate with ellipsis (default: false)
  center?: boolean;          // Center align text (default: false)
  italic?: boolean;          // Apply italic styling (default: false)
  className?: string;        // Additional classes
  children: React.ReactNode;
}

export const Text = React.forwardRef<HTMLElement, TextProps>((props, ref) => {
  // Implementation uses React.createElement for polymorphic rendering
  // Full implementation in src/components/common/Text/Text.tsx
});
```

**Usage Examples:**

```typescript
// Replace h1-h6
// ❌ BAD
<h1 className="text-3xl font-bold text-gray-900">Welcome</h1>

// ✅ GOOD
<Text variant="h1">Welcome</Text>
<Text variant="h1" className="text-center">Welcome</Text>

// Replace paragraphs
// ❌ BAD
<p className="text-sm text-gray-600">Description text</p>

// ✅ GOOD
<Text variant="body-sm" color="muted">Description text</Text>

// Replace spans
// ❌ BAD
<span className="font-medium text-gray-900">Label</span>

// ✅ GOOD
<Text as="span" weight="medium">Label</Text>

// Override element while keeping variant styles
<Text as="label" variant="body-sm" weight="medium">
  Form Label
</Text>

// Use theme colors
<Text variant="h2" color="primary">Primary Title</Text>
<Text variant="body" color="error">Error message</Text>

// Utility props
<Text variant="body" truncate>Very long text that will be truncated...</Text>
<Text variant="h3" center>Centered heading</Text>
<Text variant="caption" italic>Italic caption</Text>

// Responsive typography (built-in)
<Text variant="h1">
  {/* Automatically responsive: text-3xl sm:text-4xl lg:text-5xl */}
  Responsive Heading
</Text>
```

**Variants:**
- `h1`-`h6`: Heading variants with responsive sizing and default bold/semibold weights
- `body-lg`, `body`, `body-sm`: Body text variants with relaxed line-height
- `caption`: Small text for captions and helper text
- `overline`: Uppercase text with tracking for labels

**Color Props:**
Maps to theme colors: `primary`, `secondary`, `muted`, `success`, `warning`, `error`, `info`

**Why Use Text Component?**
1. **Consistency**: All text uses the same typography scale
2. **Responsive**: Mobile-first responsive sizing built-in
3. **Themeable**: Theme colors via props instead of utility classes
4. **Maintainability**: Update typography globally in one place
5. **Type-safe**: Full TypeScript support with proper element types
6. **Semantic**: Choose correct HTML element while maintaining visual style

---

## 📱 Responsive Design

### Mobile-First Approach

```typescript
// ✅ Good - Mobile first, then scale up
<div className="px-4 sm:px-6 lg:px-8">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl">
    Responsive Heading
  </h1>
</div>

// Breakpoints:
// sm: 640px   (tablets)
// md: 768px   (small laptops)
// lg: 1024px  (laptops)
// xl: 1280px  (desktops)
// 2xl: 1536px (large desktops)
```

### Responsive Grid Layout

```typescript
// src/components/services/ServiceList/ServiceList.tsx
export const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};
```

### Responsive Container

```typescript
export const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};
```

### Hide/Show at Breakpoints

```typescript
<div>
  {/* Show only on mobile */}
  <div className="block md:hidden">
    Mobile Menu
  </div>

  {/* Hide on mobile, show on desktop */}
  <div className="hidden md:block">
    Desktop Navigation
  </div>

  {/* Different layouts for different screens */}
  <div className="flex-col md:flex-row">
    Content
  </div>
</div>
```

---

## 🎭 Custom Colors & Themes

### Using Theme Colors

```typescript
// Primary colors
<button className="bg-primary-600 hover:bg-primary-700 text-white">
  Primary Action
</button>

// Secondary colors
<button className="bg-secondary-600 hover:bg-secondary-700 text-white">
  Secondary Action
</button>

// Status colors
<div className="bg-success-50 text-success-700 border border-success-500">
  Success message
</div>

<div className="bg-error-50 text-error-700 border border-error-500">
  Error message
</div>
```

### Custom Color Palette

```typescript
// Gradient backgrounds
<div className="bg-gradient-to-r from-primary-500 to-secondary-500">
  Gradient Content
</div>

// Gradient text
<h1 className="gradient-text text-4xl font-bold">
  Beautiful Gradient Text
</h1>
```

---

## 🌙 Dark Mode Support

### Setup Dark Mode

```typescript
// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    return saved || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
```

### Dark Mode Styles

```typescript
// Component with dark mode support
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h1 className="text-gray-900 dark:text-white">
    Title
  </h1>
  <p className="text-gray-600 dark:text-gray-300">
    Description
  </p>
</div>

// Button with dark mode
<button className="bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-600">
  Click me
</button>

// Card with dark mode
<div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-card">
  Card Content
</div>
```

### Theme Toggle Component

```typescript
// src/components/common/ThemeToggle/ThemeToggle.tsx
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <FiMoon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      ) : (
        <FiSun className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      )}
    </button>
  );
};
```

---

## ♿ Accessibility Considerations

### Focus States

```typescript
// Always provide visible focus states
<button className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Accessible Button
</button>

// Interactive elements
<a
  href="/services"
  className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded"
>
  Services
</a>
```

### Color Contrast

```typescript
// ✅ Good - High contrast
<div className="bg-gray-900 text-white">
  High contrast text
</div>

// ✅ Good - Appropriate text colors
<p className="text-gray-700">Body text</p>
<p className="text-gray-500">Secondary text</p>

// ❌ Avoid - Low contrast
<div className="bg-gray-300 text-gray-400">
  Low contrast (hard to read)
</div>
```

### Screen Reader Support

```typescript
// Use semantic HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// Add ARIA labels
<button aria-label="Close modal" className="...">
  <svg>...</svg>
</button>

// Hide decorative elements
<div aria-hidden="true" className="...">
  Decorative icon
</div>

// Skip to content link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded"
>
  Skip to content
</a>
```

### Keyboard Navigation

```typescript
// Make custom components keyboard accessible
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
  className="cursor-pointer focus:ring-2 focus:ring-primary-500"
>
  Custom clickable div
</div>
```

---

## 🎪 Common UI Patterns

### Loading Skeleton

```typescript
// src/components/common/Skeleton/Skeleton.tsx
export const Skeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse bg-gray-200 dark:bg-gray-700 rounded',
        className
      )}
    />
  );
};

// Usage
<div className="space-y-4">
  <Skeleton className="h-8 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-4 w-5/6" />
</div>
```

### Badge Component

```typescript
// src/components/common/Badge/Badge.tsx
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md'
}) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-success-50 text-success-700',
    warning: 'bg-warning-50 text-warning-700',
    error: 'bg-error-50 text-error-700',
    info: 'bg-info-50 text-info-700'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  };

  return (
    <span className={cn('inline-flex items-center rounded-full font-medium', variants[variant], sizes[size])}>
      {children}
    </span>
  );
};
```

### Modal/Dialog

```typescript
// src/components/common/Modal/Modal.tsx
import React from 'react';
import { createPortal } from 'react-dom';
import { FiX } from 'react-icons/fi';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={cn(
          'relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full animate-scale-in',
          sizes[size]
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
              aria-label="Close modal"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};
```

### Toast Notifications

```typescript
// Using react-toastify with custom styles
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// In App.tsx
<ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
  toastClassName="!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-white !shadow-lg"
  progressClassName="!bg-primary-600"
/>

// Usage
import { toast } from 'react-toastify';

toast.success('Booking confirmed!');
toast.error('Failed to book service');
toast.info('Check your email for confirmation');
toast.warning('Slot will be released in 5 minutes');
```

---

## ✨ Animation & Transitions

### Hover Effects

```typescript
// Button hover
<button className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg">
  Hover me
</button>

// Card hover
<div className="transition-all duration-200 hover:shadow-card-hover hover:-translate-y-1">
  Hover Card
</div>

// Link hover
<a className="relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all hover:after:w-full">
  Underline on hover
</a>
```

### Loading Animations

```typescript
// Spinner
<div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-primary-600" />

// Pulse
<div className="animate-pulse bg-gray-200 h-4 rounded" />

// Bounce
<div className="animate-bounce">
  ↓
</div>
```

### Page Transitions

```typescript
// Fade in animation
<div className="animate-fade-in">
  Content fades in
</div>

// Slide up animation
<div className="animate-slide-up">
  Content slides up
</div>

// Scale in animation
<div className="animate-scale-in">
  Content scales in
</div>
```

### Staggered Animations

```typescript
// List with staggered animation
<div className="space-y-4">
  {items.map((item, index) => (
    <div
      key={item.id}
      className="animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {item.name}
    </div>
  ))}
</div>
```

---

## 🛠️ Utility Functions

### Class Name Helper

```typescript
// src/utils/helpers.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Responsive Image Wrapper

```typescript
// src/components/common/Image/Image.tsx
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2';
}

export const Image: React.FC<ImageProps> = ({
  aspectRatio = '16/9',
  className,
  alt,
  ...props
}) => {
  const aspectRatios = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
    '1/1': 'aspect-square',
    '3/2': 'aspect-3/2'
  };

  return (
    <div className={cn('relative overflow-hidden', aspectRatios[aspectRatio])}>
      <img
        className={cn('absolute inset-0 w-full h-full object-cover', className)}
        alt={alt}
        loading="lazy"
        {...props}
      />
    </div>
  );
};
```

---

## 📝 Best Practices

### Core Principles

#### 1. **Use Radix UI Pattern for Reusable Components**

When creating reusable UI components, follow the established Radix UI pattern:

- Wrap Radix primitives with fully-styled versions
- Include all base styling (hover, focus, responsive, transitions)
- Support className override via `cn()` helper
- Use `forwardRef` for proper ref handling
- Mobile-first responsive - NO separate mobile/desktop code
- See the [Radix UI Component Pattern](#-radix-ui-component-pattern) section for details

```typescript
// ✅ GOOD - Styled Radix component with className override
import { NavigationMenuTrigger } from '@/components/common';

<NavigationMenuTrigger>Services</NavigationMenuTrigger>
<NavigationMenuTrigger className="text-red-600">Custom Color</NavigationMenuTrigger>

// ❌ BAD - Repetitive inline styling
<NavigationMenuPrimitive.Trigger className="group inline-flex items-center gap-1 px-3 py-2 text-sm sm:text-base font-medium text-gray-700 hover:text-primary-600...">
  Services
</NavigationMenuPrimitive.Trigger>

// ❌ BAD - Separate mobile/desktop implementations
{isMobile ? <MobileNav /> : <DesktopNav />}
```

#### 2. **NEVER Use Hardcoded Values**

All colors, spacing, and design values MUST use theme tokens defined in the `@theme` directive (Tailwind v4).

```typescript
// ✅ GOOD - Use design tokens
<div className="bg-primary-600 text-white p-4 rounded-lg">
  Content
</div>

// ❌ BAD - Hardcoded hex codes
<div style={{ backgroundColor: '#0284c7', padding: '13px' }}>
  Content
</div>

// ❌ BAD - Arbitrary Tailwind values
<div className="bg-[#0284c7] p-[13px] rounded-[7px]">
  Content
</div>
```

**Why?** Design tokens ensure consistent branding, easy theme updates, better maintainability, and accessibility compliance.

#### 2. **Mobile-First Responsive Design**

Start with mobile styles, then scale up to larger screens.

```typescript
// ✅ GOOD - Mobile first
<div className="px-4 sm:px-6 lg:px-8">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl">
    Responsive Heading
  </h1>
</div>

// ❌ BAD - Desktop first
<div className="px-8 lg:px-6 sm:px-4">
  <h1 className="text-4xl lg:text-3xl sm:text-2xl">
    Heading
  </h1>
</div>
```

#### 3. **Utility-First, Components Second**

Use utility classes directly in JSX. Extract to components only when patterns repeat 3+ times.

```typescript
// ✅ GOOD - Utility classes in JSX
<button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
  Click me
</button>

// ⚠️ ACCEPTABLE - Extract when reused 3+ times
export const Button = ({ children, variant = 'primary' }) => (
  <button className={cn(
    'px-4 py-2 rounded-lg transition-colors',
    variant === 'primary' && 'bg-primary-600 text-white hover:bg-primary-700'
  )}>
    {children}
  </button>
);
```

#### 4. **Accessibility First**

Every interactive element must have visible focus states, keyboard navigation support, proper ARIA labels, and sufficient color contrast.

### Semantic HTML

Always use proper semantic HTML elements instead of generic `<div>` and `<span>`.

```typescript
// ✅ GOOD - Semantic HTML
<nav aria-label="Main navigation">
  <ul className="flex gap-4">
    <li><a href="/" className="text-primary-600 hover:text-primary-700">Home</a></li>
    <li><a href="/services">Services</a></li>
  </ul>
</nav>

<main id="main-content">
  <article>
    <header>
      <h1 className="text-3xl font-bold">Article Title</h1>
      <time dateTime="2024-01-29">January 29, 2024</time>
    </header>
  </article>
</main>

// ❌ BAD - Generic divs everywhere
<div>
  <div className="flex gap-4">
    <div onClick={goHome}>Home</div>
    <div onClick={goServices}>Services</div>
  </div>
</div>
```

**Heading Hierarchy**: Maintain proper heading hierarchy (`h1` → `h2` → `h3`). Never skip levels.

**Form Labels**: Every form input must have an explicit label with `htmlFor` attribute.

### Design Tokens

**Spacing Scale**: Use standard spacing (multiples of 4px): `p-1` (4px), `p-2` (8px), `p-4` (16px), `p-6` (24px), `p-8` (32px)

**Typography Scale**: Use the typography scale for consistent text sizing: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`

**Color System**: Always use theme colors (`bg-primary-600`, `text-success-700`) - NEVER hardcoded hex codes

### Performance Best Practices

#### 1. Avoid Arbitrary Values

Arbitrary values bloat the CSS bundle and bypass design tokens.

```typescript
// ✅ GOOD - Use design tokens
<div className="p-4 text-base bg-primary-600">Content</div>

// ❌ BAD - Arbitrary values
<div className="p-[17px] text-[14.5px] bg-[#0284c7]">Content</div>
```

#### 2. Group Related Utilities

Keep related classes together for readability.

```typescript
// ✅ GOOD - Grouped by concern
<button className={cn(
  // Layout
  'flex items-center gap-2 px-4 py-2',
  // Typography
  'text-base font-medium',
  // Colors
  'bg-primary-600 text-white',
  // States
  'hover:bg-primary-700 focus:ring-2 focus:ring-primary-500',
  // Transitions
  'transition-colors duration-200'
)}>
  Button
</button>
```

#### 3. Use @apply Sparingly

Prefer utility classes in JSX. Use `@apply` only for truly global base styles.

#### 4. Optimize Images

Always use lazy loading and proper sizing classes.

```typescript
<img
  src="/images/service.jpg"
  alt="Haircut service"
  loading="lazy"
  className="w-full h-48 object-cover rounded-lg"
/>
```

### Common Pitfalls

#### 1. Missing Focus States

```typescript
// ❌ BAD - Removes focus outline without replacement
<button className="outline-none">Button</button>

// ✅ GOOD - Custom focus ring
<button className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
  Button
</button>
```

#### 2. Conflicting Classes

```typescript
// ❌ CONFUSING - Last class wins
<div className="p-4 p-6">{/* Actual padding: p-6 */}</div>

// ✅ BETTER - Use cn() helper for conditional styling
<div className={cn('p-4', isLarge && 'p-6')}>Content</div>
```

#### 3. Over-Nesting Responsive Classes

```typescript
// ❌ BAD - Too complex
<div className="p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 2xl:p-8">Content</div>

// ✅ BETTER - Simplified
<div className="p-4 lg:p-6 xl:p-8">Content</div>
```

### Quality Assurance Checklist

For every new component/page:

- [ ] **Keyboard Navigation**: Tab through all interactive elements
- [ ] **Screen Reader**: Test with VoiceOver (macOS) or NVDA (Windows)
- [ ] **Responsive**: Check layouts at `sm`, `md`, `lg`, `xl` breakpoints
- [ ] **Focus States**: All interactive elements have visible focus rings
- [ ] **Color Contrast**: Text meets WCAG 2.1 AA standards (4.5:1 ratio)
- [ ] **Semantic HTML**: Proper use of semantic elements
- [ ] **No Hardcoded Values**: All values use design tokens
- [ ] **Cross-Browser**: Test on Chrome, Firefox, Safari

### Consistency Guidelines

- Use spacing scale consistently (4, 8, 12, 16, 24, 32, etc.)
- Stick to color palette defined in config
- Follow typography scale (text-sm, text-base, text-lg, etc.)
- Use consistent border radius (rounded-lg for most elements)
- Apply consistent shadow scale (shadow-card, shadow-card-hover)
- NEVER use inline styles or arbitrary values
- Mobile-first responsive design always

---

## 📖 Additional Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)
- [Heroicons](https://heroicons.com/)
- [Tailwind Color Shades Generator](https://tailwindshades.com/)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

**Happy styling! 🎨**
