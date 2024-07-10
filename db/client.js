const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }
    await mongoose.connect(uri);
    console.log(`Connected to MongoDB: ${uri}`);
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit();
  }
};

module.exports = connectDB;
