import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
import { encrypt } from '../src/encryption.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Donors
  const donors = [
    { id: 'D0001', bloodGroup: 'O+', location: 'Mumbai', gender: 'male', age: 29, donorType: 'regular' },
    { id: 'D0002', bloodGroup: 'A+', location: 'Delhi', gender: 'female', age: 34, donorType: 'occasional' },
    { id: 'D0003', bloodGroup: 'B+', location: 'Kolkata', gender: 'male', age: 41, donorType: 'first_time' },
    { id: 'D0004', bloodGroup: 'AB+', location: 'Chennai', gender: 'female', age: 23, donorType: 'regular' }
  ];

  for (const d of donors) {
    await prisma.donor.upsert({
      where: { id: d.id },
      update: {},
      create: d
    });
  }

  // Blood inventory
  const inventory = [
    { bloodGroup: 'O+', units: 25 },
    { bloodGroup: 'A+', units: 18 },
    { bloodGroup: 'B+', units: 12 },
    { bloodGroup: 'AB+', units: 6 },
    { bloodGroup: 'O-', units: 8 }
  ];
  for (const i of inventory) {
    await prisma.bloodInventory.upsert({
      where: { bloodGroup: i.bloodGroup },
      update: { units: i.units },
      create: i
    });
  }

  // Badges
  const badges = [
    { name: 'First Donation', description: 'Completed first donation', points: 100, imagePath: '/badges/first.png' },
    { name: '5 Donations', description: 'Completed 5 donations', points: 250, imagePath: '/badges/5.png' },
    { name: '10 Donations', description: 'Completed 10 donations', points: 500, imagePath: '/badges/10.png' },
    { name: 'Streak 3', description: '3 consecutive donations', points: 150, imagePath: '/badges/streak3.png' }
  ];
  for (const b of badges) {
    await prisma.badge.upsert({
      where: { id: badges.indexOf(b) + 1 },
      update: {},
      create: b
    });
  }

  // Demo user
  const emailEncrypted = encrypt('demo@example.com');
  await prisma.user.upsert({
    where: { userId: 'U1001' },
    update: {},
    create: {
      userId: 'U1001',
      name: 'Demo User',
      emailEncrypted
    }
  });

  // Some donor historical donations for prediction
  await prisma.donation.createMany({
    data: [
      { donorId: 'D0001', date: dayjs().subtract(60, 'day').toDate() },
      { donorId: 'D0001', date: dayjs().subtract(120, 'day').toDate() },
      { donorId: 'D0002', date: dayjs().subtract(200, 'day').toDate() }
    ],
  });

  console.log('Seed complete.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });