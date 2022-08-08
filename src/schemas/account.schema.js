import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export default mongoose.model("Account", accountSchema);
