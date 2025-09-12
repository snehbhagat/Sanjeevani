import { Router } from 'express';
import { z } from 'zod';
import dayjs from 'dayjs';
import { prisma } from '../prismaClient.js';
import { requireAuth, AuthedRequest } from '../middleware/auth.js';
import { decrypt, encrypt } from '../encryption.js';
import { computeLevel, updateStreak } from '../utils/gamification.js';

const router = Router();

// Schemas
const registerSchema = z.object({
  user_id: z.string(),
  name: z.string(),
  email: z.string().email()
});

router.post('/api/gamification/users', requireAuth, async (req: AuthedRequest, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: parsed.error.issues.map(i => i.message).join('; ') });
  }
  const { user_id, name, email } = parsed.data;
  const exists = await prisma.user.findUnique({ where: { userId: user_id } });
  if (exists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }
  const emailEncrypted = encrypt(email);
  await prisma.user.create({
    data: {
      userId: user_id,
      name,
      emailEncrypted
    }
  });
  res.status(201).json({ success: true, message: 'User registered successfully' });
});

// Profile
router.get('/api/gamification/users/:user_id/profile', requireAuth, async (req, res) => {
  const { user_id } = req.params;
  const user = await prisma.user.findUnique({
    where: { userId: user_id },
    include: {
      badges: { include: { badge: true } },
      activities: { orderBy: { date: 'desc' }, take: 10 },
      donations: true
    }
  });
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const { level, nextLevelAt } = computeLevel(user.totalPoints);
  // monthly donations
  const monthMap: Record<string, number> = {};
  user.donations.forEach(d => {
    const y = d.date.getFullYear();
    const m = (d.date.getMonth() + 1).toString().padStart(2, '0');
    const key = `${y}-${m}`;
    monthMap[key] = (monthMap[key] || 0) + 1;
  });
  const monthly_donations = Object.entries(monthMap).map(([ym, count]) => {
    const [year, month] = ym.split('-');
    return { count, year, month };
  });
  res.json({
    success: true,
    user_id: user.userId,
    name: user.name,
    total_donations: user.totalDonations,
    total_points: user.totalPoints,
    level,
    current_streak: user.currentStreak,
    longest_streak: user.longestStreak,
    last_donation_date: user.lastDonationDate ? user.lastDonationDate.toISOString() : null,
    badges: user.badges.map(b => ({
      badge_id: b.badgeId,
      name: b.badge.name,
      description: b.badge.description,
      image_path: b.badge.imagePath,
      date_earned: b.dateEarned.toISOString()
    })),
    recent_activities: user.activities.map(a => ({
      activity_type: a.activityType,
      description: a.description,
      points: a.points,
      date: a.date.toISOString()
    })),
    next_level_at: nextLevelAt,
    points_to_next_level: Math.max(nextLevelAt - user.totalPoints, 0),
    monthly_donations
  });
});

// Donation
const donationSchema = z.object({
  donation_date: z.string().datetime().optional()
});

router.post('/api/gamification/users/:user_id/donations', requireAuth, async (req, res) => {
  const { user_id } = req.params;
  const parsed = donationSchema.safeParse(req.body || {});
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: parsed.error.issues.map(i => i.message).join('; ') });
  }
  const donationDate = parsed.data.donation_date ? dayjs(parsed.data.donation_date) : dayjs();
  const user = await prisma.user.findUnique({ where: { userId: user_id } });
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });

  const { current } = updateStreak(user.lastDonationDate || null, donationDate.toDate(), user.currentStreak);
  const newLongest = Math.max(user.longestStreak, current);

  const pointsEarned = 100;
  const newTotalPoints = user.totalPoints + pointsEarned;
  const newTotalDonations = user.totalDonations + 1;

  // Determine badges
  const existingBadges = await prisma.userBadge.findMany({ where: { userId: user_id } });
  const badgeMeta = await prisma.badge.findMany();
  const newlyEarned: { badge_id: number; name: string; points: number }[] = [];
  function earn(name: string) {
    const badge = badgeMeta.find(b => b.name === name);
    if (!badge) return;
    const has = existingBadges.some(b => b.badgeId === badge.id);
    if (!has) newlyEarned.push({ badge_id: badge.id, name: badge.name, points: badge.points });
  }
  if (newTotalDonations === 1) earn('First Donation');
  if (newTotalDonations === 5) earn('5 Donations');
  if (newTotalDonations === 10) earn('10 Donations');
  if (current === 3) earn('Streak 3');

  await prisma.$transaction([
    prisma.userDonation.create({
      data: {
        userId: user_id,
        date: donationDate.toDate()
      }
    }),
    prisma.user.update({
      where: { userId: user_id },
      data: {
        totalDonations: newTotalDonations,
        totalPoints: newTotalPoints,
        currentStreak: current,
        longestStreak: newLongest,
        lastDonationDate: donationDate.toDate()
      }
    }),
    ...newlyEarned.map(b =>
      prisma.userBadge.create({
        data: {
          userId: user_id,
            badgeId: b.badge_id
        }
      })
    )
  ]);

  res.json({
    success: true,
    message: 'Donation recorded successfully',
    new_total_donations: newTotalDonations,
    current_streak: current,
    points_earned: pointsEarned,
    badges_earned: newlyEarned
  });
});

// Activities
const activitySchema = z.object({
  activity_type: z.string(),
  description: z.string(),
  points: z.number().int().optional().default(0),
  activity_date: z.string().datetime().optional()
});

router.post('/api/gamification/users/:user_id/activities', requireAuth, async (req, res) => {
  const { user_id } = req.params;
  const parsed = activitySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ success: false, message: parsed.error.issues.map(i => i.message).join('; ') });
  }
  const { activity_type, description, points, activity_date } = parsed.data;
  const user = await prisma.user.findUnique({ where: { userId: user_id } });
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  const date = activity_date ? new Date(activity_date) : new Date();

  await prisma.$transaction([
    prisma.activity.create({
      data: {
        userId: user_id,
        activityType: activity_type,
        description,
        points,
        date
      }
    }),
    prisma.user.update({
      where: { userId: user_id },
      data: {
        totalPoints: user.totalPoints + points
      }
    })
  ]);

  res.json({
    success: true,
    message: 'Activity recorded successfully',
    points_earned: points
  });
});

// Leaderboard
router.get('/api/gamification/leaderboard', async (req, res) => {
  const limit = parseInt((req.query.limit as string) || '10', 10);
  const users = await prisma.user.findMany({
    orderBy: [{ totalPoints: 'desc' }],
    take: limit
  });
  res.json({
    success: true,
    leaderboard: users.map(u => ({
      user_id: u.userId,
      name: u.name,
      total_donations: u.totalDonations,
      total_points: u.totalPoints,
      level: u.level // static, could sync to computeLevel if desired
    }))
  });
});

// Badges - public
router.get('/api/gamification/badges', async (_req, res) => {
  const badges = await prisma.badge.findMany();
  res.json({
    success: true,
    badges: badges.map(b => ({
      badge_id: b.id,
      name: b.name,
      description: b.description,
      points: b.points,
      image_path: b.imagePath
    }))
  });
});

export default router;