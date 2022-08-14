import shortId from "short-uuid";
import accountDb from "../schemas/account.schema.js";
import verification from "../schemas/verification.schema.js";
import generatedId from "../utils/otpGeneration.js";

import { sendVerificationEmail } from "../utils/sendEmailVerification.js";

async function checkIfUserExist(username) {
  return await accountDb.findOne({
    username: username,
  });
}

async function createAccount(data) {
  const accountData = Object.assign(data, {
    userId: shortId.generate(),
  });
  const account = await accountDb.create(accountData);
  return account;
}

async function saveOtp(userId, otp) {
  await verification.findOneAndUpdate(
    { userId: userId },
    {
      userId: userId,
      otp: otp,
    },
    { upsert: true }
  );
}

async function findUserToVerify(userId) {
  return verification.findOne({
    userId: userId,
  });
}

async function sendAccountVerificationCode(user) {
  //generate otp verification
  const otp = await generatedId();
  //save otp details
  await saveOtp(user.userId, otp);

  //send verification email to user
  await sendVerificationEmail({
    name: user.username,
    email: user.email,
    verificationToken: otp,
  });

  return otp;
}

async function verifyAccount(data) {
  try {
    const account = await accountDb.updateOne(
      {
        userId: data.userId,
      },
      {
        isVerified: true,
      }
    );
    return account;
  } catch (error) {
    throw new Error(error);
  }
}

async function updatePassword({ userId, password }) {
  try {
    const account = await accountDb.updateOne(
      {
        userId: userId,
      },
      {
        password: password,
      }
    );
    return account;
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  checkIfUserExist,
  createAccount,
  verifyAccount,
  saveOtp,
  findUserToVerify,
  sendAccountVerificationCode,
  updatePassword,
};
