import mongoose from "mongoose";
import { UserProfileData } from "../interfaces/userProfileInterface";

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
    unique: true,
    ref: "Account",
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export default mongoose.model<UserProfileData>("Profile", userProfileSchema);
