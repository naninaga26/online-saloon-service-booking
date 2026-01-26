// Example test file - demonstrates testing patterns

describe('Example Test Suite', () => {
  describe('Basic Tests', () => {
    it('should pass a simple test', () => {
      expect(true).toBe(true);
    });

    it('should perform arithmetic correctly', () => {
      const result = 2 + 2;
      expect(result).toBe(4);
    });
  });

  describe('Async Tests', () => {
    it('should handle async operations', async () => {
      const promise = Promise.resolve('success');
      const result = await promise;
      expect(result).toBe('success');
    });
  });
});

// Example: Testing a service
// describe('UserService', () => {
//   describe('createUser', () => {
//     it('should create a new user', async () => {
//       // Arrange
//       const userData = { email: 'test@example.com', password: 'password123' };
//
//       // Act
//       const result = await UserService.createUser(userData);
//
//       // Assert
//       expect(result).toBeDefined();
//       expect(result.email).toBe(userData.email);
//     });
//   });
// });
