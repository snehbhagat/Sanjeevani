import { Router } from 'express';
import { body } from 'express-validator';
import { createRequest, listRequests } from '../controllers/request.controller.js';

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

router.get('/', listRequests);

export default router;
