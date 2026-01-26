# Type Organization - Approach 2 (Centralized)

This document describes the current type organization structure following **Approach 2: Centralized Types**.

## Directory Structure

```
src/
├── types/
│   ├── index.ts              ✅ Central export point
│   ├── common.types.ts       ✅ Shared types across domains
│   ├── user.types.ts         ✅ User-specific types and interfaces
│   ├── booking.types.ts      🔜 Coming next
│   ├── service.types.ts      🔜 Coming next
│   ├── slot.types.ts         🔜 Coming next
│   └── payment.types.ts      🔜 Coming next
├── models/
│   ├── index.ts              ✅ Model exports and associations
│   └── User.model.ts         ✅ Sequelize User model (imports from types)
├── schemas/
│   ├── index.ts              ✅ Zod schema exports
│   ├── common.schema.ts      ✅ Reusable Zod schemas
│   ├── auth.schema.ts        ✅ Authentication Zod schemas
│   └── booking.schema.ts     ✅ Booking Zod schemas
└── ...
```

## File Breakdown

### 1. `types/index.ts` (Central Export)

**Purpose:** Single import source for all types

```typescript
// Import everything from here
import { UserAttributes, UserResponse, ApiResponse } from '../types';
```

**Contents:**
- Re-exports all types from common.types.ts
- Re-exports all types from domain-specific files (user.types.ts, etc.)

---

### 2. `types/common.types.ts` (Shared Types)

**Purpose:** Types and interfaces used across multiple domains

**What goes here:**
- ✅ `ApiResponse<T>` - Generic API response wrapper
- ✅ `PaginatedResponse<T>` - Paginated list responses
- ✅ `PaginationParams` - Pagination query parameters
- ✅ `JwtPayload` - JWT token structure
- ✅ `AuthTokens` - Access and refresh tokens
- ✅ `ErrorResponse` - Error response format
- ✅ Common status types (BookingStatus, PaymentStatus)
- ✅ Utility types (ID, Timestamp, SortOrder)
- ✅ Date/search filters
- ✅ Record metadata interfaces

**Types defined:**
```typescript
export interface ApiResponse<T>
export interface PaginatedResponse<T>
export interface PaginationParams
export interface JwtPayload
export interface AuthTokens
export interface ErrorResponse
export interface DateRangeFilter
export interface SearchFilter
export interface BaseQueryFilters
export interface FileUploadResponse
export interface RecordMetadata
export interface SoftDeletable

export type ID
export type Timestamp
export type SortOrder
export type BookingStatus
export type PaymentStatus
export type ServiceStatus
```

---

### 3. `types/user.types.ts` (User Domain)

**Purpose:** All user-related types and interfaces

**What goes here:**
- ✅ Model attributes (UserAttributes, UserCreationAttributes)
- ✅ DTOs (CreateUserDTO, UpdateUserDTO)
- ✅ Response types (UserResponse, PublicUserProfile)
- ✅ Query filters (UserQueryFilters)
- ✅ Domain-specific types (UserRole, UserStatistics)

**Types defined:**
```typescript
// Type
export type UserRole

// Model Attributes
export interface UserAttributes
export interface UserCreationAttributes

// DTOs (Data Transfer Objects)
export interface CreateUserDTO
export interface UpdateUserDTO
export interface ChangePasswordDTO

// Response Types
export interface UserResponse
export interface PublicUserProfile
export interface UserWithFullName

// Authentication
export interface LoginCredentials
export interface AuthResponse

// Query/Filters
export interface UserQueryFilters

// Statistics
export interface UserStatistics
```

---

### 4. `models/User.model.ts` (Sequelize Model)

**Purpose:** Database model definition only

**What it does:**
- ✅ Imports types from `../types`
- ✅ Defines Sequelize model class
- ✅ Sets up model configuration
- ✅ Implements instance methods
- ✅ Defines model hooks

**What it does NOT do:**
- ❌ Define TypeScript interfaces (they're in types/)
- ❌ Define DTOs (they're in types/)
- ❌ Define response formats (they're in types/)

**Import pattern:**
```typescript
import { UserAttributes, UserCreationAttributes } from '../types';

class User extends Model<UserAttributes, UserCreationAttributes> {
  // Model implementation
}
```

---

## Import Patterns

### ✅ Correct Import Pattern

Always import from the central types export:

```typescript
// In controllers
import {
  UserResponse,
  CreateUserDTO,
  ApiResponse,
  PaginatedResponse
} from '../types';

// In services
import {
  UserAttributes,
  CreateUserDTO,
  UserQueryFilters
} from '../types';

// In models (when needed)
import { UserAttributes } from '../types';
```

### ❌ Incorrect Import Pattern

Don't import directly from individual files:

```typescript
// ❌ Bad
import { UserResponse } from '../types/user.types';
import { ApiResponse } from '../types/common.types';

// ✅ Good
import { UserResponse, ApiResponse } from '../types';
```

---

## Naming Conventions

### Interfaces

| Type | Convention | Example |
|------|-----------|---------|
| Model Attributes | `{Model}Attributes` | `UserAttributes` |
| Creation Attributes | `{Model}CreationAttributes` | `UserCreationAttributes` |
| DTOs (Create) | `Create{Model}DTO` | `CreateUserDTO` |
| DTOs (Update) | `Update{Model}DTO` | `UpdateUserDTO` |
| Response | `{Model}Response` | `UserResponse` |
| Query Filters | `{Model}QueryFilters` | `UserQueryFilters` |
| Statistics | `{Model}Statistics` | `UserStatistics` |

### Types

| Type | Convention | Example |
|------|-----------|---------|
| Enums/Unions | `{Model}{Purpose}` | `UserRole`, `BookingStatus` |
| Aliases | Descriptive | `ID`, `Timestamp` |
| Status | `{Domain}Status` | `PaymentStatus`, `ServiceStatus` |

---

## Benefits of This Organization

### 1. **Single Source of Truth**
All types are in one place (`types/` directory)

### 2. **Easy Imports**
```typescript
import { User, UserResponse, ApiResponse } from '../types';
```

### 3. **Clear Separation**
- `types/` = TypeScript definitions
- `models/` = Sequelize models
- `schemas/` = Zod validation

### 4. **Maintainability**
Easy to find and update types

### 5. **Scalability**
Just add new files in `types/` for new domains

### 6. **No Duplication**
Model imports types instead of defining them

---

## Adding New Domain Types

When adding a new domain (e.g., Booking):

### Step 1: Create `types/booking.types.ts`

```typescript
export interface BookingAttributes {
  id: number;
  userId: number;
  serviceId: number;
  // ...
}

export interface CreateBookingDTO {
  serviceId: number;
  slotId: number;
  // ...
}

export interface BookingResponse {
  // ...
}
```

### Step 2: Export from `types/index.ts`

```typescript
export * from './booking.types';
```

### Step 3: Import in model

```typescript
// models/Booking.model.ts
import { BookingAttributes, BookingCreationAttributes } from '../types';

class Booking extends Model<BookingAttributes, BookingCreationAttributes> {
  // ...
}
```

### Step 4: Use in controllers/services

```typescript
import { BookingResponse, CreateBookingDTO } from '../types';
```

---

## Migration Checklist

If migrating existing code:

- [x] Move model attributes to `types/{domain}.types.ts`
- [x] Move DTOs to `types/{domain}.types.ts`
- [x] Update model imports to use `../types`
- [x] Update controller/service imports to use `../types`
- [x] Remove duplicate type definitions
- [x] Export everything from `types/index.ts`
- [x] Build and verify no errors

---

## Quick Reference

### Where to Define What

| What | Where | Why |
|------|-------|-----|
| Model attributes | `types/{domain}.types.ts` | Single source |
| DTOs | `types/{domain}.types.ts` | API contracts |
| Response types | `types/{domain}.types.ts` | API responses |
| Common types | `types/common.types.ts` | Reusability |
| Validation schemas | `schemas/{domain}.schema.ts` | Runtime validation |
| Models | `models/{Model}.model.ts` | Database layer |

### Interface vs Type

| Use Case | Use |
|----------|-----|
| Object shape | `interface` |
| Union/Intersection | `type` |
| Model attributes | `interface` |
| DTOs | `interface` |
| Enums | `type` |
| Status values | `type` |

---

## Example: Complete User Type Flow

```typescript
// 1. Define in types/user.types.ts
export interface UserAttributes { ... }
export interface CreateUserDTO { ... }
export interface UserResponse { ... }

// 2. Export from types/index.ts
export * from './user.types';

// 3. Import in model
import { UserAttributes } from '../types';
class User extends Model<UserAttributes> { ... }

// 4. Import in controller
import { CreateUserDTO, UserResponse, ApiResponse } from '../types';
const createUser = async (req: Request, res: Response) => {
  const userData: CreateUserDTO = req.body;
  const response: ApiResponse<UserResponse> = { ... };
};
```

---

## Summary

✅ **All types centralized in `types/` directory**
✅ **Single import source: `import { ... } from '../types'`**
✅ **Clear separation: Types, Models, Schemas**
✅ **Scalable: Add new `{domain}.types.ts` files as needed**
✅ **Maintainable: Easy to find and update**
✅ **Type-safe: Full TypeScript support**

This structure is now ready for the rest of your application!
