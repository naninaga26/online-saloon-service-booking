/**
 * Central export point for all Zod schemas
 * Import schemas from here to maintain consistency
 */

// Auth schemas
export * from './auth.schema';

// Booking schemas
export * from './booking.schema';

// Common/reusable schemas
export * from './common.schema';

/**
 * Usage Examples:
 *
 * 1. In Routes:
 * ```typescript
 * import { validateBody } from '../middlewares/validation.middleware';
 * import { registerSchema } from '../schemas';
 *
 * router.post('/register', validateBody(registerSchema), authController.register);
 * ```
 *
 * 2. Multiple validations:
 * ```typescript
 * import { validate } from '../middlewares/validation.middleware';
 * import { createBookingSchema, idParamSchema } from '../schemas';
 *
 * router.post(
 *   '/bookings/:id',
 *   validate({
 *     body: createBookingSchema,
 *     params: idParamSchema,
 *   }),
 *   bookingController.create
 * );
 * ```
 *
 * 3. Type inference in controllers:
 * ```typescript
 * import { RegisterInput } from '../schemas';
 *
 * export const register = async (req: Request, res: Response) => {
 *   const data: RegisterInput = req.body; // Fully typed!
 *   // ...
 * };
 * ```
 *
 * 4. In services for validation:
 * ```typescript
 * import { validateOrThrow } from '../utils/zodHelpers';
 * import { createBookingSchema } from '../schemas';
 *
 * export const createBooking = async (data: unknown) => {
 *   const validData = validateOrThrow(createBookingSchema, data);
 *   // ...
 * };
 * ```
 */
