import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from '../src/config/db.js';
import User from '../src/models/User.js';
import Donor from '../src/models/Donor.js';
import PatientRequest from '../src/models/PatientRequest.js';
import { encrypt } from '../src/utils/crypto.js';

const run = async () => {
  await connectDB(process.env.MONGO_URI);
  console.log('Seeding sample data...');

  await Promise.all([User.deleteMany({}), Donor.deleteMany({}), PatientRequest.deleteMany({})]);

  const alice = await User.create({ name: 'Alice', email: 'alice@example.com', password: 'password123' });
  const bob = await User.create({ name: 'Bob', email: 'bob@example.com', password: 'password123' });

  await Donor.create([
    { user: alice._id, name: 'Alice', email: 'alice@example.com', bloodGroup: 'A+', location: 'Delhi', availability: true, contact: encrypt('999-111-222') },
    { user: bob._id, name: 'Bob', email: 'bob@example.com', bloodGroup: 'O-', location: 'Mumbai', availability: true, contact: encrypt('999-333-444') },
  ]);

  await PatientRequest.create([
    { patientName: 'Rahul', bloodGroup: 'O-', urgency: 'high', hospital: 'AIIMS Delhi', contact: encrypt('rahul: 888-000-111') },
    { patientName: 'Priya', bloodGroup: 'A+', urgency: 'medium', hospital: 'Fortis Mumbai', contact: encrypt('priya: 777-123-456') },
  ]);

  console.log('Done.');
  await mongoose.connection.close();
};

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
