import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URI;

// Define interface for caching Mongoose connection and promise
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Initialize cached Mongoose connection object
let cached: MongooseConnection = (global as any).mongoose;

// If cached connection object doesn't exist, initialize it
if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export const connectToDatabase = async () => {
  // Check if Mongoose connection object is already cached, if so, return it for optimization
  if (cached.conn) return cached.conn;

  // If MongoDB connection URL is not defined, throw an error
  if (!MONGODB_URL) throw new Error("MONGODB_URL is not defined");

  // If Mongoose promise is not cached, establish database connection and cache the promise
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "Image Generator", // Specify database name
      bufferCommands: false, // Disable buffering commands
    });

  // Await Mongoose promise to resolve to Mongoose connection object and cache it
  cached.conn = await cached.promise;

  return cached.conn;
};
