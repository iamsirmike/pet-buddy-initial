import resetPasswordSchema from "../schemas/resetPassword.schema.js";
import generatedId from "../utils/otpGeneration.js";
import { sendVerificationEmail } from "../utils/sendEmailVerification.js";

async function saveResetPasswordData({ userId, email, otp }) {
  await resetPasswordSchema.findOneAndUpdate(
    {
      userId: userId,
    },
    {
      userId: userId,
      email: email,
      resetPasswordCode: otp,
    },
    { upsert: true }
  );
}

async function checkIfResetDataExit(userId) {
  return await resetPasswordSchema.findOne({
    userId: userId,
  });
}

async function requestResetPasswordCode(user) {
  const otp = await generatedId();

  //send verification email to user
  await sendVerificationEmail({
    name: user.username,
    email: user.email,
    verificationToken: otp,
  });

  return otp;
}

export default {
  requestResetPasswordCode,
  saveResetPasswordData,
  checkIfResetDataExit,
};
