/**
 * Central export point for all Sequelize models
 * Import models from here to maintain consistency and manage associations
 */

import sequelize from '../config/database';
import User from './User.model';

// Export individual models
export { User };

// Object containing all models (useful for dynamic access)
const models = {
  User,
};

/**
 * Setup model associations here
 * This function should be called after all models are defined
 */
export const setupAssociations = () => {
  // User associations will be defined here as we add more models
  // Example:
  // User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
  // Booking.belongsTo(User, { foreignKey: 'userId', as: 'user' });
};

// Initialize associations
setupAssociations();

// Export sequelize instance and models
export { sequelize };
export default models;
