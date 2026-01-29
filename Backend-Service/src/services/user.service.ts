import User from '../models/User.model';
import { NotFoundError, UnauthorizedError, ConflictError } from '../utils/errors';
import { UpdateProfileInput, ChangePasswordInput } from '../schemas/auth.schema';
import { UserAttributes } from '../types';

/**
 * User service with dependency injection
 */
export class UserService {
  constructor(private readonly userModel: typeof User = User) {}

  /**
   * Get user by ID
   */
  async getUserById(userId: number): Promise<Omit<UserAttributes, 'password'>> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new NotFoundError('User');
    }

    return user.toSafeObject();
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<Omit<UserAttributes, 'password'>> {
    const user = await this.userModel.findOne({
      where: { email },
    });

    if (!user) {
      throw new NotFoundError('User');
    }

    return user.toSafeObject();
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: number,
    data: UpdateProfileInput
  ): Promise<Omit<UserAttributes, 'password'>> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new NotFoundError('User');
    }

    // Update user fields
    if (data.firstName !== undefined) {
      user.firstName = data.firstName;
    }
    if (data.lastName !== undefined) {
      user.lastName = data.lastName;
    }
    if (data.phone !== undefined) {
      user.phone = data.phone;
    }

    await user.save();

    return user.toSafeObject();
  }

  /**
   * Change user password
   */
  async changePassword(
    userId: number,
    data: ChangePasswordInput
  ): Promise<{ message: string }> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new NotFoundError('User');
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(data.currentPassword);

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedError('Current password is incorrect');
    }

    // Check if new password is same as current
    if (data.currentPassword === data.newPassword) {
      throw new ConflictError('New password must be different from current password');
    }

    // Update password (will be hashed by model hook)
    user.password = data.newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
  }

  /**
   * Deactivate user account
   */
  async deactivateAccount(userId: number): Promise<{ message: string }> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new NotFoundError('User');
    }

    user.isActive = false;
    await user.save();

    return { message: 'Account deactivated successfully' };
  }

  /**
   * Activate user account (admin only)
   */
  async activateAccount(userId: number): Promise<{ message: string }> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new NotFoundError('User');
    }

    user.isActive = true;
    await user.save();

    return { message: 'Account activated successfully' };
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers(options: {
    page?: number;
    limit?: number;
    role?: 'customer' | 'admin';
    isActive?: boolean;
  } = {}): Promise<{
    users: Array<Omit<UserAttributes, 'password'>>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const page = options.page || 1;
    const limit = options.limit || 10;
    const offset = (page - 1) * limit;

    const where: any = {};

    if (options.role) {
      where.role = options.role;
    }

    if (options.isActive !== undefined) {
      where.isActive = options.isActive;
    }

    const { count, rows } = await this.userModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [['createdAt', 'DESC']],
    });

    return {
      users: rows.map((user) => user.toSafeObject()),
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  /**
   * Delete user (admin only - hard delete)
   */
  async deleteUser(userId: number): Promise<{ message: string }> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new NotFoundError('User');
    }

    await user.destroy();

    return { message: 'User deleted successfully' };
  }
}

// Export singleton instance
export const userService = new UserService();
