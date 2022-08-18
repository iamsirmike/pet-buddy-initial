import shortId from "short-uuid";
import { AccountData } from "../interfaces/accountInterface";
import accountDb from "../schemas/account.schema";
import verification from "../schemas/verification.schema";
import { generatedId } from "../utils/otpGeneration";

import { sendVerificationEmail } from "../utils/sendEmailVerification";

export const checkIfUserExist = async(username:string) =>{
  return await accountDb.findOne({
    username: username,
  });
}

export const createAccount = async(data:AccountData) => {
  const accountData: AccountData = Object.assign(data, {
    userId: shortId.generate(),
  });
  const account = await accountDb.create(accountData);
  return account;
}

export const saveOtp = async(userId:string, otp:string) => {
  await verification.findOneAndUpdate(
    { userId: userId },
    {
      userId: userId,
      otp: otp,
    },
    { upsert: true }
  );
}

export const findUserToVerify = async(userId:string)=> {
  return verification.findOne({
    userId: userId,
  });
}


export const sendAccountVerificationCode = async(user:AccountData) => {
  //generate otp verification
  const otp = await generatedId();
  //save otp details
  await saveOtp(user.userId, otp);

  //send verification email to user
  await sendVerificationEmail(
   user.username,
   user.email,
   otp,
  );

  return otp;
}


export const verifyAccount = async(data:AccountData) => {
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
  } catch (error:any) {
    throw new Error(error);
  }
}

export const updatePassword = async(userId:string, password:string) =>{
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
  } catch (error:any) {
    throw new Error(error);
  }
}