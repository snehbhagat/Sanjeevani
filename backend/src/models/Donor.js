import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, index: true },
    bloodGroup: { type: String, required: true, enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] },
    location: { type: String, required: true },
    availability: { type: Boolean, default: true },
    contact: { type: String }, // encrypted
  },
  { timestamps: true }
);

donorSchema.index({ bloodGroup: 1, location: 1 });

export default mongoose.model('Donor', donorSchema);
