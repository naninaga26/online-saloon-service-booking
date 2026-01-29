import { Request, Response, NextFunction } from 'express';
import { JWTUtil } from '../utils/jwt';
import { UnauthorizedError, ForbiddenError } from '../utils/errors';

/**
 * Authentication middleware factory with dependency injection
 */
export class AuthMiddleware {
  constructor(private readonly jwtUtil: JWTUtil) {}

  /**
   * Middleware to authenticate requests using JWT
   */
  authenticate = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Extract token from Authorization header
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        throw new UnauthorizedError('No authorization header provided');
      }

      if (!authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedError('Invalid authorization header format');
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix

      if (!token) {
        throw new UnauthorizedError('No token provided');
      }

      // Verify token
      const decoded = this.jwtUtil.verifyAccessToken(token);

      // Attach user info to request
      req.user = decoded;

      next();
    } catch (error) {
      next(error);
    }
  };

  /**
   * Middleware to authorize users based on roles
   */
  authorize = (...roles: Array<'customer' | 'admin'>) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
      try {
        if (!req.user) {
          throw new UnauthorizedError('Authentication required');
        }

        if (!roles.includes(req.user.role)) {
          throw new ForbiddenError('Insufficient permissions');
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  };

  /**
   * Optional authentication - doesn't throw error if no token
   */
  optionalAuthenticate = async (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.substring(7);
        if (token) {
          const decoded = this.jwtUtil.verifyAccessToken(token);
          req.user = decoded;
        }
      }

      next();
    } catch (error) {
      // Continue without authentication on error
      next();
    }
  };
}

// Export singleton instance for convenience
import { jwtUtil } from '../utils/jwt';
export const authMiddleware = new AuthMiddleware(jwtUtil);
