/**
 * User role type
 */
export type UserRole = 'customer' | 'admin';

/**
 * User attributes interface (matches database schema)
 * This is the complete model representation
 */
export interface UserAttributes {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * User creation attributes (for Sequelize)
 * Optional fields that are auto-generated
 */
export interface UserCreationAttributes {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
  isActive?: boolean;
  lastLoginAt?: Date;
}

/**
 * User response DTO (without sensitive data)
 * Use this for API responses
 */
export interface UserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: UserRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Public user profile (minimal information)
 * Use for public-facing data
 */
export interface PublicUserProfile {
  id: number;
  firstName: string;
  lastName: string;
}

/**
 * User with full name
 */
export interface UserWithFullName extends UserResponse {
  fullName: string;
}

/**
 * User creation DTO (from API request)
 */
export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role?: UserRole;
}

/**
 * User update DTO (from API request)
 */
export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  isActive?: boolean;
}

/**
 * User login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * User authentication response
 */
export interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}

/**
 * Password change data
 */
export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

/**
 * User query filters (for list/search endpoints)
 */
export interface UserQueryFilters {
  role?: UserRole;
  isActive?: boolean;
  search?: string; // Search by email, first name, or last name
  page?: number;
  limit?: number;
  sortBy?: keyof UserAttributes;
  sortOrder?: 'ASC' | 'DESC';
}

/**
 * User statistics (for admin dashboard)
 */
export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  customerCount: number;
  adminCount: number;
  recentSignups: number; // Last 7 days
}
