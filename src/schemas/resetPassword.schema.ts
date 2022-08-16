import mongoose from "mongoose";

const resetPasswordSchema = new mongoose.Schema<SaveResetData>({
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

export class SaveResetData {
  userId: string;
  email: string;
  resetPasswordCode: string;
}

export class RequestResetData {
  username: string;
  email: string;
}

export default mongoose.model("resetpassword", resetPasswordSchema);
