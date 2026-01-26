# 🏗️ React Architecture

This **living** document details the architectural and system design practices used to build a robust and maintainable React-based salon booking application.

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
    - [🗄️ Redux Toolkit Patterns](#️-redux-toolkit-patterns)
- [🛣️ Routing Strategy](#️-routing-strategy)
    - [🔐 Route Protection](#-route-protection)
    - [🎨 Error Boundaries](#-error-boundaries)
- [🔐 Authentication & Authorization](#-authentication--authorization)
    - [🎫 JWT Token Management](#-jwt-token-management)
    - [🔒 Protected Routes](#-protected-routes)
- [🌐 API Integration](#-api-integration)
    - [🔌 Axios Configuration](#-axios-configuration)
    - [🎣 Custom Hooks Pattern](#-custom-hooks-pattern)
    - [🔄 Error Handling](#-error-handling)
- [🎨 UI Component Architecture](#-ui-component-architecture)
- [⚡ Performance Optimization](#-performance-optimization)
- [🤖 Claude Code Guidelines](#-claude-code-guidelines)

---

## 🧑‍🔬 Tech Stack

- **Framework**: React 18 (with Hooks and Concurrent Features)
- **Language**: TypeScript 5.x
- **Build Tool**: Vite 5.x
- **State Management**: Redux Toolkit / Zustand
- **Server State**: TanStack Query (React Query) v5
- **Routing**: React Router v6
- **Styling**: Tailwind CSS 3.x
- **Form Handling**: React Hook Form 7.x
- **Validation**: Yup / Zod
- **HTTP Client**: Axios
- **Date/Time**: date-fns
- **Notifications**: React Toastify / Sonner
- **Icons**: React Icons / Lucide React
- **Payment**: Stripe React / Razorpay

> **📝 Note**: This excludes the tech stack for code quality and testing. For more details, see [QUALITY_STRATEGY](QUALITY_STRATEGY.md).

---

## 🏗️ Project Structure

The project follows a feature-based organization with clear separation of concerns:

```
Web-React/
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
│   ├── components/                   # Reusable components
│   │   ├── common/                   # Generic UI components
│   │   │   ├── Button/
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Button.test.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Loader/
│   │   │   └── ErrorBoundary/
│   │   ├── layout/                   # Layout components
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── Layout.tsx
│   │   ├── auth/                     # Authentication components
│   │   │   ├── LoginForm/
│   │   │   ├── RegisterForm/
│   │   │   └── ProtectedRoute/
│   │   ├── services/                 # Service-related components
│   │   │   ├── ServiceCard/
│   │   │   ├── ServiceList/
│   │   │   ├── ServiceDetails/
│   │   │   └── ServiceFilter/
│   │   ├── slots/                    # Slot-related components
│   │   │   ├── SlotCalendar/
│   │   │   ├── SlotPicker/
│   │   │   └── AvailabilityIndicator/
│   │   ├── booking/                  # Booking components
│   │   │   ├── BookingForm/
│   │   │   ├── BookingSummary/
│   │   │   ├── BookingCard/
│   │   │   └── BookingHistory/
│   │   └── payment/                  # Payment components
│   │       ├── PaymentForm/
│   │       ├── PaymentSuccess/
│   │       └── PaymentFailed/
│   ├── hooks/                        # Custom React hooks
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── useServices.ts            # Services data hook
│   │   ├── useSlots.ts               # Slots data hook
│   │   ├── useBooking.ts             # Booking operations hook
│   │   ├── usePayment.ts             # Payment operations hook
│   │   └── useDebounce.ts            # Debounce utility hook
│   ├── pages/                        # Page components (routes)
│   │   ├── Home/
│   │   │   ├── Home.tsx
│   │   │   └── Home.test.tsx
│   │   ├── Services/
│   │   ├── ServiceDetails/
│   │   ├── Booking/
│   │   ├── BookingHistory/
│   │   ├── Profile/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── NotFound/
│   ├── store/                        # Redux store (if using Redux)
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── servicesSlice.ts
│   │   │   ├── slotsSlice.ts
│   │   │   └── bookingsSlice.ts
│   │   ├── hooks.ts                  # Typed Redux hooks
│   │   └── store.ts                  # Store configuration
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
│   ├── routes/                       # Route configuration
│   │   └── index.tsx
│   ├── App.tsx                       # Root app component
│   ├── main.tsx                      # App entry point
│   └── vite-env.d.ts                 # Vite type declarations
├── tests/                            # Test configuration
│   ├── setup.ts
│   └── mocks/
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 📁 Directory Guidelines

- **`/api`**: All API calls and Axios configuration. Organized by resource (auth, services, bookings)
- **`/components`**: Reusable components organized by domain/feature
- **`/components/common`**: Generic UI components with no business logic
- **`/hooks`**: Custom React hooks for business logic and data fetching
- **`/pages`**: Route-level components that compose smaller components
- **`/store`**: Redux state management (if using Redux)
- **`/types`**: Global TypeScript type definitions
- **`/utils`**: Pure utility functions

---

## 🧩 Component Philosophy

### 1️⃣ Principles

- **Single Responsibility**: Each component should have one clear purpose
- **Composition Over Inheritance**: Build complex UIs by composing simple components
- **Props-Driven**: Components should be configurable via props
- **Functional Components**: Use function components with hooks (no class components)
- **Declarative**: Describe what the UI should look like, not how to build it
- **Reusable**: Design components to be reused across different contexts

### 📦 Component Categories

#### 🎨 Common Components (`/components/common`)

- **Purpose**: Generic, reusable UI components with no business logic
- **Examples**: Button, Input, Card, Modal, Loader
- **Characteristics**:
    - Zero business logic
    - Highly configurable via props
    - Include TypeScript prop types
    - Styled with Tailwind CSS
    - Include accessibility features

**Example: Button Component**

```typescript
// components/common/Button/Button.tsx
import React from 'react';
import { cn } from '@/utils/helpers';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'rounded-lg font-medium transition-colors focus:outline-none focus:ring-2';

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

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin">⏳</span>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
```

#### 🏗️ Layout Components (`/components/layout`)

- **Purpose**: Structure and layout of the application
- **Examples**: Header, Footer, Sidebar, Layout
- **Characteristics**:
    - Provide consistent structure
    - Handle navigation
    - May include global state (auth user info)

#### 🎯 Feature Components

- **Purpose**: Domain-specific components with business logic
- **Examples**: ServiceCard, SlotPicker, BookingForm
- **Characteristics**:
    - Contains business logic
    - Uses custom hooks for data
    - Composes common components
    - Feature-specific styling

**Example: ServiceCard Component**

```typescript
// components/services/ServiceCard/ServiceCard.tsx
import React from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Service } from '@/types/service.types';

interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <img
        src={service.imageUrl}
        alt={service.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
        <p className="text-gray-600 mb-4">{service.description}</p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Duration</p>
            <p className="font-medium">{service.duration} mins</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-medium text-lg">${service.price}</p>
          </div>
        </div>

        <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-800">
            Token: ${service.tokenAmount} (non-refundable)
          </p>
        </div>

        <Button
          variant="primary"
          className="w-full"
          onClick={() => onBook(service.id)}
        >
          Book Now
        </Button>
      </div>
    </Card>
  );
};
```

#### 📄 Page Components (`/pages`)

- **Purpose**: Route-level orchestration
- **Examples**: Home, Services, ServiceDetails, Booking
- **Characteristics**:
    - Minimal logic (mostly composition)
    - Handle route parameters
    - Compose feature components
    - Manage page-level state

### ⚡ Component Communication

**Data Flow Patterns:**

1. **Props** (Parent → Child): Default pattern for component communication
2. **Context API**: For truly global state (theme, auth status)
3. **Redux/Zustand**: For complex global state management
4. **React Query**: For server state (API data, caching)

**Pattern Decision Matrix:**

| Use Case | Pattern | Example |
|----------|---------|---------|
| Parent → Child data | Props | `<Button onClick={handleClick} />` |
| Global UI state | Context | Theme, language settings |
| Complex app state | Redux/Zustand | Shopping cart, multi-step forms |
| Server data | React Query | API data, background updates |

---

## 🔄 State Management

### 🎯 State Management Strategy

**State Categories:**

1. **Local Component State**: `useState`, `useReducer`
2. **Global Client State**: Redux Toolkit or Zustand
3. **Server State**: TanStack Query (React Query)
4. **URL State**: React Router (search params, route params)
5. **Form State**: React Hook Form

### 🗄️ Redux Toolkit Patterns

**Store Structure:**

```typescript
// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import servicesReducer from './slices/servicesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: servicesReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Typed Hooks:**

```typescript
// store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

**Slice Pattern:**

```typescript
// store/slices/authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authAPI } from '@/api/auth.api';
import { User } from '@/types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: false,
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }) => {
    const response = await authAPI.login(credentials);
    return response.data;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Login failed';
      });
  }
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
```

---

## 🛣️ Routing Strategy

**Route Configuration:**

```typescript
// routes/index.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Lazy load pages for code splitting
const Home = lazy(() => import('@/pages/Home'));
const Services = lazy(() => import('@/pages/Services'));
const ServiceDetails = lazy(() => import('@/pages/ServiceDetails'));
const Booking = lazy(() => import('@/pages/Booking'));
const BookingHistory = lazy(() => import('@/pages/BookingHistory'));
const Profile = lazy(() => import('@/pages/Profile'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'services',
        element: <Services />
      },
      {
        path: 'services/:id',
        element: <ServiceDetails />
      },
      {
        path: 'booking',
        element: (
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        )
      },
      {
        path: 'booking-history',
        element: (
          <ProtectedRoute>
            <BookingHistory />
          </ProtectedRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
]);
```

### 🔐 Route Protection

```typescript
// components/auth/ProtectedRoute/ProtectedRoute.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/common/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

### 🎨 Error Boundaries

```typescript
// components/common/ErrorBoundary/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
```

---

## 🔐 Authentication & Authorization

### 🎫 JWT Token Management

```typescript
// utils/storage.ts
export const storage = {
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },

  setToken: (token: string): void => {
    localStorage.setItem('token', token);
  },

  removeToken: (): void => {
    localStorage.removeItem('token');
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem('refreshToken');
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem('refreshToken', token);
  },

  removeRefreshToken: (): void => {
    localStorage.removeItem('refreshToken');
  },

  clear: (): void => {
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
import axios, { AxiosError, AxiosResponse } from 'axios';
import { storage } from '@/utils/storage';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      storage.removeToken();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || 'An error occurred';
    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export default api;
```

### 🎣 Custom Hooks Pattern

**Using React Query for Server State:**

```typescript
// hooks/useServices.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesAPI } from '@/api/services.api';
import { Service } from '@/types/service.types';
import { toast } from 'react-toastify';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: servicesAPI.getAll,
    select: (response) => response.data
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: ['services', id],
    queryFn: () => servicesAPI.getById(id),
    select: (response) => response.data,
    enabled: !!id
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: servicesAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Service created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create service');
    }
  });
};
```

### 🔄 Error Handling

**Global Error Toast:**

```typescript
// App.tsx
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
}
```

---

## 🎨 UI Component Architecture

**Component File Structure:**

```
ComponentName/
├── ComponentName.tsx       # Component implementation
├── ComponentName.test.tsx  # Component tests
├── ComponentName.stories.tsx (optional) # Storybook stories
└── index.ts               # Export barrel
```

**Component Template:**

```typescript
// components/[category]/ComponentName/ComponentName.tsx
import React from 'react';
import { cn } from '@/utils/helpers';

interface ComponentNameProps {
  // Props definition
  className?: string;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  className,
  ...props
}) => {
  return (
    <div className={cn('base-styles', className)}>
      {/* Component implementation */}
    </div>
  );
};
```

---

## ⚡ Performance Optimization

**Optimization Strategies:**

1. **Code Splitting**: Lazy load routes and heavy components
2. **Memoization**: Use `React.memo`, `useMemo`, `useCallback`
3. **Virtual Scrolling**: For long lists (react-window)
4. **Image Optimization**: Lazy loading, WebP format
5. **Debouncing**: For search inputs and frequent updates
6. **React Query Caching**: Automatic data caching and stale-while-revalidate

**Example: Memoization**

```typescript
import React, { useMemo, useCallback } from 'react';

const ExpensiveComponent: React.FC<Props> = ({ data, onUpdate }) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return expensiveCalculation(data);
  }, [data]);

  // Memoize callback functions
  const handleUpdate = useCallback((id: string) => {
    onUpdate(id);
  }, [onUpdate]);

  return <div>{/* Render component */}</div>;
};

// Memoize component to prevent unnecessary re-renders
export default React.memo(ExpensiveComponent);
```

---

## 🤖 Claude Code Guidelines

### 📋 Quick Reference For AI Development

- **Component Creation**: Check existing components first, follow established patterns
- **State Management**: Local state → React Query → Redux (in order of preference)
- **File Organization**: Follow the directory structure strictly
- **TypeScript**: Always define prop types and return types
- **Testing**: Follow practices detailed in [QUALITY_STRATEGY](QUALITY_STRATEGY.md)
- **Styling**: Use Tailwind CSS utility classes, see [STYLING_GUIDE](STYLING_GUIDE.md)
- **API Calls**: Use custom hooks with React Query
- **Forms**: Use React Hook Form with Yup/Zod validation

### 🔍 Before Making Changes

- Check existing patterns in similar components
- Verify the correct directory for new files
- Ensure types are properly defined
- Consider performance implications
- Update related documentation

### ✅ Common Patterns

**Good patterns:**
- Functional components with TypeScript
- Custom hooks for data fetching (React Query)
- Proper error handling with try-catch
- Loading and error states in UI
- Accessibility attributes (ARIA labels, keyboard navigation)
- Tailwind CSS for styling

**Avoid:**
- Class components (use functional components)
- Inline styles (use Tailwind classes)
- Direct API calls in components (use custom hooks)
- Missing error handling
- Prop drilling (use Context or Redux when appropriate)
