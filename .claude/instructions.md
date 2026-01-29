# Claude Code Instructions for Online Salon Service Booking

## Project Overview

This is a full-stack online salon service booking application with:
- **Backend-Service**: Express.js + TypeScript + PostgreSQL + Sequelize ORM
- **Web-React**: React 18 + TypeScript + Vite + Tailwind CSS
- **Web-Vue**: Vue 3 + TypeScript + Vite + Tailwind CSS

## 📚 Required Reading Before Any Task

**ALWAYS review the relevant documentation before starting any task:**

### For Backend Work (Express.js API)
1. **[Backend-Service/docs/ARCHITECTURE.md](../Backend-Service/docs/ARCHITECTURE.md)**
   - Layered architecture (Controllers → Services → Models)
   - API design patterns
   - Database schemas
   - Authentication & authorization

2. **[Backend-Service/docs/DEVELOPER_GUIDE.md](../Backend-Service/docs/DEVELOPER_GUIDE.md)**
   - TypeScript coding standards
   - Service/Controller patterns
   - Adding new features workflow

3. **[Backend-Service/docs/AUTH_IMPLEMENTATION.md](../Backend-Service/docs/AUTH_IMPLEMENTATION.md)**
   - JWT authentication implementation
   - User service and controller
   - Dependency injection patterns
   - API endpoints and usage examples

4. **[Backend-Service/docs/GIT_HOOKS_GUIDE.md](../Backend-Service/docs/GIT_HOOKS_GUIDE.md)**
   - Pre-commit and pre-push hooks
   - Linting and formatting automation
   - Code quality validation

5. **[Backend-Service/docs/QUALITY_STRATEGY.md](../Backend-Service/docs/QUALITY_STRATEGY.md)**
   - Jest unit/integration testing
   - Test patterns and utilities

### For React Frontend Work
1. **[Web-React/docs/ARCHITECTURE.md](../Web-React/docs/ARCHITECTURE.md)**
   - Component architecture
   - State management (Redux + React Query)
   - Routing patterns

2. **[Web-React/docs/DEVELOPER_GUIDE.md](../Web-React/docs/DEVELOPER_GUIDE.md)**
   - Component development workflow
   - React Hook Form patterns

3. **[Web-React/docs/STYLING_GUIDE.md](../Web-React/docs/STYLING_GUIDE.md)**
   - Tailwind CSS patterns
   - Dark mode implementation
   - Responsive design

4. **[Web-React/docs/QUALITY_STRATEGY.md](../Web-React/docs/QUALITY_STRATEGY.md)**
   - Vitest + React Testing Library
   - Component testing patterns

### For Vue Frontend Work
1. **[Web-Vue/docs/ARCHITECTURE.md](../Web-Vue/docs/ARCHITECTURE.md)**
   - Vue 3 Composition API patterns
   - Pinia state management
   - Composables architecture

2. **[Web-Vue/docs/DEVELOPER_GUIDE.md](../Web-Vue/docs/DEVELOPER_GUIDE.md)**
   - `<script setup>` syntax
   - Composables development
   - VeeValidate forms

3. **[Web-Vue/docs/STYLING_GUIDE.md](../Web-Vue/docs/STYLING_GUIDE.md)**
   - Tailwind in Vue SFCs
   - Scoped styles patterns

4. **[Web-Vue/docs/QUALITY_STRATEGY.md](../Web-Vue/docs/QUALITY_STRATEGY.md)**
   - Vue Test Utils patterns
   - Composables testing

## 🎯 Core Principles

### Backend Development
- **Layered Architecture**: Controllers → Services → Models (STRICT separation)
- **Database ORM**: Sequelize with PostgreSQL
  - Use Sequelize models for all database operations
  - Define migrations for schema changes
  - Use Sequelize transactions for multi-step operations
  - Define proper associations (hasMany, belongsTo, etc.)
  - Use query builders, avoid raw SQL unless necessary
- **Error Handling**: Use custom error classes (`NotFoundError`, `ValidationError`, `ConflictError`)
- **Validation**: Use Zod for schema validation
  - Define schemas in `/schemas` directory
  - Use validation middleware for routes
  - Leverage TypeScript type inference from schemas
  - Reuse common validation patterns (email, phone, pagination)
- **Transactions**: Use Sequelize managed transactions for data consistency
- **Type Safety**: Define interfaces for all DTOs and responses
  - Use `z.infer<typeof schema>` to extract types from Zod schemas
  - Avoid duplicating types - generate from schemas when possible
- **Testing**: Unit test services, integration test APIs with test database

### React Development
- **Component Types**: Common (reusable) → Feature (domain-specific) → Pages (route-level)
- **State Management**: Local state → React Query → Redux (in order of preference)
- **Hooks**: Custom hooks for all API calls using React Query
- **Forms**: React Hook Form + Yup/Zod validation
- **Styling**: Tailwind CSS utility classes (NO inline styles)
- **TypeScript**: Define prop interfaces for all components
- **Testing**: Test behavior with React Testing Library

### Vue Development
- **Composition API**: Always use `<script setup lang="ts">` syntax
- **State Management**: Local ref/reactive → Composables → Pinia
- **Composables**: Reusable logic in `/composables` directory
- **Forms**: VeeValidate + Yup validation
- **Styling**: Tailwind utilities with scoped styles when needed
- **TypeScript**: Define interfaces for props and emits
- **Testing**: Vue Test Utils for component testing

## 🚫 What NOT to Do

### Backend
- ❌ NO business logic in controllers (keep them thin)
- ❌ NO direct database queries in controllers (use services)
- ❌ NO generic `throw new Error()` (use custom error classes)
- ❌ NO unvalidated user input
- ❌ NO synchronous blocking operations
- ❌ NO raw SQL queries without parameterization (SQL injection risk)
- ❌ NO model changes without migrations
- ❌ NO missing Sequelize transactions for multi-step operations
- ❌ NO N+1 queries (use proper `include` with associations)
- ❌ NO auto-sync in production (`sequelize.sync()` - use migrations instead)

### React
- ❌ NO class components (use functional components)
- ❌ NO inline styles (use Tailwind classes)
- ❌ NO direct API calls in components (use custom hooks)
- ❌ NO prop drilling (use Context or Redux when appropriate)
- ❌ NO missing TypeScript types

### Vue
- ❌ NO Options API (use Composition API)
- ❌ NO `any` types (proper TypeScript)
- ❌ NO inline styles (use Tailwind utilities)
- ❌ NO direct API calls in components (use composables)
- ❌ NO ref unwrapping mistakes

## 📋 Workflow for Adding New Features

### Backend Feature (e.g., Reviews)
1. Read [Backend-Service/docs/ARCHITECTURE.md](../Backend-Service/docs/ARCHITECTURE.md)
2. Define Zod schemas in `/schemas/review.schema.ts`
   - Create validation schemas for create, update, query operations
   - Use `z.infer<typeof schema>` to generate TypeScript types
   - Reuse common schemas from `/schemas/common.schema.ts`
   - Export both schemas and inferred types
3. Create Sequelize migration in `/migrations/YYYYMMDDHHMMSS-create-review.js`
4. Create Sequelize model in `/models/Review.model.ts`
   - Define model attributes with proper data types
   - Set up associations with other models
   - Add indexes for performance
   - Define hooks if needed (beforeCreate, afterUpdate, etc.)
5. Run migration: `npm run migrate`
6. Create service in `/services/review.service.ts`
   - Use Sequelize query methods (findOne, findAll, create, update, destroy)
   - Use transactions for multi-step operations
   - Use `include` for associations (avoid N+1 queries)
   - Accept typed inputs from Zod schemas (e.g., `CreateReviewInput`)
7. Create controller in `/controllers/review.controller.ts`
   - Controllers receive validated, typed data from middleware
8. Add routes in `/routes/review.routes.ts`
   - Use validation middleware: `validate()`, `validateBody()`, `validateQuery()`
   - Attach Zod schemas to routes before controller
9. Write unit tests for service (mock Sequelize models)
10. Write integration tests for API endpoints (use test database)
11. Add Swagger documentation

### React Feature (e.g., Reviews Component)
1. Read [Web-React/docs/ARCHITECTURE.md](../Web-React/docs/ARCHITECTURE.md)
2. Define types in `/types/review.types.ts`
3. Create API functions in `/api/reviews.api.ts`
4. Create custom hook in `/hooks/useReviews.ts` with React Query
5. Create component in `/components/reviews/ReviewCard/`
6. Style with Tailwind CSS (see [STYLING_GUIDE](../Web-React/docs/STYLING_GUIDE.md))
7. Add form with React Hook Form (see [DEVELOPER_GUIDE](../Web-React/docs/DEVELOPER_GUIDE.md))
8. Write component tests with React Testing Library
9. Create page component if needed

### Vue Feature (e.g., Reviews Component)
1. Read [Web-Vue/docs/ARCHITECTURE.md](../Web-Vue/docs/ARCHITECTURE.md)
2. Define types in `/types/review.types.ts`
3. Create API functions in `/api/reviews.api.ts`
4. Create composable in `/composables/useReviews.ts`
5. Create component in `/components/reviews/ReviewCard.vue`
6. Use `<script setup>` with TypeScript
7. Style with Tailwind CSS (see [STYLING_GUIDE](../Web-Vue/docs/STYLING_GUIDE.md))
8. Add form with VeeValidate (see [DEVELOPER_GUIDE](../Web-Vue/docs/DEVELOPER_GUIDE.md))
9. Write component tests with Vue Test Utils
10. Create view component if needed

## 🔍 Before Making Changes

**ALWAYS:**
1. ✅ Read the relevant architecture doc
2. ✅ Check existing patterns in similar features
3. ✅ Verify correct directory for new files
4. ✅ Define TypeScript types/interfaces
5. ✅ Follow established naming conventions
6. ✅ Add appropriate error handling
7. ✅ Write tests (see QUALITY_STRATEGY docs)
8. ✅ Update documentation if patterns change

## 💡 Quick Reference Commands

### Backend
```bash
npm run dev              # Start dev server
npm run build            # Compile TypeScript
npm test                 # Run tests
npm run lint             # Lint code
npm run migrate          # Run Sequelize migrations
npm run migrate:undo     # Undo last migration
npm run seed             # Run database seeders
```

### React
```bash
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm test                 # Run Vitest tests
npm run lint             # Lint code
```

### Vue
```bash
npm run dev              # Start Vite dev server
npm run build            # Build for production
npm test                 # Run Vitest tests
npm run lint             # Lint code
```

## 🗄️ Sequelize Best Practices

### Model Definition
```typescript
// Use TypeScript with Sequelize
import { Model, DataTypes, Sequelize } from 'sequelize';

class User extends Model {
  declare id: number;
  declare email: string;
  declare password: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  }
}, { sequelize, modelName: 'User' });
```

### Associations
```typescript
// Define relationships in model files or separate association file
User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
```

### Transactions
```typescript
// ALWAYS use managed transactions for multi-step operations
await sequelize.transaction(async (t) => {
  await Slot.update({ bookedCount: slot.bookedCount + 1 }, {
    where: { id: slotId },
    transaction: t
  });
  await Booking.create(bookingData, { transaction: t });
});
```

### Query Optimization
```typescript
// ✅ Good - Eager loading with include
const bookings = await Booking.findAll({
  include: [{ model: User, as: 'user' }, { model: Service, as: 'service' }]
});

// ❌ Bad - N+1 query problem
const bookings = await Booking.findAll();
for (const booking of bookings) {
  booking.user = await User.findByPk(booking.userId); // N+1!
}
```

### Migrations
```javascript
// migrations/20240101120000-create-users.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false }
    });
    await queryInterface.addIndex('Users', ['email']);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  }
};
```

## ✅ Zod Validation Best Practices

### Schema Definition
```typescript
// schemas/user.schema.ts
import { z } from 'zod';
import { emailSchema, passwordSchema } from './common.schema';

export const createUserSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: z.string().min(2).max(50).trim(),
  lastName: z.string().min(2).max(50).trim(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
});

// Auto-generate TypeScript type
export type CreateUserInput = z.infer<typeof createUserSchema>;
```

### Using in Routes
```typescript
// routes/user.routes.ts
import { validateBody, validate } from '../middlewares/validation.middleware';
import { createUserSchema, idParamSchema } from '../schemas';

// Validate body only
router.post('/users', validateBody(createUserSchema), userController.create);

// Validate multiple parts of request
router.put(
  '/users/:id',
  validate({
    params: idParamSchema,
    body: updateUserSchema,
  }),
  userController.update
);

// Validate query parameters
router.get('/users', validateQuery(paginationSchema), userController.list);
```

### Type-Safe Controllers
```typescript
// controllers/user.controller.ts
import { Request, Response } from 'express';
import { CreateUserInput } from '../schemas';

export const create = async (req: Request, res: Response) => {
  // req.body is automatically typed and validated
  const userData: CreateUserInput = req.body;

  const user = await userService.createUser(userData);

  res.status(201).json({
    success: true,
    data: user,
  });
};
```

### Reusing Common Schemas
```typescript
// ✅ Good - Reuse common patterns
import { paginationSchema, dateRangeSchema } from './common.schema';

export const getUsersQuerySchema = paginationSchema.extend({
  role: z.enum(['customer', 'admin']).optional(),
  ...dateRangeSchema.shape,
});

// ❌ Bad - Duplicating validation logic
export const getUsersQuerySchema = z.object({
  page: z.string().transform(Number).pipe(z.number().positive()),
  limit: z.string().transform(Number).pipe(z.number().positive()),
  // ... duplicated code
});
```

### Custom Refinements
```typescript
// Add custom validation logic
export const bookingSchema = z
  .object({
    startTime: timeSchema,
    endTime: timeSchema,
  })
  .refine(
    (data) => {
      // Custom validation: endTime must be after startTime
      return data.endTime > data.startTime;
    },
    {
      message: 'End time must be after start time',
      path: ['endTime'],
    }
  );
```

### Schema Transformations
```typescript
// Transform data during validation
export const querySchema = z.object({
  // Transform string to number
  id: z.string().transform(Number).pipe(z.number().positive()),

  // Transform string to boolean
  isActive: z
    .string()
    .optional()
    .transform((val) => val === 'true')
    .pipe(z.boolean()),

  // Lowercase and trim email
  email: z.string().email().toLowerCase().trim(),
});
```

## 🎨 Styling Standards

**ALWAYS use Tailwind CSS utility classes:**
- Responsive: `sm:`, `md:`, `lg:`, `xl:` prefixes
- Dark mode: `dark:` prefix
- States: `hover:`, `focus:`, `active:` prefixes
- See full guide: [STYLING_GUIDE.md](../Web-React/docs/STYLING_GUIDE.md) or [STYLING_GUIDE.md](../Web-Vue/docs/STYLING_GUIDE.md)

## 🧪 Testing Standards

**Coverage Goals:**
- Services/Composables: 80%+
- Components: 80%+
- Utilities: 90%+

**Test Patterns:**
- Use AAA pattern (Arrange-Act-Assert)
- Test behavior, not implementation
- Mock external dependencies
- See: [QUALITY_STRATEGY.md](../Backend-Service/docs/QUALITY_STRATEGY.md)

## 🚀 When in Doubt

1. **Check the docs first** - All patterns are documented
2. **Look for similar code** - Follow existing patterns
3. **Ask for clarification** - Don't assume requirements

---

**Remember: Consistency is key. Follow these established patterns to maintain code quality across the entire project.**
