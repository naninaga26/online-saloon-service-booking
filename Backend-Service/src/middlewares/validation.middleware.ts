import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError, ZodIssue } from 'zod';
import { StatusCodes } from 'http-status-codes';

/**
 * Validation middleware factory for Zod schemas
 * Validates request body, query, and params against provided schemas
 */
export const validate = (schema: {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
}) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate body if schema provided
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }

      // Validate query params if schema provided
      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query);
      }

      // Validate route params if schema provided
      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = formatZodErrors(error.issues);

        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: 'Validation failed',
          errors: formattedErrors,
        });
        return;
      }

      // Pass other errors to global error handler
      return next(error);
    }
  };
};

/**
 * Format Zod validation errors into user-friendly messages
 */
const formatZodErrors = (issues: ZodIssue[]) => {
  return issues.map((issue) => ({
    field: issue.path.join('.'),
    message: issue.message,
    code: issue.code,
  }));
};

/**
 * Shorthand for validating only the request body
 */
export const validateBody = (schema: AnyZodObject) => {
  return validate({ body: schema });
};

/**
 * Shorthand for validating only query parameters
 */
export const validateQuery = (schema: AnyZodObject) => {
  return validate({ query: schema });
};

/**
 * Shorthand for validating only route parameters
 */
export const validateParams = (schema: AnyZodObject) => {
  return validate({ params: schema });
};
