import { z, ZodError, ZodIssue } from 'zod';

/**
 * Utility functions for working with Zod schemas
 */

/**
 * Safe parse with custom error formatting
 * Returns either the parsed data or formatted errors
 */
export const safeParse = <T>(schema: z.ZodSchema<T>, data: unknown) => {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true as const,
      data: result.data,
    };
  }

  return {
    success: false as const,
    errors: formatZodErrors(result.error.issues),
  };
};

/**
 * Format Zod errors into a more user-friendly structure
 */
export const formatZodErrors = (issues: ZodIssue[]) => {
  return issues.map((issue) => ({
    field: issue.path.join('.') || 'root',
    message: issue.message,
    code: issue.code,
  }));
};

/**
 * Create a custom error message for Zod errors
 */
export const getZodErrorMessage = (error: ZodError): string => {
  const firstError = error.issues[0];
  const field = firstError.path.join('.') || 'field';
  return `${field}: ${firstError.message}`;
};

/**
 * Validate data and throw formatted error if invalid
 * Useful for service layer validation
 */
export const validateOrThrow = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = getZodErrorMessage(error);
      throw new Error(`Validation failed: ${message}`);
    }
    throw error;
  }
};

/**
 * Async version of validateOrThrow
 */
export const validateOrThrowAsync = async <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<T> => {
  try {
    return await schema.parseAsync(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const message = getZodErrorMessage(error);
      throw new Error(`Validation failed: ${message}`);
    }
    throw error;
  }
};

/**
 * Create a partial version of a schema (all fields optional)
 * Useful for update operations
 */
export const makePartial = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => {
  return schema.partial();
};

/**
 * Merge multiple schemas together
 */
export const mergeSchemas = <T extends z.ZodRawShape, U extends z.ZodRawShape>(
  schema1: z.ZodObject<T>,
  schema2: z.ZodObject<U>
) => {
  return schema1.merge(schema2);
};

/**
 * Pick specific fields from a schema
 * Useful for creating DTOs
 *
 * Example:
 * const userSchema = z.object({ name: z.string(), email: z.string(), password: z.string() });
 * const publicUserSchema = pickFields(userSchema, ['name', 'email']);
 */
export const pickFields = <T extends z.ZodRawShape, K extends keyof T>(
  schema: z.ZodObject<T>,
  fields: K[]
) => {
  const pickObject = fields.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {} as any);
  return schema.pick(pickObject);
};

/**
 * Omit specific fields from a schema
 *
 * Example:
 * const userSchema = z.object({ name: z.string(), email: z.string(), password: z.string() });
 * const userWithoutPassword = omitFields(userSchema, ['password']);
 */
export const omitFields = <T extends z.ZodRawShape, K extends keyof T>(
  schema: z.ZodObject<T>,
  fields: K[]
) => {
  const omitObject = fields.reduce((acc, field) => {
    acc[field] = true;
    return acc;
  }, {} as any);
  return schema.omit(omitObject);
};

/**
 * Create a schema for optional query parameters with default values
 */
export const createQueryParamSchema = <T extends z.ZodRawShape>(shape: T) => {
  const transformed: any = {};

  for (const [key, schema] of Object.entries(shape)) {
    if (schema instanceof z.ZodString) {
      transformed[key] = schema.optional();
    } else {
      transformed[key] = schema;
    }
  }

  return z.object(transformed);
};

/**
 * Validate environment variables using Zod
 * Useful for ensuring all required env vars are present
 */
export const validateEnv = <T>(schema: z.ZodSchema<T>, env: Record<string, any>): T => {
  const result = schema.safeParse(env);

  if (!result.success) {
    console.error('❌ Invalid environment variables:');
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    });
    throw new Error('Environment validation failed');
  }

  return result.data;
};

// Type exports for utility functions
export type SafeParseResult<T> =
  | { success: true; data: T }
  | {
      success: false;
      errors: Array<{ field: string; message: string; code: string }>;
    };
