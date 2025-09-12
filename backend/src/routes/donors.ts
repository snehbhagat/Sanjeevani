import { Router } from 'express';
import { prisma } from '../prismaClient.js';

const router = Router();

router.get('/api/donors', async (req, res) => {
  const { blood_group, location } = req.query as { blood_group?: string; location?: string };
  const where: any = {};
  if (blood_group) where.bloodGroup = blood_group;
  if (location) where.location = location;
  const donors = await prisma.donor.findMany({ where });
  res.json({
    donors: donors.map(d => ({
      donor_id: d.id,
      blood_group: d.bloodGroup,
      location: d.location,
      gender: d.gender,
      age: d.age,
      donor_type: d.donorType
    })),
    count: donors.length
  });
});

export default router;