import { Request, Response } from "express";
import "express-async-errors";

import { checkIfUserExistInDb } from "../common/userExist";
import { checkIfUserExist, createAccount, sendAccountVerificationCode, updatePassword } from "../models/account.model";
import {
  checkIfResetDataExit,
  requestResetPasswordCode,
  saveResetPasswordData
} from "../models/resetPasswordModel";
import { SaveResetData } from "../schemas/resetPassword.schema";
import generateToken from "../utils/jwt";


export const  httpCreateAccount = async(req: Request, res:Response) =>{
  const userData = req.body;

  //validate user input
  if (!userData.email || !userData.username || !userData.password) {
    return res.status(400).send("All input is required");
  }

  const findUser = await checkIfUserExist(userData.username);

  if (findUser) {
    return res.status(409).send("A user with this username already exist");
  }

  const user = await createAccount(userData);

  await  sendAccountVerificationCode(user);

  const token: string = generateToken(user);

  res.status(201).json({
    message: "Acount created successfully",
    data: {
      email: user.email,
      username: user.username,
      token: token,
    },
  });
}

export const httpSignIn = async(req:Request, res:Response) =>{
  const body = req.body;

  //validate user input
  if (!(body.username && body.password)) {
    return res.status(400).send("All inputs are required");
  }

  //check if a user with the provided username exist
  const user = await checkIfUserExistInDb(body.username, res);

  const validate = await user.isValidPassword(body.password);

  if (!validate) {
    return res
      .status(400)
      .json({ message: "Username or password is wrong, try again" });
  }

  const token = generateToken(user);

  // assign JWT
  user.token = token;

  res.status(201).json({
    username: user.username,
    token: user.token,
  });
}

export const httpInitiatePasswordReset = async(req:Request, res:Response) =>{
  const body = req.body;

  if (!body.username) {
    return res.send({
      message: "username is required",
    });
  }
  const user = await checkIfUserExist(body.username);

  if (!user) {
    return res.status(409).send("User does not exist");
  }

  const otp = await requestResetPasswordCode(user);

  const dataToSave: SaveResetData ={
    userId: user.userId,
    email: user.email,
    resetPasswordCode: otp,

  };

  await saveResetPasswordData(dataToSave);

  res.status(200).json({
    message:
      "Password reset initiated, check the email associated with this account for a reset code",
  });
}

export const httpCompletePasswordReset= async(req:Request, res:Response) =>{
  const { username, otp, password } = req.body;

  if (!(username || otp || password)) {
    return res.send({
      message: "Username, password or otp is missing",
    });
  }
  const user = await checkIfUserExist(username);

  if (!user) {
    return res.status(409).send("User does not exist");
  }

  const dataExist = await checkIfResetDataExit(user.userId);
  if (!dataExist) {
    return res.send("An error occured");
  }

  await updatePassword(
   user.userId,
   password,
  );

  res.status(200).json({
    message: "Password reset sucessful",
  });
}

