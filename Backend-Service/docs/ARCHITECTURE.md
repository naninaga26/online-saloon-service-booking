# 🏗️ Backend Architecture

This **living** document details the architectural and system design practices used to build a robust and maintainable salon booking backend service.

> **💡 Remember**: These practices and patterns evolve with the project. When you discover better practices or encounter new challenges, update this document to help future devs.

> **🤖 Claude Code**: This document provides essential context for understanding the project structure, API design patterns, and technical decisions. Follow these patterns when making changes or additions to the codebase.

## 📋 Table Of Contents

- [🧑‍🔬 Tech Stack](#-tech-stack)
- [🏗️ Project Structure](#️-project-structure)
    - [📁 Directory Guidelines](#-directory-guidelines)
- [🎯 Service Architecture](#-service-architecture)
    - [🔄 Layered Architecture Pattern](#-layered-architecture-pattern)
    - [📦 Service Layer Responsibilities](#-service-layer-responsibilities)
- [🛣️ API Design](#️-api-design)
    - [🔌 RESTful Principles](#-restful-principles)
    - [📝 Request/Response Patterns](#-requestresponse-patterns)
    - [⚠️ Error Handling Strategy](#️-error-handling-strategy)
- [🔐 Authentication & Authorization](#-authentication--authorization)
    - [🎫 JWT Strategy](#-jwt-strategy)
    - [🔒 Role-Based Access Control (RBAC)](#-role-based-access-control-rbac)
    - [🛡️ Security Measures](#️-security-measures)
- [💾 Database Design](#-database-design)
    - [📊 Schema Design](#-schema-design)
    - [🔗 Relationships](#-relationships)
    - [⚡ Performance Optimization](#-performance-optimization)
- [📞 External Integrations](#-external-integrations)
    - [💳 Payment Gateway Integration](#-payment-gateway-integration)
    - [📧 Notification Services](#-notification-services)
- [⚡ Booking Flow Architecture](#-booking-flow-architecture)
    - [🔒 Concurrency Control](#-concurrency-control)
    - [🎯 Slot Management](#-slot-management)
- [🚀 Deployment Strategy](#-deployment-strategy)
- [🤖 Claude Code Guidelines](#-claude-code-guidelines)

---

## 🧑‍🔬 Tech Stack

- **Runtime**: Node.js 18+
- **Language**: TypeScript 5.x
- **Framework**: Express.js
- **Database**: MongoDB / PostgreSQL
- **ORM/ODM**: Mongoose / Prisma
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi / Zod
- **Payment**: Stripe / Razorpay SDK
- **Email**: Nodemailer
- **SMS**: Twilio (optional)
- **Caching**: Redis (optional)
- **API Documentation**: Swagger / OpenAPI 3.0
- **Logging**: Winston
- **Process Manager**: PM2

> **📝 Note**: This excludes the tech stack for code quality and testing. For more details, see [QUALITY_STRATEGY](QUALITY_STRATEGY.md).

---

## 🏗️ Project Structure

The project follows a layered architecture pattern with clear separation of concerns:

```
Backend-Service/
├── src/
│   ├── config/                    # Configuration management
│   │   ├── database.ts            # Database connection config
│   │   ├── environment.ts         # Environment variables
│   │   ├── swagger.ts             # API documentation config
│   │   └── redis.ts               # Cache config (optional)
│   ├── controllers/               # Request handlers (thin layer)
│   │   ├── auth.controller.ts     # Authentication endpoints
│   │   ├── booking.controller.ts  # Booking management
│   │   ├── service.controller.ts  # Service catalog
│   │   ├── slot.controller.ts     # Time slot management
│   │   └── payment.controller.ts  # Payment processing
│   ├── middlewares/               # Express middlewares
│   │   ├── auth.middleware.ts     # JWT verification
│   │   ├── error.middleware.ts    # Global error handler
│   │   ├── validation.middleware.ts  # Request validation
│   │   ├── rateLimiter.middleware.ts # Rate limiting
│   │   └── logger.middleware.ts   # Request logging
│   ├── models/                    # Data models (database schemas)
│   │   ├── User.model.ts          # User schema
│   │   ├── Service.model.ts       # Service schema
│   │   ├── Slot.model.ts          # Time slot schema
│   │   ├── Booking.model.ts       # Booking schema
│   │   └── Payment.model.ts       # Payment schema
│   ├── routes/                    # Route definitions
│   │   ├── index.ts               # Route aggregator
│   │   ├── auth.routes.ts         # Auth routes
│   │   ├── booking.routes.ts      # Booking routes
│   │   ├── service.routes.ts      # Service routes
│   │   ├── slot.routes.ts         # Slot routes
│   │   └── payment.routes.ts      # Payment routes
│   ├── services/                  # Business logic layer
│   │   ├── auth.service.ts        # Authentication logic
│   │   ├── booking.service.ts     # Booking business logic
│   │   ├── payment.service.ts     # Payment processing
│   │   ├── notification.service.ts # Email/SMS notifications
│   │   └── slot.service.ts        # Slot availability logic
│   ├── utils/                     # Utility functions
│   │   ├── logger.ts              # Winston logger setup
│   │   ├── validator.ts           # Custom validators
│   │   ├── helpers.ts             # Helper functions
│   │   ├── constants.ts           # App constants
│   │   └── errors.ts              # Custom error classes
│   ├── types/                     # TypeScript type definitions
│   │   ├── index.ts               # Exported types
│   │   ├── auth.types.ts          # Auth-related types
│   │   ├── booking.types.ts       # Booking types
│   │   └── express.d.ts           # Express type extensions
│   ├── app.ts                     # Express app setup
│   └── server.ts                  # Server entry point
├── tests/                         # Test files
│   ├── unit/                      # Unit tests
│   ├── integration/               # Integration tests
│   └── fixtures/                  # Test data
├── .env.example                   # Environment variables template
├── .gitignore                     # Git ignore rules
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript config
├── jest.config.js                 # Jest test config
├── .eslintrc.json                 # ESLint config
└── README.md                      # Project readme
```

### 📁 Directory Guidelines

- **`/config`**: All configuration files. Centralize environment-specific settings
- **`/controllers`**: Thin layer that handles HTTP request/response. Delegate business logic to services
- **`/middlewares`**: Reusable middleware functions for request processing
- **`/models`**: Database schemas and model definitions only
- **`/routes`**: Route definitions. Keep them clean and declarative
- **`/services`**: Core business logic. This is where complex operations live
- **`/utils`**: Pure utility functions with no side effects
- **`/types`**: TypeScript type definitions and interfaces

---

## 🎯 Service Architecture

### 🔄 Layered Architecture Pattern

The application follows a strict layered architecture:

```
┌─────────────────────────────────┐
│   Controllers (HTTP Layer)      │  ← Request/Response handling
├─────────────────────────────────┤
│   Services (Business Logic)     │  ← Core business rules
├─────────────────────────────────┤
│   Models (Data Layer)           │  ← Database operations
└─────────────────────────────────┘
```

**Flow Example: Creating a Booking**

```
1. Route: POST /api/v1/bookings
2. Middleware: Auth → Validation → Rate Limit
3. Controller: bookingController.createBooking()
   - Extracts request data
   - Calls service layer
   - Returns formatted response
4. Service: bookingService.createBooking()
   - Validates business rules
   - Checks slot availability
   - Creates booking
   - Initiates payment
   - Sends notifications
5. Model: Booking.create()
   - Saves to database
   - Returns created booking
```

### 📦 Service Layer Responsibilities

Each service should:
- Contain business logic and rules
- Orchestrate multiple model operations
- Handle external service integrations
- Implement transaction management
- NOT handle HTTP-specific concerns (status codes, headers, etc.)

**Example Service Pattern:**

```typescript
// src/services/booking.service.ts
class BookingService {
  async createBooking(userId: string, bookingData: CreateBookingDTO): Promise<Booking> {
    // 1. Business validation
    await this.validateBookingRules(bookingData);

    // 2. Check slot availability
    const slot = await this.slotService.checkAvailability(bookingData.slotId);
    if (!slot.isAvailable) {
      throw new ConflictError('Slot is not available');
    }

    // 3. Create booking (use transaction)
    const booking = await this.createBookingTransaction(userId, bookingData, slot);

    // 4. Trigger side effects
    await this.notificationService.sendBookingConfirmation(booking);

    return booking;
  }
}
```

---

## 🛣️ API Design

### 🔌 RESTful Principles

The API follows REST conventions:

| Method | Route                    | Description              | Auth Required |
|--------|--------------------------|--------------------------|---------------|
| POST   | /auth/register           | Create new user          | No            |
| POST   | /auth/login              | User login               | No            |
| POST   | /auth/refresh-token      | Refresh access token     | Yes           |
| GET    | /services                | List all services        | No            |
| GET    | /services/:id            | Get service details      | No            |
| POST   | /services                | Create service (Admin)   | Yes (Admin)   |
| GET    | /slots                   | Get available slots      | No            |
| POST   | /bookings                | Create booking           | Yes           |
| GET    | /bookings                | Get user's bookings      | Yes           |
| PUT    | /bookings/:id/cancel     | Cancel booking           | Yes           |
| POST   | /payments/create-intent  | Create payment intent    | Yes           |
| POST   | /payments/confirm        | Confirm payment          | Yes           |

### 📝 Request/Response Patterns

**Standard Success Response:**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Haircut",
    "price": 50
  },
  "message": "Service retrieved successfully"
}
```

**Pagination Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "totalPages": 10
    }
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ],
  "code": "VALIDATION_ERROR",
  "statusCode": 422
}
```

### ⚠️ Error Handling Strategy

**Custom Error Classes:**

```typescript
// src/utils/errors.ts
class AppError extends Error {
  statusCode: number;
  code: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number, code: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

class ValidationError extends AppError {
  constructor(message: string, errors?: any[]) {
    super(message, 422, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
  }
}
```

**Global Error Handler:**

```typescript
// src/middlewares/error.middleware.ts
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      code: err.code,
      errors: err.errors
    });
  }

  // Log unexpected errors
  logger.error('Unexpected error:', err);

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    code: 'INTERNAL_ERROR'
  });
};
```

---

## 🔐 Authentication & Authorization

### 🎫 JWT Strategy

**Token Types:**
- **Access Token**: Short-lived (15 mins), used for API requests
- **Refresh Token**: Long-lived (30 days), used to obtain new access tokens

**Token Structure:**
```typescript
interface JWTPayload {
  userId: string;
  email: string;
  role: 'customer' | 'admin';
  iat: number;
  exp: number;
}
```

**Authentication Flow:**
```
1. User logs in with email/password
2. Server validates credentials
3. Generate access token (15 min expiry)
4. Generate refresh token (30 day expiry)
5. Return both tokens to client
6. Client stores tokens securely
7. Client includes access token in Authorization header
8. On expiry, use refresh token to get new access token
```

### 🔒 Role-Based Access Control (RBAC)

**Roles:**
- **customer**: Regular users who book services
- **admin**: Service providers and administrators

**Permission Matrix:**

| Resource | Create | Read | Update | Delete |
|----------|--------|------|--------|--------|
| Services | Admin  | All  | Admin  | Admin  |
| Slots    | Admin  | All  | Admin  | Admin  |
| Bookings | Auth   | Own  | Own    | Own    |
| Users    | All    | Own  | Own    | Admin  |

**Middleware Implementation:**

```typescript
// src/middlewares/auth.middleware.ts
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    throw new UnauthorizedError('No token provided');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};

export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      throw new ForbiddenError('Insufficient permissions');
    }
    next();
  };
};

// Usage in routes
router.post('/services', authenticate, authorize('admin'), serviceController.create);
```

### 🛡️ Security Measures

- **Password Hashing**: bcrypt with salt rounds of 10
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Helmet.js**: Security headers (CSP, HSTS, X-Frame-Options)
- **CORS**: Configured allowed origins from environment
- **Input Sanitization**: Prevent XSS and SQL injection
- **Request Size Limit**: 10MB max payload size
- **SQL Injection Prevention**: Parameterized queries/ORM
- **Audit Logging**: Log sensitive operations

---

## 💾 Database Design

### 📊 Schema Design

**User Schema:**
```typescript
{
  id: UUID,
  email: string (unique, indexed),
  password: string (hashed),
  firstName: string,
  lastName: string,
  phone: string,
  role: enum['customer', 'admin'],
  isVerified: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Service Schema:**
```typescript
{
  id: UUID,
  name: string,
  description: text,
  duration: integer (minutes),
  price: decimal,
  tokenAmount: decimal (non-refundable),
  category: string,
  imageUrl: string,
  isActive: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Slot Schema:**
```typescript
{
  id: UUID,
  serviceId: UUID (foreign key),
  date: date (indexed),
  startTime: time,
  endTime: time,
  maxCapacity: integer,
  bookedCount: integer,
  isAvailable: boolean (computed),
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Booking Schema:**
```typescript
{
  id: UUID,
  userId: UUID (foreign key, indexed),
  serviceId: UUID (foreign key),
  slotId: UUID (foreign key),
  bookingDate: date,
  startTime: time,
  endTime: time,
  status: enum['pending', 'confirmed', 'cancelled', 'completed'],
  tokenAmount: decimal,
  totalAmount: decimal,
  paymentId: UUID,
  notes: text,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

**Payment Schema:**
```typescript
{
  id: UUID,
  bookingId: UUID (foreign key, indexed),
  userId: UUID (foreign key),
  amount: decimal,
  currency: string,
  paymentMethod: string,
  paymentIntentId: string (indexed),
  status: enum['pending', 'completed', 'failed'],
  isRefundable: boolean (always false for token),
  metadata: json,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 🔗 Relationships

```
User 1 ──── N Booking
Service 1 ──── N Slot
Service 1 ──── N Booking
Slot 1 ──── N Booking
Booking 1 ──── 1 Payment
```

### ⚡ Performance Optimization

**Indexing Strategy:**
- Primary keys (automatic)
- Foreign keys for joins
- Frequently queried fields (email, date, status)
- Composite indexes for common query patterns

**Query Optimization:**
- Use SELECT only needed fields
- Implement pagination for large datasets
- Use connection pooling
- Cache frequently accessed data (Redis)

---

## 📞 External Integrations

### 💳 Payment Gateway Integration

**Stripe Integration Pattern:**

```typescript
// src/services/payment.service.ts
class PaymentService {
  private stripe: Stripe;

  async createPaymentIntent(bookingId: string, amount: number): Promise<PaymentIntent> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: { bookingId }
    });

    return paymentIntent;
  }

  async confirmPayment(paymentIntentId: string): Promise<void> {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      await this.bookingService.confirmBooking(paymentIntent.metadata.bookingId);
    }
  }

  async handleWebhook(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePaymentSuccess(event.data.object);
        break;
      case 'payment_intent.payment_failed':
        await this.handlePaymentFailure(event.data.object);
        break;
    }
  }
}
```

### 📧 Notification Services

**Email Service Pattern:**

```typescript
// src/services/notification.service.ts
class NotificationService {
  async sendBookingConfirmation(booking: Booking): Promise<void> {
    const emailData = {
      to: booking.user.email,
      subject: 'Booking Confirmation',
      template: 'booking-confirmation',
      context: {
        userName: booking.user.firstName,
        serviceName: booking.service.name,
        bookingDate: booking.bookingDate,
        startTime: booking.startTime
      }
    };

    await this.emailService.send(emailData);

    // Optional: Send SMS
    if (booking.user.phone) {
      await this.smsService.send(booking.user.phone, 'Booking confirmed!');
    }
  }
}
```

---

## ⚡ Booking Flow Architecture

### 🔒 Concurrency Control

**Problem**: Prevent double-booking of the same slot by concurrent users.

**Solution**: Implement optimistic locking with database transactions.

```typescript
// src/services/booking.service.ts
async createBooking(userId: string, bookingData: CreateBookingDTO): Promise<Booking> {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Lock the slot with version check
    const slot = await Slot.findOneAndUpdate(
      {
        _id: bookingData.slotId,
        bookedCount: { $lt: maxCapacity },
        version: bookingData.slotVersion // Optimistic lock
      },
      {
        $inc: { bookedCount: 1, version: 1 }
      },
      { session, new: true }
    );

    if (!slot) {
      throw new ConflictError('Slot is no longer available');
    }

    // 2. Create booking
    const booking = await Booking.create([{
      userId,
      slotId: slot._id,
      serviceId: bookingData.serviceId,
      status: 'pending'
    }], { session });

    // 3. Commit transaction
    await session.commitTransaction();

    return booking[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
}
```

### 🎯 Slot Management

**Temporary Slot Locking:**

When a user starts booking, lock the slot for 5 minutes:

```typescript
// src/services/slot.service.ts
async lockSlotTemporarily(slotId: string, userId: string): Promise<void> {
  const lockKey = `slot:${slotId}:lock`;
  const lockValue = userId;
  const lockTTL = 300; // 5 minutes in seconds

  // Use Redis SET with NX (not exists) and EX (expiry)
  const locked = await redis.set(lockKey, lockValue, 'EX', lockTTL, 'NX');

  if (!locked) {
    throw new ConflictError('Slot is currently being booked by another user');
  }
}

async releaseSlotLock(slotId: string, userId: string): Promise<void> {
  const lockKey = `slot:${slotId}:lock`;
  const currentLock = await redis.get(lockKey);

  // Only release if the lock belongs to this user
  if (currentLock === userId) {
    await redis.del(lockKey);
  }
}
```

---

## 🚀 Deployment Strategy

**Environment Configuration:**
- **Development**: Local machine with hot-reload
- **Staging**: Pre-production environment
- **Production**: Cloud deployment (AWS, GCP, Azure)

**Deployment Steps:**
1. Build TypeScript to JavaScript (`npm run build`)
2. Run database migrations
3. Deploy to container (Docker)
4. Configure environment variables
5. Start with process manager (PM2)
6. Health check endpoint validation

**Docker Setup:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 5000

CMD ["node", "dist/server.js"]
```

**PM2 Ecosystem:**
```javascript
module.exports = {
  apps: [{
    name: 'salon-booking-api',
    script: './dist/server.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
```

---

## 🤖 Claude Code Guidelines

### 📋 Quick Reference For AI Development

- **Layered Architecture**: Controllers → Services → Models (strict separation)
- **Error Handling**: Use custom error classes, never throw generic errors
- **Validation**: Validate at controller level before service calls
- **Transactions**: Use database transactions for multi-step operations
- **Async/Await**: Always use async/await, never raw promises or callbacks
- **Type Safety**: Define types for all function parameters and returns
- **Testing**: Follow practices detailed in [QUALITY_STRATEGY](QUALITY_STRATEGY.md)

### 🔍 Before Making Changes

- Check existing patterns in similar features
- Verify the correct layer for new functionality
- Ensure types are properly defined
- Update API documentation (Swagger)
- Add appropriate error handling
- Update related docs if needed

### ✅ Common Patterns

**Good patterns:**
- Thin controllers that delegate to services (see [booking.controller.ts](../src/controllers/booking.controller.ts))
- Services contain business logic (see [booking.service.ts](../src/services/booking.service.ts))
- Use transactions for data consistency
- Proper error handling with custom error classes
- Type-safe request validation with Joi/Zod

**Avoid:**
- Business logic in controllers
- Direct database queries in controllers
- Missing error handling
- Unvalidated user input
- Synchronous blocking operations
