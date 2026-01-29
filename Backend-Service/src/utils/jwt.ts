import jwt from 'jsonwebtoken';
import config from '../config/environment';
import { UnauthorizedError } from './errors';

/**
 * JWT Payload interface
 */
export interface JWTPayload {
  userId: number;
  email: string;
  role: 'customer' | 'admin';
}

/**
 * JWT Token Response interface
 */
export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * JWT utility class with dependency injection support
 */
export class JWTUtil {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly refreshSecret: string;
  private readonly refreshExpiresIn: string;

  constructor(
    jwtSecret?: string,
    jwtExpiresIn?: string,
    refreshSecret?: string,
    refreshExpiresIn?: string
  ) {
    this.jwtSecret = jwtSecret || config.jwt.secret;
    this.jwtExpiresIn = jwtExpiresIn || config.jwt.expiresIn;
    this.refreshSecret = refreshSecret || config.jwt.refreshSecret;
    this.refreshExpiresIn = refreshExpiresIn || config.jwt.refreshExpiresIn;
  }

  /**
   * Generate access token
   */
  generateAccessToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    } as jwt.SignOptions);
  }

  /**
   * Generate refresh token
   */
  generateRefreshToken(payload: JWTPayload): string {
    return jwt.sign(payload, this.refreshSecret, {
      expiresIn: this.refreshExpiresIn,
    } as jwt.SignOptions);
  }

  /**
   * Generate both access and refresh tokens
   */
  generateTokens(payload: JWTPayload): TokenResponse {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  /**
   * Verify access token
   */
  verifyAccessToken(token: string): JWTPayload {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as JWTPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Access token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Invalid access token');
      }
      throw new UnauthorizedError('Token verification failed');
    }
  }

  /**
   * Verify refresh token
   */
  verifyRefreshToken(token: string): JWTPayload {
    try {
      const decoded = jwt.verify(token, this.refreshSecret) as JWTPayload;
      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthorizedError('Refresh token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthorizedError('Invalid refresh token');
      }
      throw new UnauthorizedError('Token verification failed');
    }
  }

  /**
   * Decode token without verification (useful for debugging)
   */
  decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch {
      return null;
    }
  }
}

// Export singleton instance for convenience
export const jwtUtil = new JWTUtil();
