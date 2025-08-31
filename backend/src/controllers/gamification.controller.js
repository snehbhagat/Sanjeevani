export const getGamification = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const data = {
      userId,
      points: 1200,
      rank: 'Silver',
      badges: ['First Donation', 'Helper', 'Community Star'],
      donationStreakDays: 5,
    };
    res.json(data);
  } catch (err) {
    next(err);
  }
};
