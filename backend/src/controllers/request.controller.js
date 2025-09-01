import { validationResult } from 'express-validator';
import PatientRequest from '../models/PatientRequest.js';
import { encrypt } from '../utils/crypto.js';
import { linkBuilder, sendSuccess } from '../utils/response.js';
import { toRequestJSON, toRequestsList } from '../views/request.view.js';

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
    return sendSuccess(res, toRequestJSON(doc), { status: 201, message: 'Request created' }, req);
  } catch (err) {
    next(err);
  }
};

export const listRequests = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, skip = 0, sort = '-createdAt' } = req.page || {};
    const [docs, total] = await Promise.all([
      PatientRequest.find({ active: true }).sort(sort).skip(skip).limit(limit),
      PatientRequest.countDocuments({ active: true }),
    ]);
    const data = toRequestsList(docs);
    const links = linkBuilder(req.originalUrl, { page, limit }, total);
    return sendSuccess(res, data, { message: 'Requests retrieved', meta: { total, page, limit }, links }, req);
  } catch (err) {
    next(err);
  }
};
