# 🧪 Testing Strategy

A comprehensive testing guide for the salon booking backend service covering unit tests, integration tests, and testing best practices.

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

1. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
2. **Write Tests First** (TDD): Write failing tests before implementation when possible
3. **Fast Feedback**: Tests should run quickly to encourage frequent execution
4. **Isolated Tests**: Each test should be independent and not rely on others
5. **Realistic Data**: Use realistic test data that mimics production scenarios
6. **Clear Assertions**: Test assertions should be clear and specific

---

## 🧑‍🔬 Tech Stack

- **Test Framework**: Jest
- **Assertion Library**: Jest (built-in)
- **Mocking**: Jest mocks
- **Test Database**: MongoDB Memory Server / PostgreSQL Test Container
- **API Testing**: Supertest
- **Coverage**: Jest Coverage (NYC)
- **Test Data Generation**: @faker-js/faker

---

## 📊 Test Coverage Goals

Maintain these minimum coverage thresholds:

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

**Priority Areas for 100% Coverage:**
- Services (business logic)
- Utilities
- Middlewares (auth, validation, error handling)

**Lower Priority (70%+ acceptable):**
- Controllers (thin layer)
- Models (basic CRUD)

---

## 🔬 Unit Testing

### Service Layer Tests

Services contain business logic and should have comprehensive unit tests.

**Example: Booking Service Tests**

```typescript
// tests/unit/services/booking.service.test.ts
import { BookingService } from '../../../src/services/booking.service';
import { SlotService } from '../../../src/services/slot.service';
import { NotificationService } from '../../../src/services/notification.service';
import { Booking } from '../../../src/models/Booking.model';
import { ConflictError, ValidationError } from '../../../src/utils/errors';

// Mock dependencies
jest.mock('../../../src/services/slot.service');
jest.mock('../../../src/services/notification.service');
jest.mock('../../../src/models/Booking.model');

describe('BookingService', () => {
  let bookingService: BookingService;
  let slotServiceMock: jest.Mocked<SlotService>;
  let notificationServiceMock: jest.Mocked<NotificationService>;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    slotServiceMock = new SlotService() as jest.Mocked<SlotService>;
    notificationServiceMock = new NotificationService() as jest.Mocked<NotificationService>;

    bookingService = new BookingService();
    (bookingService as any).slotService = slotServiceMock;
    (bookingService as any).notificationService = notificationServiceMock;
  });

  describe('createBooking', () => {
    it('should create booking when slot is available', async () => {
      // Arrange
      const userId = 'user-123';
      const bookingData = {
        serviceId: 'service-123',
        slotId: 'slot-123',
        bookingDate: new Date('2024-12-01'),
        notes: 'Test booking'
      };

      const mockSlot = {
        _id: 'slot-123',
        isAvailable: true,
        bookedCount: 0,
        maxCapacity: 5
      };

      const mockBooking = {
        _id: 'booking-123',
        userId,
        ...bookingData,
        status: 'pending'
      };

      slotServiceMock.getSlot.mockResolvedValue(mockSlot as any);
      (Booking.create as jest.Mock).mockResolvedValue([mockBooking]);

      // Act
      const result = await bookingService.createBooking(userId, bookingData);

      // Assert
      expect(slotServiceMock.getSlot).toHaveBeenCalledWith('slot-123');
      expect(Booking.create).toHaveBeenCalled();
      expect(notificationServiceMock.sendBookingConfirmation).toHaveBeenCalledWith(mockBooking);
      expect(result).toEqual(mockBooking);
    });

    it('should throw ConflictError when slot is not available', async () => {
      // Arrange
      const userId = 'user-123';
      const bookingData = {
        serviceId: 'service-123',
        slotId: 'slot-123',
        bookingDate: new Date('2024-12-01')
      };

      const mockSlot = {
        _id: 'slot-123',
        isAvailable: false
      };

      slotServiceMock.getSlot.mockResolvedValue(mockSlot as any);

      // Act & Assert
      await expect(
        bookingService.createBooking(userId, bookingData)
      ).rejects.toThrow(ConflictError);

      expect(Booking.create).not.toHaveBeenCalled();
      expect(notificationServiceMock.sendBookingConfirmation).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when booking date is in the past', async () => {
      // Arrange
      const userId = 'user-123';
      const bookingData = {
        serviceId: 'service-123',
        slotId: 'slot-123',
        bookingDate: new Date('2020-01-01')
      };

      // Act & Assert
      await expect(
        bookingService.createBooking(userId, bookingData)
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('getUserBookings', () => {
    it('should return paginated bookings for user', async () => {
      // Arrange
      const userId = 'user-123';
      const pagination = { page: 1, limit: 10 };

      const mockBookings = [
        { _id: 'booking-1', userId, status: 'confirmed' },
        { _id: 'booking-2', userId, status: 'pending' }
      ];

      const mockQuery = {
        skip: jest.fn().returnThis(),
        limit: jest.fn().returnThis(),
        sort: jest.fn().returnThis(),
        exec: jest.fn().resolvedValue(mockBookings)
      };

      (Booking.find as jest.Mock).mockReturnValue(mockQuery);
      (Booking.countDocuments as jest.Mock).mockResolvedValue(2);

      // Act
      const result = await bookingService.getUserBookings(userId, pagination);

      // Assert
      expect(Booking.find).toHaveBeenCalledWith({ userId });
      expect(mockQuery.skip).toHaveBeenCalledWith(0);
      expect(mockQuery.limit).toHaveBeenCalledWith(10);
      expect(result).toEqual({
        items: mockBookings,
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1
        }
      });
    });
  });
});
```

### Utility Function Tests

```typescript
// tests/unit/utils/helpers.test.ts
import { calculateBookingTotal, formatDate, isBookingCancellable } from '../../../src/utils/helpers';

describe('Utility Functions', () => {
  describe('calculateBookingTotal', () => {
    it('should calculate total with token deducted', () => {
      const servicePrice = 100;
      const tokenAmount = 20;

      const total = calculateBookingTotal(servicePrice, tokenAmount);

      expect(total).toBe(80);
    });

    it('should return service price when token is not provided', () => {
      const servicePrice = 100;

      const total = calculateBookingTotal(servicePrice);

      expect(total).toBe(100);
    });
  });

  describe('formatDate', () => {
    it('should format date in YYYY-MM-DD format', () => {
      const date = new Date('2024-12-01T10:30:00');

      const formatted = formatDate(date);

      expect(formatted).toBe('2024-12-01');
    });
  });

  describe('isBookingCancellable', () => {
    it('should return true when booking is more than 24 hours away', () => {
      const bookingDate = new Date(Date.now() + 48 * 60 * 60 * 1000); // 48 hours from now

      const result = isBookingCancellable(bookingDate);

      expect(result).toBe(true);
    });

    it('should return false when booking is less than 24 hours away', () => {
      const bookingDate = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours from now

      const result = isBookingCancellable(bookingDate);

      expect(result).toBe(false);
    });
  });
});
```

### Middleware Tests

```typescript
// tests/unit/middlewares/auth.middleware.test.ts
import { Request, Response, NextFunction } from 'express';
import { authenticate, authorize } from '../../../src/middlewares/auth.middleware';
import { UnauthorizedError, ForbiddenError } from '../../../src/utils/errors';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {}
    };
    mockResponse = {};
    nextFunction = jest.fn();
  });

  describe('authenticate', () => {
    it('should authenticate valid token', async () => {
      // Arrange
      const token = 'valid.jwt.token';
      const decoded = { userId: 'user-123', role: 'customer' };

      mockRequest.headers = { authorization: `Bearer ${token}` };
      (jwt.verify as jest.Mock).mockReturnValue(decoded);

      // Act
      await authenticate(mockRequest as Request, mockResponse as Response, nextFunction);

      // Assert
      expect(jwt.verify).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
      expect(mockRequest.user).toEqual(decoded);
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should throw UnauthorizedError when no token provided', async () => {
      // Arrange
      mockRequest.headers = {};

      // Act & Assert
      await expect(
        authenticate(mockRequest as Request, mockResponse as Response, nextFunction)
      ).rejects.toThrow(UnauthorizedError);

      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should throw UnauthorizedError when token is invalid', async () => {
      // Arrange
      const token = 'invalid.token';
      mockRequest.headers = { authorization: `Bearer ${token}` };
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });

      // Act & Assert
      await expect(
        authenticate(mockRequest as Request, mockResponse as Response, nextFunction)
      ).rejects.toThrow(UnauthorizedError);
    });
  });

  describe('authorize', () => {
    it('should allow access when user has required role', () => {
      // Arrange
      mockRequest.user = { userId: 'user-123', role: 'admin' };
      const middleware = authorize('admin');

      // Act
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      // Assert
      expect(nextFunction).toHaveBeenCalled();
    });

    it('should throw ForbiddenError when user lacks required role', () => {
      // Arrange
      mockRequest.user = { userId: 'user-123', role: 'customer' };
      const middleware = authorize('admin');

      // Act & Assert
      expect(() => {
        middleware(mockRequest as Request, mockResponse as Response, nextFunction);
      }).toThrow(ForbiddenError);

      expect(nextFunction).not.toHaveBeenCalled();
    });
  });
});
```

---

## 🔗 Integration Testing

Integration tests verify that multiple components work together correctly.

### API Endpoint Tests

```typescript
// tests/integration/bookings.test.ts
import request from 'supertest';
import app from '../../src/app';
import { connectDatabase, closeDatabase, clearDatabase } from '../fixtures/database';
import { createUser, createService, createSlot } from '../fixtures/factories';

describe('Bookings API', () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  describe('POST /api/v1/bookings', () => {
    it('should create booking with valid data', async () => {
      // Arrange
      const user = await createUser({ role: 'customer' });
      const service = await createService();
      const slot = await createSlot({ serviceId: service._id });
      const token = generateJWT({ userId: user._id, role: user.role });

      const bookingData = {
        serviceId: service._id,
        slotId: slot._id,
        bookingDate: new Date('2024-12-01'),
        notes: 'Test booking'
      };

      // Act
      const response = await request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${token}`)
        .send(bookingData);

      // Assert
      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data.userId).toBe(user._id.toString());
      expect(response.body.data.status).toBe('pending');
    });

    it('should return 401 when not authenticated', async () => {
      // Arrange
      const bookingData = {
        serviceId: 'service-123',
        slotId: 'slot-123',
        bookingDate: new Date('2024-12-01')
      };

      // Act
      const response = await request(app)
        .post('/api/v1/bookings')
        .send(bookingData);

      // Assert
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it('should return 409 when slot is not available', async () => {
      // Arrange
      const user = await createUser();
      const service = await createService();
      const slot = await createSlot({
        serviceId: service._id,
        bookedCount: 5,
        maxCapacity: 5
      });
      const token = generateJWT({ userId: user._id, role: user.role });

      const bookingData = {
        serviceId: service._id,
        slotId: slot._id,
        bookingDate: new Date('2024-12-01')
      };

      // Act
      const response = await request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${token}`)
        .send(bookingData);

      // Assert
      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('not available');
    });

    it('should return 422 when validation fails', async () => {
      // Arrange
      const user = await createUser();
      const token = generateJWT({ userId: user._id, role: user.role });

      const invalidData = {
        serviceId: 'invalid-id',
        // Missing required slotId
        bookingDate: 'invalid-date'
      };

      // Act
      const response = await request(app)
        .post('/api/v1/bookings')
        .set('Authorization', `Bearer ${token}`)
        .send(invalidData);

      // Assert
      expect(response.status).toBe(422);
      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('GET /api/v1/bookings', () => {
    it('should return user bookings with pagination', async () => {
      // Arrange
      const user = await createUser();
      const service = await createService();
      const slot = await createSlot({ serviceId: service._id });

      // Create multiple bookings
      for (let i = 0; i < 15; i++) {
        await createBooking({
          userId: user._id,
          serviceId: service._id,
          slotId: slot._id
        });
      }

      const token = generateJWT({ userId: user._id, role: user.role });

      // Act
      const response = await request(app)
        .get('/api/v1/bookings?page=1&limit=10')
        .set('Authorization', `Bearer ${token}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.items).toHaveLength(10);
      expect(response.body.data.pagination).toEqual({
        page: 1,
        limit: 10,
        total: 15,
        totalPages: 2
      });
    });

    it('should only return bookings for authenticated user', async () => {
      // Arrange
      const user1 = await createUser();
      const user2 = await createUser();
      const service = await createService();
      const slot = await createSlot({ serviceId: service._id });

      await createBooking({ userId: user1._id, serviceId: service._id, slotId: slot._id });
      await createBooking({ userId: user2._id, serviceId: service._id, slotId: slot._id });

      const token = generateJWT({ userId: user1._id, role: user1.role });

      // Act
      const response = await request(app)
        .get('/api/v1/bookings')
        .set('Authorization', `Bearer ${token}`);

      // Assert
      expect(response.status).toBe(200);
      expect(response.body.data.items).toHaveLength(1);
      expect(response.body.data.items[0].userId).toBe(user1._id.toString());
    });
  });
});
```

### Database Tests

```typescript
// tests/integration/models/booking.model.test.ts
import { Booking } from '../../../src/models/Booking.model';
import { connectDatabase, closeDatabase, clearDatabase } from '../../fixtures/database';
import { createUser, createService, createSlot } from '../../fixtures/factories';

describe('Booking Model', () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  describe('Schema Validation', () => {
    it('should create booking with valid data', async () => {
      // Arrange
      const user = await createUser();
      const service = await createService();
      const slot = await createSlot({ serviceId: service._id });

      const bookingData = {
        userId: user._id,
        serviceId: service._id,
        slotId: slot._id,
        bookingDate: new Date('2024-12-01'),
        startTime: '10:00',
        endTime: '11:00',
        status: 'pending',
        tokenAmount: 10,
        totalAmount: 50
      };

      // Act
      const booking = await Booking.create(bookingData);

      // Assert
      expect(booking._id).toBeDefined();
      expect(booking.userId.toString()).toBe(user._id.toString());
      expect(booking.status).toBe('pending');
    });

    it('should reject booking without required fields', async () => {
      // Arrange
      const invalidBooking = {
        userId: 'user-123'
        // Missing required fields
      };

      // Act & Assert
      await expect(Booking.create(invalidBooking)).rejects.toThrow();
    });
  });

  describe('Indexes', () => {
    it('should have index on userId', async () => {
      const indexes = await Booking.collection.getIndexes();
      expect(indexes).toHaveProperty('userId_1');
    });
  });
});
```

---

## 🎭 E2E Testing

End-to-end tests verify complete user workflows.

```typescript
// tests/e2e/booking-flow.test.ts
import request from 'supertest';
import app from '../../src/app';
import { connectDatabase, closeDatabase, clearDatabase } from '../fixtures/database';

describe('Complete Booking Flow', () => {
  beforeAll(async () => {
    await connectDatabase();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  afterEach(async () => {
    await clearDatabase();
  });

  it('should complete full booking flow from registration to payment', async () => {
    // Step 1: Register user
    const registerResponse = await request(app)
      .post('/api/v1/auth/register')
      .send({
        email: 'test@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890'
      });

    expect(registerResponse.status).toBe(201);
    const { token } = registerResponse.body.data;

    // Step 2: Browse services
    const servicesResponse = await request(app)
      .get('/api/v1/services');

    expect(servicesResponse.status).toBe(200);
    const service = servicesResponse.body.data[0];

    // Step 3: Check available slots
    const slotsResponse = await request(app)
      .get(`/api/v1/slots?serviceId=${service._id}`);

    expect(slotsResponse.status).toBe(200);
    const slot = slotsResponse.body.data[0];

    // Step 4: Create booking
    const bookingResponse = await request(app)
      .post('/api/v1/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        serviceId: service._id,
        slotId: slot._id,
        bookingDate: slot.date
      });

    expect(bookingResponse.status).toBe(201);
    const booking = bookingResponse.body.data;

    // Step 5: Create payment intent
    const paymentIntentResponse = await request(app)
      .post('/api/v1/payments/create-intent')
      .set('Authorization', `Bearer ${token}`)
      .send({
        bookingId: booking._id,
        amount: service.tokenAmount
      });

    expect(paymentIntentResponse.status).toBe(200);
    expect(paymentIntentResponse.body.data).toHaveProperty('clientSecret');

    // Step 6: Confirm payment (simulated)
    const confirmPaymentResponse = await request(app)
      .post('/api/v1/payments/confirm')
      .set('Authorization', `Bearer ${token}`)
      .send({
        paymentIntentId: paymentIntentResponse.body.data.id
      });

    expect(confirmPaymentResponse.status).toBe(200);

    // Step 7: Verify booking status
    const bookingCheckResponse = await request(app)
      .get(`/api/v1/bookings/${booking._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(bookingCheckResponse.status).toBe(200);
    expect(bookingCheckResponse.body.data.status).toBe('confirmed');
  });
});
```

---

## 🏗️ Test Structure

### Directory Structure

```
tests/
├── unit/                          # Unit tests
│   ├── services/
│   │   ├── auth.service.test.ts
│   │   ├── booking.service.test.ts
│   │   └── payment.service.test.ts
│   ├── middlewares/
│   │   ├── auth.middleware.test.ts
│   │   └── validation.middleware.test.ts
│   └── utils/
│       ├── helpers.test.ts
│       └── validators.test.ts
├── integration/                   # Integration tests
│   ├── api/
│   │   ├── auth.test.ts
│   │   ├── bookings.test.ts
│   │   └── services.test.ts
│   └── models/
│       ├── booking.model.test.ts
│       └── user.model.test.ts
├── e2e/                          # End-to-end tests
│   ├── booking-flow.test.ts
│   └── payment-flow.test.ts
├── fixtures/                     # Test utilities
│   ├── database.ts               # Database setup/teardown
│   ├── factories.ts              # Test data factories
│   └── mocks.ts                  # Mock data
└── setup.ts                      # Global test setup
```

---

## 🛠️ Testing Utilities

### Test Database Setup

```typescript
// tests/fixtures/database.ts
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer: MongoMemoryServer;

export const connectDatabase = async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
};

export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
```

### Test Data Factories

```typescript
// tests/fixtures/factories.ts
import { faker } from '@faker-js/faker';
import { User } from '../../src/models/User.model';
import { Service } from '../../src/models/Service.model';
import { Slot } from '../../src/models/Slot.model';
import { Booking } from '../../src/models/Booking.model';
import bcrypt from 'bcrypt';

export const createUser = async (overrides = {}) => {
  const userData = {
    email: faker.internet.email(),
    password: await bcrypt.hash('password123', 10),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number(),
    role: 'customer',
    ...overrides
  };

  return await User.create(userData);
};

export const createService = async (overrides = {}) => {
  const serviceData = {
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    duration: 60,
    price: parseFloat(faker.commerce.price()),
    tokenAmount: 10,
    category: 'Hair',
    imageUrl: faker.image.url(),
    isActive: true,
    ...overrides
  };

  return await Service.create(serviceData);
};

export const createSlot = async (overrides = {}) => {
  const slotData = {
    serviceId: faker.database.mongodbObjectId(),
    date: faker.date.future(),
    startTime: '10:00',
    endTime: '11:00',
    maxCapacity: 5,
    bookedCount: 0,
    isAvailable: true,
    ...overrides
  };

  return await Slot.create(slotData);
};

export const createBooking = async (overrides = {}) => {
  const bookingData = {
    userId: faker.database.mongodbObjectId(),
    serviceId: faker.database.mongodbObjectId(),
    slotId: faker.database.mongodbObjectId(),
    bookingDate: faker.date.future(),
    startTime: '10:00',
    endTime: '11:00',
    status: 'pending',
    tokenAmount: 10,
    totalAmount: 50,
    ...overrides
  };

  return await Booking.create(bookingData);
};

// Helper to generate JWT for tests
export const generateJWT = (payload: any) => {
  const jwt = require('jsonwebtoken');
  return jwt.sign(payload, process.env.JWT_SECRET || 'test-secret', {
    expiresIn: '1h'
  });
};
```

---

## 🎯 Best Practices

### 1. AAA Pattern (Arrange-Act-Assert)

Always structure tests using AAA pattern:

```typescript
it('should do something', () => {
  // Arrange: Setup test data and dependencies
  const input = 'test';
  const expected = 'TEST';

  // Act: Execute the function/method being tested
  const result = toUpperCase(input);

  // Assert: Verify the result
  expect(result).toBe(expected);
});
```

### 2. Use Descriptive Test Names

```typescript
// ✅ Good
it('should throw ValidationError when email format is invalid', () => {});
it('should return 401 when authentication token is missing', () => {});

// ❌ Avoid
it('should work', () => {});
it('test email', () => {});
```

### 3. Test One Thing Per Test

```typescript
// ✅ Good
it('should create booking', () => {});
it('should send confirmation email after booking', () => {});

// ❌ Avoid
it('should create booking and send email', () => {
  // Testing multiple things
});
```

### 4. Mock External Dependencies

```typescript
// Mock external services
jest.mock('../../../src/services/payment.service');
jest.mock('../../../src/services/notification.service');

// Mock only what you need
const paymentServiceMock = new PaymentService() as jest.Mocked<PaymentService>;
paymentServiceMock.createPaymentIntent.mockResolvedValue(mockPaymentIntent);
```

### 5. Clean Up After Tests

```typescript
afterEach(async () => {
  jest.clearAllMocks();
  await clearDatabase();
});

afterAll(async () => {
  await closeDatabase();
});
```

### 6. Test Edge Cases

```typescript
describe('calculateTotal', () => {
  it('should handle zero values', () => {});
  it('should handle negative values', () => {});
  it('should handle very large numbers', () => {});
  it('should handle null/undefined', () => {});
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
npm test -- booking.service.test.ts

# Run tests matching pattern
npm test -- --testNamePattern="should create booking"

# Generate coverage report
npm run test:coverage

# Run only unit tests
npm test -- tests/unit

# Run only integration tests
npm test -- tests/integration
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

## 📊 Coverage Reports

View coverage report after running:

```bash
npm run test:coverage
```

Open `coverage/lcov-report/index.html` in browser for detailed report.

**Coverage Interpretation:**
- **Statements**: Individual statements executed
- **Branches**: Decision points (if/else, switch, ternary)
- **Functions**: Functions/methods called
- **Lines**: Lines of code executed

---

**Remember**: Good tests are your safety net for refactoring and new features! 🚀
