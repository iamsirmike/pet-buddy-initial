import { Request, Response } from "express";
import "express-async-errors";

import { checkIfUserExistInDb } from "../common/userExist";
import { AccountModel } from "../models/account.model";
import {
  checkIfResetDataExit,
  requestResetPasswordCode,
  saveResetPasswordData
} from "../models/resetPasswordModel";
import { SaveResetData } from "../schemas/resetPassword.schema";
import generateToken from "../utils/jwt";

export class AccountController {
  constructor( private readonly _accountModel: AccountModel) {}
  
  httpCreateAccount = async(req: Request, res:Response) => {
    const userData = req.body;
  
    //validate user input
    if (!userData.email || !userData.username || !userData.password) {
      return res.status(400).send("All input is required");
    }
  
    const findUser = await this._accountModel.checkIfUserExist(userData.username);
  
    if (findUser) {
      return res.status(409).send("A user with this username already exist");
    }
  
    const user = await this._accountModel.createAccount(userData);
  
    await  this._accountModel.sendAccountVerificationCode(user);
  
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
  
  httpSignIn = async(req:Request, res:Response) =>{
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
  
   httpInitiatePasswordReset = async(req:Request, res:Response) =>{
    const body = req.body;
  
    if (!body.username) {
      return res.send({
        message: "username is required",
      });
    }
    const user = await this._accountModel.checkIfUserExist(body.username);
  
    if (!user) {
      return res.status(409).send("User does not exist");
    }
  
    const otp = await requestResetPasswordCode(user);
  
    const dataToSave: SaveResetData = {
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
  
  httpCompletePasswordReset= async(req:Request, res:Response) =>{
    const { username, otp, password } = req.body;
  
    if (!(username || otp || password)) {
      return res.send({
        message: "Username, password or otp is missing",
      });
    }
    const user = await this._accountModel.checkIfUserExist(username);
  
    if (!user) {
      return res.status(409).send("User does not exist");
    }
  
    const dataExist = await checkIfResetDataExit(user.userId);
    if (!dataExist) {
      return res.send("An error occured");
    }
  
    await this._accountModel.updatePassword(
     user.userId,
     password,
    );
  
    res.status(200).json({
      message: "Password reset sucessful",
    });
  }
}

