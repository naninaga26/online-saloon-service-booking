import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';
import config from '../config/environment';
import { UserAttributes, UserCreationAttributes } from '../types';

/**
 * User model class
 */
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: number;
  declare email: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare phone?: string;
  declare role: 'customer' | 'admin';
  declare isActive: boolean;
  declare lastLoginAt?: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  /**
   * Helper method to get user's full name
   */
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  /**
   * Helper method to check if user is admin
   */
  get isAdmin(): boolean {
    return this.role === 'admin';
  }

  /**
   * Compare password with hashed password
   */
  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }

  /**
   * Get user data without sensitive information
   */
  toSafeObject(): Omit<UserAttributes, 'password'> {
    const { password, ...safeUser } = this.toJSON();
    return safeUser;
  }
}

// Initialize User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Must be a valid email address',
        },
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: {
          args: [8, 255],
          msg: 'Password must be at least 8 characters long',
        },
      },
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'first_name',
      validate: {
        notEmpty: {
          msg: 'First name cannot be empty',
        },
        len: {
          args: [2, 50],
          msg: 'First name must be between 2 and 50 characters',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'last_name',
      validate: {
        notEmpty: {
          msg: 'Last name cannot be empty',
        },
        len: {
          args: [2, 50],
          msg: 'Last name must be between 2 and 50 characters',
        },
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      validate: {
        is: {
          args: /^\+?[1-9]\d{1,14}$/,
          msg: 'Phone number must be in valid international format',
        },
      },
    },
    role: {
      type: DataTypes.ENUM('customer', 'admin'),
      allowNull: false,
      defaultValue: 'customer',
      validate: {
        isIn: {
          args: [['customer', 'admin']],
          msg: 'Role must be either customer or admin',
        },
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      field: 'is_active',
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login_at',
    },
  },
  {
    sequelize,
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
    underscored: true,
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
      {
        fields: ['role'],
      },
      {
        fields: ['is_active'],
      },
    ],
    hooks: {
      /**
       * Hash password before creating user
       */
      beforeCreate: async (user: User) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(config.security.bcryptSaltRounds);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
      /**
       * Hash password before updating user if password changed
       */
      beforeUpdate: async (user: User) => {
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(config.security.bcryptSaltRounds);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
