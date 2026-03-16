const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanager';
  const maxRetries = Number(process.env.MONGODB_MAX_RETRIES || 10);
  const retryDelayMs = Number(process.env.MONGODB_RETRY_DELAY_MS || 5000);

  let attempt = 0;
  // Keep the process alive on Render; retry instead of exiting.
  // Render will restart the service if it truly can't recover.
  while (true) {
    try {
      attempt += 1;
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      console.error(`MongoDB connection error (attempt ${attempt}):`, error.message);
      if (attempt >= maxRetries) {
        // Don't exit; let the server run and health endpoint show DB is down.
        return null;
      }
      await new Promise((r) => setTimeout(r, retryDelayMs));
    }
  }
};

module.exports = connectDB;
