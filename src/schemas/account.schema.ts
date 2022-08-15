import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const accountSchema = new mongoose.Schema<AccountData>({
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
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

//hash the password before saving
// accountSchema.pre("save", async function (next) {
//   const user = this;
//   const hash = await bcrypt.hash(user.password, 10);

//   this.password = hash;
//   return next();
// });

// //hash password before updating password reset
// accountSchema.pre("update", function(next) {
//   const password = this.getUpdate().$set.password;
//   if (!password) {
//       return next();
//   }
//   try {
//       const hash = bcrypt.hash(password, 10);
//       this.getUpdate().$set.password = hash;
//       next();
//   } catch (error) {
//       return next(error);
//   }
// });

export interface AccountData{
  userId: string;
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
}

//check if passwords match
accountSchema.methods.isValidPassword = async function (password:string) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export default mongoose.model("Account", accountSchema);
