import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pms', {
      serverSelectionTimeoutMS: 30000, // Wait 30 seconds for server selection
      socketTimeoutMS: 45000, // Wait 45 seconds for socket response
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
