# Online Salon Service Booking - Backend Service

A robust Node.js backend service built with TypeScript and Express for managing salon service bookings, time slots, and payments.

## Overview

This backend service powers an online salon booking platform where users can:
- Browse available salon services
- Select preferred time slots
- Book appointments based on slot availability
- Pay a non-refundable token amount to confirm bookings

## Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (recommended) / PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Integration**: Stripe / Razorpay
- **Validation**: Joi / express-validator
- **Documentation**: Swagger / OpenAPI

## Features

### Core Functionality
- User authentication and authorization
- Service catalog management
- Real-time slot availability checking
- Booking management system
- Payment processing (token amount)
- Booking confirmation and notifications
- Admin dashboard for service providers

### Key Capabilities
- ✅ Non-refundable token payment processing
- ✅ Concurrent booking prevention
- ✅ Automated slot locking during booking
- ✅ Email/SMS notifications
- ✅ Booking history and management
- ✅ Service provider dashboard

## Project Structure

```
Backend-Service/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── environment.ts
│   │   └── swagger.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── booking.controller.ts
│   │   ├── service.controller.ts
│   │   ├── slot.controller.ts
│   │   └── payment.controller.ts
│   ├── middlewares/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── rateLimiter.middleware.ts
│   ├── models/
│   │   ├── User.model.ts
│   │   ├── Service.model.ts
│   │   ├── Slot.model.ts
│   │   ├── Booking.model.ts
│   │   └── Payment.model.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── booking.routes.ts
│   │   ├── service.routes.ts
│   │   ├── slot.routes.ts
│   │   └── payment.routes.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── booking.service.ts
│   │   ├── payment.service.ts
│   │   ├── notification.service.ts
│   │   └── slot.service.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   ├── validator.ts
│   │   └── helpers.ts
│   ├── types/
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── tests/
│   ├── unit/
│   └── integration/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB / PostgreSQL
- Redis (optional, for caching)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd online-saloon-service-booking/Backend-Service
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

4. **Run database migrations** (if using PostgreSQL)
   ```bash
   npm run migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
API_VERSION=v1

# Database
DB_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/salon_booking
# OR for PostgreSQL
# DATABASE_URL=postgresql://user:password@localhost:5432/salon_booking

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES_IN=30d

# Payment Gateway (Stripe/Razorpay)
PAYMENT_PROVIDER=stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
# OR
# RAZORPAY_KEY_ID=rzp_test_xxxxx
# RAZORPAY_KEY_SECRET=xxxxx

# Notification Services
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
EMAIL_FROM=noreply@saloonbooking.com

# SMS (Optional - Twilio)
TWILIO_ACCOUNT_SID=xxxxx
TWILIO_AUTH_TOKEN=xxxxx
TWILIO_PHONE_NUMBER=+1234567890

# Redis (Optional - for caching)
REDIS_URL=redis://localhost:6379

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080

# Token Amount (in smallest currency unit, e.g., cents/paise)
BOOKING_TOKEN_AMOUNT=500
```

## API Endpoints

### Authentication
```
POST   /api/v1/auth/register          - Register new user
POST   /api/v1/auth/login             - User login
POST   /api/v1/auth/refresh-token     - Refresh access token
POST   /api/v1/auth/logout            - User logout
GET    /api/v1/auth/profile           - Get user profile
PUT    /api/v1/auth/profile           - Update user profile
```

### Services
```
GET    /api/v1/services               - Get all services
GET    /api/v1/services/:id           - Get service by ID
POST   /api/v1/services               - Create service (Admin)
PUT    /api/v1/services/:id           - Update service (Admin)
DELETE /api/v1/services/:id           - Delete service (Admin)
```

### Time Slots
```
GET    /api/v1/slots                  - Get available slots
GET    /api/v1/slots/:serviceId       - Get slots for specific service
POST   /api/v1/slots                  - Create slot (Admin)
PUT    /api/v1/slots/:id              - Update slot (Admin)
DELETE /api/v1/slots/:id              - Delete slot (Admin)
```

### Bookings
```
GET    /api/v1/bookings               - Get user bookings
GET    /api/v1/bookings/:id           - Get booking by ID
POST   /api/v1/bookings/check-availability  - Check slot availability
POST   /api/v1/bookings               - Create new booking
PUT    /api/v1/bookings/:id/cancel    - Cancel booking (if allowed)
GET    /api/v1/bookings/admin/all     - Get all bookings (Admin)
```

### Payments
```
POST   /api/v1/payments/create-intent - Create payment intent
POST   /api/v1/payments/confirm       - Confirm payment
GET    /api/v1/payments/:bookingId    - Get payment details
POST   /api/v1/payments/webhook       - Payment gateway webhook
```

## Database Schema

### User Model
```typescript
{
  id: string,
  email: string,
  password: string (hashed),
  firstName: string,
  lastName: string,
  phone: string,
  role: 'customer' | 'admin',
  createdAt: Date,
  updatedAt: Date
}
```

### Service Model
```typescript
{
  id: string,
  name: string,
  description: string,
  duration: number, // in minutes
  price: number,
  tokenAmount: number, // non-refundable
  category: string,
  imageUrl: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Slot Model
```typescript
{
  id: string,
  serviceId: string,
  date: Date,
  startTime: string, // HH:mm format
  endTime: string,
  maxCapacity: number,
  bookedCount: number,
  isAvailable: boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```typescript
{
  id: string,
  userId: string,
  serviceId: string,
  slotId: string,
  bookingDate: Date,
  startTime: string,
  endTime: string,
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
  tokenAmount: number,
  totalAmount: number,
  paymentId: string,
  notes: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Payment Model
```typescript
{
  id: string,
  bookingId: string,
  userId: string,
  amount: number,
  currency: string,
  paymentMethod: string,
  paymentIntentId: string,
  status: 'pending' | 'completed' | 'failed',
  isRefundable: false, // Always false for token
  metadata: object,
  createdAt: Date,
  updatedAt: Date
}
```

## Booking Flow

1. **User browses services** - GET /api/v1/services
2. **User checks available slots** - GET /api/v1/slots/:serviceId
3. **User checks slot availability** - POST /api/v1/bookings/check-availability
4. **System locks slot temporarily** (5 minutes)
5. **User initiates booking** - POST /api/v1/bookings (creates pending booking)
6. **Create payment intent** - POST /api/v1/payments/create-intent
7. **User completes payment** (frontend handles payment UI)
8. **Confirm payment** - POST /api/v1/payments/confirm
9. **Booking status updated to confirmed**
10. **Send confirmation email/SMS**
11. **Slot capacity updated**

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Rate limiting on sensitive endpoints
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CORS configuration
- Helmet.js for security headers
- Request logging and monitoring

## Testing

```bash
# Run all tests
npm test

# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Generate coverage report
npm run test:coverage
```

## Scripts

```json
{
  "dev": "nodemon src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "test": "jest",
  "test:watch": "jest --watch",
  "lint": "eslint src/**/*.ts",
  "lint:fix": "eslint src/**/*.ts --fix",
  "format": "prettier --write \"src/**/*.ts\""
}
```

## Error Handling

The API uses standard HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict (e.g., slot already booked)
- `422` - Validation Error
- `500` - Internal Server Error

Error response format:
```json
{
  "success": false,
  "message": "Error message",
  "errors": [],
  "code": "ERROR_CODE"
}
```

## Business Rules

### Token Payment
- Token amount is **non-refundable**
- Token is deducted from the total service price
- Failed payments release the slot immediately

### Booking Cancellation
- Cancellations allowed up to 24 hours before appointment
- Token amount is not refunded
- Cancelled slots become available immediately

### Slot Management
- Slots cannot be double-booked
- Concurrent booking attempts use database locking
- Expired temporary locks (5 min) auto-release slots

## Deployment

### Docker
```bash
docker build -t salon-booking-backend .
docker run -p 5000:5000 --env-file .env salon-booking-backend
```

### Using Docker Compose
```bash
docker-compose up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@saloonbooking.com or create an issue in the repository.

## Roadmap

- [ ] Multi-language support
- [ ] Loyalty program integration
- [ ] Recurring booking options
- [ ] Staff assignment to bookings
- [ ] Review and rating system
- [ ] Mobile app API support
- [ ] Analytics dashboard
- [ ] Automated reminder notifications
