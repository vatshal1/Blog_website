import mongoose from "mongoose";

async function connectDB() {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected!!!!");
    });

    const connection = await mongoose.connect(process.env.MONGODB_URI);

    return connection;
  } catch (error) {
    console.log("MongoDB connection error: ", error.message);
    process.exit(1);
  }
}

export default connectDB;
