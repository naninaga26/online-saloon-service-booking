# Authentication & User Management Implementation

## Overview

This implementation provides a complete JWT-based authentication system with user management capabilities, following the project's architecture guidelines with **dependency injection** for better testability and maintainability.

## What Was Built

### 1. **Utility Classes**

#### [utils/errors.ts](src/utils/errors.ts)
Custom error classes for consistent error handling:
- `AppError` - Base error class
- `ValidationError` (422) - For validation failures
- `UnauthorizedError` (401) - For authentication failures
- `ForbiddenError` (403) - For authorization failures
- `NotFoundError` (404) - For missing resources
- `ConflictError` (409) - For data conflicts
- `BadRequestError` (400) - For invalid requests
- `InternalServerError` (500) - For server errors

#### [utils/jwt.ts](src/utils/jwt.ts)
JWT utility class with dependency injection support:
- `JWTUtil` class - Handles JWT token operations
- `generateAccessToken()` - Creates short-lived access tokens (7 days)
- `generateRefreshToken()` - Creates long-lived refresh tokens (30 days)
- `verifyAccessToken()` - Validates access tokens
- `verifyRefreshToken()` - Validates refresh tokens
- Singleton instance exported for convenience

### 2. **Middleware**

#### [middlewares/error.middleware.ts](src/middlewares/error.middleware.ts)
Global error handling:
- `errorHandler` - Catches and formats all errors
- `notFoundHandler` - Handles 404 routes
- Supports Zod, Sequelize, and JWT errors
- Development vs production error responses

#### [middlewares/auth.middleware.ts](src/middlewares/auth.middleware.ts)
Authentication and authorization with DI:
- `AuthMiddleware` class with JWT dependency injection
- `authenticate` - Verifies JWT tokens and attaches user to request
- `authorize(...roles)` - Restricts access by user role
- `optionalAuthenticate` - Non-blocking authentication

### 3. **Services**

#### [services/auth.service.ts](src/services/auth.service.ts)
Authentication business logic with DI:
- `register()` - Create new user accounts
- `login()` - Authenticate users with email/password
- `refreshToken()` - Generate new access tokens
- `getCurrentUser()` - Get authenticated user profile

#### [services/user.service.ts](src/services/user.service.ts)
User management business logic with DI:
- `getUserById()` - Fetch user by ID
- `getUserByEmail()` - Fetch user by email
- `updateProfile()` - Update user information
- `changePassword()` - Change user password
- `deactivateAccount()` - Soft delete user account
- `activateAccount()` - Reactivate user account (admin)
- `getAllUsers()` - List users with pagination (admin)
- `deleteUser()` - Hard delete user (admin)

### 4. **Controllers**

#### [controllers/auth.controller.ts](src/controllers/auth.controller.ts)
Authentication endpoints with DI:
- `POST /register` - User registration
- `POST /login` - User login
- `POST /refresh-token` - Token refresh
- `GET /me` - Get current user
- `POST /logout` - User logout

#### [controllers/user.controller.ts](src/controllers/user.controller.ts)
User management endpoints with DI:
- `GET /users` - List all users (admin)
- `GET /users/:id` - Get user by ID
- `PUT /users/profile` - Update profile
- `PUT /users/change-password` - Change password
- `DELETE /users/deactivate` - Deactivate account
- `PUT /users/:id/activate` - Activate account (admin)
- `DELETE /users/:id` - Delete user (admin)

### 5. **Routes**

#### [routes/auth.routes.ts](src/routes/auth.routes.ts)
Authentication routes with validation:
- All routes use Zod schema validation
- Public routes: register, login, refresh-token
- Protected routes: me, logout

#### [routes/user.routes.ts](src/routes/user.routes.ts)
User management routes with validation and authorization:
- Protected routes require authentication
- Admin routes require admin role
- Validation middleware on all input

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| POST | `/register` | Register new user | No | - |
| POST | `/login` | Login user | No | - |
| POST | `/refresh-token` | Refresh access token | No | - |
| GET | `/me` | Get current user | Yes | - |
| POST | `/logout` | Logout user | Yes | - |

### User Routes (`/api/v1/users`)

| Method | Endpoint | Description | Auth | Role |
|--------|----------|-------------|------|------|
| GET | `/` | Get all users | Yes | Admin |
| GET | `/:id` | Get user by ID | Yes | - |
| PUT | `/profile` | Update profile | Yes | - |
| PUT | `/change-password` | Change password | Yes | - |
| DELETE | `/deactivate` | Deactivate account | Yes | - |
| PUT | `/:id/activate` | Activate account | Yes | Admin |
| DELETE | `/:id` | Delete user | Yes | Admin |

## Request/Response Examples

### Register User
```bash
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "john@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phone": "+1234567890",
      "role": "customer",
      "isActive": true,
      "createdAt": "2024-01-20T10:00:00.000Z",
      "updatedAt": "2024-01-20T10:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
    }
  }
}
```

### Login User
```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "tokens": {
      "accessToken": "...",
      "refreshToken": "..."
    }
  }
}
```

### Get Current User
```bash
GET /api/v1/auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "customer",
    "isActive": true
  }
}
```

### Update Profile
```bash
PUT /api/v1/users/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "firstName": "John Updated",
  "phone": "+9876543210"
}
```

### Change Password
```bash
PUT /api/v1/users/change-password
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
Content-Type: application/json

{
  "currentPassword": "SecurePass123",
  "newPassword": "NewSecurePass456"
}
```

### Get All Users (Admin)
```bash
GET /api/v1/users?page=1&limit=10&role=customer&isActive=true
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

## Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "message": "Error message here",
  "code": "ERROR_CODE",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### Common Error Codes

- `VALIDATION_ERROR` (422) - Invalid input data
- `UNAUTHORIZED` (401) - Authentication required or failed
- `FORBIDDEN` (403) - Insufficient permissions
- `NOT_FOUND` (404) - Resource not found
- `CONFLICT` (409) - Data conflict (e.g., email already exists)
- `BAD_REQUEST` (400) - Invalid request
- `INTERNAL_ERROR` (500) - Server error

## Dependency Injection Architecture

All services, controllers, and middleware use dependency injection:

```typescript
// Services accept dependencies via constructor
export class AuthService {
  constructor(
    private readonly jwtUtil: JWTUtil,
    private readonly userModel: typeof User = User
  ) {}
}

// Controllers accept service dependencies
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}

// Middleware accepts utility dependencies
export class AuthMiddleware {
  constructor(private readonly jwtUtil: JWTUtil) {}
}

// Singleton instances exported for convenience
export const authService = new AuthService(jwtUtil);
export const authController = new AuthController(authService);
export const authMiddleware = new AuthMiddleware(jwtUtil);
```

### Benefits:
- **Testability**: Easy to mock dependencies in unit tests
- **Flexibility**: Can swap implementations without changing consumers
- **Maintainability**: Clear dependencies and separation of concerns
- **Type Safety**: Full TypeScript support with proper types

## Security Features

1. **Password Hashing**: bcrypt with 10 salt rounds (configurable)
2. **JWT Tokens**:
   - Access token: 7 days expiry
   - Refresh token: 30 days expiry
3. **Role-Based Access Control**: customer and admin roles
4. **Account Status**: Active/inactive user accounts
5. **Input Validation**: Zod schema validation on all inputs
6. **Error Handling**: No sensitive information leaked in errors

## Configuration

JWT settings are in [config/environment.ts](src/config/environment.ts):

```typescript
jwt: {
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  refreshSecret: process.env.JWT_REFRESH_SECRET,
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
}
```

## Testing the API

### Using cURL

```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test1234"}'

# Get current user (replace TOKEN)
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Import the endpoints from this document
3. Set Authorization header: `Bearer <token>`

## Next Steps

1. **Add Tests**: Create unit and integration tests
2. **Token Blacklisting**: Implement token revocation on logout
3. **Email Verification**: Add email verification flow
4. **Password Reset**: Add forgot password functionality
5. **OAuth**: Add social login (Google, Facebook, etc.)
6. **Audit Logging**: Log authentication events
7. **Rate Limiting**: Add rate limiting on auth endpoints

## Files Created

```
Backend-Service/src/
├── utils/
│   ├── errors.ts                    ✅ Custom error classes
│   └── jwt.ts                       ✅ JWT utility class
├── middlewares/
│   ├── error.middleware.ts          ✅ Global error handler
│   └── auth.middleware.ts           ✅ Auth & authorization middleware
├── services/
│   ├── auth.service.ts              ✅ Authentication service
│   └── user.service.ts              ✅ User management service
├── controllers/
│   ├── auth.controller.ts           ✅ Auth endpoints
│   └── user.controller.ts           ✅ User endpoints
├── routes/
│   ├── auth.routes.ts               ✅ Auth routes
│   └── user.routes.ts               ✅ User routes
└── app.ts                           ✅ Updated with routes
```

## Architecture Compliance

This implementation follows the project's established patterns:

✅ **Layered Architecture**: Controllers → Services → Models
✅ **Dependency Injection**: All classes use constructor injection
✅ **Error Handling**: Custom error classes, no generic throws
✅ **Validation**: Zod schemas with type inference
✅ **Type Safety**: Full TypeScript with proper interfaces
✅ **Sequelize**: Model integration with hooks
✅ **Security**: Password hashing, JWT, RBAC
✅ **Code Quality**: Follows ARCHITECTURE.md and DEVELOPER_GUIDE.md

---

**Ready to use!** Start the development server with `npm run dev` and test the endpoints.
