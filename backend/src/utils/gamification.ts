import dayjs from 'dayjs';

export function computeLevel(points: number) {
  // simple exponential-ish curve
  let level = 1;
  let threshold = 500;
  while (points >= threshold) {
    level++;
    threshold += 500 * level;
  }
  return { level, nextLevelAt: threshold };
}

export function updateStreak(lastDonation: Date | null, newDonation: Date, currentStreak: number) {
  if (!lastDonation) return { current: 1 };
  const diffDays = dayjs(newDonation).diff(dayjs(lastDonation), 'day');
  if (diffDays <= 45) {
    // assume donation cycle window
    return { current: currentStreak + 1 };
  }
  return { current: 1 };
}