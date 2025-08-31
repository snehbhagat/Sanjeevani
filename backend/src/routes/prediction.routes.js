import { Router } from 'express';
import { param } from 'express-validator';
import { donorAvailability } from '../controllers/prediction.controller.js';

const router = Router();

router.get('/donor/:id', [param('id').isString().trim()], donorAvailability);

export default router;
