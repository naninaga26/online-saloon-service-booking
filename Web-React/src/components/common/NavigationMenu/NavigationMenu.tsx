import React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/helpers';

// Root
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

// List
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn('flex items-center justify-center gap-1 sm:gap-2 lg:gap-4', className)}
    {...props}
  />
));
NavigationMenuList.displayName = 'NavigationMenuList';

// Item
const NavigationMenuItem = NavigationMenuPrimitive.Item;

// Trigger
const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
    showChevron?: boolean;
  }
>(({ className, children, showChevron = true, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      'group inline-flex items-center gap-1 px-3 py-2',
      'text-sm sm:text-base font-medium text-gray-700',
      'hover:text-primary-600 hover:bg-gray-50',
      'rounded-lg transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-primary-500',
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

// Content
const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      'data-[motion=from-start]:animate-fade-in',
      'data-[motion=from-end]:animate-fade-in',
      'data-[motion=to-start]:animate-fade-out',
      'data-[motion=to-end]:animate-fade-out',
      className
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = 'NavigationMenuContent';

// Link
const NavigationMenuLink = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Link
    ref={ref}
    className={cn(
      'block px-3 py-2',
      'text-sm sm:text-base font-medium text-gray-700',
      'hover:text-primary-600 hover:bg-gray-50',
      'rounded-lg transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-primary-500',
      className
    )}
    {...props}
  />
));
NavigationMenuLink.displayName = 'NavigationMenuLink';

// Indicator
const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      'top-full z-[1] flex h-2 items-end justify-center overflow-hidden',
      'data-[state=visible]:animate-fade-in',
      'data-[state=hidden]:animate-fade-out',
      'transition-all',
      className
    )}
    {...props}
  >
    <div className="relative top-[70%] h-2 w-2 rotate-45 rounded-tl-sm bg-white border-l border-t border-gray-200" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

// Viewport
const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className="absolute left-0 top-full flex w-full justify-center perspective-[2000px]">
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      className={cn(
        'relative mt-2 origin-top-center overflow-hidden',
        'h-[var(--radix-navigation-menu-viewport-height)]',
        'w-full sm:w-[var(--radix-navigation-menu-viewport-width)]',
        'rounded-xl border border-gray-200 bg-white shadow-lg',
        'data-[state=open]:animate-scale-in',
        'data-[state=closed]:animate-fade-out',
        'transition-all duration-300',
        className
      )}
      {...props}
    />
  </div>
));
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

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
