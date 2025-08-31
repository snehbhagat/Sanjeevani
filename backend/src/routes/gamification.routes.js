import { Router } from 'express';
import { param } from 'express-validator';
import { getGamification } from '../controllers/gamification.controller.js';

const router = Router();

router.get('/:userId', [param('userId').isString().trim()], getGamification);

export default router;
