# 🧪 Testing Strategy

A comprehensive testing guide for the Vue 3 salon booking application covering unit tests, component tests, integration tests, and E2E testing best practices using Vitest, Vue Test Utils, and modern testing approaches.

## 📋 Table of Contents

- [🎯 Testing Philosophy](#-testing-philosophy)
- [🧑‍🔬 Tech Stack](#-tech-stack)
- [📊 Test Coverage Goals](#-test-coverage-goals)
- [🔬 Unit Testing](#-unit-testing)
- [🧩 Component Testing](#-component-testing)
- [🎣 Composables Testing](#-composables-testing)
- [🔗 Integration Testing](#-integration-testing)
- [🎭 E2E Testing](#-e2e-testing)
- [🏗️ Test Structure](#️-test-structure)
- [🛠️ Testing Utilities](#️-testing-utilities)
- [🎯 Best Practices](#-best-practices)
- [🚀 Running Tests](#-running-tests)

---

## 🎯 Testing Philosophy

Our testing strategy follows these principles:

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **User-Centric Testing**: Test from the user's perspective
3. **Fast Feedback**: Tests should run quickly to encourage frequent execution
4. **Isolated Tests**: Each test should be independent and not rely on others
5. **Realistic Testing**: Use realistic test data and scenarios
6. **Maintainable Tests**: Write clear, readable tests that are easy to maintain

---

## 🧑‍🔬 Tech Stack

- **Test Framework**: Vitest (Vite-native, fast unit testing)
- **Component Testing**: Vue Test Utils (@vue/test-utils)
- **DOM Testing**: @testing-library/vue (user-centric testing)
- **E2E Testing**: Playwright / Cypress
- **Mocking**: Vitest mocks
- **Coverage**: Vitest Coverage (c8)
- **Test Data**: @faker-js/faker

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
      }
    }
  }
});
```

**Priority Areas for 100% Coverage:**
- Composables (business logic)
- Utilities
- Store actions and getters

**Lower Priority (70%+ acceptable):**
- UI-only components
- Layout components

---

## 🔬 Unit Testing

### Utility Function Tests

```typescript
// tests/unit/utils/formatters.test.ts
import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate, formatDuration } from '@/utils/formatters';

describe('formatters', () => {
  describe('formatCurrency', () => {
    it('should format USD currency correctly', () => {
      expect(formatCurrency(100)).toBe('$100.00');
      expect(formatCurrency(1234.56)).toBe('$1,234.56');
      expect(formatCurrency(0)).toBe('$0.00');
    });

    it('should handle negative values', () => {
      expect(formatCurrency(-50)).toBe('-$50.00');
    });

    it('should format with custom currency', () => {
      expect(formatCurrency(100, 'EUR')).toBe('€100.00');
    });
  });

  describe('formatDate', () => {
    it('should format date in default format', () => {
      const date = new Date('2024-12-01T10:30:00');
      expect(formatDate(date)).toBe('December 1, 2024');
    });

    it('should format date with custom format', () => {
      const date = new Date('2024-12-01T10:30:00');
      expect(formatDate(date, 'yyyy-MM-dd')).toBe('2024-12-01');
    });

    it('should handle ISO string input', () => {
      const isoString = '2024-12-01T10:30:00Z';
      expect(formatDate(isoString)).toBe('December 1, 2024');
    });
  });

  describe('formatDuration', () => {
    it('should format minutes correctly', () => {
      expect(formatDuration(30)).toBe('30 mins');
      expect(formatDuration(60)).toBe('1 hour');
      expect(formatDuration(90)).toBe('1 hour 30 mins');
      expect(formatDuration(120)).toBe('2 hours');
    });

    it('should handle zero duration', () => {
      expect(formatDuration(0)).toBe('0 mins');
    });
  });
});
```

### Validation Tests

```typescript
// tests/unit/utils/validators.test.ts
import { describe, it, expect } from 'vitest';
import {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isBookingCancellable
} from '@/utils/validators';

describe('validators', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false);
      expect(isValidEmail('missing@domain')).toBe(false);
      expect(isValidEmail('@example.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('should validate correct phone numbers', () => {
      expect(isValidPhone('+1234567890')).toBe(true);
      expect(isValidPhone('1234567890')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidPhone('123')).toBe(false);
      expect(isValidPhone('abc')).toBe(false);
      expect(isValidPhone('')).toBe(false);
    });
  });

  describe('isValidPassword', () => {
    it('should validate strong passwords', () => {
      expect(isValidPassword('Password123!')).toBe(true);
      expect(isValidPassword('MyP@ssw0rd')).toBe(true);
    });

    it('should reject weak passwords', () => {
      expect(isValidPassword('short')).toBe(false);
      expect(isValidPassword('onlylowercase')).toBe(false);
      expect(isValidPassword('12345678')).toBe(false);
    });
  });

  describe('isBookingCancellable', () => {
    it('should return true when booking is more than 24 hours away', () => {
      const futureDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
      expect(isBookingCancellable(futureDate)).toBe(true);
    });

    it('should return false when booking is less than 24 hours away', () => {
      const nearDate = new Date(Date.now() + 12 * 60 * 60 * 1000);
      expect(isBookingCancellable(nearDate)).toBe(false);
    });
  });
});
```

---

## 🧩 Component Testing

### Basic Component Test

```typescript
// tests/unit/components/common/BaseButton.test.ts
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseButton from '@/components/common/BaseButton.vue';

describe('BaseButton', () => {
  it('should render with default props', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Click Me'
      }
    });

    expect(wrapper.text()).toBe('Click Me');
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('should apply correct variant classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        variant: 'primary'
      },
      slots: {
        default: 'Button'
      }
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain('bg-primary-600');
    expect(button.classes()).toContain('text-white');
  });

  it('should apply correct size classes', () => {
    const wrapper = mount(BaseButton, {
      props: {
        size: 'lg'
      },
      slots: {
        default: 'Button'
      }
    });

    const button = wrapper.find('button');
    expect(button.classes()).toContain('px-6');
    expect(button.classes()).toContain('py-3');
  });

  it('should emit click event when clicked', async () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Button'
      }
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toBeTruthy();
    expect(wrapper.emitted('click')?.length).toBe(1);
  });

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Button'
      }
    });

    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
    expect(button.classes()).toContain('opacity-50');
    expect(button.classes()).toContain('cursor-not-allowed');
  });

  it('should show loading state', () => {
    const wrapper = mount(BaseButton, {
      props: {
        isLoading: true
      },
      slots: {
        default: 'Button'
      }
    });

    expect(wrapper.text()).toContain('Loading');
    expect(wrapper.find('.animate-spin').exists()).toBe(true);
  });

  it('should not emit click when disabled', async () => {
    const wrapper = mount(BaseButton, {
      props: {
        disabled: true
      },
      slots: {
        default: 'Button'
      }
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('click')).toBeFalsy();
  });
});
```

### Form Component Test

```typescript
// tests/unit/components/common/BaseInput.test.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseInput from '@/components/common/BaseInput.vue';

describe('BaseInput', () => {
  it('should render with label', () => {
    const wrapper = mount(BaseInput, {
      props: {
        label: 'Email Address',
        modelValue: ''
      }
    });

    expect(wrapper.find('label').text()).toBe('Email Address');
  });

  it('should update modelValue on input', async () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: ''
      }
    });

    const input = wrapper.find('input');
    await input.setValue('test@example.com');

    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['test@example.com']);
  });

  it('should display error message', () => {
    const errorMessage = 'This field is required';
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        error: errorMessage
      }
    });

    expect(wrapper.text()).toContain(errorMessage);
    expect(wrapper.find('.text-red-600').exists()).toBe(true);
  });

  it('should apply error styles when error prop is provided', () => {
    const wrapper = mount(BaseInput, {
      props: {
        modelValue: '',
        error: 'Error message'
      }
    });

    const input = wrapper.find('input');
    expect(input.classes()).toContain('border-red-500');
  });

  it('should handle different input types', () => {
    const wrapper = mount(BaseInput, {
      props: {
        type: 'password',
        modelValue: ''
      }
    });

    expect(wrapper.find('input').attributes('type')).toBe('password');
  });

  it('should show placeholder', () => {
    const wrapper = mount(BaseInput, {
      props: {
        placeholder: 'Enter your email',
        modelValue: ''
      }
    });

    expect(wrapper.find('input').attributes('placeholder')).toBe('Enter your email');
  });

  it('should be disabled when disabled prop is true', () => {
    const wrapper = mount(BaseInput, {
      props: {
        disabled: true,
        modelValue: ''
      }
    });

    expect(wrapper.find('input').attributes('disabled')).toBeDefined();
  });
});
```

### Feature Component Test

```typescript
// tests/unit/components/services/ServiceCard.test.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ServiceCard from '@/components/services/ServiceCard.vue';
import type { Service } from '@/types/service.types';

const mockService: Service = {
  id: '1',
  name: 'Haircut',
  description: 'Professional haircut service',
  duration: 45,
  price: 50,
  tokenAmount: 10,
  category: 'Hair',
  imageUrl: '/images/haircut.jpg',
  isActive: true,
  createdAt: '2024-01-01T00:00:00Z'
};

describe('ServiceCard', () => {
  it('should render service information', () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: mockService
      }
    });

    expect(wrapper.text()).toContain('Haircut');
    expect(wrapper.text()).toContain('Professional haircut service');
    expect(wrapper.text()).toContain('45 mins');
    expect(wrapper.text()).toContain('$50');
    expect(wrapper.text()).toContain('$10');
  });

  it('should display service image', () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: mockService
      }
    });

    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe('/images/haircut.jpg');
    expect(img.attributes('alt')).toBe('Haircut');
  });

  it('should emit book event when book button is clicked', async () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: mockService
      }
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('book')).toBeTruthy();
    expect(wrapper.emitted('book')?.[0]).toEqual(['1']);
  });

  it('should format price correctly', () => {
    const wrapper = mount(ServiceCard, {
      props: {
        service: {
          ...mockService,
          price: 125.5
        }
      }
    });

    expect(wrapper.text()).toContain('$125.50');
  });
});
```

### Testing Library Approach

```typescript
// tests/unit/components/auth/LoginForm.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/vue';
import LoginForm from '@/components/auth/LoginForm.vue';

describe('LoginForm', () => {
  it('should render login form fields', () => {
    render(LoginForm);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('should show validation errors for empty fields', async () => {
    render(LoginForm);

    const submitButton = screen.getByRole('button', { name: /login/i });
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('should show error for invalid email format', async () => {
    render(LoginForm);

    const emailInput = screen.getByLabelText(/email/i);
    await fireEvent.update(emailInput, 'invalid-email');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const mockLogin = vi.fn().mockResolvedValue({ success: true });

    render(LoginForm, {
      props: {
        onSubmit: mockLogin
      }
    });

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    await fireEvent.update(emailInput, 'test@example.com');
    await fireEvent.update(passwordInput, 'password123');

    const submitButton = screen.getByRole('button', { name: /login/i });
    await fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });
});
```

---

## 🎣 Composables Testing

### Basic Composable Test

```typescript
// tests/unit/composables/useCounter.test.ts
import { describe, it, expect } from 'vitest';
import { useCounter } from '@/composables/useCounter';

describe('useCounter', () => {
  it('should initialize with default value', () => {
    const { count, double } = useCounter();

    expect(count.value).toBe(0);
    expect(double.value).toBe(0);
  });

  it('should initialize with custom value', () => {
    const { count } = useCounter(10);

    expect(count.value).toBe(10);
  });

  it('should increment count', () => {
    const { count, increment } = useCounter();

    increment();
    expect(count.value).toBe(1);

    increment();
    expect(count.value).toBe(2);
  });

  it('should decrement count', () => {
    const { count, decrement } = useCounter(5);

    decrement();
    expect(count.value).toBe(4);
  });

  it('should reset to initial value', () => {
    const { count, increment, reset } = useCounter(10);

    increment();
    increment();
    expect(count.value).toBe(12);

    reset();
    expect(count.value).toBe(10);
  });

  it('should compute double correctly', () => {
    const { count, double, increment } = useCounter(5);

    expect(double.value).toBe(10);

    increment();
    expect(double.value).toBe(12);
  });
});
```

### API Composable Test

```typescript
// tests/unit/composables/useServices.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useServices } from '@/composables/useServices';
import { servicesAPI } from '@/api/services.api';

vi.mock('@/api/services.api');

describe('useServices', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch services successfully', async () => {
    const mockServices = [
      { id: '1', name: 'Service 1', price: 50 },
      { id: '2', name: 'Service 2', price: 75 }
    ];

    vi.mocked(servicesAPI.getAll).mockResolvedValue({
      data: mockServices
    } as any);

    const { services, loading, error, fetchServices } = useServices();

    expect(loading.value).toBe(false);
    expect(services.value).toEqual([]);

    await fetchServices();

    expect(loading.value).toBe(false);
    expect(services.value).toEqual(mockServices);
    expect(error.value).toBeNull();
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Failed to fetch services';

    vi.mocked(servicesAPI.getAll).mockRejectedValue({
      response: {
        data: {
          message: errorMessage
        }
      }
    });

    const { services, loading, error, fetchServices } = useServices();

    await fetchServices();

    expect(loading.value).toBe(false);
    expect(services.value).toEqual([]);
    expect(error.value).toBe(errorMessage);
  });

  it('should fetch single service by id', async () => {
    const mockService = { id: '1', name: 'Service 1', price: 50 };

    vi.mocked(servicesAPI.getById).mockResolvedValue({
      data: mockService
    } as any);

    const { loading, error, getServiceById } = useServices();

    const result = await getServiceById('1');

    expect(loading.value).toBe(false);
    expect(result).toEqual(mockService);
    expect(error.value).toBeNull();
    expect(servicesAPI.getById).toHaveBeenCalledWith('1');
  });
});
```

### Async Composable Test

```typescript
// tests/unit/composables/useDebounce.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ref } from 'vue';
import { useDebounce } from '@/composables/useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should debounce value updates', () => {
    const inputValue = ref('');
    const debouncedValue = useDebounce(inputValue, 300);

    expect(debouncedValue.value).toBe('');

    inputValue.value = 'a';
    expect(debouncedValue.value).toBe('');

    inputValue.value = 'ab';
    expect(debouncedValue.value).toBe('');

    vi.advanceTimersByTime(300);

    expect(debouncedValue.value).toBe('ab');
  });

  it('should cancel previous debounce on rapid updates', () => {
    const inputValue = ref('');
    const debouncedValue = useDebounce(inputValue, 300);

    inputValue.value = 'a';
    vi.advanceTimersByTime(100);

    inputValue.value = 'ab';
    vi.advanceTimersByTime(100);

    inputValue.value = 'abc';
    vi.advanceTimersByTime(300);

    expect(debouncedValue.value).toBe('abc');
  });
});
```

---

## 🔗 Integration Testing

### Store Integration Test

```typescript
// tests/integration/stores/auth.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import { authAPI } from '@/api/auth.api';

vi.mock('@/api/auth.api');

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('should login user successfully', async () => {
    const mockResponse = {
      data: {
        user: { id: '1', email: 'test@example.com', role: 'customer' },
        token: 'mock-token'
      }
    };

    vi.mocked(authAPI.login).mockResolvedValue(mockResponse as any);

    const store = useAuthStore();

    expect(store.isAuthenticated).toBe(false);

    await store.login({ email: 'test@example.com', password: 'password123' });

    expect(store.isAuthenticated).toBe(true);
    expect(store.user).toEqual(mockResponse.data.user);
    expect(store.token).toBe('mock-token');
    expect(localStorage.getItem('auth_token')).toBe('mock-token');
  });

  it('should handle login error', async () => {
    const errorMessage = 'Invalid credentials';

    vi.mocked(authAPI.login).mockRejectedValue({
      response: {
        data: {
          message: errorMessage
        }
      }
    });

    const store = useAuthStore();

    await expect(
      store.login({ email: 'test@example.com', password: 'wrong' })
    ).rejects.toThrow();

    expect(store.isAuthenticated).toBe(false);
    expect(store.user).toBeNull();
    expect(store.error).toBe(errorMessage);
  });

  it('should logout user', () => {
    const store = useAuthStore();

    store.user = { id: '1', email: 'test@example.com', role: 'customer' } as any;
    store.token = 'mock-token';
    localStorage.setItem('auth_token', 'mock-token');

    store.logout();

    expect(store.user).toBeNull();
    expect(store.token).toBeNull();
    expect(store.isAuthenticated).toBe(false);
    expect(localStorage.getItem('auth_token')).toBeNull();
  });

  it('should restore token from localStorage', () => {
    localStorage.setItem('auth_token', 'stored-token');

    const store = useAuthStore();

    expect(store.token).toBe('stored-token');
  });
});
```

### Router Integration Test

```typescript
// tests/integration/router/navigation.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import { createPinia, setActivePinia } from 'pinia';
import { useAuthStore } from '@/stores/auth';
import router from '@/router';

describe('Router Navigation', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should redirect to login for protected routes when not authenticated', async () => {
    const testRouter = createRouter({
      history: createMemoryHistory(),
      routes: router.getRoutes()
    });

    await testRouter.push('/booking');
    await testRouter.isReady();

    expect(testRouter.currentRoute.value.name).toBe('login');
    expect(testRouter.currentRoute.value.query.redirect).toBe('/booking');
  });

  it('should allow access to protected routes when authenticated', async () => {
    const authStore = useAuthStore();
    authStore.token = 'mock-token';
    authStore.user = { id: '1', email: 'test@example.com', role: 'customer' } as any;

    const testRouter = createRouter({
      history: createMemoryHistory(),
      routes: router.getRoutes()
    });

    await testRouter.push('/booking');
    await testRouter.isReady();

    expect(testRouter.currentRoute.value.name).toBe('booking');
  });

  it('should redirect authenticated users from guest pages', async () => {
    const authStore = useAuthStore();
    authStore.token = 'mock-token';
    authStore.user = { id: '1', email: 'test@example.com', role: 'customer' } as any;

    const testRouter = createRouter({
      history: createMemoryHistory(),
      routes: router.getRoutes()
    });

    await testRouter.push('/login');
    await testRouter.isReady();

    expect(testRouter.currentRoute.value.name).toBe('home');
  });
});
```

---

## 🎭 E2E Testing

### Playwright E2E Test

```typescript
// tests/e2e/booking-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });

  test('should complete full booking flow', async ({ page }) => {
    // Step 1: Navigate to services
    await page.click('text=Browse Services');
    await expect(page).toHaveURL(/.*services/);

    // Step 2: Select a service
    const firstService = page.locator('.service-card').first();
    await expect(firstService).toBeVisible();
    await firstService.click();

    // Step 3: Select a slot
    await page.waitForSelector('.slot-picker');
    const availableSlot = page.locator('.slot-button:not([disabled])').first();
    await availableSlot.click();

    // Step 4: Login (if not authenticated)
    const loginButton = page.locator('text=Login');
    if (await loginButton.isVisible()) {
      await loginButton.click();
      await page.fill('input[type="email"]', 'test@example.com');
      await page.fill('input[type="password"]', 'password123');
      await page.click('button[type="submit"]');
    }

    // Step 5: Confirm booking details
    await expect(page.locator('.booking-summary')).toBeVisible();
    await page.click('text=Proceed to Payment');

    // Step 6: Enter payment details
    await page.waitForSelector('.payment-form');
    // ... fill payment form

    // Step 7: Confirm booking
    await page.click('text=Confirm Booking');

    // Step 8: Verify success
    await expect(page.locator('.success-message')).toBeVisible();
    await expect(page).toHaveURL(/.*booking-success/);
  });

  test('should prevent booking without authentication', async ({ page }) => {
    await page.goto('http://localhost:5173/services/1');

    await page.locator('.slot-button:not([disabled])').first().click();

    // Should redirect to login
    await expect(page).toHaveURL(/.*login/);
    await expect(page.locator('text=Please login to continue')).toBeVisible();
  });

  test('should show error for unavailable slots', async ({ page }) => {
    await page.goto('http://localhost:5173/services/1');

    const fullyBookedSlot = page.locator('.slot-button[disabled]').first();
    await expect(fullyBookedSlot).toBeDisabled();

    const slotTooltip = page.locator('.slot-tooltip');
    await fullyBookedSlot.hover();
    await expect(slotTooltip).toContainText('Fully booked');
  });
});
```

### Cypress E2E Test

```typescript
// tests/e2e/login.cy.ts
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login with valid credentials', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.contains('Welcome back').should('be.visible');
  });

  it('should show error with invalid credentials', () => {
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.contains('Invalid credentials').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click();

    cy.contains('Email is required').should('be.visible');
    cy.contains('Password is required').should('be.visible');
  });

  it('should remember user session', () => {
    // Login
    cy.get('input[type="email"]').type('test@example.com');
    cy.get('input[type="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Reload page
    cy.reload();

    // Should still be logged in
    cy.url().should('not.include', '/login');
    cy.get('[data-testid="user-menu"]').should('be.visible');
  });
});
```

---

## 🏗️ Test Structure

### Directory Structure

```
tests/
├── unit/                          # Unit tests
│   ├── components/
│   │   ├── common/
│   │   │   ├── BaseButton.test.ts
│   │   │   ├── BaseInput.test.ts
│   │   │   └── BaseCard.test.ts
│   │   ├── services/
│   │   │   ├── ServiceCard.test.ts
│   │   │   └── ServiceList.test.ts
│   │   └── booking/
│   │       └── BookingForm.test.ts
│   ├── composables/
│   │   ├── useAuth.test.ts
│   │   ├── useServices.test.ts
│   │   └── useDebounce.test.ts
│   └── utils/
│       ├── formatters.test.ts
│       └── validators.test.ts
├── integration/                   # Integration tests
│   ├── stores/
│   │   ├── auth.test.ts
│   │   └── services.test.ts
│   └── router/
│       └── navigation.test.ts
├── e2e/                          # End-to-end tests
│   ├── booking-flow.spec.ts
│   ├── login.cy.ts
│   └── payment.cy.ts
├── fixtures/                     # Test utilities
│   ├── factories.ts              # Test data factories
│   └── mocks.ts                  # Mock data
└── setup.ts                      # Global test setup
```

---

## 🛠️ Testing Utilities

### Test Setup

```typescript
// tests/setup.ts
import { config } from '@vue/test-utils';
import { vi } from 'vitest';

// Mock global properties
config.global.mocks = {
  $t: (key: string) => key // Mock i18n
};

// Mock router
const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn()
};

config.global.mocks.$router = mockRouter;

// Stub components
config.global.stubs = {
  Teleport: true,
  Transition: true
};
```

### Test Factories

```typescript
// tests/fixtures/factories.ts
import { faker } from '@faker-js/faker';
import type { Service, Booking, User } from '@/types';

export const createMockService = (overrides?: Partial<Service>): Service => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  duration: faker.number.int({ min: 30, max: 120 }),
  price: parseFloat(faker.commerce.price()),
  tokenAmount: parseFloat(faker.commerce.price({ min: 5, max: 20 })),
  category: faker.helpers.arrayElement(['Hair', 'Nails', 'Spa', 'Massage']),
  imageUrl: faker.image.url(),
  isActive: true,
  createdAt: faker.date.past().toISOString(),
  ...overrides
});

export const createMockUser = (overrides?: Partial<User>): User => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  phone: faker.phone.number(),
  role: 'customer',
  isVerified: true,
  createdAt: faker.date.past().toISOString(),
  ...overrides
});

export const createMockBooking = (overrides?: Partial<Booking>): Booking => ({
  id: faker.string.uuid(),
  userId: faker.string.uuid(),
  serviceId: faker.string.uuid(),
  slotId: faker.string.uuid(),
  bookingDate: faker.date.future().toISOString(),
  startTime: '10:00',
  endTime: '11:00',
  status: 'pending',
  tokenAmount: 10,
  totalAmount: 50,
  notes: faker.lorem.sentence(),
  createdAt: faker.date.recent().toISOString(),
  ...overrides
});
```

### Component Wrapper Utilities

```typescript
// tests/utils/test-utils.ts
import { mount, VueWrapper } from '@vue/test-utils';
import { createPinia } from 'pinia';
import { createRouter, createMemoryHistory } from 'vue-router';
import type { ComponentMountingOptions } from '@vue/test-utils';

export const mountWithPlugins = (
  component: any,
  options?: ComponentMountingOptions<any>
) => {
  const pinia = createPinia();
  const router = createRouter({
    history: createMemoryHistory(),
    routes: []
  });

  return mount(component, {
    global: {
      plugins: [pinia, router],
      ...options?.global
    },
    ...options
  });
};

export const findByTestId = (wrapper: VueWrapper, testId: string) => {
  return wrapper.find(`[data-testid="${testId}"]`);
};

export const findAllByTestId = (wrapper: VueWrapper, testId: string) => {
  return wrapper.findAll(`[data-testid="${testId}"]`);
};
```

---

## 🎯 Best Practices

### 1. Arrange-Act-Assert Pattern

```typescript
it('should increment count', () => {
  // Arrange
  const { count, increment } = useCounter(0);

  // Act
  increment();

  // Assert
  expect(count.value).toBe(1);
});
```

### 2. Descriptive Test Names

```typescript
// ✅ Good
it('should show validation error when email is invalid', () => {});
it('should disable submit button when form is loading', () => {});

// ❌ Avoid
it('should work', () => {});
it('test email', () => {});
```

### 3. Test User Behavior

```typescript
// ✅ Good: Test what users see and do
it('should show success message after booking', async () => {
  const wrapper = mount(BookingForm);

  await wrapper.find('button').trigger('click');

  expect(wrapper.text()).toContain('Booking successful');
});

// ❌ Avoid: Test implementation details
it('should call submitBooking method', () => {
  const wrapper = mount(BookingForm);
  const spy = vi.spyOn(wrapper.vm, 'submitBooking');

  wrapper.vm.submitBooking();

  expect(spy).toHaveBeenCalled();
});
```

### 4. Mock External Dependencies

```typescript
// ✅ Good: Mock API calls
vi.mock('@/api/services.api', () => ({
  servicesAPI: {
    getAll: vi.fn()
  }
}));

it('should fetch services', async () => {
  vi.mocked(servicesAPI.getAll).mockResolvedValue({ data: [] });
  // ... test logic
});
```

### 5. Clean Up After Tests

```typescript
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});
```

### 6. Test Edge Cases

```typescript
describe('formatCurrency', () => {
  it('should handle normal values', () => {});
  it('should handle zero', () => {});
  it('should handle negative values', () => {});
  it('should handle very large numbers', () => {});
  it('should handle decimal precision', () => {});
});
```

---

## 🚀 Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test ServiceCard.test.ts

# Run tests matching pattern
npm test -- --grep="should render"

# Generate coverage report
npm run test:coverage

# Run only unit tests
npm test -- tests/unit

# Run only e2e tests
npm run test:e2e
```

### Vitest Configuration

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        '**/dist'
      ]
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
```

### CI/CD Integration

```yaml
# .github/workflows/test.yml
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
        run: npm test

      - name: Generate coverage
        run: npm run test:coverage

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
```

---

**Quality through testing! 🚀**
