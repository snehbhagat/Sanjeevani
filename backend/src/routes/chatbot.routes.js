import { Router } from 'express';
import { body } from 'express-validator';
import { chatbotReply } from '../controllers/chatbot.controller.js';

const router = Router();

router.post('/', [body('question').trim().notEmpty()], chatbotReply);

export default router;
