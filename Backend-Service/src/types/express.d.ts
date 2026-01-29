import { JWTPayload } from '../utils/jwt';

/**
 * Extend Express Request to include user property
 */
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

export {};
