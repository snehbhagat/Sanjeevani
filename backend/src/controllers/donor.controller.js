import { validationResult } from 'express-validator';
import Donor from '../models/Donor.js';
import { encrypt } from '../utils/crypto.js';

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

    res.status(201).json({
      id: donor._id,
      name: donor.name,
      email: donor.email,
      bloodGroup: donor.bloodGroup,
      location: donor.location,
      availability: donor.availability,
    });
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
    const donors = await Donor.find(filter).sort({ createdAt: -1 }).limit(200);
    const data = donors.map((d) => ({
      id: d._id,
      name: d.name,
      email: d.email,
      bloodGroup: d.bloodGroup,
      location: d.location,
      availability: d.availability,
      // contact excluded from list for privacy
    }));
    res.json(data);
  } catch (err) {
    next(err);
  }
};
