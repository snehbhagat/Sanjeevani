import { predictDonorAvailability } from '../services/prediction.service.js';

export const donorAvailability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await predictDonorAvailability(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
