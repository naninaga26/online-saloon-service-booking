/**
 * Central export point for all types and interfaces
 * Import from here to maintain consistency: import { User, ApiResponse } from '../types';
 */

// Common types - shared across domains
export * from './common.types';

// Domain-specific types
export * from './user.types';

// Add more domain exports as you create them:
// export * from './booking.types';
// export * from './service.types';
// export * from './slot.types';
// export * from './payment.types';
