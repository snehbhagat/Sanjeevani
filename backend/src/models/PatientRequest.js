import mongoose from 'mongoose';

const patientRequestSchema = new mongoose.Schema(
  {
    patientName: { type: String, required: true, trim: true },
    bloodGroup: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    hospital: { type: String, required: true },
    contact: { type: String, required: true }, // encrypted
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

patientRequestSchema.index({ active: 1, bloodGroup: 1 });

export default mongoose.model('PatientRequest', patientRequestSchema);
