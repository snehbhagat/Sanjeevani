import { Router } from 'express';
import { body, query } from 'express-validator';
import { createDonor, getDonors } from '../controllers/donor.controller.js';
import auth from '../middleware/auth.js';
import pagination from '../middleware/pagination.js';

const router = Router();

router.post(
  '/',
  auth,
  [
    body('name').trim().notEmpty(),
    body('email').isEmail().normalizeEmail(),
    body('bloodGroup').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    body('location').trim().notEmpty(),
    body('availability').optional().isBoolean(),
    body('contact').optional().trim().isString(),
  ],
  createDonor
);

router.get(
  '/',
  [
    query('bloodGroup').optional().isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    query('location').optional().trim().isString(),
  ],
  pagination(10, 50),
  getDonors
);

export default router;
