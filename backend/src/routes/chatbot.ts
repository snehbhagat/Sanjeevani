import { Router } from 'express';
import { z } from 'zod';

const router = Router();

const chatSchema = z.object({
  message: z.string(),
  translate: z.boolean().optional().default(true)
});

// simple language detection heuristics for demo (script-based)
function detectLanguage(text: string): string {
  if (/[ऀ-ॿ]/u.test(text)) return 'hi';
  if (/[௰-௿]/u.test(text)) return 'ta';
  if (/[ী-৿]/u.test(text)) return 'bn';
  return 'en';
}

const supportedLanguages: Record<string, string> = {
  en: 'English',
  hi: 'Hindi',
  bn: 'Bengali',
  ta: 'Tamil'
};

// naive knowledge base
function respondEnglish(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('thalassemia')) {
    return 'Thalassemia is an inherited blood disorder causing the body to produce fewer healthy red blood cells.';
  }
  if (q.includes('donate')) {
    return 'Regular blood donation supports patients needing transfusions; ensure adequate hemoglobin before donating.';
  }
  return 'Thank you for your message. Please consult a medical professional for personalized advice.';
}

// dummy translation: in a real setup integrate a translation API
function translateToEnglish(text: string, lang: string): string {
  if (lang === 'en') return text;
  return `[Translated from ${lang}] ${text}`;
}
function translateFromEnglish(text: string, lang: string): string {
  if (lang === 'en') return text;
  // Stub: just prefix
  return `[${lang} translation] ${text}`;
}

router.post('/api/chatbot/chat', (req, res) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues.map(i => i.message).join('; ') });
  }
  const { message, translate } = parsed.data;
  const detected = detectLanguage(message);
  let translated_text: string | undefined;
  let inputEnglish = message;
  if (translate && detected !== 'en') {
    translated_text = translateToEnglish(message, detected);
    inputEnglish = translated_text;
  }
  const response_english = respondEnglish(inputEnglish);
  const response = translate ? translateFromEnglish(response_english, detected) : response_english;

  res.json({
    original_text: message,
    detected_language: detected,
    translated_text,
    response_english,
    response
  });
});

router.get('/api/chatbot/languages', (_req, res) => {
  res.json({
    supported_languages: supportedLanguages
  });
});

export default router;