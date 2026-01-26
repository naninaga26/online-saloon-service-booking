# Online Salon Service Booking - React Web Application

A modern, responsive React web application for browsing salon services, checking slot availability, and booking appointments with secure payment processing.

## Overview

This React-based frontend provides users with an intuitive interface to:
- Browse and search salon services
- View real-time slot availability
- Select preferred time slots
- Book appointments with non-refundable token payment
- Manage booking history
- Receive booking confirmations

## Tech Stack

- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite / Create React App
- **State Management**: Redux Toolkit / Zustand / Context API
- **Routing**: React Router v6
- **UI Framework**: Material-UI / Tailwind CSS / Ant Design
- **Form Handling**: React Hook Form + Yup validation
- **API Client**: Axios / React Query
- **Payment Integration**: Stripe React / Razorpay
- **Date/Time**: date-fns / day.js
- **Notifications**: React Toastify
- **Icons**: React Icons / Heroicons

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
- ✅ Error boundaries
- ✅ Toast notifications
- ✅ Form validation
- ✅ Accessibility (WCAG 2.1)
- ✅ Dark mode support (optional)

## Project Structure

```
Web-React/
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
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Loader/
│   │   │   └── ErrorBoundary/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── Layout.tsx
│   │   ├── auth/
│   │   │   ├── LoginForm/
│   │   │   ├── RegisterForm/
│   │   │   └── ProtectedRoute/
│   │   ├── services/
│   │   │   ├── ServiceCard/
│   │   │   ├── ServiceList/
│   │   │   ├── ServiceDetails/
│   │   │   └── ServiceFilter/
│   │   ├── slots/
│   │   │   ├── SlotCalendar/
│   │   │   ├── SlotPicker/
│   │   │   └── AvailabilityIndicator/
│   │   ├── booking/
│   │   │   ├── BookingForm/
│   │   │   ├── BookingSummary/
│   │   │   ├── BookingCard/
│   │   │   └── BookingHistory/
│   │   └── payment/
│   │       ├── PaymentForm/
│   │       ├── PaymentSuccess/
│   │       └── PaymentFailed/
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useServices.ts
│   │   ├── useSlots.ts
│   │   ├── useBooking.ts
│   │   ├── usePayment.ts
│   │   └── useDebounce.ts
│   ├── pages/
│   │   ├── Home/
│   │   ├── Services/
│   │   ├── ServiceDetails/
│   │   ├── Booking/
│   │   ├── BookingHistory/
│   │   ├── Profile/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── NotFound/
│   ├── store/
│   │   ├── slices/
│   │   │   ├── authSlice.ts
│   │   │   ├── servicesSlice.ts
│   │   │   ├── slotsSlice.ts
│   │   │   └── bookingsSlice.ts
│   │   └── store.ts
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
│   ├── routes/
│   │   └── index.tsx
│   ├── App.tsx
│   ├── main.tsx
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

1. **Navigate to the React app directory**
   ```bash
   cd online-saloon-service-booking/Web-React
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
   The app will be available at `http://localhost:3000`

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
VITE_APP_URL=http://localhost:3000

# Feature Flags
VITE_ENABLE_DARK_MODE=true
VITE_ENABLE_NOTIFICATIONS=true

# Google Maps (Optional)
VITE_GOOGLE_MAPS_API_KEY=xxxxx
```

## Key Pages and Routes

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

### Service Card Component
```typescript
interface ServiceCardProps {
  service: Service;
  onBook: (serviceId: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook }) => {
  return (
    <div className="service-card">
      <img src={service.imageUrl} alt={service.name} />
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <div className="pricing">
        <span>Price: ${service.price}</span>
        <span>Token: ${service.tokenAmount}</span>
      </div>
      <button onClick={() => onBook(service.id)}>Book Now</button>
    </div>
  );
};
```

### Slot Picker Component
```typescript
interface SlotPickerProps {
  serviceId: string;
  selectedDate: Date;
  onSlotSelect: (slot: Slot) => void;
}

const SlotPicker: React.FC<SlotPickerProps> = ({
  serviceId,
  selectedDate,
  onSlotSelect
}) => {
  const { data: slots, isLoading } = useSlots(serviceId, selectedDate);

  return (
    <div className="slot-picker">
      {slots?.map(slot => (
        <button
          key={slot.id}
          disabled={!slot.isAvailable}
          onClick={() => onSlotSelect(slot)}
        >
          {slot.startTime} - {slot.endTime}
          {slot.isAvailable ? '✓' : 'Full'}
        </button>
      ))}
    </div>
  );
};
```

## State Management

### Redux Store Structure
```typescript
{
  auth: {
    user: User | null,
    token: string | null,
    isAuthenticated: boolean,
    loading: boolean
  },
  services: {
    items: Service[],
    selectedService: Service | null,
    loading: boolean,
    filters: FilterState
  },
  slots: {
    availableSlots: Slot[],
    selectedSlot: Slot | null,
    loading: boolean
  },
  bookings: {
    current: Booking | null,
    history: Booking[],
    loading: boolean
  }
}
```

## API Integration

### Axios Configuration
```typescript
// src/api/axios.config.ts
import axios from 'axios';

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
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
      // Handle unauthorized
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## Booking Flow (User Journey)

1. **Browse Services** (`/services`)
   - User views service catalog
   - Filters by category, price, duration

2. **Select Service** (`/services/:id`)
   - View service details
   - Click "Book Now"

3. **Choose Date & Time**
   - Calendar view for date selection
   - Available time slots displayed
   - Real-time availability check

4. **Review Booking** (`/booking`)
   - Service summary
   - Selected date/time
   - Price breakdown (Service price + Token)
   - Non-refundable token notice

5. **Payment Processing**
   - Stripe/Razorpay payment form
   - Secure token collection
   - Payment confirmation

6. **Confirmation** (`/payment/success`)
   - Booking confirmation details
   - Email/SMS notification sent
   - Add to booking history

## Custom Hooks

### useAuth Hook
```typescript
const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const login = async (email: string, password: string) => {
    const response = await authAPI.login(email, password);
    dispatch(setUser(response.user));
    localStorage.setItem('token', response.token);
  };

  const logout = () => {
    dispatch(clearUser());
    localStorage.removeItem('token');
  };

  return { user, isAuthenticated, login, logout };
};
```

### useBooking Hook
```typescript
const useBooking = () => {
  const [loading, setLoading] = useState(false);

  const createBooking = async (bookingData: BookingData) => {
    setLoading(true);
    try {
      const response = await bookingsAPI.create(bookingData);
      return response.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { createBooking, loading };
};
```

## Payment Integration

### Stripe Integration
```typescript
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ amount, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
};
```

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage

# Run E2E tests (Cypress/Playwright)
npm run test:e2e
```

## Scripts

```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint src --ext ts,tsx",
  "lint:fix": "eslint src --ext ts,tsx --fix",
  "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
  "test": "vitest",
  "test:e2e": "cypress open"
}
```

## Styling

### Tailwind CSS Configuration
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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

- Code splitting with React.lazy() and Suspense
- Image optimization and lazy loading
- Memoization with useMemo and useCallback
- Virtual scrolling for long lists
- Debouncing search inputs
- API response caching with React Query
- Service Worker for offline support

## Accessibility

- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance
- Focus management

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
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

### GitHub Pages
```bash
npm run build
npm run deploy
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

- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Use functional components over class components
- Implement proper error handling
- Write meaningful component and variable names
- Add JSDoc comments for complex functions

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
- Clear cache: `npm run clean` (if available)

## License

This project is licensed under the MIT License.

## Support

For support, email support@saloonbooking.com or create an issue in the repository.

## Roadmap

- [ ] Progressive Web App (PWA) support
- [ ] Push notifications
- [ ] Google/Facebook authentication
- [ ] Multi-language support (i18n)
- [ ] Advanced filtering and sorting
- [ ] Favorites/Wishlist feature
- [ ] Review and rating system
- [ ] Loyalty rewards dashboard
- [ ] Mobile app (React Native)
