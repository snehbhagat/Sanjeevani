import mongoose from 'mongoose';

const connectDB = async (uri) => {
  if (!uri) throw new Error('MONGO_URI is not set');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    autoIndex: true,
  });
  console.log('MongoDB connected');
};

export default connectDB;
