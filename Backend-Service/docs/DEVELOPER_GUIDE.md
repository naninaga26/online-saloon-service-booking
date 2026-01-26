# 👨‍💻 Developer Guide

A comprehensive guide for developers working on the salon booking backend service. This guide covers setup, development workflows, coding standards, and best practices.

## 📋 Table of Contents

- [🚀 Getting Started](#-getting-started)
- [💻 Development Environment](#-development-environment)
- [🏗️ Project Setup](#️-project-setup)
- [📝 Coding Standards](#-coding-standards)
- [🔧 Development Workflows](#-development-workflows)
- [🐛 Debugging](#-debugging)
- [📚 API Documentation](#-api-documentation)
- [🔐 Environment Variables](#-environment-variables)
- [🛠️ Common Tasks](#️-common-tasks)
- [❓ Troubleshooting](#-troubleshooting)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.x or higher ([Download](https://nodejs.org/))
- **npm**: v9.x or higher (comes with Node.js)
- **MongoDB**: v6.x or higher ([Download](https://www.mongodb.com/try/download/community))
  - OR **PostgreSQL**: v14.x or higher ([Download](https://www.postgresql.org/download/))
- **Git**: Latest version
- **Redis** (Optional): v7.x or higher for caching ([Download](https://redis.io/download))
- **VS Code**: Recommended IDE ([Download](https://code.visualstudio.com/))

### Recommended VS Code Extensions

Install these extensions for the best development experience:

```
- ESLint (dbaeumer.vscode-eslint)
- Prettier (esbenp.prettier-vscode)
- Thunder Client (rangav.vscode-thunder-client) - API testing
- MongoDB for VS Code (mongodb.mongodb-vscode)
- GitLens (eamodio.gitlens)
- TypeScript Error Translator (mattpocock.ts-error-translator)
- Path Intellisense (christian-kohler.path-intellisense)
```

---

## 💻 Development Environment

### Initial Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd online-saloon-service-booking/Backend-Service
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Setup environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your local configuration (see [Environment Variables](#-environment-variables))

4. **Start local database:**

   **For MongoDB:**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest

   # OR start MongoDB service
   brew services start mongodb-community  # macOS
   sudo systemctl start mongod            # Linux
   ```

   **For PostgreSQL:**
   ```bash
   # Using Docker
   docker run -d -p 5432:5432 --name postgres \
     -e POSTGRES_PASSWORD=password \
     postgres:14-alpine

   # OR start PostgreSQL service
   brew services start postgresql  # macOS
   sudo systemctl start postgresql # Linux
   ```

5. **Run database migrations (PostgreSQL only):**
   ```bash
   npm run migrate
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

   The API will be available at `http://localhost:5000`

---

## 🏗️ Project Setup

### TypeScript Configuration

The project uses TypeScript with strict mode enabled. See [tsconfig.json](../tsconfig.json) for configuration.

**Key TypeScript Settings:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

### NPM Scripts

```json
{
  "dev": "nodemon src/server.ts",              // Start dev server with hot reload
  "build": "tsc",                               // Compile TypeScript to JavaScript
  "start": "node dist/server.js",               // Start production server
  "test": "jest",                               // Run all tests
  "test:watch": "jest --watch",                 // Run tests in watch mode
  "test:coverage": "jest --coverage",           // Generate coverage report
  "lint": "eslint src/**/*.ts",                 // Lint TypeScript files
  "lint:fix": "eslint src/**/*.ts --fix",       // Fix linting errors
  "format": "prettier --write \"src/**/*.ts\"", // Format code with Prettier
  "migrate": "npx prisma migrate dev",          // Run database migrations (Prisma)
  "seed": "ts-node prisma/seed.ts",             // Seed database with initial data
  "docs": "swagger-jsdoc -d swaggerDef.js"      // Generate API docs
}
```

---

## 📝 Coding Standards

### TypeScript Style Guide

#### 1. File Naming Conventions

```
Controllers:  auth.controller.ts
Services:     booking.service.ts
Models:       User.model.ts
Middlewares:  auth.middleware.ts
Utilities:    logger.ts
Types:        booking.types.ts
Routes:       service.routes.ts
```

#### 2. Code Structure

**Use async/await instead of callbacks:**
```typescript
// ✅ Good
async function getUser(id: string): Promise<User> {
  const user = await User.findById(id);
  return user;
}

// ❌ Avoid
function getUser(id: string, callback: Function) {
  User.findById(id, (err, user) => {
    callback(err, user);
  });
}
```

**Always define return types:**
```typescript
// ✅ Good
async function calculateTotal(items: CartItem[]): Promise<number> {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// ❌ Avoid
async function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

**Use interfaces for object types:**
```typescript
// ✅ Good
interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

async function createUser(data: CreateUserDTO): Promise<User> {
  // Implementation
}

// ❌ Avoid
async function createUser(email, password, firstName, lastName) {
  // Implementation
}
```

#### 3. Error Handling

**Always use custom error classes:**
```typescript
// ✅ Good
if (!user) {
  throw new NotFoundError('User');
}

// ❌ Avoid
if (!user) {
  throw new Error('User not found');
}
```

**Handle errors in async functions:**
```typescript
// ✅ Good
async function updateBooking(id: string, data: UpdateBookingDTO): Promise<Booking> {
  try {
    const booking = await Booking.findById(id);
    if (!booking) {
      throw new NotFoundError('Booking');
    }

    Object.assign(booking, data);
    await booking.save();

    return booking;
  } catch (error) {
    logger.error('Error updating booking:', error);
    throw error;
  }
}
```

#### 4. Naming Conventions

```typescript
// Classes: PascalCase
class BookingService {}

// Functions and variables: camelCase
const getUserById = async (id: string) => {}
const totalAmount = 100;

// Constants: SCREAMING_SNAKE_CASE
const MAX_BOOKING_DAYS = 30;
const DEFAULT_PAGE_SIZE = 10;

// Interfaces: PascalCase with descriptive names
interface CreateBookingDTO {}
interface BookingResponse {}

// Enums: PascalCase
enum BookingStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled'
}
```

### Controller Pattern

Controllers should be thin and delegate to services:

```typescript
// src/controllers/booking.controller.ts
import { Request, Response, NextFunction } from 'express';
import { BookingService } from '../services/booking.service';
import { CreateBookingDTO } from '../types/booking.types';

class BookingController {
  private bookingService: BookingService;

  constructor() {
    this.bookingService = new BookingService();
  }

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const bookingData: CreateBookingDTO = req.body;

      const booking = await this.bookingService.createBooking(userId, bookingData);

      res.status(201).json({
        success: true,
        data: booking,
        message: 'Booking created successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  getBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10 } = req.query;

      const result = await this.bookingService.getUserBookings(userId, {
        page: Number(page),
        limit: Number(limit)
      });

      res.json({
        success: true,
        data: result
      });
    } catch (error) {
      next(error);
    }
  };
}

export default new BookingController();
```

### Service Pattern

Services contain business logic:

```typescript
// src/services/booking.service.ts
import { Booking } from '../models/Booking.model';
import { SlotService } from './slot.service';
import { NotificationService } from './notification.service';
import { ConflictError, ValidationError } from '../utils/errors';

export class BookingService {
  private slotService: SlotService;
  private notificationService: NotificationService;

  constructor() {
    this.slotService = new SlotService();
    this.notificationService = new NotificationService();
  }

  async createBooking(userId: string, data: CreateBookingDTO): Promise<Booking> {
    // 1. Validate business rules
    this.validateBookingDate(data.bookingDate);

    // 2. Check slot availability
    const slot = await this.slotService.getSlot(data.slotId);
    if (!slot.isAvailable) {
      throw new ConflictError('Slot is not available');
    }

    // 3. Create booking in transaction
    const booking = await this.createBookingTransaction(userId, data, slot);

    // 4. Send notifications
    await this.notificationService.sendBookingConfirmation(booking);

    return booking;
  }

  private validateBookingDate(date: Date): void {
    const today = new Date();
    if (date < today) {
      throw new ValidationError('Booking date cannot be in the past');
    }
  }

  private async createBookingTransaction(
    userId: string,
    data: CreateBookingDTO,
    slot: Slot
  ): Promise<Booking> {
    // Transaction implementation
    // See ARCHITECTURE.md for details
  }
}
```

### Validation Pattern

Use Joi or Zod for request validation:

```typescript
// src/middlewares/validation.middleware.ts
import Joi from 'joi';

export const validateRequest = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      throw new ValidationError('Validation failed', errors);
    }

    next();
  };
};

// Usage in routes
import { validateRequest } from '../middlewares/validation.middleware';
import { createBookingSchema } from '../validators/booking.validator';

router.post(
  '/bookings',
  authenticate,
  validateRequest(createBookingSchema),
  bookingController.createBooking
);
```

**Validation Schema Example:**
```typescript
// src/validators/booking.validator.ts
import Joi from 'joi';

export const createBookingSchema = Joi.object({
  serviceId: Joi.string().uuid().required(),
  slotId: Joi.string().uuid().required(),
  bookingDate: Joi.date().min('now').required(),
  notes: Joi.string().max(500).optional()
});
```

---

## 🔧 Development Workflows

### Adding a New Feature

Follow these steps when adding a new feature:

#### 1. Define Types
```typescript
// src/types/feature.types.ts
export interface CreateFeatureDTO {
  name: string;
  description: string;
}

export interface FeatureResponse {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}
```

#### 2. Create Model
```typescript
// src/models/Feature.model.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IFeature extends Document {
  name: string;
  description: string;
  createdAt: Date;
}

const FeatureSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Feature = mongoose.model<IFeature>('Feature', FeatureSchema);
```

#### 3. Create Service
```typescript
// src/services/feature.service.ts
export class FeatureService {
  async create(data: CreateFeatureDTO): Promise<Feature> {
    const feature = await Feature.create(data);
    return feature;
  }

  async getAll(): Promise<Feature[]> {
    return await Feature.find();
  }
}
```

#### 4. Create Controller
```typescript
// src/controllers/feature.controller.ts
class FeatureController {
  private service: FeatureService;

  constructor() {
    this.service = new FeatureService();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const feature = await this.service.create(req.body);
      res.status(201).json({ success: true, data: feature });
    } catch (error) {
      next(error);
    }
  };
}

export default new FeatureController();
```

#### 5. Create Routes
```typescript
// src/routes/feature.routes.ts
import { Router } from 'express';
import featureController from '../controllers/feature.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, featureController.create);
router.get('/', featureController.getAll);

export default router;
```

#### 6. Register Routes
```typescript
// src/routes/index.ts
import featureRoutes from './feature.routes';

app.use('/api/v1/features', featureRoutes);
```

#### 7. Add API Documentation
```typescript
/**
 * @swagger
 * /api/v1/features:
 *   post:
 *     summary: Create a new feature
 *     tags: [Features]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Feature created successfully
 */
```

### Database Migration Workflow

**For PostgreSQL with Prisma:**

1. Update schema:
   ```prisma
   // prisma/schema.prisma
   model Feature {
     id          String   @id @default(uuid())
     name        String
     description String
     createdAt   DateTime @default(now())
   }
   ```

2. Create migration:
   ```bash
   npx prisma migrate dev --name add-feature-model
   ```

3. Apply migration:
   ```bash
   npx prisma migrate deploy
   ```

**For MongoDB:**

MongoDB doesn't require migrations for schema changes, but you can create seed scripts:

```typescript
// scripts/seed-features.ts
import mongoose from 'mongoose';
import { Feature } from '../src/models/Feature.model';

async function seedFeatures() {
  await mongoose.connect(process.env.MONGODB_URI);

  const features = [
    { name: 'Feature 1', description: 'Description 1' },
    { name: 'Feature 2', description: 'Description 2' }
  ];

  await Feature.insertMany(features);
  console.log('Features seeded successfully');

  await mongoose.disconnect();
}

seedFeatures();
```

---

## 🐛 Debugging

### VS Code Debug Configuration

Create `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Server",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/src/server.ts",
      "preLaunchTask": "tsc: build - tsconfig.json",
      "outFiles": ["${workspaceFolder}/dist/**/*.js"],
      "env": {
        "NODE_ENV": "development"
      }
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "--no-cache"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

### Logging

Use Winston logger for structured logging:

```typescript
import { logger } from '../utils/logger';

// Different log levels
logger.error('Error message', { error, context });
logger.warn('Warning message', { context });
logger.info('Info message', { context });
logger.debug('Debug message', { context });

// In controllers
logger.info('Creating booking', { userId, bookingData });

// In services
logger.debug('Checking slot availability', { slotId });

// In error handling
logger.error('Failed to create booking', {
  error: error.message,
  stack: error.stack,
  userId,
  bookingData
});
```

### Common Debugging Scenarios

**1. Database Connection Issues:**
```typescript
// Check connection status
mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB connection error:', err);
});
```

**2. Authentication Issues:**
```typescript
// Add logging in auth middleware
export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    logger.debug('Authenticating request', { token: token?.substring(0, 10) });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    logger.debug('Token decoded successfully', { userId: decoded.userId });

    req.user = decoded;
    next();
  } catch (error) {
    logger.error('Authentication failed', { error: error.message });
    next(new UnauthorizedError('Invalid token'));
  }
};
```

---

## 📚 API Documentation

### Swagger/OpenAPI Setup

The API uses Swagger for documentation. Access it at:
```
http://localhost:5000/api-docs
```

**Document endpoints with JSDoc comments:**

```typescript
/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Create a new booking
 *     description: Creates a new booking for a service slot with token payment
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - serviceId
 *               - slotId
 *               - bookingDate
 *             properties:
 *               serviceId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the service to book
 *               slotId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the time slot
 *               bookingDate:
 *                 type: string
 *                 format: date
 *                 description: Date of the booking
 *               notes:
 *                 type: string
 *                 description: Additional notes for the booking
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Slot not available
 */
```

---

## 🔐 Environment Variables

### Complete Environment Configuration

```env
# Server Configuration
NODE_ENV=development              # development, staging, production
PORT=5000                         # Server port
API_VERSION=v1                    # API version prefix

# Database Configuration
DB_TYPE=mongodb                   # mongodb or postgresql
MONGODB_URI=mongodb://localhost:27017/salon_booking
# OR for PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/salon_booking

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_min_32_chars
JWT_EXPIRES_IN=15m                # Access token expiry
JWT_REFRESH_SECRET=your_super_secret_refresh_key
JWT_REFRESH_EXPIRES_IN=30d        # Refresh token expiry

# Payment Gateway (Stripe)
PAYMENT_PROVIDER=stripe
STRIPE_SECRET_KEY=sk_test_51xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_51xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# OR Payment Gateway (Razorpay)
# PAYMENT_PROVIDER=razorpay
# RAZORPAY_KEY_ID=rzp_test_xxxxx
# RAZORPAY_KEY_SECRET=xxxxx

# Email Configuration (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false                 # true for 465, false for other ports
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password   # Use app-specific password
EMAIL_FROM=noreply@saloonbooking.com
EMAIL_FROM_NAME=Salon Booking

# SMS Configuration (Twilio - Optional)
TWILIO_ACCOUNT_SID=ACxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Redis Configuration (Optional - for caching)
REDIS_URL=redis://localhost:6379
REDIS_PASSWORD=
REDIS_TLS=false

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173,http://localhost:8080

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000       # 15 minutes in milliseconds
RATE_LIMIT_MAX_REQUESTS=100       # Max requests per window

# Business Configuration
BOOKING_TOKEN_AMOUNT=500          # Token amount in smallest currency unit (cents/paise)
MAX_BOOKING_DAYS_AHEAD=30         # Maximum days in advance for booking
SLOT_LOCK_DURATION_MINUTES=5      # Temporary slot lock duration

# Logging
LOG_LEVEL=debug                   # error, warn, info, debug
LOG_FILE_PATH=./logs              # Log file directory

# Security
BCRYPT_SALT_ROUNDS=10             # Password hashing salt rounds
MAX_LOGIN_ATTEMPTS=5              # Max failed login attempts
LOCK_TIME_MINUTES=15              # Account lock time after max attempts
```

### Loading Environment Variables

```typescript
// src/config/environment.ts
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  server: {
    port: number;
    env: string;
    apiVersion: string;
  };
  database: {
    type: 'mongodb' | 'postgresql';
    uri: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  payment: {
    provider: 'stripe' | 'razorpay';
    stripeSecretKey?: string;
    razorpayKeyId?: string;
  };
}

export const config: Config = {
  server: {
    port: parseInt(process.env.PORT || '5000', 10),
    env: process.env.NODE_ENV || 'development',
    apiVersion: process.env.API_VERSION || 'v1'
  },
  database: {
    type: process.env.DB_TYPE as 'mongodb' | 'postgresql',
    uri: process.env.DB_TYPE === 'mongodb'
      ? process.env.MONGODB_URI!
      : process.env.DATABASE_URL!
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },
  payment: {
    provider: process.env.PAYMENT_PROVIDER as 'stripe' | 'razorpay',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    razorpayKeyId: process.env.RAZORPAY_KEY_ID
  }
};

// Validate required environment variables
const requiredEnvVars = [
  'JWT_SECRET',
  'JWT_REFRESH_SECRET',
  process.env.DB_TYPE === 'mongodb' ? 'MONGODB_URI' : 'DATABASE_URL'
];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}
```

---

## 🛠️ Common Tasks

### Adding a New Endpoint

1. Define types in `/types`
2. Create/update model in `/models`
3. Add business logic in `/services`
4. Create controller method in `/controllers`
5. Add route in `/routes`
6. Add validation schema
7. Add Swagger documentation
8. Write tests

### Database Seeding

Create seed scripts for initial data:

```typescript
// scripts/seed.ts
import mongoose from 'mongoose';
import { Service } from '../src/models/Service.model';
import { config } from '../src/config/environment';

async function seed() {
  await mongoose.connect(config.database.uri);

  // Clear existing data
  await Service.deleteMany({});

  // Insert seed data
  const services = [
    {
      name: 'Haircut',
      description: 'Professional haircut service',
      duration: 45,
      price: 50,
      tokenAmount: 10,
      category: 'Hair',
      isActive: true
    },
    {
      name: 'Hair Coloring',
      description: 'Complete hair coloring service',
      duration: 120,
      price: 150,
      tokenAmount: 30,
      category: 'Hair',
      isActive: true
    }
  ];

  await Service.insertMany(services);
  console.log('Database seeded successfully');

  await mongoose.disconnect();
}

seed().catch(console.error);
```

Run with: `npx ts-node scripts/seed.ts`

---

## ❓ Troubleshooting

### Common Issues

#### 1. Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

#### 2. MongoDB Connection Failed

- Check if MongoDB is running: `mongosh`
- Verify connection string in `.env`
- Check network connectivity

#### 3. TypeScript Compilation Errors

```bash
# Clear build cache
rm -rf dist/

# Rebuild
npm run build
```

#### 4. Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 5. Jest Tests Failing

```bash
# Clear Jest cache
npm test -- --clearCache

# Run tests with verbose output
npm test -- --verbose
```

### Getting Help

- Check [ARCHITECTURE.md](ARCHITECTURE.md) for design patterns
- Check [QUALITY_STRATEGY.md](QUALITY_STRATEGY.md) for testing guidelines
- Review existing code for similar implementations
- Check logs in `./logs` directory
- Use debugger to step through code

---

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [JWT Best Practices](https://auth0.com/blog/jwt-handbook/)
- [REST API Design Best Practices](https://restfulapi.net/)

---

**Happy coding! 🚀**
