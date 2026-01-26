# 👨‍💻 Developer Guide

A comprehensive guide for developers working on the React salon booking frontend. This guide covers setup, development workflows, coding standards, and best practices.

## 📋 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [💻 Development Environment](#-development-environment)
- [🏗️ Project Setup](#️-project-setup)
- [📝 Coding Standards](#-coding-standards)
- [🔧 Development Workflows](#-development-workflows)
- [📦 Component Development](#-component-development)
- [🎣 Custom Hooks](#-custom-hooks)
- [📝 Form Handling](#-form-handling)
- [🌐 API Integration](#-api-integration)
- [🛠️ Common Tasks](#️-common-tasks)
- [🐛 Debugging](#-debugging)
- [❓ Troubleshooting](#-troubleshooting)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher ([Download](https://nodejs.org/))
- **npm**: v9.x or higher (comes with Node.js)
- **Git**: Latest version
- **VS Code**: Recommended IDE ([Download](https://code.visualstudio.com/))
- **Backend Service**: Running and accessible (see Backend-Service/README.md)

### Recommended VS Code Extensions

Install these extensions for the best development experience:

```
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Tailwind CSS IntelliSense (bradlc.vscode-tailwindcss)
- TypeScript Error Translator (mattpocock.ts-error-translator)
- Path Intellisense (christian-kohler.path-intellisense)
- ES7+ React/Redux/React-Native snippets (dsznajder.es7-react-js-snippets)
- Auto Rename Tag (formulahendry.auto-rename-tag)
- GitLens (eamodio.gitlens)
- Error Lens (usernamehw.errorlens)
- Console Ninja (wallabyjs.console-ninja)
```

### VS Code Settings

Add these settings to your workspace `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

---

## 💻 Development Environment

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd online-saloon-service-booking/Web-React
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:
   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   VITE_API_TIMEOUT=30000

   # Payment Gateway
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
   # OR
   VITE_RAZORPAY_KEY_ID=rzp_test_xxxxx

   # App Configuration
   VITE_APP_NAME=Salon Booking
   VITE_APP_URL=http://localhost:5173

   # Feature Flags
   VITE_ENABLE_DARK_MODE=true
   VITE_ENABLE_NOTIFICATIONS=true
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

5. **Verify Backend Connection:**
   - Ensure Backend Service is running at `http://localhost:5000`
   - Test API connectivity by visiting services page

---

## 🏗️ Project Setup

### Vite Configuration

The project uses Vite for blazing fast development and optimized builds.

**Key Vite Configuration (`vite.config.ts`):**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@api': path.resolve(__dirname, './src/api'),
      '@types': path.resolve(__dirname, './src/types'),
      '@assets': path.resolve(__dirname, './src/assets')
    }
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@headlessui/react', 'react-toastify'],
          'form-vendor': ['react-hook-form', 'yup'],
          'query-vendor': ['@tanstack/react-query', 'axios']
        }
      }
    }
  }
});
```

### TypeScript Configuration

**tsconfig.json:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@pages/*": ["./src/pages/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@utils/*": ["./src/utils/*"],
      "@api/*": ["./src/api/*"],
      "@types/*": ["./src/types/*"],
      "@assets/*": ["./src/assets/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### NPM Scripts

```json
{
  "dev": "vite",                                    // Start dev server
  "build": "tsc && vite build",                     // Build for production
  "preview": "vite preview",                        // Preview production build
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
  "lint:fix": "eslint . --ext ts,tsx --fix",        // Fix linting errors
  "format": "prettier --write \"src/**/*.{ts,tsx,css}\"", // Format code
  "type-check": "tsc --noEmit",                     // Type check without build
  "test": "vitest",                                 // Run tests
  "test:ui": "vitest --ui",                         // Run tests with UI
  "test:coverage": "vitest run --coverage",         // Generate coverage
  "test:e2e": "playwright test",                    // Run E2E tests
  "test:e2e:ui": "playwright test --ui"             // Run E2E with UI
}
```

---

## 📝 Coding Standards

### TypeScript Style Guide

#### 1. File Naming Conventions

```
Components:     Button.tsx, ServiceCard.tsx, SlotPicker.tsx
Pages:          Home.tsx, Services.tsx, BookingHistory.tsx
Hooks:          useAuth.ts, useServices.ts, useDebounce.ts
Types:          auth.types.ts, service.types.ts
Utils:          helpers.ts, formatters.ts, validators.ts
API:            auth.api.ts, services.api.ts
Tests:          Button.test.tsx, useAuth.test.ts
```

#### 2. Component Structure

**Always use functional components with TypeScript:**

```typescript
// ✅ Good
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  onClick,
  children,
  className
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn-${variant} btn-${size} ${className}`}
    >
      {children}
    </button>
  );
};

// ❌ Avoid - Class components
class Button extends React.Component<ButtonProps> {
  render() {
    return <button>{this.props.children}</button>;
  }
}
```

**Always define prop interfaces:**

```typescript
// ✅ Good
interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
  isLoading?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onBook,
  isLoading = false
}) => {
  // Implementation
};

// ❌ Avoid - No type definitions
export const ServiceCard = ({ service, onBook }) => {
  // Implementation
};
```

#### 3. Naming Conventions

```typescript
// Components: PascalCase
const ServiceCard = () => {};
const SlotPicker = () => {};

// Functions and variables: camelCase
const fetchServices = async () => {};
const isAuthenticated = true;

// Constants: SCREAMING_SNAKE_CASE
const MAX_BOOKING_DAYS = 30;
const API_BASE_URL = 'http://localhost:5000';

// Interfaces/Types: PascalCase
interface Service {}
type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

// Custom Hooks: camelCase starting with 'use'
const useAuth = () => {};
const useServices = () => {};

// Private functions: _prefixed (optional but recommended)
const _calculateTotal = (items: Item[]): number => {};
```

#### 4. Import Organization

**Order imports logically:**

```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party library imports
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// 3. Internal absolute imports (using @)
import { Button } from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';
import { servicesAPI } from '@/api/services.api';

// 4. Type imports
import type { Service } from '@/types/service.types';

// 5. Relative imports (avoid when possible)
import { formatDate } from '../utils/formatters';

// 6. CSS imports
import './ServiceCard.css';
```

#### 5. Error Handling

**Always handle errors gracefully:**

```typescript
// ✅ Good - Comprehensive error handling
const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading, error } = useService(id!);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <ErrorMessage
        message="Failed to load service details"
        retry={() => window.location.reload()}
      />
    );
  }

  if (!service) {
    return <NotFound />;
  }

  return <div>{/* Render service */}</div>;
};

// ❌ Avoid - No error handling
const ServiceDetails: React.FC = () => {
  const { data: service } = useService(id);
  return <div>{service.name}</div>; // Can crash if service is undefined
};
```

### React Best Practices

#### 1. Use Hooks Correctly

```typescript
// ✅ Good - Hooks at top level
const MyComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    // Effect logic
  }, []);

  return <div>{count}</div>;
};

// ❌ Avoid - Conditional hooks
const MyComponent: React.FC = () => {
  if (condition) {
    const [count, setCount] = useState(0); // ❌ Wrong!
  }
  return <div>Content</div>;
};
```

#### 2. Memoization for Performance

```typescript
import React, { useMemo, useCallback, memo } from 'react';

const ExpensiveComponent: React.FC<Props> = ({ data, onUpdate }) => {
  // Memoize expensive calculations
  const processedData = useMemo(() => {
    return data.map(item => expensiveOperation(item));
  }, [data]);

  // Memoize callback functions
  const handleUpdate = useCallback((id: string) => {
    onUpdate(id);
  }, [onUpdate]);

  return <div>{/* Render */}</div>;
};

// Memoize component to prevent unnecessary re-renders
export default memo(ExpensiveComponent);
```

#### 3. Custom Hook Patterns

```typescript
// ✅ Good - Reusable custom hook
export const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Usage
const SearchInput: React.FC = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // Fetch with debounced value
    fetchResults(debouncedSearch);
  }, [debouncedSearch]);

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
};
```

---

## 🔧 Development Workflows

### Adding a New Feature

Follow these steps when adding a new feature:

#### 1. Define Types

```typescript
// src/types/review.types.ts
export interface Review {
  id: string;
  serviceId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface CreateReviewDTO {
  serviceId: string;
  rating: number;
  comment: string;
}

export interface ReviewsResponse {
  items: Review[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
```

#### 2. Create API Functions

```typescript
// src/api/reviews.api.ts
import api from './axios.config';
import type { Review, CreateReviewDTO, ReviewsResponse } from '@/types/review.types';

export const reviewsAPI = {
  getAll: async (serviceId: string): Promise<ReviewsResponse> => {
    const response = await api.get(`/reviews`, { params: { serviceId } });
    return response.data;
  },

  create: async (data: CreateReviewDTO): Promise<Review> => {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/reviews/${id}`);
  }
};
```

#### 3. Create Custom Hook

```typescript
// src/hooks/useReviews.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewsAPI } from '@/api/reviews.api';
import { toast } from 'react-toastify';
import type { CreateReviewDTO } from '@/types/review.types';

export const useReviews = (serviceId: string) => {
  return useQuery({
    queryKey: ['reviews', serviceId],
    queryFn: () => reviewsAPI.getAll(serviceId),
    enabled: !!serviceId
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateReviewDTO) => reviewsAPI.create(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['reviews', variables.serviceId] });
      toast.success('Review submitted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  });
};
```

#### 4. Create Components

```typescript
// src/components/reviews/ReviewCard/ReviewCard.tsx
import React from 'react';
import { Card } from '@/components/common/Card';
import type { Review } from '@/types/review.types';
import { formatDate } from '@/utils/formatters';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {/* Star Rating */}
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {formatDate(review.createdAt)}
          </span>
        </div>
      </div>
      <p className="text-gray-700">{review.comment}</p>
    </Card>
  );
};
```

```typescript
// src/components/reviews/ReviewForm/ReviewForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/common/Button';
import { useCreateReview } from '@/hooks/useReviews';
import type { CreateReviewDTO } from '@/types/review.types';

const reviewSchema = yup.object({
  rating: yup.number().min(1).max(5).required('Rating is required'),
  comment: yup.string().min(10, 'Comment must be at least 10 characters').required('Comment is required')
});

interface ReviewFormProps {
  serviceId: string;
  onSuccess?: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ serviceId, onSuccess }) => {
  const { mutate: createReview, isPending } = useCreateReview();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateReviewDTO>({
    resolver: yupResolver(reviewSchema),
    defaultValues: { serviceId, rating: 5, comment: '' }
  });

  const onSubmit = (data: CreateReviewDTO) => {
    createReview(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Rating</label>
        <select {...register('rating')} className="w-full px-3 py-2 border rounded-lg">
          {[5, 4, 3, 2, 1].map(num => (
            <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
          ))}
        </select>
        {errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Comment</label>
        <textarea
          {...register('comment')}
          rows={4}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Share your experience..."
        />
        {errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment.message}</p>}
      </div>

      <Button type="submit" isLoading={isPending} className="w-full">
        Submit Review
      </Button>
    </form>
  );
};
```

#### 5. Create Page Component

```typescript
// src/pages/ServiceDetails/ServiceDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useService } from '@/hooks/useServices';
import { useReviews } from '@/hooks/useReviews';
import { ReviewCard } from '@/components/reviews/ReviewCard';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { Loader } from '@/components/common/Loader';

export const ServiceDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: service, isLoading: serviceLoading } = useService(id!);
  const { data: reviews, isLoading: reviewsLoading } = useReviews(id!);

  if (serviceLoading) return <Loader fullScreen />;
  if (!service) return <div>Service not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Service Details */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
        <p className="text-gray-600">{service.description}</p>
      </div>

      {/* Reviews Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviewsLoading ? (
          <Loader />
        ) : (
          <div className="space-y-4">
            {reviews?.items.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>

      {/* Review Form */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
        <ReviewForm serviceId={id!} />
      </div>
    </div>
  );
};
```

#### 6. Add Routes

```typescript
// src/routes/index.tsx
import { ReviewsPage } from '@/pages/Reviews';

// Add to router configuration
{
  path: 'services/:id/reviews',
  element: <ReviewsPage />
}
```

---

## 📦 Component Development

### Component File Structure

```
ComponentName/
├── ComponentName.tsx          # Component implementation
├── ComponentName.test.tsx     # Unit tests
└── index.ts                   # Export barrel
```

### Common Component Template

```typescript
// src/components/common/Card/Card.tsx
import React from 'react';
import { cn } from '@/utils/helpers';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'elevated';
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  onClick
}) => {
  const baseStyles = 'rounded-lg p-4';

  const variants = {
    default: 'bg-white border border-gray-200',
    outlined: 'bg-transparent border-2 border-gray-300',
    elevated: 'bg-white shadow-lg'
  };

  return (
    <div
      className={cn(baseStyles, variants[variant], className)}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </div>
  );
};
```

```typescript
// src/components/common/Card/index.ts
export { Card } from './Card';
export type { CardProps } from './Card';
```

---

## 🎣 Custom Hooks

### Hook Development Pattern

```typescript
// src/hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {
  // Get from localStorage
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Save to localStorage
  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
```

### Common Hook Patterns

**useAuth Hook:**

```typescript
// src/hooks/useAuth.ts
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { login, logout, setUser } from '@/store/slices/authSlice';
import type { LoginCredentials } from '@/types/auth.types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading, error } = useAppSelector(state => state.auth);

  const handleLogin = async (credentials: LoginCredentials) => {
    return dispatch(login(credentials)).unwrap();
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: handleLogin,
    logout: handleLogout
  };
};
```

---

## 📝 Form Handling

### React Hook Form with Yup Validation

**Complete Form Example:**

```typescript
// src/components/booking/BookingForm/BookingForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import type { CreateBookingDTO } from '@/types/booking.types';

const bookingSchema = yup.object({
  serviceId: yup.string().required('Service is required'),
  slotId: yup.string().required('Time slot is required'),
  bookingDate: yup.date()
    .min(new Date(), 'Booking date must be in the future')
    .required('Booking date is required'),
  notes: yup.string().max(500, 'Notes must be less than 500 characters').optional()
});

interface BookingFormProps {
  serviceId: string;
  onSubmit: (data: CreateBookingDTO) => Promise<void>;
}

export const BookingForm: React.FC<BookingFormProps> = ({ serviceId, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<CreateBookingDTO>({
    resolver: yupResolver(bookingSchema),
    defaultValues: {
      serviceId,
      slotId: '',
      notes: ''
    }
  });

  const onFormSubmit = async (data: CreateBookingDTO) => {
    try {
      await onSubmit(data);
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <Input
        label="Time Slot"
        {...register('slotId')}
        error={errors.slotId?.message}
        required
      />

      <Input
        label="Booking Date"
        type="date"
        {...register('bookingDate')}
        error={errors.bookingDate?.message}
        required
      />

      <div>
        <label className="block text-sm font-medium mb-1">
          Notes (Optional)
        </label>
        <textarea
          {...register('notes')}
          rows={4}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Any special requests or notes..."
        />
        {errors.notes && (
          <p className="text-red-500 text-sm mt-1">{errors.notes.message}</p>
        )}
      </div>

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full"
      >
        Book Now
      </Button>
    </form>
  );
};
```

---

## 🌐 API Integration

### Axios Configuration with Interceptors

```typescript
// src/api/axios.config.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { storage } from '@/utils/storage';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError<{ message: string }>) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && originalRequest) {
      storage.clear();
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
      return Promise.reject(error);
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      toast.error('You do not have permission to perform this action');
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

### API Pattern with React Query

```typescript
// src/api/services.api.ts
import api from './axios.config';
import type { Service, CreateServiceDTO, UpdateServiceDTO } from '@/types/service.types';

export const servicesAPI = {
  getAll: async (params?: { category?: string; search?: string }) => {
    return await api.get<Service[]>('/services', { params });
  },

  getById: async (id: string) => {
    return await api.get<Service>(`/services/${id}`);
  },

  create: async (data: CreateServiceDTO) => {
    return await api.post<Service>('/services', data);
  },

  update: async (id: string, data: UpdateServiceDTO) => {
    return await api.put<Service>(`/services/${id}`, data);
  },

  delete: async (id: string) => {
    return await api.delete(`/services/${id}`);
  }
};
```

---

## 🛠️ Common Tasks

### Adding a New Page

1. Create page component in `/src/pages/NewPage/`
2. Add route in `/src/routes/index.tsx`
3. Add navigation link in Header component
4. Create necessary API functions
5. Create custom hooks for data fetching
6. Write tests

### Adding a New Common Component

1. Create component directory in `/src/components/common/NewComponent/`
2. Implement component with TypeScript props
3. Add Tailwind CSS styling
4. Export from `index.ts`
5. Write unit tests
6. Document props and usage

### Adding Environment Variable

1. Add to `.env` file: `VITE_NEW_VARIABLE=value`
2. Update `.env.example` with placeholder
3. Update TypeScript types in `vite-env.d.ts`:
   ```typescript
   interface ImportMetaEnv {
     readonly VITE_NEW_VARIABLE: string;
   }
   ```
4. Use in code: `import.meta.env.VITE_NEW_VARIABLE`

---

## 🐛 Debugging

### React DevTools

Install React DevTools browser extension for debugging:
- Component tree inspection
- Props and state inspection
- Performance profiling

### VS Code Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Debug React App in Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```

### Console Logging Best Practices

```typescript
// Use console groups for complex debugging
console.group('Booking Flow');
console.log('Service:', service);
console.log('Selected Slot:', selectedSlot);
console.log('User:', user);
console.groupEnd();

// Use console.table for arrays/objects
console.table(bookings);

// Use console.time for performance
console.time('API Call');
await fetchServices();
console.timeEnd('API Call');
```

### Common Debugging Scenarios

**1. Component Not Updating:**
- Check dependencies in `useEffect`, `useMemo`, `useCallback`
- Verify state updates are immutable
- Check React DevTools for re-renders

**2. API Call Issues:**
- Check Network tab in DevTools
- Verify request headers (Authorization token)
- Check API base URL configuration
- Verify CORS settings on backend

**3. Form Not Submitting:**
- Check form validation errors
- Verify `onSubmit` handler is attached
- Check browser console for errors
- Use React Hook Form DevTools

---

## ❓ Troubleshooting

### Common Issues

#### 1. Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

#### 2. TypeScript Errors

```bash
# Type check without building
npm run type-check

# Clear TypeScript cache
rm -rf node_modules/.cache
```

#### 3. Build Failures

```bash
# Check for TypeScript errors
npm run type-check

# Check for linting errors
npm run lint

# Build with verbose output
npm run build -- --debug
```

#### 4. Environment Variables Not Working

- Ensure variable starts with `VITE_`
- Restart dev server after changing `.env`
- Check variable is defined in TypeScript types
- Use `import.meta.env.VITE_VARIABLE_NAME`

#### 5. CORS Errors

- Verify backend CORS configuration
- Check `VITE_API_BASE_URL` in `.env`
- Use Vite proxy configuration if needed
- Check browser console for specific CORS error

#### 6. Hot Reload Not Working

```bash
# Restart dev server
# Check Vite configuration
# Verify file watching is enabled
# Check file permissions
```

### Getting Help

- Check [ARCHITECTURE.md](./ARCHITECTURE.md) for design patterns
- Check [STYLING_GUIDE.md](./STYLING_GUIDE.md) for Tailwind CSS usage
- Check [QUALITY_STRATEGY.md](./QUALITY_STRATEGY.md) for testing guidelines
- Review existing code for similar implementations
- Check browser console and Network tab
- Use React DevTools for component debugging

---

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Yup Validation](https://github.com/jquense/yup)

---

**Happy coding! 🚀**
