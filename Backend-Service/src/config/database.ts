import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

const dbConfig = {
  host: (isTest ? process.env.TEST_DB_HOST : process.env.DB_HOST) || 'localhost',
  port: parseInt((isTest ? process.env.TEST_DB_PORT : process.env.DB_PORT) || '5432'),
  database: (isTest ? process.env.TEST_DB_NAME : process.env.DB_NAME) || 'salon_booking',
  username: (isTest ? process.env.TEST_DB_USER : process.env.DB_USER) || 'postgres',
  password: (isTest ? process.env.TEST_DB_PASSWORD : process.env.DB_PASSWORD) || 'Naga@110197',
  dialect: 'postgres' as const,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
  },
};

// Initialize Sequelize instance
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
    define: dbConfig.define,
  }
);

// Test database connection
export const testConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export { sequelize };
export default sequelize;
