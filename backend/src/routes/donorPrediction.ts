import { Router } from 'express';
import { prisma } from '../prismaClient.js';
import { z } from 'zod';
import dayjs from 'dayjs';

const router = Router();

const predictSchema = z.object({
  donor_id: z.string(),
  model_type: z.enum(['logistic', 'lstm']).optional().default('logistic')
});

function pseudoRandomProbability(id: string, modelType: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  for (let i = 0; i < modelType.length; i++) hash = (hash * 17 + modelType.charCodeAt(i)) >>> 0;
  return (hash % 1000) / 1000; // 0 - 0.999
}

router.post('/api/predict', async (req, res) => {
  const parsed = predictSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.issues.map(i => i.message).join('; ') });
  }
  const { donor_id, model_type } = parsed.data;
  const donor = await prisma.donor.findUnique({
    where: { id: donor_id },
    include: { donations: true }
  });
  if (!donor) {
    return res.status(200).json({
      probability: 0.0,
      available: false,
      next_donation_date: dayjs().add(90, 'day').format('YYYY-MM-DD'),
      donor_type: 'first_time',
      avg_donation_interval_days: null
    });
  }

  const donations = donor.donations.sort((a, b) => a.date.getTime() - b.date.getTime());
  let avgInterval: number | null = null;
  if (donations.length > 1) {
    let total = 0;
    for (let i = 1; i < donations.length; i++) {
      total += dayjs(donations[i].date).diff(dayjs(donations[i - 1].date), 'day');
    }
    avgInterval = Math.round(total / (donations.length - 1));
  }

  const probability = pseudoRandomProbability(donor_id, model_type);
  const available = probability > 0.5;
  const next = donations.length
    ? dayjs(donations[donations.length - 1].date).add(avgInterval || 90, 'day')
    : dayjs().add(60, 'day');

  res.json({
    probability,
    available,
    next_donation_date: next.format('YYYY-MM-DD'),
    donor_type: donor.donorType,
    avg_donation_interval_days: avgInterval
  });
});

export default router;