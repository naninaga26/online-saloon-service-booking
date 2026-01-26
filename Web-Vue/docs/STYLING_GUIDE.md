# 🎨 Styling Guide - Tailwind CSS in Vue 3

A comprehensive guide for styling Vue 3 components using Tailwind CSS, covering best practices, patterns, and common scenarios for the salon booking application.

## 📋 Table of Contents

- [🎯 Styling Philosophy](#-styling-philosophy)
- [🏗️ Tailwind Configuration](#️-tailwind-configuration)
- [🧩 Vue SFC Styling Patterns](#-vue-sfc-styling-patterns)
- [📱 Responsive Design](#-responsive-design)
- [🎭 Custom Themes](#-custom-themes)
- [🌙 Dark Mode](#-dark-mode)
- [♿ Accessibility](#-accessibility)
- [🎨 Common UI Patterns](#-common-ui-patterns)
- [💡 Best Practices](#-best-practices)

---

## 🎯 Styling Philosophy

Our styling approach follows these principles:

1. **Utility-First**: Use Tailwind CSS utility classes as the primary styling method
2. **Component Scoped**: Use scoped styles only when necessary
3. **Consistent Design**: Follow design system tokens (colors, spacing, typography)
4. **Responsive by Default**: Mobile-first responsive design
5. **Accessible**: Follow WCAG 2.1 AA standards
6. **Maintainable**: Clear, readable class names and organized styles

---

## 🏗️ Tailwind Configuration

### Basic Setup

```javascript
// tailwind.config.js
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          500: '#64748b',
          600: '#475569',
          700: '#334155'
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d'
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309'
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c'
        }
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Poppins', ...defaultTheme.fontFamily.sans]
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)'
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries')
  ]
};
```

### Import Tailwind in CSS

```css
/* src/assets/styles/main.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
@layer base {
  body {
    @apply bg-gray-50 text-gray-900 antialiased;
  }

  h1 {
    @apply text-4xl font-bold font-heading;
  }

  h2 {
    @apply text-3xl font-semibold font-heading;
  }

  h3 {
    @apply text-2xl font-semibold font-heading;
  }

  a {
    @apply text-primary-600 hover:text-primary-700 transition-colors;
  }
}

/* Custom components */
@layer components {
  .btn {
    @apply px-4 py-2 rounded-lg font-medium transition-all duration-200;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  }

  .btn-primary {
    @apply btn bg-primary-600 text-white hover:bg-primary-700;
    @apply focus:ring-primary-500;
  }

  .btn-secondary {
    @apply btn bg-secondary-600 text-white hover:bg-secondary-700;
    @apply focus:ring-secondary-500;
  }

  .card {
    @apply bg-white rounded-xl shadow-soft p-6;
    @apply border border-gray-100;
  }

  .input {
    @apply w-full px-4 py-2 rounded-lg border border-gray-300;
    @apply focus:border-primary-500 focus:ring-2 focus:ring-primary-200;
    @apply transition-colors;
  }
}

/* Custom utilities */
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

---

## 🧩 Vue SFC Styling Patterns

### Pattern 1: Pure Tailwind (Preferred)

```vue
<script setup lang="ts">
import { ref } from 'vue';

const isActive = ref(false);
</script>

<template>
  <button
    :class="[
      'px-6 py-3 rounded-lg font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      isActive
        ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500'
        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500'
    ]"
  >
    Click Me
  </button>
</template>
```

### Pattern 2: Computed Classes

```vue
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
});

const buttonClasses = computed(() => {
  const base = [
    'rounded-lg font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed'
  ];

  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return [
    ...base,
    variants[props.variant],
    sizes[props.size]
  ].join(' ');
});
</script>

<template>
  <button :class="buttonClasses" :disabled="disabled">
    <slot />
  </button>
</template>
```

### Pattern 3: Scoped Styles (When Necessary)

```vue
<script setup lang="ts">
import { ref } from 'vue';

const progress = ref(75);
</script>

<template>
  <div class="progress-container">
    <div
      class="progress-bar"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>

<style scoped>
.progress-container {
  @apply w-full h-2 bg-gray-200 rounded-full overflow-hidden;
}

.progress-bar {
  @apply h-full bg-primary-600 transition-all duration-300 ease-out;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  animation: progress-animation 1s linear infinite;
}

@keyframes progress-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 1rem 1rem;
  }
}
</style>
```

### Pattern 4: Dynamic Classes with v-bind

```vue
<script setup lang="ts">
import { ref } from 'vue';

const theme = ref({
  primary: '#3b82f6',
  radius: '0.5rem'
});
</script>

<template>
  <div class="themed-box">
    Content with dynamic theme
  </div>
</template>

<style scoped>
.themed-box {
  border-radius: v-bind('theme.radius');
  background-color: v-bind('theme.primary');
  @apply p-4 text-white;
}
</style>
```

---

## 📱 Responsive Design

### Breakpoints

Tailwind default breakpoints:
```javascript
{
  'sm': '640px',   // Small devices (landscape phones)
  'md': '768px',   // Medium devices (tablets)
  'lg': '1024px',  // Large devices (desktops)
  'xl': '1280px',  // Extra large devices (large desktops)
  '2xl': '1536px'  // 2X large devices (larger desktops)
}
```

### Mobile-First Responsive Design

```vue
<template>
  <!-- Mobile-first approach: base styles are for mobile -->
  <div class="
    grid
    grid-cols-1
    gap-4
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:gap-6
  ">
    <div
      v-for="item in items"
      :key="item.id"
      class="
        p-4
        bg-white
        rounded-lg
        shadow
        sm:p-6
        lg:p-8
      "
    >
      <h3 class="
        text-lg
        font-semibold
        md:text-xl
        lg:text-2xl
      ">
        {{ item.title }}
      </h3>
    </div>
  </div>
</template>
```

### Responsive Component Example

```vue
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const windowWidth = ref(window.innerWidth);

const isMobile = computed(() => windowWidth.value < 768);
const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024);
const isDesktop = computed(() => windowWidth.value >= 1024);

const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <!-- Show different layouts based on screen size -->
  <div v-if="isMobile" class="mobile-layout">
    <!-- Mobile layout -->
  </div>
  <div v-else-if="isTablet" class="tablet-layout">
    <!-- Tablet layout -->
  </div>
  <div v-else class="desktop-layout">
    <!-- Desktop layout -->
  </div>
</template>
```

### Container Queries

```vue
<template>
  <div class="@container">
    <div class="
      grid
      grid-cols-1
      @md:grid-cols-2
      @lg:grid-cols-3
      gap-4
    ">
      <!-- Content adapts to container size, not viewport -->
    </div>
  </div>
</template>
```

---

## 🎭 Custom Themes

### Theme Configuration with CSS Variables

```css
/* src/assets/styles/main.css */
@layer base {
  :root {
    --color-primary: 59 130 246;
    --color-secondary: 100 116 139;
    --color-success: 34 197 94;
    --color-warning: 245 158 11;
    --color-error: 239 68 68;
    --radius-sm: 0.25rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  [data-theme="dark"] {
    --color-primary: 96 165 250;
    --color-secondary: 148 163 184;
  }
}
```

### Theme Composable

```typescript
// composables/useTheme.ts
import { ref, computed, watch } from 'vue';
import { useLocalStorage } from '@/composables/useLocalStorage';

type Theme = 'light' | 'dark' | 'system';

export const useTheme = () => {
  const savedTheme = useLocalStorage<Theme>('theme', 'system');
  const currentTheme = ref<Theme>(savedTheme.value);

  const isDark = computed(() => {
    if (currentTheme.value === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return currentTheme.value === 'dark';
  });

  const setTheme = (theme: Theme) => {
    currentTheme.value = theme;
    savedTheme.value = theme;
    applyTheme();
  };

  const applyTheme = () => {
    if (isDark.value) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  };

  // Watch for system theme changes
  watch(currentTheme, applyTheme, { immediate: true });

  return {
    currentTheme,
    isDark,
    setTheme
  };
};
```

### Theme Switcher Component

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { currentTheme, setTheme } = useTheme();

const themes = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'system', label: 'System', icon: '💻' }
] as const;
</script>

<template>
  <div class="flex gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
    <button
      v-for="theme in themes"
      :key="theme.value"
      :class="[
        'px-3 py-2 rounded-md text-sm font-medium transition-colors',
        currentTheme === theme.value
          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow'
          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
      ]"
      @click="setTheme(theme.value)"
    >
      <span class="mr-1">{{ theme.icon }}</span>
      {{ theme.label }}
    </button>
  </div>
</template>
```

---

## 🌙 Dark Mode

### Dark Mode Configuration

```javascript
// tailwind.config.js
export default {
  darkMode: 'class', // or 'media' for system preference
  theme: {
    extend: {
      colors: {
        // Dark mode compatible colors
        gray: {
          950: '#0a0a0a'
        }
      }
    }
  }
};
```

### Dark Mode Component Styles

```vue
<template>
  <div class="
    bg-white dark:bg-gray-900
    text-gray-900 dark:text-gray-100
    border border-gray-200 dark:border-gray-800
  ">
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
      Title
    </h2>

    <p class="text-gray-600 dark:text-gray-400">
      Description text that adapts to dark mode
    </p>

    <button class="
      bg-primary-600 dark:bg-primary-500
      text-white
      hover:bg-primary-700 dark:hover:bg-primary-600
      px-4 py-2 rounded-lg
    ">
      Action
    </button>
  </div>
</template>
```

### Dark Mode Image Handling

```vue
<script setup lang="ts">
import { useTheme } from '@/composables/useTheme';

const { isDark } = useTheme();
</script>

<template>
  <img
    v-if="isDark"
    src="/images/logo-dark.svg"
    alt="Logo"
    class="h-8"
  />
  <img
    v-else
    src="/images/logo-light.svg"
    alt="Logo"
    class="h-8"
  />
</template>
```

---

## ♿ Accessibility

### Focus States

```vue
<template>
  <!-- Always include visible focus indicators -->
  <button class="
    px-4 py-2 rounded-lg
    bg-primary-600 text-white
    focus:outline-none
    focus:ring-2
    focus:ring-primary-500
    focus:ring-offset-2
    dark:focus:ring-offset-gray-900
  ">
    Accessible Button
  </button>

  <!-- Custom focus indicator -->
  <a
    href="#"
    class="
      text-primary-600
      focus:outline-none
      focus:underline
      focus:ring-2
      focus:ring-primary-500
      focus:ring-offset-2
      rounded
    "
  >
    Accessible Link
  </a>
</template>
```

### Screen Reader Only Content

```vue
<template>
  <button class="relative">
    <span class="sr-only">Close menu</span>
    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</template>

<style scoped>
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
  clip: rect(0, 0, 0, 0);
}
</style>
```

### Skip Links

```vue
<template>
  <a
    href="#main-content"
    class="
      sr-only
      focus:not-sr-only
      focus:absolute
      focus:top-4
      focus:left-4
      focus:z-50
      focus:px-4
      focus:py-2
      focus:bg-primary-600
      focus:text-white
      focus:rounded-lg
    "
  >
    Skip to main content
  </a>
</template>
```

### Color Contrast

```vue
<template>
  <!-- Ensure sufficient contrast ratios -->
  <!-- Good contrast (>= 4.5:1 for normal text) -->
  <p class="text-gray-900 dark:text-gray-100">
    High contrast text
  </p>

  <!-- Warning: Poor contrast -->
  <!-- <p class="text-gray-400">Low contrast text</p> -->

  <!-- Good contrast for large text (>= 3:1) -->
  <h1 class="text-3xl text-gray-700 dark:text-gray-300">
    Large heading with good contrast
  </h1>
</template>
```

---

## 🎨 Common UI Patterns

### Card Component

```vue
<script setup lang="ts">
interface Props {
  elevated?: boolean;
  hoverable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  elevated: false,
  hoverable: false
});
</script>

<template>
  <div
    :class="[
      'bg-white dark:bg-gray-800',
      'rounded-xl',
      'border border-gray-200 dark:border-gray-700',
      'p-6',
      'transition-all duration-200',
      elevated && 'shadow-lg',
      hoverable && 'hover:shadow-xl hover:scale-[1.02]'
    ]"
  >
    <slot />
  </div>
</template>
```

### Modal Component

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

interface Props {
  show: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.show) {
    emit('close');
  }
};

watch(() => props.show, (isShown) => {
  if (isShown) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(() => {
  document.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape);
  document.body.style.overflow = '';
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="emit('close')"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <!-- Modal -->
        <div class="flex min-h-full items-center justify-center p-4">
          <Transition
            enter-active-class="transition-all duration-200"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition-all duration-200"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <div
              v-if="show"
              class="
                relative
                w-full
                max-w-lg
                bg-white dark:bg-gray-800
                rounded-2xl
                shadow-2xl
                p-6
                animate-slide-up
              "
              @click.stop
            >
              <slot />
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
```

### Loading Skeleton

```vue
<template>
  <div class="animate-pulse space-y-4">
    <!-- Image skeleton -->
    <div class="bg-gray-300 dark:bg-gray-700 h-48 w-full rounded-lg" />

    <!-- Text skeletons -->
    <div class="space-y-3">
      <div class="bg-gray-300 dark:bg-gray-700 h-4 w-3/4 rounded" />
      <div class="bg-gray-300 dark:bg-gray-700 h-4 w-1/2 rounded" />
      <div class="bg-gray-300 dark:bg-gray-700 h-4 w-5/6 rounded" />
    </div>

    <!-- Button skeleton -->
    <div class="bg-gray-300 dark:bg-gray-700 h-10 w-32 rounded-lg" />
  </div>
</template>
```

### Toast Notification

```vue
<script setup lang="ts">
interface Props {
  type?: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info'
});

const typeStyles = {
  success: 'bg-success-50 border-success-500 text-success-900',
  error: 'bg-error-50 border-error-500 text-error-900',
  warning: 'bg-warning-50 border-warning-500 text-warning-900',
  info: 'bg-blue-50 border-blue-500 text-blue-900'
};
</script>

<template>
  <div
    :class="[
      'flex items-center gap-3',
      'px-4 py-3',
      'rounded-lg',
      'border-l-4',
      'shadow-soft',
      'animate-slide-down',
      typeStyles[type]
    ]"
  >
    <span>{{ message }}</span>
  </div>
</template>
```

### Badge Component

```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'gray';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'gray',
  size: 'md'
});

const variantStyles = {
  primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300',
  success: 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-300',
  warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-300',
  error: 'bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-300',
  gray: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
};

const sizeStyles = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base'
};
</script>

<template>
  <span
    :class="[
      'inline-flex items-center',
      'font-medium',
      'rounded-full',
      variantStyles[variant],
      sizeStyles[size]
    ]"
  >
    <slot />
  </span>
</template>
```

---

## 💡 Best Practices

### 1. Use Composition for Class Names

```vue
<script setup lang="ts">
import { computed } from 'vue';

// ✅ Good: Computed classes for complex logic
const buttonClasses = computed(() => [
  'base-classes',
  condition1 && 'conditional-class-1',
  condition2 ? 'true-class' : 'false-class'
].filter(Boolean).join(' '));
</script>

<template>
  <button :class="buttonClasses">Click</button>
</template>
```

### 2. Prefer Tailwind Over Custom CSS

```vue
<!-- ✅ Good: Use Tailwind utilities -->
<div class="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  Content
</div>

<!-- ❌ Avoid: Custom CSS when Tailwind can do it -->
<div class="custom-container">
  Content
</div>

<style scoped>
.custom-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
```

### 3. Extract Repeated Patterns

```css
/* ✅ Good: Extract common patterns to @layer components */
@layer components {
  .card-base {
    @apply bg-white dark:bg-gray-800 rounded-xl p-6 shadow-soft;
  }

  .button-base {
    @apply px-4 py-2 rounded-lg font-medium transition-colors;
    @apply focus:outline-none focus:ring-2 focus:ring-offset-2;
  }
}
```

### 4. Use Semantic Color Names

```javascript
// ✅ Good: Semantic color names
colors: {
  primary: { /* ... */ },
  success: { /* ... */ },
  error: { /* ... */ }
}

// ❌ Avoid: Generic color names
colors: {
  blue: { /* ... */ },
  green: { /* ... */ },
  red: { /* ... */ }
}
```

### 5. Maintain Consistent Spacing

```vue
<!-- ✅ Good: Consistent spacing scale -->
<div class="space-y-4">
  <div class="p-4">Item 1</div>
  <div class="p-4">Item 2</div>
  <div class="p-4">Item 3</div>
</div>

<!-- ❌ Avoid: Random spacing values -->
<div>
  <div class="p-3">Item 1</div>
  <div class="p-5">Item 2</div>
  <div class="p-2">Item 3</div>
</div>
```

### 6. Organize Class Names

```vue
<template>
  <!-- ✅ Good: Organized by category -->
  <div class="
    <!-- Layout -->
    flex items-center justify-between
    <!-- Spacing -->
    p-4 gap-4
    <!-- Colors -->
    bg-white text-gray-900
    <!-- Typography -->
    text-lg font-semibold
    <!-- Borders -->
    border border-gray-200 rounded-lg
    <!-- Effects -->
    shadow-soft hover:shadow-lg
    <!-- Transitions -->
    transition-all duration-200
  ">
    Content
  </div>
</template>
```

### 7. Use @apply Sparingly

```css
/* ✅ Good: Use @apply for truly reusable components */
@layer components {
  .btn-primary {
    @apply btn-base bg-primary-600 text-white hover:bg-primary-700;
  }
}

/* ❌ Avoid: Overusing @apply defeats utility-first purpose */
.everything {
  @apply flex items-center justify-center p-4 m-2 bg-white rounded shadow;
}
```

---

**Beautiful UIs with Tailwind CSS and Vue 3! 🎨**
