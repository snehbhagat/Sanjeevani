import { Router } from 'express';
import { body } from 'express-validator';
import { createRequest, listRequests } from '../controllers/request.controller.js';
import pagination from '../middleware/pagination.js';

const router = Router();

router.post(
  '/',
  [
    body('patientName').trim().notEmpty(),
    body('bloodGroup').isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    body('urgency').optional().isIn(['low', 'medium', 'high']),
    body('hospital').trim().notEmpty(),
    body('contact').trim().notEmpty(),
  ],
  createRequest
);

router.get('/', pagination(10, 50), listRequests);

export default router;
