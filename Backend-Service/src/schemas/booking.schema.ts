import { z } from 'zod';
import {
  dateSchema,
  timeSchema,
  idParamSchema,
  paginationSchema,
  bookingStatusSchema,
} from './common.schema';

/**
 * Schema for creating a new booking
 */
export const createBookingSchema = z
  .object({
    serviceId: z.number().int().positive('Service ID must be a positive integer'),
    slotId: z.number().int().positive('Slot ID must be a positive integer'),
    bookingDate: dateSchema,
    startTime: timeSchema,
    endTime: timeSchema,
    notes: z.string().max(500, 'Notes must not exceed 500 characters').optional(),
  })
  .refine(
    (data) => {
      // Validate that endTime is after startTime
      const [startHour, startMinute] = data.startTime.split(':').map(Number);
      const [endHour, endMinute] = data.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMinute;
      const endMinutes = endHour * 60 + endMinute;
      return endMinutes > startMinutes;
    },
    {
      message: 'End time must be after start time',
      path: ['endTime'],
    }
  );

/**
 * Schema for checking slot availability
 */
export const checkAvailabilitySchema = z.object({
  serviceId: z.number().int().positive('Service ID must be a positive integer'),
  slotId: z.number().int().positive('Slot ID must be a positive integer'),
  bookingDate: dateSchema,
});

/**
 * Schema for updating booking status
 */
export const updateBookingStatusSchema = z.object({
  status: bookingStatusSchema,
  cancellationReason: z
    .string()
    .min(10, 'Cancellation reason must be at least 10 characters')
    .max(500, 'Cancellation reason must not exceed 500 characters')
    .optional(),
});

/**
 * Schema for getting bookings with filters
 */
export const getBookingsQuerySchema = paginationSchema.extend({
  status: bookingStatusSchema.optional(),
  startDate: dateSchema.optional(),
  endDate: dateSchema.optional(),
  serviceId: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(z.number().int().positive().optional()),
});

/**
 * Schema for booking ID parameter
 */
export const bookingIdParamSchema = idParamSchema;

/**
 * Schema for canceling a booking
 */
export const cancelBookingSchema = z.object({
  reason: z
    .string({
      required_error: 'Cancellation reason is required',
    })
    .min(10, 'Cancellation reason must be at least 10 characters')
    .max(500, 'Cancellation reason must not exceed 500 characters'),
});

// TypeScript types inferred from schemas
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type CheckAvailabilityInput = z.infer<typeof checkAvailabilitySchema>;
export type UpdateBookingStatusInput = z.infer<typeof updateBookingStatusSchema>;
export type GetBookingsQuery = z.infer<typeof getBookingsQuerySchema>;
export type BookingIdParam = z.infer<typeof bookingIdParamSchema>;
export type CancelBookingInput = z.infer<typeof cancelBookingSchema>;
