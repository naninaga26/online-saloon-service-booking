# 🧪 Testing Strategy

A comprehensive testing guide for the React salon booking frontend covering unit tests, integration tests, E2E tests, and testing best practices.

## 📋 Table of Contents

- [🎯 Testing Philosophy](#-testing-philosophy)
- [🧑‍🔬 Tech Stack](#-tech-stack)
- [📊 Test Coverage Goals](#-test-coverage-goals)
- [🔬 Unit Testing](#-unit-testing)
- [🔗 Integration Testing](#-integration-testing)
- [🎭 E2E Testing](#-e2e-testing)
- [🏗️ Test Structure](#️-test-structure)
- [🛠️ Testing Utilities](#️-testing-utilities)
- [🎯 Best Practices](#-best-practices)
- [🚀 Running Tests](#-running-tests)

---

## 🎯 Testing Philosophy

Our testing strategy follows these principles:

1. **Test User Behavior**: Test from the user's perspective, not implementation details
2. **Confidence Over Coverage**: Aim for meaningful tests that provide confidence
3. **Fast Feedback**: Tests should run quickly to encourage frequent execution
4. **Isolated Tests**: Each test should be independent and not rely on others
5. **Maintainable Tests**: Write tests that are easy to understand and maintain
6. **Accessibility Testing**: Ensure components are accessible

**Testing Pyramid:**

```
        /\
       /  \
      / E2E \
     /--------\
    /Integration\
   /--------------\
  /   Unit Tests   \
 /------------------\
```

---

## 🧑‍🔬 Tech Stack

- **Test Framework**: Vitest
- **Component Testing**: React Testing Library
- **DOM Testing**: @testing-library/dom
- **User Event Simulation**: @testing-library/user-event
- **E2E Testing**: Playwright / Cypress
- **Coverage**: Vitest Coverage (c8)
- **Mocking**: MSW (Mock Service Worker)
- **Test Data Generation**: @faker-js/faker

### Installation

```bash
# Core testing dependencies
npm install -D vitest @vitest/ui @vitest/coverage-v8

# React Testing Library
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# Mock Service Worker for API mocking
npm install -D msw

# Playwright for E2E testing
npm install -D @playwright/test

# Faker for test data
npm install -D @faker-js/faker
```

---

## 📊 Test Coverage Goals

Maintain these minimum coverage thresholds:

```javascript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      },
      exclude: [
        'node_modules/',
        'src/main.tsx',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/types/**',
        '**/*.d.ts',
        '**/vite.config.ts'
      ]
    }
  }
});
```

**Priority Areas for Higher Coverage (90%+):**
- Custom hooks
- Utility functions
- Business logic functions
- Form validation schemas

**Lower Priority (70%+ acceptable):**
- UI components with minimal logic
- Layout components
- Pages (tested via E2E)

---

## 🔬 Unit Testing

### Test Setup

**vitest.config.ts:**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@api': path.resolve(__dirname, './src/api'),
      '@types': path.resolve(__dirname, './src/types')
    }
  }
});
```

**tests/setup.ts:**

```typescript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock scrollTo
window.scrollTo = vi.fn();
```

### Component Testing

**Example: Button Component Test**

```typescript
// src/components/common/Button/Button.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant styles', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary-600');

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary-600');
  });

  it('disables button when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows loading state', () => {
    render(<Button isLoading>Loading</Button>);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('renders with left and right icons', () => {
    render(
      <Button
        leftIcon={<span data-testid="left-icon">←</span>}
        rightIcon={<span data-testid="right-icon">→</span>}
      >
        Button
      </Button>
    );

    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Button</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
```

**Example: ServiceCard Component Test**

```typescript
// src/components/services/ServiceCard/ServiceCard.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceCard } from './ServiceCard';
import type { Service } from '@/types/service.types';

const mockService: Service = {
  id: '1',
  name: 'Haircut',
  description: 'Professional haircut service',
  price: 50,
  duration: 45,
  tokenAmount: 10,
  category: 'Hair',
  imageUrl: 'https://example.com/haircut.jpg',
  isActive: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01')
};

describe('ServiceCard', () => {
  it('renders service information correctly', () => {
    render(<ServiceCard service={mockService} onBook={vi.fn()} />);

    expect(screen.getByText('Haircut')).toBeInTheDocument();
    expect(screen.getByText('Professional haircut service')).toBeInTheDocument();
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('45 mins')).toBeInTheDocument();
    expect(screen.getByText(/\$10.*non-refundable/i)).toBeInTheDocument();
  });

  it('displays service image with correct alt text', () => {
    render(<ServiceCard service={mockService} onBook={vi.fn()} />);

    const image = screen.getByRole('img', { name: /haircut/i });
    expect(image).toHaveAttribute('src', mockService.imageUrl);
  });

  it('calls onBook with service id when book button is clicked', async () => {
    const handleBook = vi.fn();
    const user = userEvent.setup();

    render(<ServiceCard service={mockService} onBook={handleBook} />);

    await user.click(screen.getByRole('button', { name: /book now/i }));
    expect(handleBook).toHaveBeenCalledWith(mockService.id);
  });

  it('applies hover effect on card', async () => {
    const { container } = render(<ServiceCard service={mockService} onBook={vi.fn()} />);
    const card = container.firstChild as HTMLElement;

    expect(card).toHaveClass('hover:shadow-lg');
  });
});
```

### Hook Testing

**Example: useAuth Hook Test**

```typescript
// src/hooks/useAuth.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useAuth } from './useAuth';
import authReducer from '@/store/slices/authSlice';

const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState: initialState
  });
};

const wrapper = ({ children, store }: any) => (
  <Provider store={store}>{children}</Provider>
);

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns initial unauthenticated state', () => {
    const store = createMockStore();
    const { result } = renderHook(() => useAuth(), {
      wrapper: (props) => wrapper({ ...props, store })
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
  });

  it('handles successful login', async () => {
    const store = createMockStore();
    const { result } = renderHook(() => useAuth(), {
      wrapper: (props) => wrapper({ ...props, store })
    });

    const credentials = {
      email: 'test@example.com',
      password: 'password123'
    };

    // Mock successful login response
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe'
    };

    // Trigger login
    await result.current.login(credentials);

    await waitFor(() => {
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.user).toEqual(mockUser);
    });
  });

  it('handles logout', () => {
    const initialState = {
      auth: {
        user: { id: '1', email: 'test@example.com' },
        token: 'mock-token',
        isAuthenticated: true,
        loading: false,
        error: null
      }
    };

    const store = createMockStore(initialState);
    const { result } = renderHook(() => useAuth(), {
      wrapper: (props) => wrapper({ ...props, store })
    });

    result.current.logout();

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBe(null);
    expect(localStorage.getItem('token')).toBe(null);
  });
});
```

**Example: useDebounce Hook Test**

```typescript
// src/hooks/useDebounce.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('debounces value changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    expect(result.current).toBe('initial');

    // Change value
    rerender({ value: 'updated', delay: 500 });

    // Value should not update immediately
    expect(result.current).toBe('initial');

    // Fast-forward time
    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current).toBe('updated');
    });
  });

  it('cancels previous timeout on rapid changes', async () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'initial', delay: 500 }
      }
    );

    rerender({ value: 'first', delay: 500 });
    vi.advanceTimersByTime(250);

    rerender({ value: 'second', delay: 500 });
    vi.advanceTimersByTime(250);

    rerender({ value: 'third', delay: 500 });
    vi.advanceTimersByTime(500);

    await waitFor(() => {
      expect(result.current).toBe('third');
    });
  });
});
```

### Utility Function Testing

**Example: Formatter Utilities Test**

```typescript
// src/utils/formatters.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, formatDuration } from './formatters';

describe('formatCurrency', () => {
  it('formats USD currency correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
    expect(formatCurrency(0)).toBe('$0.00');
    expect(formatCurrency(999999.99)).toBe('$999,999.99');
  });

  it('handles negative values', () => {
    expect(formatCurrency(-50)).toBe('-$50.00');
  });
});

describe('formatDate', () => {
  it('formats date in readable format', () => {
    const date = new Date('2024-12-25T10:30:00');
    expect(formatDate(date)).toBe('Dec 25, 2024');
  });

  it('handles different date formats', () => {
    expect(formatDate('2024-01-01')).toBe('Jan 1, 2024');
  });
});

describe('formatDuration', () => {
  it('formats minutes correctly', () => {
    expect(formatDuration(30)).toBe('30 mins');
    expect(formatDuration(60)).toBe('1 hour');
    expect(formatDuration(90)).toBe('1 hour 30 mins');
    expect(formatDuration(120)).toBe('2 hours');
  });
});
```

---

## 🔗 Integration Testing

### API Integration Testing with MSW

**Setup Mock Service Worker:**

```typescript
// tests/mocks/handlers.ts
import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:5000/api/v1';

export const handlers = [
  // Auth endpoints
  http.post(`${API_BASE_URL}/auth/login`, async ({ request }) => {
    const body = await request.json();

    if (body.email === 'test@example.com' && body.password === 'password123') {
      return HttpResponse.json({
        success: true,
        data: {
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'John',
            lastName: 'Doe'
          },
          token: 'mock-jwt-token'
        }
      });
    }

    return HttpResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  }),

  // Services endpoints
  http.get(`${API_BASE_URL}/services`, () => {
    return HttpResponse.json({
      success: true,
      data: [
        {
          id: '1',
          name: 'Haircut',
          description: 'Professional haircut',
          price: 50,
          duration: 45,
          tokenAmount: 10
        },
        {
          id: '2',
          name: 'Hair Coloring',
          description: 'Complete hair coloring',
          price: 150,
          duration: 120,
          tokenAmount: 30
        }
      ]
    });
  }),

  http.get(`${API_BASE_URL}/services/:id`, ({ params }) => {
    const { id } = params;

    return HttpResponse.json({
      success: true,
      data: {
        id,
        name: 'Haircut',
        description: 'Professional haircut',
        price: 50,
        duration: 45,
        tokenAmount: 10
      }
    });
  }),

  // Bookings endpoints
  http.post(`${API_BASE_URL}/bookings`, async ({ request }) => {
    const body = await request.json();

    return HttpResponse.json({
      success: true,
      data: {
        id: 'booking-1',
        ...body,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    });
  })
];
```

```typescript
// tests/mocks/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

```typescript
// tests/setup.ts (add to existing setup)
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Testing Components with API Calls

**Example: ServiceList Integration Test**

```typescript
// src/components/services/ServiceList/ServiceList.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ServiceList } from './ServiceList';

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    {children}
  </QueryClientProvider>
);

describe('ServiceList Integration', () => {
  it('fetches and displays services', async () => {
    render(<ServiceList />, { wrapper });

    // Show loading state
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    // Wait for services to load
    await waitFor(() => {
      expect(screen.getByText('Haircut')).toBeInTheDocument();
      expect(screen.getByText('Hair Coloring')).toBeInTheDocument();
    });

    // Verify service details
    expect(screen.getByText('$50')).toBeInTheDocument();
    expect(screen.getByText('$150')).toBeInTheDocument();
  });

  it('handles API errors gracefully', async () => {
    // Override handler to return error
    server.use(
      http.get(`${API_BASE_URL}/services`, () => {
        return HttpResponse.json(
          { success: false, message: 'Server error' },
          { status: 500 }
        );
      })
    );

    render(<ServiceList />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(/error loading services/i)).toBeInTheDocument();
    });
  });
});
```

### Form Integration Testing

**Example: BookingForm Integration Test**

```typescript
// src/components/booking/BookingForm/BookingForm.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingForm } from './BookingForm';

describe('BookingForm Integration', () => {
  it('submits form with valid data', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<BookingForm serviceId="service-1" onSubmit={handleSubmit} />);

    // Fill in form
    await user.type(screen.getByLabelText(/time slot/i), 'slot-1');
    await user.type(screen.getByLabelText(/booking date/i), '2024-12-25');
    await user.type(screen.getByLabelText(/notes/i), 'Please arrive 10 minutes early');

    // Submit form
    await user.click(screen.getByRole('button', { name: /book now/i }));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({
        serviceId: 'service-1',
        slotId: 'slot-1',
        bookingDate: expect.any(Date),
        notes: 'Please arrive 10 minutes early'
      });
    });
  });

  it('shows validation errors for invalid data', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<BookingForm serviceId="service-1" onSubmit={handleSubmit} />);

    // Try to submit without filling fields
    await user.click(screen.getByRole('button', { name: /book now/i }));

    await waitFor(() => {
      expect(screen.getByText(/time slot is required/i)).toBeInTheDocument();
      expect(screen.getByText(/booking date is required/i)).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('prevents submission with past date', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<BookingForm serviceId="service-1" onSubmit={handleSubmit} />);

    // Fill with past date
    await user.type(screen.getByLabelText(/booking date/i), '2020-01-01');
    await user.click(screen.getByRole('button', { name: /book now/i }));

    await waitFor(() => {
      expect(screen.getByText(/date must be in the future/i)).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
```

---

## 🎭 E2E Testing

### Playwright Setup

**playwright.config.ts:**

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

### E2E Test Examples

**Example: Complete Booking Flow**

```typescript
// tests/e2e/booking-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Complete Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('user can complete booking flow', async ({ page }) => {
    // 1. Navigate to services
    await page.click('text=Services');
    await expect(page).toHaveURL(/\/services/);

    // 2. Select a service
    await page.click('text=Haircut');
    await expect(page).toHaveURL(/\/services\/\w+/);

    // 3. Check service details are displayed
    await expect(page.locator('h1')).toContainText('Haircut');
    await expect(page.locator('text=$50')).toBeVisible();

    // 4. Click Book Now (should redirect to login if not authenticated)
    await page.click('button:has-text("Book Now")');

    // 5. Login
    if (page.url().includes('/login')) {
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'password123');
      await page.click('button:has-text("Login")');

      // Should redirect back to service details
      await expect(page).toHaveURL(/\/services\/\w+/);
    }

    // 6. Select date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateString = tomorrow.toISOString().split('T')[0];

    await page.fill('input[type="date"]', dateString);

    // 7. Select time slot
    await page.click('.slot-picker button:has-text("10:00 AM")');

    // 8. Add notes
    await page.fill('textarea[name="notes"]', 'Please arrive 10 minutes early');

    // 9. Proceed to payment
    await page.click('button:has-text("Proceed to Payment")');

    // 10. Verify booking summary
    await expect(page.locator('text=Booking Summary')).toBeVisible();
    await expect(page.locator('text=Haircut')).toBeVisible();
    await expect(page.locator(`text=${dateString}`)).toBeVisible();

    // 11. Complete payment (mocked in test environment)
    await page.click('button:has-text("Confirm & Pay")');

    // 12. Verify success
    await expect(page).toHaveURL(/\/booking\/success/);
    await expect(page.locator('text=Booking Confirmed')).toBeVisible();
  });

  test('shows error for unavailable slot', async ({ page }) => {
    await page.goto('/services/1');

    // Select date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await page.fill('input[type="date"]', tomorrow.toISOString().split('T')[0]);

    // Click on unavailable slot
    await page.click('.slot-picker button:disabled');

    // Should not proceed
    await expect(page.locator('text=This slot is not available')).toBeVisible();
  });
});
```

**Example: Authentication Flow**

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('user can register and login', async ({ page }) => {
    // 1. Navigate to register page
    await page.goto('/register');

    // 2. Fill registration form
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'SecurePass123!');
    await page.fill('input[name="confirmPassword"]', 'SecurePass123!');

    // 3. Submit form
    await page.click('button[type="submit"]');

    // 4. Should redirect to home or services
    await expect(page).toHaveURL(/\/(home|services)?$/);

    // 5. Verify user is logged in
    await expect(page.locator('text=John Doe')).toBeVisible();
  });

  test('shows validation errors for invalid input', async ({ page }) => {
    await page.goto('/register');

    // Submit without filling form
    await page.click('button[type="submit"]');

    // Should show validation errors
    await expect(page.locator('text=First name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
    await expect(page.locator('text=Password is required')).toBeVisible();
  });

  test('user can logout', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Logout
    await page.click('button:has-text("Logout")');

    // Should redirect to home
    await expect(page).toHaveURL('/');

    // Login button should be visible
    await expect(page.locator('a:has-text("Login")')).toBeVisible();
  });
});
```

**Example: Accessibility Testing**

```typescript
// tests/e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('home page should not have accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('services page should be keyboard navigable', async ({ page }) => {
    await page.goto('/services');

    // Tab through interactive elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();

    // Should be able to activate focused element with Enter
    await page.keyboard.press('Enter');
  });

  test('forms should have proper labels', async ({ page }) => {
    await page.goto('/login');

    // All inputs should have associated labels
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toHaveAttribute('aria-label');

    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toHaveAttribute('aria-label');
  });
});
```

---

## 🏗️ Test Structure

### File Organization

```
tests/
├── setup.ts                      # Test setup and global mocks
├── utils/                        # Test utilities
│   ├── renderWithProviders.tsx   # Custom render function
│   ├── testData.ts               # Test data generators
│   └── mockData.ts               # Mock data
├── mocks/                        # MSW handlers
│   ├── handlers.ts               # API mock handlers
│   └── server.ts                 # MSW server setup
├── unit/                         # Unit tests (if separated)
│   ├── hooks/
│   └── utils/
├── integration/                  # Integration tests
│   └── components/
└── e2e/                          # E2E tests
    ├── auth.spec.ts
    ├── booking-flow.spec.ts
    └── navigation.spec.ts
```

### Custom Render Function

```typescript
// tests/utils/renderWithProviders.tsx
import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';

const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });
};

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any;
  store?: any;
  queryClient?: QueryClient;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    queryClient = createTestQueryClient(),
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            {children}
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export everything
export * from '@testing-library/react';
```

---

## 🛠️ Testing Utilities

### Test Data Generators

```typescript
// tests/utils/testData.ts
import { faker } from '@faker-js/faker';
import type { Service, User, Booking } from '@/types';

export const createMockUser = (overrides = {}): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: faker.phone.number(),
  createdAt: faker.date.past(),
  ...overrides,
});

export const createMockService = (overrides = {}): Service => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: Number(faker.commerce.price()),
  duration: faker.number.int({ min: 30, max: 180 }),
  tokenAmount: faker.number.int({ min: 5, max: 50 }),
  category: faker.helpers.arrayElement(['Hair', 'Nails', 'Spa', 'Makeup']),
  imageUrl: faker.image.url(),
  isActive: true,
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
  ...overrides,
});

export const createMockBooking = (overrides = {}): Booking => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  serviceId: faker.string.uuid(),
  slotId: faker.string.uuid(),
  bookingDate: faker.date.future(),
  status: faker.helpers.arrayElement(['pending', 'confirmed', 'cancelled']),
  notes: faker.lorem.sentence(),
  createdAt: faker.date.past(),
  ...overrides,
});
```

---

## 🎯 Best Practices

### Testing Best Practices

1. **Write tests that resemble user behavior**
   ```typescript
   // ✅ Good - Test from user perspective
   const user = userEvent.setup();
   await user.click(screen.getByRole('button', { name: /submit/i }));
   expect(screen.getByText(/success/i)).toBeInTheDocument();

   // ❌ Avoid - Testing implementation details
   const component = wrapper.find(Button);
   expect(component.prop('onClick')).toBeDefined();
   ```

2. **Use accessible queries**
   ```typescript
   // ✅ Good - Accessible queries
   screen.getByRole('button', { name: /submit/i });
   screen.getByLabelText(/email/i);
   screen.getByText(/welcome/i);

   // ❌ Avoid - Non-accessible queries
   screen.getByTestId('submit-button');
   screen.getByClassName('btn-primary');
   ```

3. **Test user interactions**
   ```typescript
   // ✅ Good - Realistic user interactions
   const user = userEvent.setup();
   await user.type(screen.getByLabelText(/email/i), 'test@example.com');
   await user.click(screen.getByRole('button'));

   // ❌ Avoid - Direct state manipulation
   fireEvent.change(input, { target: { value: 'test@example.com' } });
   ```

4. **Use proper assertions**
   ```typescript
   // ✅ Good - Specific assertions
   expect(screen.getByRole('alert')).toHaveTextContent('Error occurred');
   expect(button).toBeDisabled();

   // ❌ Avoid - Generic assertions
   expect(wrapper.html()).toContain('Error');
   expect(button.disabled).toBe(true);
   ```

5. **Clean up after tests**
   ```typescript
   // React Testing Library automatically cleans up
   // But for custom cleanup:
   afterEach(() => {
     cleanup();
     vi.clearAllMocks();
   });
   ```

### Common Patterns

**Testing Async Code:**
```typescript
// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument();
});

// Wait for element to disappear
await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
```

**Testing Error States:**
```typescript
server.use(
  http.get('/api/services', () => {
    return HttpResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  })
);

render(<ServiceList />);

await waitFor(() => {
  expect(screen.getByText(/error/i)).toBeInTheDocument();
});
```

**Testing Forms:**
```typescript
const user = userEvent.setup();

await user.type(screen.getByLabelText(/email/i), 'test@example.com');
await user.type(screen.getByLabelText(/password/i), 'password123');
await user.click(screen.getByRole('button', { name: /login/i }));

await waitFor(() => {
  expect(mockLogin).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123'
  });
});
```

---

## 🚀 Running Tests

### NPM Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest watch",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:e2e:headed": "playwright test --headed"
  }
}
```

### Running Tests

```bash
# Run all unit/integration tests
npm test

# Run tests with UI
npm run test:ui

# Run tests once (CI mode)
npm run test:run

# Generate coverage report
npm run test:coverage

# Run specific test file
npm test -- src/components/Button/Button.test.tsx

# Run tests in watch mode
npm run test:watch

# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode
npm run test:e2e:headed
```

### CI Configuration

**Example GitHub Actions:**

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test:run

      - name: Generate coverage
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3

  e2e:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📖 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [MSW Documentation](https://mswjs.io/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Accessibility Testing Guide](https://www.w3.org/WAI/test-evaluate/)

---

**Happy testing! 🧪**
