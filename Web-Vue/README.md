# Online Salon Service Booking - Vue Web Application

A modern, responsive Vue.js web application for browsing salon services, checking slot availability, and booking appointments with secure payment processing.

## Overview

This Vue-based frontend provides users with an intuitive interface to:
- Browse and search salon services
- View real-time slot availability
- Select preferred time slots
- Book appointments with non-refundable token payment
- Manage booking history
- Receive booking confirmations

## Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia / Vuex
- **Routing**: Vue Router 4
- **UI Framework**: Vuetify / Element Plus / PrimeVue / Tailwind CSS
- **Form Handling**: VeeValidate + Yup validation
- **API Client**: Axios / Vue Query
- **Payment Integration**: Stripe Vue / Razorpay
- **Date/Time**: date-fns / day.js
- **Notifications**: Vue Toastification
- **Icons**: Heroicons / Font Awesome

## Features

### User Features
- ✅ User authentication (Register/Login)
- ✅ Service catalog with search and filters
- ✅ Interactive slot selection calendar
- ✅ Real-time availability checking
- ✅ Secure payment processing
- ✅ Booking confirmation and history
- ✅ Profile management
- ✅ Responsive design (mobile-first)

### UI/UX Features
- ✅ Loading skeletons
- ✅ Optimistic UI updates
- ✅ Error handling
- ✅ Toast notifications
- ✅ Form validation
- ✅ Accessibility (WCAG 2.1)
- ✅ Dark mode support (optional)

## Project Structure

```
Web-Vue/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
├── src/
│   ├── api/
│   │   ├── axios.config.ts
│   │   ├── auth.api.ts
│   │   ├── services.api.ts
│   │   ├── slots.api.ts
│   │   ├── bookings.api.ts
│   │   └── payments.api.ts
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── styles/
│   │       ├── main.scss
│   │       └── variables.scss
│   ├── components/
│   │   ├── common/
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseInput.vue
│   │   │   ├── BaseCard.vue
│   │   │   ├── BaseModal.vue
│   │   │   └── BaseLoader.vue
│   │   ├── layout/
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── AppSidebar.vue
│   │   │   └── AppLayout.vue
│   │   ├── auth/
│   │   │   ├── LoginForm.vue
│   │   │   ├── RegisterForm.vue
│   │   │   └── ProtectedRoute.vue
│   │   ├── services/
│   │   │   ├── ServiceCard.vue
│   │   │   ├── ServiceList.vue
│   │   │   ├── ServiceDetails.vue
│   │   │   └── ServiceFilter.vue
│   │   ├── slots/
│   │   │   ├── SlotCalendar.vue
│   │   │   ├── SlotPicker.vue
│   │   │   └── AvailabilityIndicator.vue
│   │   ├── booking/
│   │   │   ├── BookingForm.vue
│   │   │   ├── BookingSummary.vue
│   │   │   ├── BookingCard.vue
│   │   │   └── BookingHistory.vue
│   │   └── payment/
│   │       ├── PaymentForm.vue
│   │       ├── PaymentSuccess.vue
│   │       └── PaymentFailed.vue
│   ├── composables/
│   │   ├── useAuth.ts
│   │   ├── useServices.ts
│   │   ├── useSlots.ts
│   │   ├── useBooking.ts
│   │   ├── usePayment.ts
│   │   └── useDebounce.ts
│   ├── views/
│   │   ├── Home.vue
│   │   ├── Services.vue
│   │   ├── ServiceDetails.vue
│   │   ├── Booking.vue
│   │   ├── BookingHistory.vue
│   │   ├── Profile.vue
│   │   ├── Login.vue
│   │   ├── Register.vue
│   │   └── NotFound.vue
│   ├── stores/
│   │   ├── auth.ts
│   │   ├── services.ts
│   │   ├── slots.ts
│   │   └── bookings.ts
│   ├── types/
│   │   ├── auth.types.ts
│   │   ├── service.types.ts
│   │   ├── slot.types.ts
│   │   ├── booking.types.ts
│   │   └── payment.types.ts
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── helpers.ts
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── storage.ts
│   ├── router/
│   │   └── index.ts
│   ├── plugins/
│   │   ├── vuetify.ts
│   │   └── toast.ts
│   ├── App.vue
│   ├── main.ts
│   └── vite-env.d.ts
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Backend service running (see Backend-Service/README.md)

### Setup Steps

1. **Navigate to the Vue app directory**
   ```bash
   cd online-saloon-service-booking/Web-Vue
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration

4. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## Environment Variables

Create a `.env` file in the root directory:

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

# Google Maps (Optional)
VITE_GOOGLE_MAPS_API_KEY=xxxxx
```

## Key Routes

```typescript
/ - Home page with featured services
/services - Browse all services
/services/:id - Service details with slot selection
/booking - Booking confirmation and payment
/booking-history - User's booking history
/profile - User profile management
/login - User login
/register - User registration
/payment/success - Payment success page
/payment/failed - Payment failure page
```

## Component Examples

### Service Card Component (Composition API)
```vue
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { Service } from '@/types/service.types';

interface Props {
  service: Service;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'book', serviceId: string): void;
}>();

const handleBook = () => {
  emit('book', props.service.id);
};
</script>

<template>
  <div class="service-card">
    <img :src="service.imageUrl" :alt="service.name" />
    <h3>{{ service.name }}</h3>
    <p>{{ service.description }}</p>
    <div class="pricing">
      <span>Price: ${{ service.price }}</span>
      <span>Token: ${{ service.tokenAmount }}</span>
    </div>
    <button @click="handleBook">Book Now</button>
  </div>
</template>

<style scoped lang="scss">
.service-card {
  // Your styles here
}
</style>
```

### Slot Picker Component
```vue
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSlots } from '@/composables/useSlots';
import type { Slot } from '@/types/slot.types';

interface Props {
  serviceId: string;
  selectedDate: Date;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'slot-select', slot: Slot): void;
}>();

const { slots, loading, fetchSlots } = useSlots();

watch(() => [props.serviceId, props.selectedDate], () => {
  fetchSlots(props.serviceId, props.selectedDate);
}, { immediate: true });

const handleSlotSelect = (slot: Slot) => {
  if (slot.isAvailable) {
    emit('slot-select', slot);
  }
};
</script>

<template>
  <div class="slot-picker">
    <div v-if="loading">Loading slots...</div>
    <button
      v-for="slot in slots"
      :key="slot.id"
      :disabled="!slot.isAvailable"
      @click="handleSlotSelect(slot)"
    >
      {{ slot.startTime }} - {{ slot.endTime }}
      {{ slot.isAvailable ? '✓' : 'Full' }}
    </button>
  </div>
</template>
```

## State Management (Pinia)

### Auth Store
```typescript
// src/stores/auth.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User } from '@/types/auth.types';
import { authAPI } from '@/api/auth.api';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = ref<string | null>(localStorage.getItem('token'));

  const isAuthenticated = computed(() => !!token.value);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password);
    user.value = response.user;
    token.value = response.token;
    localStorage.setItem('token', response.token);
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem('token');
  };

  return {
    user,
    token,
    isAuthenticated,
    login,
    logout
  };
});
```

### Services Store
```typescript
// src/stores/services.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Service } from '@/types/service.types';
import { servicesAPI } from '@/api/services.api';

export const useServicesStore = defineStore('services', () => {
  const services = ref<Service[]>([]);
  const selectedService = ref<Service | null>(null);
  const loading = ref(false);

  const fetchServices = async () => {
    loading.value = true;
    try {
      const response = await servicesAPI.getAll();
      services.value = response.data;
    } finally {
      loading.value = false;
    }
  };

  const selectService = (service: Service) => {
    selectedService.value = service;
  };

  return {
    services,
    selectedService,
    loading,
    fetchServices,
    selectService
  };
});
```

## API Integration

### Axios Configuration
```typescript
// src/api/axios.config.ts
import axios from 'axios';
import { useAuthStore } from '@/stores/auth';
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
  (config) => {
    const authStore = useAuthStore();
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const authStore = useAuthStore();
      authStore.logout();
      router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
```

## Composables

### useAuth Composable
```typescript
// src/composables/useAuth.ts
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

export const useAuth = () => {
  const authStore = useAuthStore();
  const { user, isAuthenticated } = storeToRefs(authStore);
  const { login, logout } = authStore;

  return {
    user,
    isAuthenticated,
    login,
    logout
  };
};
```

### useBooking Composable
```typescript
// src/composables/useBooking.ts
import { ref } from 'vue';
import { bookingsAPI } from '@/api/bookings.api';
import type { BookingData } from '@/types/booking.types';

export const useBooking = () => {
  const loading = ref(false);
  const error = ref<Error | null>(null);

  const createBooking = async (bookingData: BookingData) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await bookingsAPI.create(bookingData);
      return response.data;
    } catch (err) {
      error.value = err as Error;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    error,
    createBooking
  };
};
```

## Router Configuration

```typescript
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/services',
    name: 'Services',
    component: () => import('@/views/Services.vue')
  },
  {
    path: '/services/:id',
    name: 'ServiceDetails',
    component: () => import('@/views/ServiceDetails.vue')
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('@/views/Booking.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/booking-history',
    name: 'BookingHistory',
    component: () => import('@/views/BookingHistory.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
```

## Form Validation with VeeValidate

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
});

const { handleSubmit, errors } = useForm({
  validationSchema: schema
});

const onSubmit = handleSubmit((values) => {
  // Handle login
  console.log(values);
});
</script>

<template>
  <form @submit="onSubmit">
    <input name="email" />
    <span>{{ errors.email }}</span>

    <input name="password" type="password" />
    <span>{{ errors.password }}</span>

    <button type="submit">Login</button>
  </form>
</template>
```

## Payment Integration

### Stripe Integration
```vue
<script setup lang="ts">
import { ref } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
const cardElement = ref(null);

const handlePayment = async () => {
  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: {
        card: cardElement.value
      }
    }
  );

  if (error) {
    console.error(error);
  } else {
    // Payment successful
  }
};
</script>
```

## Testing

```bash
# Run all tests
npm run test

# Run unit tests
npm run test:unit

# Generate coverage report
npm run test:coverage

# Run E2E tests (Cypress/Playwright)
npm run test:e2e
```

## Scripts

```json
{
  "dev": "vite",
  "build": "vue-tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext .vue,.ts",
  "lint:fix": "eslint src --ext .vue,.ts --fix",
  "format": "prettier --write \"src/**/*.{vue,ts,scss}\"",
  "test": "vitest",
  "test:e2e": "cypress open"
}
```

## Styling with Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
      }
    }
  },
  plugins: []
};
```

## Performance Optimization

- Lazy loading routes and components
- Image optimization with lazy loading
- Computed properties for reactive data
- Virtual scrolling for long lists
- Debouncing user inputs
- API response caching
- Service Worker for PWA

## Accessibility

- Semantic HTML in templates
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management with router

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the dist/ folder to Netlify
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

### Nginx Configuration
```nginx
server {
  listen 80;
  server_name yourdomain.com;
  root /usr/share/nginx/html;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }
}
```

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Code Style

- Use Composition API over Options API
- Use TypeScript for type safety
- Follow Vue 3 best practices
- Use single-file components (.vue)
- Implement proper error handling
- Write meaningful component and variable names

## Troubleshooting

### Common Issues

**CORS Errors**
- Ensure backend CORS is configured to allow frontend origin
- Check `.env` file has correct API URL

**Payment Integration Fails**
- Verify payment gateway API keys
- Check network requests in browser DevTools
- Ensure backend webhook is configured

**Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## License

This project is licensed under the MIT License.

## Support

For support, email support@saloonbooking.com or create an issue in the repository.

## Roadmap

- [ ] Progressive Web App (PWA) support
- [ ] Push notifications
- [ ] Google/Facebook authentication
- [ ] Multi-language support (Vue i18n)
- [ ] Advanced filtering and sorting
- [ ] Favorites/Wishlist feature
- [ ] Review and rating system
- [ ] Loyalty rewards dashboard
- [ ] Mobile app (Ionic Vue / Capacitor)
