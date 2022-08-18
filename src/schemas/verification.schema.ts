import mongoose from "mongoose";

const verificationSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  otp: {
    type: String,
  },
});

export default mongoose.model("Verification", verificationSchema);
