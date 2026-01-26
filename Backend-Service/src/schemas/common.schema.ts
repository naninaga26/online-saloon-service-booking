import { z } from 'zod';

/**
 * Common reusable schemas and validation patterns
 */

// ID parameter validation (for route params like /users/:id)
export const idParamSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a valid number').transform(Number),
});

// UUID parameter validation
export const uuidParamSchema = z.object({
  id: z.string().uuid('Invalid UUID format'),
});

// Pagination query parameters
export const paginationSchema = z.object({
  page: z
    .string()
    .optional()
    .default('1')
    .transform(Number)
    .pipe(z.number().int().positive()),
  limit: z
    .string()
    .optional()
    .default('10')
    .transform(Number)
    .pipe(z.number().int().positive().max(100)),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['ASC', 'DESC']).optional().default('DESC'),
});

// Date range filter
export const dateRangeSchema = z.object({
  startDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Start date must be in YYYY-MM-DD format')
    .optional(),
  endDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'End date must be in YYYY-MM-DD format')
    .optional(),
});

// Search query
export const searchSchema = z.object({
  q: z.string().min(1, 'Search query cannot be empty').optional(),
});

// Email validation (reusable)
export const emailSchema = z
  .string()
  .email('Invalid email format')
  .toLowerCase()
  .trim();

// Phone number validation (reusable)
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

// Password validation (reusable)
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(100, 'Password must not exceed 100 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  );

// Price/amount validation (in cents)
export const amountSchema = z
  .number()
  .int('Amount must be an integer')
  .nonnegative('Amount must be non-negative');

// URL validation
export const urlSchema = z.string().url('Invalid URL format');

// Time validation (HH:mm format)
export const timeSchema = z
  .string()
  .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:mm format');

// Date validation (YYYY-MM-DD format)
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format');

// Boolean string to boolean conversion (for query params)
export const booleanSchema = z
  .string()
  .optional()
  .transform((val) => val === 'true')
  .pipe(z.boolean());

// Enum helper for creating status fields
export const createEnumSchema = <T extends string>(values: readonly T[]) => {
  return z.enum(values as [T, ...T[]]);
};

// Example: Booking status enum
export const bookingStatusSchema = createEnumSchema([
  'pending',
  'confirmed',
  'cancelled',
  'completed',
] as const);

// Example: User role enum
export const userRoleSchema = createEnumSchema(['customer', 'admin'] as const);

// TypeScript type exports
export type IdParam = z.infer<typeof idParamSchema>;
export type UuidParam = z.infer<typeof uuidParamSchema>;
export type PaginationQuery = z.infer<typeof paginationSchema>;
export type DateRangeQuery = z.infer<typeof dateRangeSchema>;
export type SearchQuery = z.infer<typeof searchSchema>;
export type BookingStatus = z.infer<typeof bookingStatusSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
