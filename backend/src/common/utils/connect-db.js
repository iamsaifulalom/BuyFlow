import mongoose from "mongoose";
import "dotenv/config";

export async function connectDB() {
    const state = mongoose.connection.readyState;

    // 1 = connected, 2 = connecting
    if (state === 1) {
        console.log("DB already connected");
        return;
    }

    if (state === 2) {
        console.log("DB connection in progress");
        return;
    }

    try {
        await mongoose.connect(process.env.DATABASE_URL, { autoIndex: false });
        console.log("DB connected successfully");
    } catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1); // fail fast
    }
}
