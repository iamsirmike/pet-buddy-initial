import shortId from "short-uuid";
import accountDb from "../schemas/account.schema";
import verification from "../schemas/verification.schema";
import { generatedId } from "../utils/otpGeneration";

import { sendVerificationEmail } from "../utils/sendEmailVerification";

 export class AccountModel{

    checkIfUserExist = async(username:string) => {
    return await accountDb.findOne({
      username: username,
    });
  }
  
  //TODO: give data a proper type
    createAccount = async(data:any) =>{
    const accountData: object= Object.assign(data, {
      userId: shortId.generate(),
    });
    const account = await accountDb.create(accountData);
    return account;
  }
  
    saveOtp = async(userId:string, otp:string) => {
    await verification.findOneAndUpdate(
      { userId: userId },
      {
        userId: userId,
        otp: otp,
      },
      { upsert: true }
    );
  }
  
    findUserToVerify = async(userId:string) => {
    return verification.findOne({
      userId: userId,
    });
  }
  
  
  //TODO: give user a proper type
    sendAccountVerificationCode = async(user:any) => {
    //generate otp verification
    const otp = await generatedId();
    //save otp details
    await this.saveOtp(user.userId, otp);
  
    //send verification email to user
    await sendVerificationEmail(
     user.username,
     user.email,
     otp,
    );
  
    return otp;
  }
  
  
  //TODO: give data a proper type
    verifyAccount = async(data: any) => {
    try {
     const  account = await accountDb.updateOne(
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
  
    updatePassword = async(userId:string, password:string) => {
    try {
     const  account = await accountDb.updateOne(
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
}

