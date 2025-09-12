import { Router } from 'express';
import { prisma } from '../prismaClient.js';

const router = Router();

router.get('/api/blood-inventory', async (_req, res) => {
  const inventory = await prisma.bloodInventory.findMany();
  res.json({
    inventory: inventory.map(i => ({
      blood_group: i.bloodGroup,
      units: i.units
    }))
  });
});

export default router;