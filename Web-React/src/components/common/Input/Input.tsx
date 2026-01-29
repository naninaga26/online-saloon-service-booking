import React, { forwardRef } from 'react';
import { cn } from '@/utils/helpers';
import { Text } from '../Text';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
        <Text as="label" variant="body-sm" weight="medium" className="block text-gray-700 mb-1">
          {label}
          {props.required && <Text as="span" className="text-red-500 ml-1">*</Text>}
        </Text>
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
        <Text variant="body-sm" className="mt-1 text-red-500">{error}</Text>
      )}

      {hint && !error && (
        <Text variant="body-sm" className="mt-1 text-gray-500">{hint}</Text>
      )}
    </div>
  );
});

Input.displayName = 'Input';
