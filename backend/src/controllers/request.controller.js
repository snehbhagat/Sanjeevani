import { validationResult } from 'express-validator';
import PatientRequest from '../models/PatientRequest.js';
import { encrypt } from '../utils/crypto.js';

export const createRequest = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { patientName, bloodGroup, urgency, hospital, contact } = req.body;
    const doc = await PatientRequest.create({
      patientName,
      bloodGroup,
      urgency,
      hospital,
      contact: encrypt(contact),
    });
    res.status(201).json({
      id: doc._id,
      patientName: doc.patientName,
      bloodGroup: doc.bloodGroup,
      urgency: doc.urgency,
      hospital: doc.hospital,
      active: doc.active,
    });
  } catch (err) {
    next(err);
  }
};

export const listRequests = async (req, res, next) => {
  try {
    const docs = await PatientRequest.find({ active: true }).sort({ createdAt: -1 }).limit(200);
    const data = docs.map((r) => ({
      id: r._id,
      patientName: r.patientName,
      bloodGroup: r.bloodGroup,
      urgency: r.urgency,
      hospital: r.hospital,
      active: r.active,
      createdAt: r.createdAt,
    }));
    res.json(data);
  } catch (err) {
    next(err);
  }
};
