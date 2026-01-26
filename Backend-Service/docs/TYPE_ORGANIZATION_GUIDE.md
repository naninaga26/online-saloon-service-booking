# Type Organization Guide

## Recommended Structure for Salon Booking Backend

### Directory Layout

```
src/
├── types/
│   ├── index.ts              # Central export point
│   ├── common.types.ts       # Shared types/interfaces
│   ├── user.types.ts         # User-related types
│   ├── booking.types.ts      # Booking-related types
│   ├── service.types.ts      # Service-related types
│   ├── slot.types.ts         # Slot-related types
│   └── payment.types.ts      # Payment-related types
```

## When to Use Interface vs Type

### Use `interface` for:

1. **Model Attributes** (Sequelize models)
```typescript
// ✅ Interface for object shape
export interface UserAttributes {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
```

2. **DTOs (Data Transfer Objects)**
```typescript
// ✅ Interface for request/response objects
export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}
```

3. **API Responses**
```typescript
// ✅ Interface for consistent response shape
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}
```

4. **Configuration Objects**
```typescript
// ✅ Interface for config
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}
```

### Use `type` for:

1. **Union Types**
```typescript
// ✅ Type for unions
export type UserRole = 'customer' | 'admin';
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentMethod = 'card' | 'cash' | 'wallet';
```

2. **Type Aliases**
```typescript
// ✅ Type for aliases
export type ID = string | number;
export type Timestamp = Date | string;
```

3. **Utility Types**
```typescript
// ✅ Type for computed types
export type PartialUser = Partial<UserAttributes>;
export type RequiredUser = Required<UserAttributes>;
export type ReadonlyUser = Readonly<UserAttributes>;
```

4. **Function Types**
```typescript
// ✅ Type for functions
export type ValidationFunction = (value: any) => boolean;
export type AsyncHandler = (req: Request, res: Response) => Promise<void>;
```

5. **Complex Intersections**
```typescript
// ✅ Type for intersections
export type UserWithRole = UserAttributes & { role: UserRole };
export type TimestampedEntity = { createdAt: Date; updatedAt: Date };
```

## File Organization Rules

### 1. Common Types (`types/common.types.ts`)

Put here:
- Types/interfaces used across multiple domains
- Generic utility types
- API response structures
- Pagination types

```typescript
// types/common.types.ts
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalItems: number;
  };
}

export type ID = number | string;
export type Timestamp = Date | string;
```

### 2. Domain Types (`types/user.types.ts`, `types/booking.types.ts`, etc.)

Put here:
- Model attributes (from Sequelize models)
- DTOs specific to that domain
- Domain-specific enums/unions
- Request/Response interfaces

```typescript
// types/user.types.ts
import { UserAttributes } from '../models/User.model';

// DTOs
export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface UserResponse extends Omit<UserAttributes, 'password'> {
  fullName?: string;
}

// Domain-specific types
export interface UserQueryFilters {
  role?: UserRole;
  isActive?: boolean;
  search?: string;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  customerCount: number;
  adminCount: number;
}

// Re-export from common if needed
export type UserRole = 'customer' | 'admin';
```

### 3. Index File (`types/index.ts`)

Central export point - re-export everything:

```typescript
// types/index.ts

// Common types
export * from './common.types';

// Domain types
export * from './user.types';
export * from './booking.types';
export * from './service.types';
export * from './slot.types';
export * from './payment.types';
```

## Naming Conventions

### Interfaces
- Use PascalCase
- Descriptive names
- Suffix with purpose if needed

```typescript
// Model attributes
interface UserAttributes { }
interface BookingAttributes { }

// DTOs
interface CreateUserDTO { }
interface UpdateBookingDTO { }

// Responses
interface UserResponse { }
interface BookingListResponse { }

// Query filters
interface UserQueryFilters { }
interface BookingSearchParams { }
```

### Types
- Use PascalCase for complex types
- Use descriptive names
- Suffix unions with descriptive name

```typescript
// Status types
type UserRole = 'customer' | 'admin';
type BookingStatus = 'pending' | 'confirmed' | 'cancelled';
type PaymentStatus = 'pending' | 'completed' | 'failed';

// Utility types
type PartialUser = Partial<UserAttributes>;
type ID = string | number;

// Function types
type AsyncHandler = (req: Request, res: Response) => Promise<void>;
```

## Import Strategy

### ✅ Good - Import from types/index
```typescript
// In controllers, services, etc.
import {
  UserResponse,
  CreateUserDTO,
  UserRole,
  ApiResponse
} from '../types';
```

### ❌ Bad - Direct file imports
```typescript
// Avoid this - makes refactoring harder
import { UserResponse } from '../types/user.types';
import { ApiResponse } from '../types/common.types';
```

## Model Attributes vs DTOs

### Keep Model Attributes in Model File
```typescript
// src/models/User.model.ts
export interface UserAttributes {
  id: number;
  email: string;
  password: string;  // Database field
  firstName: string;
  lastName: string;
  role: 'customer' | 'admin';
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

class User extends Model<UserAttributes> {
  // ...
}
```

### Create DTOs in Types File
```typescript
// src/types/user.types.ts
import { UserAttributes } from '../models/User.model';

// For API responses (no password)
export interface UserResponse extends Omit<UserAttributes, 'password'> {}

// For creating users (no id, timestamps)
export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: 'customer' | 'admin';
}

// For updating users (all optional except id)
export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
}
```

## Migration Path for Existing Code

If you want to refactor your current code:

### Step 1: Keep Model Attributes in Model
```typescript
// models/User.model.ts - Keep this
export interface UserAttributes {
  id: number;
  email: string;
  // ...
}
```

### Step 2: Move DTOs to types/user.types.ts
```typescript
// types/user.types.ts
import { UserAttributes } from '../models/User.model';

export interface UserResponse extends Omit<UserAttributes, 'password'> {}
export interface CreateUserDTO { /* ... */ }
export interface UpdateUserDTO { /* ... */ }
// ... other user-related types
```

### Step 3: Update imports
```typescript
// Before
import { UserResponse } from '../models/User.model';

// After
import { UserResponse } from '../types';
```

## Benefits of This Approach

1. **Clear Separation**: Models contain DB schema, types contain DTOs
2. **Easy to Find**: All types in one place
3. **Better Imports**: Single import source
4. **Maintainable**: Easy to update and refactor
5. **Type Safety**: Full TypeScript support
6. **Scalable**: Grows with your project

## Example Usage

```typescript
// In a controller
import {
  CreateUserDTO,
  UserResponse,
  ApiResponse
} from '../types';
import { User } from '../models';

export const createUser = async (req: Request, res: Response) => {
  const userData: CreateUserDTO = req.body;

  const user = await User.create(userData);
  const userResponse: UserResponse = user.toSafeObject();

  const response: ApiResponse<UserResponse> = {
    success: true,
    message: 'User created successfully',
    data: userResponse,
  };

  res.status(201).json(response);
};
```

## Quick Reference

| Use Case | Use Interface | Use Type |
|----------|--------------|----------|
| Object shape | ✅ | ❌ |
| Union types | ❌ | ✅ |
| Extending | ✅ | ✅ |
| Implementing in class | ✅ | ❌ |
| Intersection | ✅ | ✅ (better) |
| Mapped types | ❌ | ✅ |
| Tuples | ❌ | ✅ |
| Function types | ✅ | ✅ (better) |

## Rule of Thumb

**Default to `interface` for object shapes, use `type` for everything else.**

When in doubt:
- If it's an object with properties → `interface`
- If it's a union, tuple, or computed type → `type`
