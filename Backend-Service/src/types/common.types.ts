/**
 * Common types and interfaces used across the application
 */

/**
 * Generic API response wrapper
 * Use this for all API responses to maintain consistency
 */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

/**
 * Pagination parameters (for query strings)
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

/**
 * Paginated response wrapper
 * Use this for list endpoints with pagination
 */
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

/**
 * JWT token payload structure
 */
export interface JwtPayload {
  userId: number;
  email: string;
  role: 'customer' | 'admin';
  iat?: number;
  exp?: number;
}

/**
 * Authentication tokens
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Error response format
 */
export interface ErrorResponse {
  success: false;
  message: string;
  errors?: Array<{
    field?: string;
    message: string;
    code?: string;
  }>;
  code?: string;
  stack?: string; // Only in development
}

/**
 * Common ID type (can be string or number)
 */
export type ID = string | number;

/**
 * Timestamp type (can be Date or ISO string)
 */
export type Timestamp = Date | string;

/**
 * Sort order type
 */
export type SortOrder = 'ASC' | 'DESC';

/**
 * Common status types
 */
export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded';
export type ServiceStatus = 'active' | 'inactive' | 'archived';

/**
 * Date range filter (for queries)
 */
export interface DateRangeFilter {
  startDate?: Date | string;
  endDate?: Date | string;
}

/**
 * Search filter (for queries)
 */
export interface SearchFilter {
  query?: string;
  fields?: string[]; // Fields to search in
}

/**
 * Generic query filters
 */
export interface BaseQueryFilters extends PaginationParams {
  search?: string;
  createdAtFrom?: Date | string;
  createdAtTo?: Date | string;
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

/**
 * Metadata for records (common fields)
 */
export interface RecordMetadata {
  createdAt: Date;
  updatedAt: Date;
  createdBy?: number;
  updatedBy?: number;
}

/**
 * Soft delete support
 */
export interface SoftDeletable {
  deletedAt?: Date | null;
  isDeleted: boolean;
}
