import { validationResult } from 'express-validator';
import Donor from '../models/Donor.js';
import { encrypt } from '../utils/crypto.js';
import { linkBuilder, sendSuccess } from '../utils/response.js';
import { toDonorJSON, toDonorsList } from '../views/donor.view.js';

export const createDonor = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, email, bloodGroup, location, availability, contact } = req.body;
    const donor = await Donor.create({
      user: req.user.id,
      name,
      email,
      bloodGroup,
      location,
      availability,
      contact: contact ? encrypt(contact) : undefined,
    });
    return sendSuccess(res, toDonorJSON(donor), { status: 201, message: 'Donor created' }, req);
  } catch (err) {
    next(err);
  }
};

export const getDonors = async (req, res, next) => {
  try {
    const { bloodGroup, location } = req.query;
    const filter = {};
    if (bloodGroup) filter.bloodGroup = bloodGroup;
    if (location) filter.location = new RegExp(location, 'i');
    const { page = 1, limit = 10, skip = 0, sort = '-createdAt' } = req.page || {};
    const [docs, total] = await Promise.all([
      Donor.find(filter).sort(sort).skip(skip).limit(limit),
      Donor.countDocuments(filter),
    ]);
    const data = toDonorsList(docs);
    const links = linkBuilder(req.originalUrl, { page, limit }, total);
    return sendSuccess(res, data, { message: 'Donors retrieved', meta: { total, page, limit }, links }, req);
  } catch (err) {
    next(err);
  }
};
