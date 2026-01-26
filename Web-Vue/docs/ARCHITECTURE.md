# 🏗️ Vue 3 Architecture

This **living** document details the architectural and system design practices used to build a robust and maintainable Vue 3-based salon booking application using the Composition API, TypeScript, and modern Vue ecosystem.

> **💡 Remember**: These practices and patterns evolve with the project. When you discover better practices or encounter new challenges, update this document to help future devs.

> **🤖 Claude Code**: This document provides essential context for understanding the project structure, component patterns, and technical decisions. Follow these patterns when making changes or additions to the codebase.

## 📋 Table Of Contents

- [🧑‍🔬 Tech Stack](#-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
    - [📁 Directory Guidelines](#-directory-guidelines)
- [🧩 Component Philosophy](#-component-philosophy)
    - [1️⃣ Principles](#1️⃣-principles)
    - [📦 Component Categories](#-component-categories)
    - [⚡ Component Communication](#-component-communication)
- [🔄 State Management](#-state-management)
    - [🎯 State Management Strategy](#-state-management-strategy)
    - [🗄️ Pinia Store Patterns](#️-pinia-store-patterns)
- [🛣️ Routing Strategy](#️-routing-strategy)
    - [🔐 Route Protection](#-route-protection)
    - [🎨 Navigation Guards](#-navigation-guards)
- [🔐 Authentication & Authorization](#-authentication--authorization)
    - [🎫 JWT Token Management](#-jwt-token-management)
    - [🔒 Protected Routes](#-protected-routes)
- [🌐 API Integration](#-api-integration)
    - [🔌 Axios Configuration](#-axios-configuration)
    - [🎣 Composables Pattern](#-composables-pattern)
    - [🔄 Error Handling](#-error-handling)
- [🎨 Composables Architecture](#-composables-architecture)
- [⚡ Performance Optimization](#-performance-optimization)
- [🤖 Claude Code Guidelines](#-claude-code-guidelines)

---

## 🧑‍🔬 Tech Stack

- **Framework**: Vue 3.4+ (Composition API with `<script setup>`)
- **Language**: TypeScript 5.x
- **Build Tool**: Vite 5.x
- **State Management**: Pinia 2.x
- **Routing**: Vue Router 4.x
- **Styling**: Tailwind CSS 3.x
- **Form Handling**: VeeValidate 4.x
- **Validation**: Yup / Zod
- **HTTP Client**: Axios 1.x
- **Date/Time**: date-fns
- **Notifications**: Vue Toastification
- **Icons**: Heroicons / Lucide Vue
- **Payment**: Stripe Vue / Razorpay

> **📝 Note**: This excludes the tech stack for code quality and testing. For more details, see [QUALITY_STRATEGY](QUALITY_STRATEGY.md).

---

## 🏗️ Project Structure

The project follows a feature-based organization with clear separation of concerns optimized for Vue 3 Composition API:

```
Web-Vue/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── api/                          # API layer
│   │   ├── axios.config.ts           # Axios instance and interceptors
│   │   ├── auth.api.ts               # Auth API calls
│   │   ├── services.api.ts           # Services API calls
│   │   ├── slots.api.ts              # Slots API calls
│   │   ├── bookings.api.ts           # Bookings API calls
│   │   └── payments.api.ts           # Payments API calls
│   ├── assets/                       # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │       ├── main.css              # Tailwind imports
│   │       └── custom.css            # Custom styles
│   ├── components/                   # Reusable components
│   │   ├── common/                   # Generic UI components
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseInput.vue
│   │   │   ├── BaseCard.vue
│   │   │   ├── BaseModal.vue
│   │   │   ├── BaseLoader.vue
│   │   │   └── BaseSelect.vue
│   │   ├── layout/                   # Layout components
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppSidebar.vue
│   │   │   └── AppLayout.vue
│   │   ├── auth/                     # Authentication components
│   │   │   ├── LoginForm.vue
│   │   │   ├── RegisterForm.vue
│   │   │   └── ProtectedRoute.vue
│   │   ├── services/                 # Service-related components
│   │   │   ├── ServiceCard.vue
│   │   │   ├── ServiceList.vue
│   │   │   ├── ServiceDetails.vue
│   │   │   └── ServiceFilter.vue
│   │   ├── slots/                    # Slot-related components
│   │   │   ├── SlotCalendar.vue
│   │   │   ├── SlotPicker.vue
│   │   │   └── AvailabilityIndicator.vue
│   │   ├── booking/                  # Booking components
│   │   │   ├── BookingForm.vue
│   │   │   ├── BookingSummary.vue
│   │   │   ├── BookingCard.vue
│   │   │   └── BookingHistory.vue
│   │   └── payment/                  # Payment components
│   │       ├── PaymentForm.vue
│   │       ├── PaymentSuccess.vue
│   │       └── PaymentFailed.vue
│   ├── composables/                  # Custom composables
│   │   ├── useAuth.ts                # Authentication composable
│   │   ├── useServices.ts            # Services data composable
│   │   ├── useSlots.ts               # Slots data composable
│   │   ├── useBooking.ts             # Booking operations composable
│   │   ├── usePayment.ts             # Payment operations composable
│   │   ├── useDebounce.ts            # Debounce utility composable
│   │   ├── useToast.ts               # Toast notifications composable
│   │   └── useLocalStorage.ts        # LocalStorage utility composable
│   ├── views/                        # Page components (routes)
│   │   ├── Home.vue
│   │   ├── Services.vue
│   │   ├── ServiceDetails.vue
│   │   ├── Booking.vue
│   │   ├── BookingHistory.vue
│   │   ├── Profile.vue
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   └── NotFound.vue
│   ├── stores/                       # Pinia stores
│   │   ├── auth.ts                   # Auth store
│   │   ├── services.ts               # Services store
│   │   ├── slots.ts                  # Slots store
│   │   └── bookings.ts               # Bookings store
│   ├── types/                        # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   ├── service.types.ts
│   │   ├── slot.types.ts
│   │   ├── booking.types.ts
│   │   └── payment.types.ts
│   ├── utils/                        # Utility functions
│   │   ├── constants.ts              # App constants
│   │   ├── helpers.ts                # Helper functions
│   │   ├── validators.ts             # Validation utilities
│   │   ├── formatters.ts             # Formatting utilities
│   │   └── storage.ts                # LocalStorage utilities
│   ├── router/                       # Route configuration
│   │   └── index.ts
│   ├── App.vue                       # Root app component
│   ├── main.ts                       # App entry point
│   └── vite-env.d.ts                 # Vite type declarations
├── tests/                            # Test files
│   ├── unit/                         # Unit tests
│   ├── integration/                  # Integration tests
│   └── setup.ts                      # Test setup
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### 📁 Directory Guidelines

- **`/api`**: All API calls and Axios configuration. Organized by resource (auth, services, bookings)
- **`/components`**: Reusable components organized by domain/feature
- **`/components/common`**: Generic UI components with no business logic
- **`/composables`**: Reusable composition functions for business logic and state
- **`/views`**: Route-level components that compose smaller components
- **`/stores`**: Pinia stores for global state management
- **`/types`**: Global TypeScript type definitions and interfaces
- **`/utils`**: Pure utility functions with no side effects

---

## 🧩 Component Philosophy

### 1️⃣ Principles

- **Single Responsibility**: Each component should have one clear purpose
- **Composition Over Options**: Use Composition API with `<script setup>` syntax
- **Props-Driven**: Components should be configurable via props
- **Type-Safe**: Use TypeScript interfaces for props and emits
- **Declarative**: Describe what the UI should look like, not how to build it
- **Reusable**: Design components to be reused across different contexts

### 📦 Component Categories

#### 🎨 Common Components (`/components/common`)

- **Purpose**: Generic, reusable UI components with no business logic
- **Examples**: BaseButton, BaseInput, BaseCard, BaseModal, BaseLoader
- **Characteristics**:
    - Zero business logic
    - Highly configurable via props
    - TypeScript prop interfaces
    - Styled with Tailwind CSS
    - Include accessibility features

**Example: BaseButton Component**

```vue
<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  isLoading: false,
  disabled: false
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonClasses = computed(() => {
  const base = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  const disabled = (props.disabled || props.isLoading) ? 'opacity-50 cursor-not-allowed' : '';

  return `${base} ${variants[props.variant]} ${sizes[props.size]} ${disabled}`;
});

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.isLoading) {
    emit('click', event);
  }
};
</script>

<template>
  <button
    :class="buttonClasses"
    :disabled="disabled || isLoading"
    @click="handleClick"
  >
    <span v-if="isLoading" class="flex items-center gap-2">
      <span class="animate-spin">⏳</span>
      Loading...
    </span>
    <slot v-else />
  </button>
</template>
```

#### 🏗️ Layout Components (`/components/layout`)

- **Purpose**: Structure and layout of the application
- **Examples**: AppHeader, AppFooter, AppSidebar, AppLayout
- **Characteristics**:
    - Provide consistent structure
    - Handle navigation
    - May access global state (auth user info)

**Example: AppLayout Component**

```vue
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import AppHeader from './AppHeader.vue';
import AppFooter from './AppFooter.vue';

const { isAuthenticated } = useAuth();
</script>

<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />

    <main class="flex-1 container mx-auto px-4 py-8">
      <slot />
    </main>

    <AppFooter v-if="isAuthenticated" />
  </div>
</template>
```

#### 🎯 Feature Components

- **Purpose**: Domain-specific components with business logic
- **Examples**: ServiceCard, SlotPicker, BookingForm
- **Characteristics**:
    - Contains business logic
    - Uses composables for data and operations
    - Composes common components
    - Feature-specific styling

**Example: ServiceCard Component**

```vue
<script setup lang="ts">
import { computed } from 'vue';
import type { Service } from '@/types/service.types';
import BaseCard from '@/components/common/BaseCard.vue';
import BaseButton from '@/components/common/BaseButton.vue';

interface Props {
  service: Service;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  book: [serviceId: string];
}>();

const priceDisplay = computed(() => `$${props.service.price.toFixed(2)}`);
const tokenDisplay = computed(() => `$${props.service.tokenAmount.toFixed(2)}`);

const handleBook = () => {
  emit('book', props.service.id);
};
</script>

<template>
  <BaseCard class="hover:shadow-lg transition-shadow">
    <img
      :src="service.imageUrl"
      :alt="service.name"
      class="w-full h-48 object-cover rounded-t-lg"
    />

    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">
        {{ service.name }}
      </h3>

      <p class="text-gray-600 mb-4 line-clamp-2">
        {{ service.description }}
      </p>

      <div class="flex justify-between items-center mb-4">
        <div>
          <p class="text-sm text-gray-500">Duration</p>
          <p class="font-medium">{{ service.duration }} mins</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Price</p>
          <p class="font-medium text-lg">{{ priceDisplay }}</p>
        </div>
      </div>

      <div class="mb-4 p-3 bg-yellow-50 rounded-lg">
        <p class="text-sm text-yellow-800">
          Token: {{ tokenDisplay }} (non-refundable)
        </p>
      </div>

      <BaseButton
        variant="primary"
        class="w-full"
        @click="handleBook"
      >
        Book Now
      </BaseButton>
    </div>
  </BaseCard>
</template>
```

#### 📄 View Components (`/views`)

- **Purpose**: Route-level orchestration
- **Examples**: Home, Services, ServiceDetails, Booking
- **Characteristics**:
    - Minimal logic (mostly composition)
    - Handle route parameters
    - Compose feature components
    - Manage page-level state

**Example: Services View**

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useServices } from '@/composables/useServices';
import ServiceList from '@/components/services/ServiceList.vue';
import ServiceFilter from '@/components/services/ServiceFilter.vue';
import BaseLoader from '@/components/common/BaseLoader.vue';

const router = useRouter();
const { services, loading, error, fetchServices } = useServices();

const searchQuery = ref('');
const selectedCategory = ref<string | null>(null);

const filteredServices = computed(() => {
  return services.value.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = !selectedCategory.value || service.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const handleBook = (serviceId: string) => {
  router.push(`/services/${serviceId}`);
};

// Fetch services on mount
fetchServices();
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <h1 class="text-4xl font-bold mb-8">Our Services</h1>

    <ServiceFilter
      v-model:search="searchQuery"
      v-model:category="selectedCategory"
      class="mb-8"
    />

    <BaseLoader v-if="loading" class="py-12" />

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <ServiceList
      v-else
      :services="filteredServices"
      @book="handleBook"
    />
  </div>
</template>
```

### ⚡ Component Communication

**Data Flow Patterns:**

1. **Props** (Parent → Child): Default pattern for component communication
2. **Emits** (Child → Parent): For child component events
3. **Provide/Inject**: For deeply nested component trees
4. **Pinia Stores**: For complex global state management
5. **Composables**: For shared reactive state and logic

**Pattern Decision Matrix:**

| Use Case | Pattern | Example |
|----------|---------|---------|
| Parent → Child data | Props | `<BaseButton :disabled="loading" />` |
| Child → Parent events | Emits | `@click="handleClick"` |
| Deep component tree | Provide/Inject | Theme, locale settings |
| Global app state | Pinia | Auth state, cart |
| Shared logic | Composables | `useAuth()`, `useBooking()` |

---

## 🔄 State Management

### 🎯 State Management Strategy

**State Categories:**

1. **Local Component State**: `ref()`, `reactive()`, `computed()`
2. **Global Client State**: Pinia stores
3. **Server State**: Composables with API calls
4. **URL State**: Vue Router (query params, route params)
5. **Form State**: VeeValidate with reactive refs

### 🗄️ Pinia Store Patterns

**Store Structure with Composition API:**

```typescript
// stores/auth.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, LoginCredentials } from '@/types/auth.types';
import { authAPI } from '@/api/auth.api';
import { storage } from '@/utils/storage';

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null);
  const token = ref<string | null>(storage.getToken());
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value);
  const userRole = computed(() => user.value?.role || null);

  // Actions
  const login = async (credentials: LoginCredentials) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await authAPI.login(credentials);
      user.value = response.data.user;
      token.value = response.data.token;
      storage.setToken(response.data.token);
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Login failed';
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    storage.removeToken();
  };

  const fetchCurrentUser = async () => {
    if (!token.value) return;

    try {
      const response = await authAPI.getCurrentUser();
      user.value = response.data;
    } catch (err) {
      logout();
    }
  };

  return {
    // State
    user,
    token,
    loading,
    error,
    // Getters
    isAuthenticated,
    userRole,
    // Actions
    login,
    logout,
    fetchCurrentUser
  };
});
```

**Services Store Pattern:**

```typescript
// stores/services.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Service } from '@/types/service.types';
import { servicesAPI } from '@/api/services.api';

export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([]);
  const selectedService = ref<Service | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchServices = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await servicesAPI.getAll();
      services.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch services';
    } finally {
      loading.value = false;
    }
  };

  const fetchServiceById = async (id: string) => {
    loading.value = true;
    error.value = null;

    try {
      const response = await servicesAPI.getById(id);
      selectedService.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch service';
    } finally {
      loading.value = false;
    }
  };

  const selectService = (service: Service) => {
    selectedService.value = service;
  };

  const clearSelectedService = () => {
    selectedService.value = null;
  };

  return {
    services,
    selectedService,
    loading,
    error,
    fetchServices,
    fetchServiceById,
    selectService,
    clearSelectedService
  };
});
```

---

## 🛣️ Routing Strategy

**Route Configuration:**

```typescript
// router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home.vue'),
    meta: { title: 'Home' }
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/Services.vue'),
    meta: { title: 'Services' }
  },
  {
    path: '/services/:id',
    name: 'service-details',
    component: () => import('@/views/ServiceDetails.vue'),
    meta: { title: 'Service Details' },
    props: true
  },
  {
    path: '/booking',
    name: 'booking',
    component: () => import('@/views/Booking.vue'),
    meta: {
      requiresAuth: true,
      title: 'Book Service'
    }
  },
  {
    path: '/booking-history',
    name: 'booking-history',
    component: () => import('@/views/BookingHistory.vue'),
    meta: {
      requiresAuth: true,
      title: 'Booking History'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    meta: {
      requiresAuth: true,
      title: 'Profile'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: {
      guest: true,
      title: 'Login'
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue'),
    meta: {
      guest: true,
      title: 'Register'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: 'Page Not Found' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
```

### 🔐 Route Protection

```typescript
// router/index.ts (continued)
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // Update page title
  document.title = `${to.meta.title || 'Salon Booking'} | Salon Booking`;

  // Check if route requires authentication
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({
      name: 'login',
      query: { redirect: to.fullPath }
    });
    return;
  }

  // Redirect authenticated users away from guest pages
  if (to.meta.guest && authStore.isAuthenticated) {
    next({ name: 'home' });
    return;
  }

  next();
});
```

### 🎨 Navigation Guards

**Per-Route Guards:**

```vue
<script setup lang="ts">
import { onBeforeRouteLeave } from 'vue-router';
import { ref } from 'vue';

const hasUnsavedChanges = ref(false);

onBeforeRouteLeave((to, from, next) => {
  if (hasUnsavedChanges.value) {
    const answer = window.confirm('You have unsaved changes. Do you really want to leave?');
    if (answer) {
      next();
    } else {
      next(false);
    }
  } else {
    next();
  }
});
</script>
```

---

## 🔐 Authentication & Authorization

### 🎫 JWT Token Management

```typescript
// utils/storage.ts
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const storage = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  removeRefreshToken(): void {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  clear(): void {
    localStorage.clear();
  }
};
```

### 🔒 Protected Routes

See [Route Protection](#-route-protection) section above.

---

## 🌐 API Integration

### 🔌 Axios Configuration

```typescript
// api/axios.config.ts
import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth';
import { useToast } from '@/composables/useToast';
import router from '@/router';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore();

    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const authStore = useAuthStore();
    const toast = useToast();

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      authStore.logout();
      router.push('/login');
      toast.error('Session expired. Please login again.');
      return Promise.reject(error);
    }

    // Handle other errors
    const errorMessage = (error.response?.data as any)?.message || 'An error occurred';
    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export default api;
```

### 🎣 Composables Pattern

**Using Composables for API Calls:**

```typescript
// composables/useServices.ts
import { ref, readonly } from 'vue';
import { servicesAPI } from '@/api/services.api';
import type { Service } from '@/types/service.types';
import { useToast } from '@/composables/useToast';

export const useServices = () => {
  const services = ref<Service[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const toast = useToast();

  const fetchServices = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await servicesAPI.getAll();
      services.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch services';
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const getServiceById = async (id: string): Promise<Service | null> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await servicesAPI.getById(id);
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch service';
      toast.error(error.value);
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    services: readonly(services),
    loading: readonly(loading),
    error: readonly(error),
    fetchServices,
    getServiceById
  };
};
```

**Booking Composable:**

```typescript
// composables/useBooking.ts
import { ref, readonly } from 'vue';
import { bookingsAPI } from '@/api/bookings.api';
import type { Booking, CreateBookingData } from '@/types/booking.types';
import { useToast } from '@/composables/useToast';

export const useBooking = () => {
  const booking = ref<Booking | null>(null);
  const bookings = ref<Booking[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const toast = useToast();

  const createBooking = async (bookingData: CreateBookingData): Promise<Booking | null> => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingsAPI.create(bookingData);
      booking.value = response.data;
      toast.success('Booking created successfully!');
      return response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to create booking';
      toast.error(error.value);
      return null;
    } finally {
      loading.value = false;
    }
  };

  const fetchUserBookings = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await bookingsAPI.getUserBookings();
      bookings.value = response.data;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to fetch bookings';
      toast.error(error.value);
    } finally {
      loading.value = false;
    }
  };

  const cancelBooking = async (bookingId: string): Promise<boolean> => {
    loading.value = true;
    error.value = null;

    try {
      await bookingsAPI.cancel(bookingId);
      toast.success('Booking cancelled successfully');
      return true;
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Failed to cancel booking';
      toast.error(error.value);
      return false;
    } finally {
      loading.value = false;
    }
  };

  return {
    booking: readonly(booking),
    bookings: readonly(bookings),
    loading: readonly(loading),
    error: readonly(error),
    createBooking,
    fetchUserBookings,
    cancelBooking
  };
};
```

### 🔄 Error Handling

**Global Error Toast:**

```vue
<!-- App.vue -->
<script setup lang="ts">
import { useToast } from 'vue-toastification';

const toast = useToast();
</script>

<template>
  <RouterView />
</template>
```

**Toast Composable:**

```typescript
// composables/useToast.ts
import { useToast as useVueToast } from 'vue-toastification';

export const useToast = () => {
  const toast = useVueToast();

  return {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    info: (message: string) => toast.info(message),
    warning: (message: string) => toast.warning(message)
  };
};
```

---

## 🎨 Composables Architecture

**Composables Best Practices:**

1. **Single Responsibility**: Each composable should have one clear purpose
2. **Reactive State**: Return reactive refs/computed values
3. **Readonly Exposure**: Expose state as readonly when appropriate
4. **Error Handling**: Handle errors within composables
5. **Type Safety**: Use TypeScript interfaces

**Example: useDebounce Composable**

```typescript
// composables/useDebounce.ts
import { ref, watch, type Ref } from 'vue';

export const useDebounce = <T>(value: Ref<T>, delay: number = 300) => {
  const debouncedValue = ref<T>(value.value) as Ref<T>;
  let timeout: ReturnType<typeof setTimeout>;

  watch(value, (newValue) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  return debouncedValue;
};
```

**Example: useLocalStorage Composable**

```typescript
// composables/useLocalStorage.ts
import { ref, watch, type Ref } from 'vue';

export const useLocalStorage = <T>(key: string, defaultValue: T): Ref<T> => {
  const storedValue = localStorage.getItem(key);
  const value = ref<T>(storedValue ? JSON.parse(storedValue) : defaultValue) as Ref<T>;

  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }, { deep: true });

  return value;
};
```

---

## ⚡ Performance Optimization

**Optimization Strategies:**

1. **Code Splitting**: Lazy load routes and heavy components
2. **Virtual Scrolling**: For long lists (vue-virtual-scroller)
3. **Component Lazy Loading**: Use `defineAsyncComponent`
4. **Computed Values**: Cache expensive calculations
5. **Debouncing**: For search inputs and frequent updates
6. **Keep-Alive**: Cache component instances on route change
7. **v-once**: For static content that never changes
8. **v-memo**: For conditional rendering optimization

**Example: Lazy Loading Components**

```typescript
// Dynamic import for code splitting
const ServiceDetails = defineAsyncComponent(() =>
  import('@/components/services/ServiceDetails.vue')
);
```

**Example: Keep-Alive for Cached Routes**

```vue
<template>
  <RouterView v-slot="{ Component }">
    <KeepAlive :include="['Services', 'Home']">
      <component :is="Component" />
    </KeepAlive>
  </RouterView>
</template>
```

**Example: Computed Caching**

```vue
<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  items: Item[];
}>();

// Expensive calculation cached by computed
const processedItems = computed(() => {
  return props.items
    .filter(item => item.isActive)
    .sort((a, b) => a.priority - b.priority)
    .map(item => ({
      ...item,
      displayName: formatDisplayName(item)
    }));
});
</script>
```

**Example: Debounced Search**

```vue
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDebounce } from '@/composables/useDebounce';

const searchQuery = ref('');
const debouncedSearch = useDebounce(searchQuery, 500);

watch(debouncedSearch, (newValue) => {
  // Perform search with debounced value
  performSearch(newValue);
});
</script>
```

---

## 🤖 Claude Code Guidelines

### 📋 Quick Reference For AI Development

- **Component Creation**: Use `<script setup>` syntax with TypeScript
- **State Management**: Local state → Composables → Pinia (in order of preference)
- **File Organization**: Follow the directory structure strictly
- **TypeScript**: Always define prop types and return types
- **Testing**: Follow practices detailed in [QUALITY_STRATEGY](QUALITY_STRATEGY.md)
- **Styling**: Use Tailwind CSS utility classes, see [STYLING_GUIDE](STYLING_GUIDE.md)
- **API Calls**: Use composables with proper error handling
- **Forms**: Use VeeValidate with Yup/Zod validation

### 🔍 Before Making Changes

- Check existing patterns in similar components
- Verify the correct directory for new files
- Ensure types are properly defined
- Consider performance implications
- Update related documentation

### ✅ Common Patterns

**Good patterns:**
- Composition API with `<script setup>` syntax
- TypeScript interfaces for props and emits
- Custom composables for shared logic
- Proper error handling with try-catch
- Loading and error states in UI
- Accessibility attributes (ARIA labels, keyboard navigation)
- Tailwind CSS for styling

**Avoid:**
- Options API (use Composition API)
- Inline styles (use Tailwind classes)
- Direct API calls in components (use composables)
- Missing error handling
- Large components (break into smaller components)
- Mutating props directly

---

**This architecture provides a solid foundation for building scalable Vue 3 applications! 🚀**
