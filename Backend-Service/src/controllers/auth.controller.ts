import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { RegisterInput, LoginInput, RefreshTokenInput } from '../schemas/auth.schema';

/**
 * Authentication controller with dependency injection
 */
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register a new user
   * POST /api/v1/auth/register
   */
  register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: RegisterInput = req.body;

      const result = await this.authService.register(data);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Login user
   * POST /api/v1/auth/login
   */
  login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: LoginInput = req.body;

      const result = await this.authService.login(data);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Refresh access token
   * POST /api/v1/auth/refresh-token
   */
  refreshToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { refreshToken }: RefreshTokenInput = req.body;

      const tokens = await this.authService.refreshToken(refreshToken);

      res.status(200).json({
        success: true,
        message: 'Token refreshed successfully',
        data: tokens,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get current user profile
   * GET /api/v1/auth/me
   */
  getCurrentUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (!req.user) {
        throw new Error('User not authenticated');
      }

      const user = await this.authService.getCurrentUser(req.user.userId);

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Logout user (client-side token removal)
   * POST /api/v1/auth/logout
   */
  logout = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // With JWT, logout is handled client-side by removing the token
      // This endpoint exists for consistency and can be extended with token blacklisting

      res.status(200).json({
        success: true,
        message: 'Logout successful',
      });
    } catch (error) {
      next(error);
    }
  };
}

// Export singleton instance
import { authService } from '../services/auth.service';
export const authController = new AuthController(authService);
