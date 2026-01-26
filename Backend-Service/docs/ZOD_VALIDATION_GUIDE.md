# Zod Validation Guide

This guide explains how to use Zod for schema validation in the Salon Booking Backend Service.

## Table of Contents

- [Why Zod?](#why-zod)
- [Basic Usage](#basic-usage)
- [Schema Organization](#schema-organization)
- [Validation Middleware](#validation-middleware)
- [Common Patterns](#common-patterns)
- [Advanced Techniques](#advanced-techniques)
- [Testing Validation](#testing-validation)
- [Best Practices](#best-practices)

## Why Zod?

Zod provides several advantages:

1. **TypeScript-First**: Built specifically for TypeScript with excellent type inference
2. **Type Safety**: Automatically generate TypeScript types from schemas
3. **Runtime Validation**: Validate data at runtime while maintaining type safety
4. **Composability**: Easily reuse and compose schemas
5. **Error Messages**: Customizable, user-friendly error messages
6. **Transformations**: Transform data during validation (e.g., trim strings, parse numbers)

## Basic Usage

### Creating a Schema

```typescript
import { z } from 'zod';

// Define schema
const userSchema = z.object({
  email: z.string().email(),
  age: z.number().min(18).max(120),
  name: z.string().min(2).max(50),
});

// Infer TypeScript type from schema
type User = z.infer<typeof userSchema>;
// Equivalent to: { email: string; age: number; name: string }
```

### Validating Data

```typescript
// Parse and validate (throws on error)
const user = userSchema.parse({
  email: 'john@example.com',
  age: 25,
  name: 'John',
});

// Safe parse (returns result object)
const result = userSchema.safeParse(data);
if (result.success) {
  console.log(result.data); // Validated data
} else {
  console.log(result.error); // Validation errors
}
```

## Schema Organization

Organize schemas in the `/src/schemas` directory:

```
src/schemas/
├── index.ts              # Central export point
├── common.schema.ts      # Reusable schemas (email, phone, pagination)
├── auth.schema.ts        # Authentication-related schemas
├── booking.schema.ts     # Booking-related schemas
├── service.schema.ts     # Service-related schemas
└── user.schema.ts        # User-related schemas
```

### Common Schemas

Create reusable validation patterns in `common.schema.ts`:

```typescript
// src/schemas/common.schema.ts
import { z } from 'zod';

// Reusable email validation
export const emailSchema = z.string().email().toLowerCase().trim();

// Reusable phone validation
export const phoneSchema = z.string().regex(/^\+?[1-9]\d{1,14}$/);

// Reusable pagination
export const paginationSchema = z.object({
  page: z.string().default('1').transform(Number).pipe(z.number().positive()),
  limit: z.string().default('10').transform(Number).pipe(z.number().max(100)),
});
```

### Feature Schemas

Create feature-specific schemas:

```typescript
// src/schemas/booking.schema.ts
import { z } from 'zod';
import { dateSchema, timeSchema } from './common.schema';

export const createBookingSchema = z.object({
  serviceId: z.number().int().positive(),
  date: dateSchema,
  startTime: timeSchema,
  endTime: timeSchema,
  notes: z.string().max(500).optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
```

## Validation Middleware

### Using the Validation Middleware

```typescript
// src/routes/booking.routes.ts
import { Router } from 'express';
import { validate, validateBody, validateQuery } from '../middlewares/validation.middleware';
import { createBookingSchema, idParamSchema, paginationSchema } from '../schemas';
import * as bookingController from '../controllers/booking.controller';

const router = Router();

// Validate only request body
router.post('/bookings', validateBody(createBookingSchema), bookingController.create);

// Validate multiple parts
router.put(
  '/bookings/:id',
  validate({
    params: idParamSchema,
    body: updateBookingSchema,
  }),
  bookingController.update
);

// Validate query parameters
router.get('/bookings', validateQuery(paginationSchema), bookingController.list);
```

### Type-Safe Controllers

Controllers automatically receive validated, typed data:

```typescript
// src/controllers/booking.controller.ts
import { Request, Response } from 'express';
import { CreateBookingInput } from '../schemas';

export const create = async (req: Request, res: Response) => {
  // req.body is typed as CreateBookingInput and already validated
  const bookingData: CreateBookingInput = req.body;

  const booking = await bookingService.createBooking(bookingData);

  res.status(201).json({
    success: true,
    data: booking,
  });
};
```

## Common Patterns

### String Validation

```typescript
z.string(); // Basic string
z.string().email(); // Email
z.string().url(); // URL
z.string().uuid(); // UUID
z.string().min(3).max(50); // Length constraints
z.string().regex(/^[A-Z0-9]+$/); // Regex pattern
z.string().trim(); // Trim whitespace
z.string().toLowerCase(); // Lowercase
z.string().optional(); // Optional field
z.string().default('default'); // Default value
```

### Number Validation

```typescript
z.number(); // Any number
z.number().int(); // Integer only
z.number().positive(); // Positive numbers
z.number().min(0).max(100); // Range
z.number().nonnegative(); // >= 0
```

### Date and Time

```typescript
z.date(); // JavaScript Date object
z.string().datetime(); // ISO 8601 datetime string
z.string().regex(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD format
z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/); // HH:mm format
```

### Enums

```typescript
z.enum(['pending', 'confirmed', 'cancelled']); // String enum
z.nativeEnum(BookingStatus); // TypeScript enum
```

### Arrays

```typescript
z.array(z.string()); // Array of strings
z.array(z.number()).min(1).max(10); // Constrained array
z.string().array(); // Alternative syntax
```

### Objects

```typescript
z.object({
  name: z.string(),
  age: z.number(),
}); // Basic object

// Partial (all fields optional)
userSchema.partial();

// Pick specific fields
userSchema.pick({ name: true, email: true });

// Omit fields
userSchema.omit({ password: true });

// Extend existing schema
baseSchema.extend({
  newField: z.string(),
});

// Merge schemas
schema1.merge(schema2);
```

### Transformations

```typescript
// Convert string to number
z.string().transform(Number).pipe(z.number());

// Trim and lowercase
z.string().trim().toLowerCase();

// Convert string boolean to boolean
z
  .string()
  .transform((val) => val === 'true')
  .pipe(z.boolean());

// Date string to Date object
z.string().transform((str) => new Date(str));
```

## Advanced Techniques

### Custom Refinements

Add custom validation logic:

```typescript
const bookingSchema = z
  .object({
    startTime: z.string(),
    endTime: z.string(),
  })
  .refine(
    (data) => {
      // Custom validation logic
      return data.endTime > data.startTime;
    },
    {
      message: 'End time must be after start time',
      path: ['endTime'], // Error path
    }
  );
```

### Dependent Fields

Validate fields that depend on each other:

```typescript
const paymentSchema = z
  .object({
    paymentMethod: z.enum(['card', 'cash']),
    cardNumber: z.string().optional(),
    expiryDate: z.string().optional(),
  })
  .refine(
    (data) => {
      // If payment method is card, card details are required
      if (data.paymentMethod === 'card') {
        return !!data.cardNumber && !!data.expiryDate;
      }
      return true;
    },
    {
      message: 'Card details required for card payments',
      path: ['cardNumber'],
    }
  );
```

### Discriminated Unions

Validate different structures based on a discriminator field:

```typescript
const notificationSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('email'),
    email: z.string().email(),
    subject: z.string(),
  }),
  z.object({
    type: z.literal('sms'),
    phone: z.string(),
    message: z.string(),
  }),
]);
```

### Recursive Schemas

Handle nested structures:

```typescript
type Category = {
  name: string;
  subcategories: Category[];
};

const categorySchema: z.ZodType<Category> = z.lazy(() =>
  z.object({
    name: z.string(),
    subcategories: z.array(categorySchema),
  })
);
```

## Testing Validation

### Unit Testing Schemas

```typescript
// tests/unit/schemas/booking.schema.test.ts
import { createBookingSchema } from '../../../src/schemas/booking.schema';

describe('Booking Schema Validation', () => {
  describe('createBookingSchema', () => {
    it('should validate correct booking data', () => {
      const validData = {
        serviceId: 1,
        date: '2024-01-15',
        startTime: '10:00',
        endTime: '11:00',
      };

      const result = createBookingSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid service ID', () => {
      const invalidData = {
        serviceId: -1, // Invalid: must be positive
        date: '2024-01-15',
        startTime: '10:00',
        endTime: '11:00',
      };

      const result = createBookingSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('serviceId');
      }
    });

    it('should reject end time before start time', () => {
      const invalidData = {
        serviceId: 1,
        date: '2024-01-15',
        startTime: '11:00',
        endTime: '10:00', // Invalid: before start time
      };

      const result = createBookingSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });
});
```

## Best Practices

### 1. Define Schemas Before Models

Create Zod schemas first, then use them to guide your database models.

### 2. Reuse Common Patterns

Create reusable schemas in `common.schema.ts` for email, phone, pagination, etc.

```typescript
// ✅ Good
import { emailSchema, phoneSchema } from './common.schema';

export const userSchema = z.object({
  email: emailSchema,
  phone: phoneSchema,
});

// ❌ Bad - Duplicating validation logic
export const userSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
});
```

### 3. Use Type Inference

Let Zod generate TypeScript types instead of duplicating definitions:

```typescript
// ✅ Good
export const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof userSchema>;

// ❌ Bad - Duplicating type definitions
export interface User {
  name: string;
  email: string;
}
```

### 4. Provide Clear Error Messages

Customize error messages for better user experience:

```typescript
z.string({
  required_error: 'Email is required',
  invalid_type_error: 'Email must be a string',
})
  .email('Invalid email format')
  .min(5, 'Email must be at least 5 characters');
```

### 5. Transform at Validation Time

Clean and transform data during validation:

```typescript
z.string()
  .trim() // Remove whitespace
  .toLowerCase() // Normalize case
  .transform((val) => val.replace(/\s+/g, ' ')); // Normalize spaces
```

### 6. Validate Early

Use validation middleware on routes to catch errors before reaching controllers:

```typescript
// Validation happens here, before controller
router.post('/users', validateBody(createUserSchema), userController.create);
```

### 7. Export Both Schemas and Types

Always export both the schema and its inferred type:

```typescript
export const createBookingSchema = z.object({
  // ... fields
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
```

### 8. Use Partial for Updates

Create update schemas using `.partial()`:

```typescript
export const createUserSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
});

// All fields optional for updates
export const updateUserSchema = createUserSchema.partial();
```

### 9. Document Complex Validations

Add comments for complex validation logic:

```typescript
export const bookingSchema = z
  .object({
    startTime: timeSchema,
    endTime: timeSchema,
  })
  .refine(
    (data) => {
      // Ensure booking duration is at least 30 minutes
      const start = parseTime(data.startTime);
      const end = parseTime(data.endTime);
      return (end - start) >= 30;
    },
    {
      message: 'Booking must be at least 30 minutes long',
      path: ['endTime'],
    }
  );
```

### 10. Test Your Schemas

Write unit tests for complex schemas to ensure they validate correctly:

```typescript
describe('Complex Schema', () => {
  it('should validate all edge cases', () => {
    // Test various inputs
  });
});
```

## Additional Resources

- [Zod Documentation](https://zod.dev/)
- [Zod GitHub Repository](https://github.com/colinhacks/zod)
- [TypeScript Deep Dive - Zod](https://basarat.gitbook.io/typescript/content/docs/types/type-guards.html#user-defined-type-guards)

---

Remember: **Define schemas first, let TypeScript types follow!** This ensures runtime validation matches compile-time types.
