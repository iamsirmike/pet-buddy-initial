import { Response } from "../common/response";
import { checkIfUserExistInDb } from "../common/userExist";
import { UserProfileData } from "../interfaces/userProfileInterface";
import { checkIfUserExist, findUserToVerify, saveOtp, sendAccountVerificationCode, updateProfile, verifyAccount } from "../models/accountModel";

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

export const httpUpdateProfile = async (req:any, res: any) => {
const {firstname, lastname, phone}: {firstname:string, lastname:string, phone:string} = req.body;
const username:string = req.user.username;
if(!username){
  return res.send(Response.responseWithoutData(401, "You are not authenticated"));
}

if(!(lastname || firstname || phone)){
  return res.send(Response.responseWithoutData(400, "All inputs are required"));
}

const user = await checkIfUserExist(username);
if(!user){
  return res.send(Response.responseWithoutData(404, "User not found"));
}

const dataToSave: UserProfileData = {
 userId: user.userId,
 firstname: firstname,
 lastname:lastname,
 phone: phone,

}

const updatedData = await updateProfile(dataToSave);
if(!updatedData){
  return res.send(Response.responseWithoutData(500, "An error occured"));
}


res.send(Response.responseWithData(200, 'User profile updated successfully', {
  firstname: updatedData.firstname,
  lastname: updatedData.lastname,
  phone: updatedData.phone,
}));

}