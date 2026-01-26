# 🎨 Styling Guide

A comprehensive guide for styling the React salon booking application using Tailwind CSS. This guide covers configuration, patterns, responsive design, and best practices.

## 📋 Table of Contents

- [🎯 Styling Philosophy](#-styling-philosophy)
- [⚙️ Tailwind CSS Configuration](#️-tailwind-css-configuration)
- [🎨 Utility-First Approach](#-utility-first-approach)
- [🧩 Component Styling Patterns](#-component-styling-patterns)
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

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Tailwind Configuration

**tailwind.config.js:**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode with class strategy
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        // Secondary colors
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        // Status colors
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          700: '#15803d',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          700: '#b45309',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          700: '#b91c1c',
        },
        info: {
          50: '#eff6ff',
          500: '#3b82f6',
          700: '#1d4ed8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
```

### PostCSS Configuration

**postcss.config.js:**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### CSS Entry Point

**src/index.css:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
@layer base {
  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-gray-50 text-gray-900 antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-heading font-semibold;
  }

  h1 {
    @apply text-4xl md:text-5xl;
  }

  h2 {
    @apply text-3xl md:text-4xl;
  }

  h3 {
    @apply text-2xl md:text-3xl;
  }

  /* Focus styles for accessibility */
  *:focus-visible {
    @apply outline-none ring-2 ring-primary-500 ring-offset-2;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    @apply w-2;
  }

  ::-webkit-scrollbar-track {
    @apply bg-gray-100;
  }

  ::-webkit-scrollbar-thumb {
    @apply bg-gray-300 rounded-full hover:bg-gray-400;
  }
}

/* Custom component styles */
@layer components {
  /* Button variants */
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200
           focus:outline-none focus:ring-2 focus:ring-offset-2
           disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-primary {
    @apply btn bg-primary-600 text-white hover:bg-primary-700
           focus:ring-primary-500 active:bg-primary-800;
  }

  .btn-secondary {
    @apply btn bg-secondary-600 text-white hover:bg-secondary-700
           focus:ring-secondary-500;
  }

  .btn-outline {
    @apply btn border-2 border-primary-600 text-primary-600
           hover:bg-primary-50 focus:ring-primary-500;
  }

  .btn-ghost {
    @apply btn text-gray-700 hover:bg-gray-100 focus:ring-gray-500;
  }

  /* Input styles */
  .input {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg
           focus:ring-2 focus:ring-primary-500 focus:border-transparent
           disabled:bg-gray-100 disabled:cursor-not-allowed
           placeholder:text-gray-400;
  }

  .input-error {
    @apply input border-red-500 focus:ring-red-500;
  }

  /* Card styles */
  .card {
    @apply bg-white rounded-lg shadow-card p-6;
  }

  .card-hover {
    @apply card transition-shadow duration-200 hover:shadow-card-hover;
  }

  /* Container */
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .animation-delay-200 {
    animation-delay: 200ms;
  }

  .animation-delay-400 {
    animation-delay: 400ms;
  }

  /* Gradient text */
  .gradient-text {
    @apply bg-gradient-to-r from-primary-600 to-secondary-600
           bg-clip-text text-transparent;
  }

  /* Glass morphism */
  .glass {
    @apply bg-white/80 backdrop-blur-md border border-white/20;
  }

  /* Truncate multiple lines */
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
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

### Do's and Don'ts

```typescript
// ✅ DO: Use semantic HTML
<nav>
  <ul>
    <li><a href="/">Home</a></li>
  </ul>
</nav>

// ❌ DON'T: Use divs for everything
<div>
  <div>
    <div onClick={handleClick}>Home</div>
  </div>
</div>

// ✅ DO: Use consistent spacing
<div className="space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

// ❌ DON'T: Use arbitrary margins
<div style={{ marginBottom: '17px' }}>Item 1</div>
<div style={{ marginBottom: '23px' }}>Item 2</div>

// ✅ DO: Mobile-first responsive
<div className="text-base md:text-lg lg:text-xl">
  Text
</div>

// ❌ DON'T: Desktop-first
<div className="text-xl lg:text-base">
  Text
</div>
```

### Performance Tips

1. **Use PurgeCSS**: Vite automatically removes unused CSS
2. **Avoid arbitrary values**: Use design tokens when possible
3. **Group similar utilities**: Keep related classes together
4. **Use @apply sparingly**: Prefer utility classes in JSX
5. **Optimize images**: Use next-gen formats (WebP) and lazy loading

### Consistency Guidelines

- Use spacing scale consistently (4, 8, 12, 16, 24, 32, etc.)
- Stick to color palette defined in config
- Follow typography scale (text-sm, text-base, text-lg, etc.)
- Use consistent border radius (rounded-lg for most elements)
- Apply consistent shadow scale (shadow-card, shadow-card-hover)

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
