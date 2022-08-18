import { checkIfUserExistInDb } from "../common/userExist";
import { checkIfUserExist, findUserToVerify, saveOtp, sendAccountVerificationCode, verifyAccount } from "../models/accountModel";

//verify users account
export const httpVerifyUser =async(req:any, res:any) => {
  const { otp } = req.body;
  const username = req.user.username;

  if (!username) {
    return res.send("You are not authenticated");
  }

  if (!otp) {
    return res.send("OTP is required");
  }

  const user = await checkIfUserExistInDb(username, res);

  if (user.isVerified) {
    return res.status(400).json({
      message: "User is already verified",
    });
  }
  const verificationData = await findUserToVerify(user.userId);

  if (!verificationData) {
    return res.send("An error occured, try again");
  }
  if (!(verificationData.otp === otp)) {
    return res.status(400).json({
      message: "Invalid otp, check and try again",
    });
  }
  await verifyAccount(user);

  res.status(200).json({
    message: "account verified",
  });
}

//request for new verification code
export const httpRequestVerification = async(req:any, res:any)=>{
  const username = req.user.username;

  if (!username) {
    return res.send("You are not authenticated");
  }

  const user = await checkIfUserExist(username);

  if (!user) {
    return res.status(401).json({
      message: "User does not exist",
    });
  }

  if (user.isVerified) {
    return res.status(400).json({
      message: "User is already verified",
    });
  }

  const otp = await sendAccountVerificationCode(user);

  if (!otp) {
    res.send("An error occured");
  }

  await saveOtp(user.userId, otp);

  res.status(200).json({
    message: "OTP sent successfuolly",
  });
}
