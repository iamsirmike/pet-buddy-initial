import bcrypt from "bcryptjs";
import "express-async-errors";

import { Response } from "../../common/response";
import { checkIfUserExistInDb } from "../../common/userExist";
import { AccountData } from "../../interfaces/accountInterface";
import { checkIfUserExist, createAccount, sendAccountVerificationCode, updatePassword } from "../../models/accountModel";
import {
  checkIfResetDataExit,
  requestResetPasswordCode,
  saveResetPasswordData
} from "../../models/resetPasswordModel";
import { SaveResetData } from "../../schemas/resetPassword.schema";
import generateToken from "../../utils/jwt";
import { completePasswordResetValidator, createAccountValidator, inititiatePasswordResetValidator, signInValidator } from "./authValidator";



export const  httpCreateAccount = async(req: any, res:any) => {
  const userData = req.body;

  //validate user input
  const validateData = await createAccountValidator(userData);

  if(validateData){
    return res.send(Response.responseWithoutData(400, validateData));
  }

  const findUser = await checkIfUserExist(userData.username);

  if (findUser) {
    return res.ssend(Response.responseWithoutData(409, "Username already exist"));
  }

  const user:AccountData = await createAccount(userData);

  await  sendAccountVerificationCode(user);

  const token: string = generateToken(user);

  res.send(Response.responseWithData(200, "Account created successfully", { token }));
}

export const httpSignIn = async(req:any, res:any) => {
  const {username, password} = req.body;

  const data = {
    username: username,
    password: password
  }
 //validate user input
 const validateData = await signInValidator(data);

 if(validateData){
   return res.send(Response.responseWithoutData(400, validateData));
 }

  //check if a user with the provided username exist
  const user = await checkIfUserExistInDb(username, res);

  const validatePassword = await user.isValidPassword(password);

  if (!validatePassword) {
    return res.send(Response.responseWithoutData(401, "Invalid username or password"));
      
  }

  const token = generateToken(user);

  // assign JWT
  user.token = token;

  res.send(Response.responseWithData(200, "Login successful", {
    username: user.username,
     token:token,
  }));
}

export const httpInitiatePasswordReset = async(req:any, res:any) => {
  const {username}:{username:string} = req.body;

  //validate user input
  const validateData = await inititiatePasswordResetValidator(username);

  if(validateData){
    return res.send(Response.responseWithoutData(400, validateData));
  }
  const user = await checkIfUserExist(username);

  if (!user) {
    return res.send(Response.responseWithoutData(404, "User not found"));
  }

  const otp: string = await requestResetPasswordCode(user);

  const dataToSave: SaveResetData = {
    userId: user.userId,
    email: user.email,
    resetPasswordCode: otp,

  };

  await saveResetPasswordData(dataToSave);

  res.send(Response.responseWithoutData(200, "Reset password code sent to the email associated with the account"));
}

export const httpCompletePasswordReset= async(req:any, res:any) => {
  const { username, otp, password } = req.body;

   const data = {
    username: username,
    otp: otp,
    password: password
   }

  //validate user input
  const validateData = await completePasswordResetValidator(data);

  if(validateData){
    return res.send(Response.responseWithoutData(400, validateData));
  }

  const user = await checkIfUserExist(username);

  if (!user) {
    return res.send(Response.responseWithoutData(404, "User not found"));
  }

  const dataExist = await checkIfResetDataExit(user.userId);
  if (!dataExist) {
    return res.send(Response.responseWithoutData(404, "Reset data not found"));
  }
  const hashedPassword: string = await bcrypt.hash(password, 10);
  
  await updatePassword(
   user.userId,
   hashedPassword,
  );

  res.send(Response.responseWithoutData(200, "Password updated successfully"));
}

