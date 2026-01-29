export const userPaths = {
  '/api/v1/users': {
    get: {
      summary: 'Get all users',
      description: 'Retrieve a list of all users (admin only)',
      tags: ['Users'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'Users retrieved successfully',
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
                    type: 'array',
                    items: {
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
        },
        '401': {
          description: 'Unauthorized',
        },
        '403': {
          description: 'Forbidden - Admin access required',
        },
      },
    },
  },
  '/api/v1/users/{id}': {
    get: {
      summary: 'Get user by ID',
      description: 'Retrieve a specific user by their ID',
      tags: ['Users'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'User ID',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
      ],
      responses: {
        '200': {
          description: 'User retrieved successfully',
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
        },
        '404': {
          description: 'User not found',
        },
      },
    },
    delete: {
      summary: 'Delete user',
      description: 'Delete a user by their ID (admin only)',
      tags: ['Users'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'User ID',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
      ],
      responses: {
        '200': {
          description: 'User deleted successfully',
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
                    example: 'User deleted successfully',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
        '403': {
          description: 'Forbidden - Admin access required',
        },
        '404': {
          description: 'User not found',
        },
      },
    },
  },
  '/api/v1/users/profile': {
    put: {
      summary: 'Update user profile',
      description: 'Update the authenticated user profile',
      tags: ['Users'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                firstName: {
                  type: 'string',
                  example: 'John',
                },
                lastName: {
                  type: 'string',
                  example: 'Doe',
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
        '200': {
          description: 'Profile updated successfully',
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
                    example: 'Profile updated successfully',
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
                    },
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
        '422': {
          description: 'Validation error',
        },
      },
    },
  },
  '/api/v1/users/change-password': {
    put: {
      summary: 'Change user password',
      description: 'Change the password for the authenticated user',
      tags: ['Users'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: ['currentPassword', 'newPassword'],
              properties: {
                currentPassword: {
                  type: 'string',
                  format: 'password',
                  example: 'OldPass123!',
                },
                newPassword: {
                  type: 'string',
                  format: 'password',
                  minLength: 6,
                  example: 'NewPass123!',
                },
              },
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Password changed successfully',
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
                    example: 'Password changed successfully',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized or invalid current password',
        },
        '422': {
          description: 'Validation error',
        },
      },
    },
  },
  '/api/v1/users/deactivate': {
    delete: {
      summary: 'Deactivate user account',
      description: 'Deactivate the authenticated user account',
      tags: ['Users'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      responses: {
        '200': {
          description: 'Account deactivated successfully',
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
                    example: 'Account deactivated successfully',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
      },
    },
  },
  '/api/v1/users/{id}/activate': {
    put: {
      summary: 'Activate user account',
      description: 'Activate a user account by ID (admin only)',
      tags: ['Users'],
      security: [
        {
          BearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
          description: 'User ID',
          example: '123e4567-e89b-12d3-a456-426614174000',
        },
      ],
      responses: {
        '200': {
          description: 'Account activated successfully',
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
                    example: 'Account activated successfully',
                  },
                },
              },
            },
          },
        },
        '401': {
          description: 'Unauthorized',
        },
        '403': {
          description: 'Forbidden - Admin access required',
        },
        '404': {
          description: 'User not found',
        },
      },
    },
  },
};
