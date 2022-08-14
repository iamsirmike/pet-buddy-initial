import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    Type: String,
  },
  resetPasswordCode: {
    Type: String,
  },
});

export default mongoose.model("resetpassword", resetPasswordSchema);
