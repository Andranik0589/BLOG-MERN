import { body } from 'express-validator';

export const loginValidation = [body('email').isEmail(), body('password').isLength({ min: 5 })];

export const registerValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
  body('fullName').isLength({ min: 3 }),
  body('avatarUrl').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'type you title article').isLength({ min: 3 }).isString(),
  body('text', 'type text article ').isLength({ min: 5 }).isString(),
  body('tags', 'invalid tag format(specify an array)').optional().isString(),
  body('avatarUrl', ' invalid image link').optional().isString(),
];
