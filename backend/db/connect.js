import mongoose from 'mongoose';

const connectDb = url => {
  mongoose.set('strictQuery', true);
  return mongoose.connect(url);
};

export default connectDb;
