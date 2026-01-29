export const authPaths = {
  '/api/v1/auth/register': {
    post: {
      summary: 'Register a new user',
      description: 'Create a new user account with email and password',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['firstName', 'lastName', 'email', 'password', 'phone'],
              properties: {
                firstName: {
                  type: 'string',
                  example: 'John',
                },
                lastName: {
                  type: 'string',
                  example: 'Doe',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'john.doe@example.com',
                },
                password: {
                  type: 'string',
                  format: 'password',
                  minLength: 6,
                  example: 'SecurePass123!',
                },
                phone: {
                  type: 'string',
                  example: '+1234567890',
                },
              },
            },
          },
        },
      },
      responses: {
        '201': {
          description: 'User registered successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  message: {
                    type: 'string',
                    example: 'User registered successfully',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      user: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '123e4567-e89b-12d3-a456-426614174000',
                          },
                          firstName: {
                            type: 'string',
                            example: 'John',
                          },
                          lastName: {
                            type: 'string',
                            example: 'Doe',
                          },
                          email: {
                            type: 'string',
                            example: 'john.doe@example.com',
                          },
                          role: {
                            type: 'string',
                            example: 'customer',
                          },
                        },
                      },
                      tokens: {
                        type: 'object',
                        properties: {
                          accessToken: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                          },
                          refreshToken: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '422': {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'Validation failed',
                  },
                  errors: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: {
                          type: 'string',
                          example: 'email',
                        },
                        message: {
                          type: 'string',
                          example: 'Email already exists',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/auth/login': {
    post: {
      summary: 'Login user',
      description: 'Authenticate user with email and password',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['email', 'password'],
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'john.doe@example.com',
                },
                password: {
                  type: 'string',
                  format: 'password',
                  example: 'SecurePass123!',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Login successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  message: {
                    type: 'string',
                    example: 'Login successful',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      user: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            example: '123e4567-e89b-12d3-a456-426614174000',
                          },
                          firstName: {
                            type: 'string',
                            example: 'John',
                          },
                          lastName: {
                            type: 'string',
                            example: 'Doe',
                          },
                          email: {
                            type: 'string',
                            example: 'john.doe@example.com',
                          },
                          role: {
                            type: 'string',
                            example: 'customer',
                          },
                        },
                      },
                      tokens: {
                        type: 'object',
                        properties: {
                          accessToken: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                          },
                          refreshToken: {
                            type: 'string',
                            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Invalid credentials',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'Invalid email or password',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/auth/refresh-token': {
    post: {
      summary: 'Refresh access token',
      description: 'Get a new access token using refresh token',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['refreshToken'],
              properties: {
                refreshToken: {
                  type: 'string',
                  example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Token refreshed successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  message: {
                    type: 'string',
                    example: 'Token refreshed successfully',
                  },
                  data: {
                    type: 'object',
                    properties: {
                      accessToken: {
                        type: 'string',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                      },
                      refreshToken: {
                        type: 'string',
                        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Invalid refresh token',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'Invalid or expired refresh token',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/auth/me': {
    get: {
      summary: 'Get current user profile',
      description: 'Retrieve the authenticated user profile',
      tags: ['Authentication'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'User profile retrieved successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  data: {
                    type: 'object',
                    properties: {
                      id: {
                        type: 'string',
                        example: '123e4567-e89b-12d3-a456-426614174000',
                      },
                      firstName: {
                        type: 'string',
                        example: 'John',
                      },
                      lastName: {
                        type: 'string',
                        example: 'Doe',
                      },
                      email: {
                        type: 'string',
                        example: 'john.doe@example.com',
                      },
                      phone: {
                        type: 'string',
                        example: '+1234567890',
                      },
                      role: {
                        type: 'string',
                        example: 'customer',
                      },
                      isActive: {
                        type: 'boolean',
                        example: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'Unauthorized',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/v1/auth/logout': {
    post: {
      summary: 'Logout user',
      description: 'Logout the authenticated user (client-side token invalidation)',
      tags: ['Authentication'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'Logout successful',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: true,
                  },
                  message: {
                    type: 'string',
                    example: 'Logout successful',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    type: 'boolean',
                    example: false,
                  },
                  message: {
                    type: 'string',
                    example: 'Unauthorized',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
