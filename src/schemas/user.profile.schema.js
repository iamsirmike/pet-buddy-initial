import mongoose from "mongoose";

const userProfileSchema = mongoose.Schema({
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

export default mongoose.model("Profile", userProfileSchema);
