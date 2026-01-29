import React from 'react';
import { cn } from '@/utils/helpers';

type TextElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-lg'
  | 'body'
  | 'body-sm'
  | 'caption'
  | 'overline';

type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The HTML element to render
   * @default 'p'
   */
  as?: TextElement;

  /**
   * Typography variant that controls size and line height
   * @default 'body'
   */
  variant?: TextVariant;

  /**
   * Font weight
   * @default Varies by variant (headings: 'semibold', body: 'normal')
   */
  weight?: TextWeight;

  /**
   * Text color from theme
   * @default undefined (inherits parent color)
   */
  color?: TextColor;

  /**
   * Truncate text with ellipsis
   * @default false
   */
  truncate?: boolean;

  /**
   * Center align text
   * @default false
   */
  center?: boolean;

  /**
   * Apply italic styling
   * @default false
   */
  italic?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Text content
   */
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, string> = {
  h1: 'text-3xl sm:text-4xl lg:text-5xl leading-tight',
  h2: 'text-2xl sm:text-3xl lg:text-4xl leading-tight',
  h3: 'text-xl sm:text-2xl lg:text-3xl leading-snug',
  h4: 'text-lg sm:text-xl lg:text-2xl leading-snug',
  h5: 'text-base sm:text-lg lg:text-xl leading-normal',
  h6: 'text-sm sm:text-base lg:text-lg leading-normal',
  'body-lg': 'text-base sm:text-lg leading-relaxed',
  'body': 'text-sm sm:text-base leading-relaxed',
  'body-sm': 'text-xs sm:text-sm leading-relaxed',
  'caption': 'text-xs leading-normal',
  'overline': 'text-xs uppercase tracking-wide leading-normal',
};

const weightStyles: Record<TextWeight, string> = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const colorStyles: Record<TextColor, string> = {
  primary: 'text-primary-600',
  secondary: 'text-secondary-600',
  muted: 'text-gray-500',
  success: 'text-success-700',
  warning: 'text-warning-700',
  error: 'text-error-700',
  info: 'text-info-700',
};

// Default weights for different variants
const defaultWeights: Partial<Record<TextVariant, TextWeight>> = {
  h1: 'bold',
  h2: 'bold',
  h3: 'semibold',
  h4: 'semibold',
  h5: 'semibold',
  h6: 'semibold',
  'body-lg': 'normal',
  'body': 'normal',
  'body-sm': 'normal',
  'caption': 'normal',
  'overline': 'semibold',
};

// Default elements for different variants
const defaultElements: Partial<Record<TextVariant, TextElement>> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-lg': 'p',
  'body': 'p',
  'body-sm': 'p',
  'caption': 'span',
  'overline': 'span',
};

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as,
      variant = 'body',
      weight,
      color,
      truncate = false,
      center = false,
      italic = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Determine the element to render
    const Component = as || defaultElements[variant] || 'p';

    // Determine the weight to use
    const finalWeight = weight || defaultWeights[variant] || 'normal';

    const classes = cn(
      // Base styles
      'font-sans antialiased',
      // Variant styles
      variantStyles[variant],
      // Weight styles
      weightStyles[finalWeight],
      // Color styles
      color && colorStyles[color],
      // Utility styles
      truncate && 'truncate',
      center && 'text-center',
      italic && 'italic',
      // Custom classes
      className
    );

    return React.createElement(
      Component,
      {
        ref,
        className: classes,
        ...props,
      },
      children
    );
  }
);

Text.displayName = 'Text';
