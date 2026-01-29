import User from '../models/User.model';
import { JWTUtil, TokenResponse, JWTPayload } from '../utils/jwt';
import { ConflictError, UnauthorizedError, BadRequestError } from '../utils/errors';
import { RegisterInput, LoginInput } from '../schemas/auth.schema';
import { UserAttributes } from '../types';

/**
 * Authentication service with dependency injection
 */
export class AuthService {
  constructor(
    private readonly jwtUtil: JWTUtil,
    private readonly userModel: typeof User = User
  ) {}

  /**
   * Register a new user
   */
  async register(data: RegisterInput): Promise<{
    user: Omit<UserAttributes, 'password'>;
    tokens: TokenResponse;
  }> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Create user (password will be hashed by model hook)
    const user = await this.userModel.create({
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      role: 'customer', // Default role
    });

    // Generate tokens
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const tokens = this.jwtUtil.generateTokens(payload);

    // Return user without password
    return {
      user: user.toSafeObject(),
      tokens,
    };
  }

  /**
   * Login user
   */
  async login(data: LoginInput): Promise<{
    user: Omit<UserAttributes, 'password'>;
    tokens: TokenResponse;
  }> {
    // Find user by email
    const user = await this.userModel.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedError('Account is deactivated');
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(data.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Update last login timestamp
    await user.update({ lastLoginAt: new Date() });

    // Generate tokens
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    const tokens = this.jwtUtil.generateTokens(payload);

    return {
      user: user.toSafeObject(),
      tokens,
    };
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    if (!refreshToken) {
      throw new BadRequestError('Refresh token is required');
    }

    // Verify refresh token
    const decoded = this.jwtUtil.verifyRefreshToken(refreshToken);

    // Find user to ensure they still exist and are active
    const user = await this.userModel.findByPk(decoded.userId);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Account is deactivated');
    }

    // Generate new tokens
    const payload: JWTPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
    };

    return this.jwtUtil.generateTokens(payload);
  }

  /**
   * Get current user profile
   */
  async getCurrentUser(userId: number): Promise<Omit<UserAttributes, 'password'>> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new UnauthorizedError('User not found');
    }

    if (!user.isActive) {
      throw new UnauthorizedError('Account is deactivated');
    }

    return user.toSafeObject();
  }
}

// Export singleton instance
import { jwtUtil } from '../utils/jwt';
export const authService = new AuthService(jwtUtil);
