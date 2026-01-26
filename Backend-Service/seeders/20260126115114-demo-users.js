'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Seed demo users for development and testing
     *
     * Password for all demo users: "Password123"
     */
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('Password123', saltRounds);
    const now = new Date();

    await queryInterface.bulkInsert(
      'users',
      [
        {
          email: 'admin@salon.com',
          password: hashedPassword,
          first_name: 'Admin',
          last_name: 'User',
          phone: '+1234567890',
          role: 'admin',
          is_active: true,
          last_login_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          email: 'john.doe@example.com',
          password: hashedPassword,
          first_name: 'John',
          last_name: 'Doe',
          phone: '+1234567891',
          role: 'customer',
          is_active: true,
          last_login_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          email: 'jane.smith@example.com',
          password: hashedPassword,
          first_name: 'Jane',
          last_name: 'Smith',
          phone: '+1234567892',
          role: 'customer',
          is_active: true,
          last_login_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          email: 'bob.wilson@example.com',
          password: hashedPassword,
          first_name: 'Bob',
          last_name: 'Wilson',
          phone: '+1234567893',
          role: 'customer',
          is_active: true,
          last_login_at: null,
          created_at: now,
          updated_at: now,
        },
        {
          email: 'alice.brown@example.com',
          password: hashedPassword,
          first_name: 'Alice',
          last_name: 'Brown',
          phone: null, // Optional phone number
          role: 'customer',
          is_active: false, // Inactive user for testing
          last_login_at: null,
          created_at: now,
          updated_at: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Remove all demo users by email
     */
    await queryInterface.bulkDelete('users', {
      email: {
        [Sequelize.Op.in]: [
          'admin@salon.com',
          'john.doe@example.com',
          'jane.smith@example.com',
          'bob.wilson@example.com',
          'alice.brown@example.com',
        ],
      },
    });
  },
};
