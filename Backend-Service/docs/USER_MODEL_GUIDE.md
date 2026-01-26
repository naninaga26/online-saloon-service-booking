# User Model Guide

This guide explains how to use the User model in the Salon Booking Backend Service.

## Table of Contents

- [Model Overview](#model-overview)
- [Database Schema](#database-schema)
- [Model Features](#model-features)
- [Usage Examples](#usage-examples)
- [Security Features](#security-features)
- [Best Practices](#best-practices)

## Model Overview

The User model represents users in the system, supporting two roles: **customer** and **admin**.

### Key Features

- ✅ Automatic password hashing with bcrypt
- ✅ Email validation
- ✅ Role-based access control
- ✅ Active/inactive user status
- ✅ Last login tracking
- ✅ Database indexes for performance
- ✅ Type-safe with TypeScript

## Database Schema

### Table: `users`

| Column | Type | Nullable | Default | Description |
|--------|------|----------|---------|-------------|
| id | INTEGER | No | AUTO | Primary key |
| email | VARCHAR(255) | No | - | Unique email address |
| password | VARCHAR(255) | No | - | Hashed password |
| first_name | VARCHAR(50) | No | - | User's first name |
| last_name | VARCHAR(50) | No | - | User's last name |
| phone | VARCHAR(20) | Yes | NULL | Phone number (optional) |
| role | ENUM | No | 'customer' | User role (customer/admin) |
| is_active | BOOLEAN | No | true | Account status |
| last_login_at | TIMESTAMP | Yes | NULL | Last login timestamp |
| created_at | TIMESTAMP | No | NOW() | Record creation time |
| updated_at | TIMESTAMP | No | NOW() | Record update time |

### Indexes

- `users_email_idx` - Unique index on email (for fast lookups and uniqueness)
- `users_role_idx` - Index on role (for filtering by role)
- `users_is_active_idx` - Index on is_active (for filtering active users)

## Model Features

### Attributes

```typescript
interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: 'customer' | 'admin';
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
```

### Instance Methods

#### `fullName` (getter)
Returns the user's full name.

```typescript
const fullName: string = user.fullName;
// Returns: "John Doe"
```

#### `isAdmin` (getter)
Checks if user is an admin.

```typescript
const isAdmin: boolean = user.isAdmin;
// Returns: true or false
```

#### `comparePassword(candidatePassword: string)`
Compares a plain text password with the hashed password.

```typescript
const isMatch: boolean = await user.comparePassword('password123');
```

#### `toSafeObject()`
Returns user data without the password field.

```typescript
const safeUser = user.toSafeObject();
// Returns all user fields except password
```

### Model Hooks

#### beforeCreate
Automatically hashes the password before creating a new user.

#### beforeUpdate
Automatically hashes the password if it was changed during update.

## Usage Examples

### Import the Model

```typescript
import User from '../models/User.model';
// Or import from models index
import { User } from '../models';
```

### Create a New User

```typescript
// Create a customer
const user = await User.create({
  email: 'john@example.com',
  password: 'SecurePass123', // Will be automatically hashed
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890',
});

// Create an admin
const admin = await User.create({
  email: 'admin@example.com',
  password: 'AdminPass123',
  firstName: 'Admin',
  lastName: 'User',
  role: 'admin',
});
```

### Find Users

```typescript
// Find by primary key
const user = await User.findByPk(1);

// Find by email
const user = await User.findOne({
  where: { email: 'john@example.com' },
});

// Find all active customers
const customers = await User.findAll({
  where: {
    role: 'customer',
    isActive: true,
  },
});

// Find with pagination
const { count, rows: users } = await User.findAndCountAll({
  where: { isActive: true },
  limit: 10,
  offset: 0,
  order: [['createdAt', 'DESC']],
});
```

### Update a User

```typescript
// Update specific fields
await user.update({
  firstName: 'Jane',
  phone: '+0987654321',
});

// Update password (will be auto-hashed)
await user.update({
  password: 'NewPassword123',
});

// Deactivate user
await user.update({
  isActive: false,
});
```

### Delete a User

```typescript
// Soft delete (recommended - update isActive to false)
await user.update({ isActive: false });

// Hard delete (permanently removes from database)
await user.destroy();
```

### Authentication Example

```typescript
// Login flow
const user = await User.findOne({
  where: { email: 'john@example.com' },
});

if (!user) {
  throw new Error('User not found');
}

if (!user.isActive) {
  throw new Error('Account is inactive');
}

const isPasswordValid = await user.comparePassword('password123');

if (!isPasswordValid) {
  throw new Error('Invalid password');
}

// Update last login
await user.update({
  lastLoginAt: new Date(),
});

// Return safe user data (without password)
return user.toSafeObject();
```

### Search Users

```typescript
import { Op } from 'sequelize';

// Search by name or email
const users = await User.findAll({
  where: {
    [Op.or]: [
      { firstName: { [Op.iLike]: '%john%' } },
      { lastName: { [Op.iLike]: '%john%' } },
      { email: { [Op.iLike]: '%john%' } },
    ],
  },
});
```

### Get User Statistics

```typescript
import { Op } from 'sequelize';

const stats = {
  totalUsers: await User.count(),
  activeUsers: await User.count({ where: { isActive: true } }),
  customers: await User.count({ where: { role: 'customer' } }),
  admins: await User.count({ where: { role: 'admin' } }),
  recentSignups: await User.count({
    where: {
      createdAt: {
        [Op.gte]: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      },
    },
  }),
};
```

## Security Features

### Password Hashing

Passwords are automatically hashed using bcrypt before being stored in the database:

- Uses configurable salt rounds (default: 10)
- Hashing happens in `beforeCreate` and `beforeUpdate` hooks
- Never store plain text passwords

### Email Validation

Email addresses are validated at the model level:

```typescript
email: {
  type: DataTypes.STRING(255),
  validate: {
    isEmail: { msg: 'Must be a valid email address' },
  },
}
```

### Safe Data Export

Use `toSafeObject()` to remove sensitive data before sending to client:

```typescript
// ❌ Bad - exposes password hash
res.json({ user });

// ✅ Good - password excluded
res.json({ user: user.toSafeObject() });
```

## Best Practices

### 1. Always Validate Input

Use Zod schemas for input validation before creating/updating users:

```typescript
import { registerSchema } from '../schemas';

const validatedData = registerSchema.parse(req.body);
const user = await User.create(validatedData);
```

### 2. Use Transactions for Critical Operations

```typescript
import { sequelize } from '../models';

await sequelize.transaction(async (t) => {
  const user = await User.create(userData, { transaction: t });
  // Other operations...
});
```

### 3. Handle Unique Constraint Errors

```typescript
try {
  await User.create({ email: 'existing@example.com', ... });
} catch (error) {
  if (error.name === 'SequelizeUniqueConstraintError') {
    throw new Error('Email already exists');
  }
  throw error;
}
```

### 4. Use Indexes for Common Queries

The model already includes indexes for:
- Email (unique lookup)
- Role (filtering)
- isActive (filtering)

### 5. Soft Delete Over Hard Delete

```typescript
// ✅ Preferred - soft delete
await user.update({ isActive: false });

// ❌ Avoid - hard delete (loses data)
await user.destroy();
```

### 6. Select Only Needed Fields

```typescript
// ✅ Good - select specific fields
const users = await User.findAll({
  attributes: ['id', 'email', 'firstName', 'lastName'],
});

// ❌ Bad - selects all fields including password
const users = await User.findAll();
```

### 7. Use Type-Safe Queries

```typescript
import { UserAttributes } from '../models/User.model';

// TypeScript will enforce correct field names
const users = await User.findAll({
  where: { role: 'customer' }, // Type-safe!
  order: [['createdAt', 'DESC']], // Type-safe!
});
```

## Testing

### Unit Test Example

```typescript
import User from '../models/User.model';

describe('User Model', () => {
  it('should hash password before creation', async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'plaintext',
      firstName: 'Test',
      lastName: 'User',
    });

    expect(user.password).not.toBe('plaintext');
    expect(user.password.length).toBeGreaterThan(20);
  });

  it('should validate password correctly', async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'SecurePass123',
      firstName: 'Test',
      lastName: 'User',
    });

    const isValid = await user.comparePassword('SecurePass123');
    expect(isValid).toBe(true);

    const isInvalid = await user.comparePassword('WrongPassword');
    expect(isInvalid).toBe(false);
  });

  it('should exclude password in toSafeObject', () => {
    const user = User.build({
      id: 1,
      email: 'test@example.com',
      password: 'hashed_password',
      firstName: 'Test',
      lastName: 'User',
      role: 'customer',
      isActive: true,
    });

    const safeUser = user.toSafeObject();
    expect(safeUser).not.toHaveProperty('password');
    expect(safeUser).toHaveProperty('email');
  });
});
```

## Migration

To create the users table in your database:

```bash
# Run migration
npm run migrate

# Undo migration
npm run migrate:undo
```

The migration file is located at:
```
migrations/20240126000001-create-users.js
```

---

For more information on Sequelize models, see:
- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [TypeScript with Sequelize](https://sequelize.org/docs/v6/other-topics/typescript/)
