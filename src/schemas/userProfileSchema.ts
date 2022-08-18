import mongoose from "mongoose";
import { UserProfileData } from "../interfaces/userProfileInterface";

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
    unique: true,
    ref: "Account",
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export default mongoose.model<UserProfileData>("Profile", userProfileSchema);
