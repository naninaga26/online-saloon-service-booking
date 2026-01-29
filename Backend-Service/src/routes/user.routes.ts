import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateBody } from '../middlewares/validation.middleware';
import { updateProfileSchema, changePasswordSchema } from '../schemas/auth.schema';

const router = Router();

/**
 * @route   GET /api/v1/users
 * @desc    Get all users (admin only)
 * @access  Private (Admin)
 */
router.get(
  '/',
  authMiddleware.authenticate,
  authMiddleware.authorize('admin'),
  userController.getAllUsers
);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get('/:id', authMiddleware.authenticate, userController.getUserById);

/**
 * @route   PUT /api/v1/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  '/profile',
  authMiddleware.authenticate,
  validateBody(updateProfileSchema),
  userController.updateProfile
);

/**
 * @route   PUT /api/v1/users/change-password
 * @desc    Change user password
 * @access  Private
 */
router.put(
  '/change-password',
  authMiddleware.authenticate,
  validateBody(changePasswordSchema),
  userController.changePassword
);

/**
 * @route   DELETE /api/v1/users/deactivate
 * @desc    Deactivate user account
 * @access  Private
 */
router.delete(
  '/deactivate',
  authMiddleware.authenticate,
  userController.deactivateAccount
);

/**
 * @route   PUT /api/v1/users/:id/activate
 * @desc    Activate user account (admin only)
 * @access  Private (Admin)
 */
router.put(
  '/:id/activate',
  authMiddleware.authenticate,
  authMiddleware.authorize('admin'),
  userController.activateAccount
);

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete user (admin only)
 * @access  Private (Admin)
 */
router.delete(
  '/:id',
  authMiddleware.authenticate,
  authMiddleware.authorize('admin'),
  userController.deleteUser
);

export default router;
