import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { UpdateProfileInput, ChangePasswordInput } from '../schemas/auth.schema';

/**
 * User controller with dependency injection
 */
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get user by ID
   * GET /api/v1/users/:id
   */
  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = parseInt(req.params.id, 10);

      const user = await this.userService.getUserById(userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update user profile
   * PUT /api/v1/users/profile
   */
  updateProfile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }

      const data: UpdateProfileInput = req.body;

      const user = await this.userService.updateProfile(req.user.userId, data);

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Change user password
   * PUT /api/v1/users/change-password
   */
  changePassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }

      const data: ChangePasswordInput = req.body;

      const result = await this.userService.changePassword(req.user.userId, data);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Deactivate user account
   * DELETE /api/v1/users/deactivate
   */
  deactivateAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }

      const result = await this.userService.deactivateAccount(req.user.userId);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all users (admin only)
   * GET /api/v1/users
   */
  getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const role = req.query.role as 'customer' | 'admin' | undefined;
      const isActive = req.query.isActive
        ? req.query.isActive === 'true'
        : undefined;

      const result = await this.userService.getAllUsers({
        page,
        limit,
        role,
        isActive,
      });

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Activate user account (admin only)
   * PUT /api/v1/users/:id/activate
   */
  activateAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = parseInt(req.params.id, 10);

      const result = await this.userService.activateAccount(userId);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete user (admin only)
   * DELETE /api/v1/users/:id
   */
  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = parseInt(req.params.id, 10);

      const result = await this.userService.deleteUser(userId);

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  };
}

// Export singleton instance
import { userService } from '../services/user.service';
export const userController = new UserController(userService);
