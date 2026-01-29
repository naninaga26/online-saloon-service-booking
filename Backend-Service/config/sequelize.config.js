/**
 * Sequelize CLI Configuration
 *
 * This file is specifically for Sequelize CLI commands:
 * - npm run migrate (sequelize-cli db:migrate)
 * - npm run migrate:undo (sequelize-cli db:migrate:undo)
 * - npm run seed (sequelize-cli db:seed:all)
 *
 * For application runtime database connection, see: src/config/database.ts
 *
 * Referenced by: .sequelizerc
 */

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'salon_booking',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: console.log,
  },
  test: {
    username: process.env.TEST_DB_USER || process.env.DB_USER || 'postgres',
    password: process.env.TEST_DB_PASSWORD || process.env.DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'salon_booking_test',
    host: process.env.TEST_DB_HOST || process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.TEST_DB_PORT || process.env.DB_PORT || '5432'),
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
};
