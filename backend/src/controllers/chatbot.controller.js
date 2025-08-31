import { validationResult } from 'express-validator';

export const chatbotReply = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { question } = req.body;
    const lower = (question || '').toLowerCase();
    let answer = 'For FAQs about blood donation, please contact your local blood bank.';
    if (lower.includes('eligib')) answer = 'Eligibility varies; generally healthy adults 18-65 can donate.';
    if (lower.includes('interval') || lower.includes('often')) answer = 'Typical interval is 56 days between whole-blood donations.';
    if (lower.includes('thalassemia')) answer = 'Thalassemia patients often require regular transfusions; finding compatible donors is vital.';
    res.json({ answer });
  } catch (err) {
    next(err);
  }
};
