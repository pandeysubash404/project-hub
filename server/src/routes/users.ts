import express from 'express';

import usersController from 'controllers/users';
import {
  loginSchema,
  registerSchema,
  updateUserOrgSchema,
  updateUserProfileSchema,
} from 'lib/zod';
import { validate } from 'middleware/validate';
import { verifyToken } from 'middleware/verifyToken';

const router = express.Router();

// POST /api/users/register
router.post(
  '/register',
  validate(registerSchema),
  usersController.registerUser
);

// POST /api/users/login
router.post('/login', validate(loginSchema), usersController.loginUser);

// GET /api/users/:userId
router.get("/:userId([0-9a-fA-F]{24})", verifyToken(), usersController.getUserById);

// GET /api/users/users
router.get('/users', usersController.getallUser);

// DELETE /api/users/:userId
router.delete("/:userId([0-9a-fA-F]{24})", verifyToken(), usersController.deleteUser);

// PATCH /api/users/:userId/orgs
router.patch(
  '/:userId/orgs',
  verifyToken(),
  validate(updateUserOrgSchema),
  usersController.updateUserOrgs
);

// PATCH /api/users/:userId/profile
router.patch(
  '/:userId/profile',
  verifyToken(),
  validate(updateUserProfileSchema),
  usersController.updateUserProfile
);

// PATCH /api/users/:userId/role
router.patch('/:userId/role', verifyToken(), usersController.updateUserRole);

// POST /api/users/demo
router.post('/demo', usersController.createDemoAccount);

export default router;
