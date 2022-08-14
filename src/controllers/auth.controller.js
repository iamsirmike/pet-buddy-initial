import "express-async-errors";

import bcrypt from "bcryptjs";
import userExistInDb from "../common/userExist.js";
import accountModel from "../models/account.model.js";
import resetPasswordModel from "../models/resetPassword.model.js";
import generateToken from "../utils/jwt.js";

async function httpCreateAccount(req, res) {
  const userData = req.body;

  //validate user input
  if (!userData.email || !userData.username || !userData.password) {
    return res.status(400).send("All input is required");
  }

  const findUser = await accountModel.checkIfUserExist(userData.username);

  if (findUser) {
    return res.status(409).send("A user with this username already exist");
  }

  const user = await accountModel.createAccount(userData);

  await accountModel.sendAccountVerificationCode(user);

  const token = generateToken(user);

  // assign JWT
  user.token = token;

  res.status(201).json({
    message: "Acount created successfully",
    data: {
      email: user.email,
      username: user.username,
      token: user.token,
    },
  });
}

async function httpSignIn(req, res) {
  const body = req.body;

  //validate user input
  if (!(body.username && body.password)) {
    return res.status(400).send("All inputs are required");
  }

  //check if a user with the provided username exist
  const user = await userExistInDb(body.username, res);

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

async function httpInitiatePasswordReset(req, res) {
  const body = req.body;

  if (!body.username) {
    return res.send({
      message: "username is required",
    });
  }
  const user = await accountModel.checkIfUserExist(body.username);

  if (!user) {
    return res.status(409).send("User does not exist");
  }

  const otp = await resetPasswordModel.requestResetPasswordCode(user);

  await resetPasswordModel.saveResetPasswordData({
    userId: user.userId,
    email: user.email,
    otp: otp,
  });

  res.status(200).json({
    message:
      "Password reset initiated, check the email associated with this account for a reset code",
  });
}

async function httpCompletePasswordReset(req, res) {
  const { username, otp, password } = req.body;

  if (!(username || otp || password)) {
    return res.send({
      message: "Username, password or otp is missing",
    });
  }
  const user = await accountModel.checkIfUserExist(username);

  if (!user) {
    return res.status(409).send("User does not exist");
  }

  const dataExist = await resetPasswordModel.checkIfResetDataExit(user.userId);
  if (!dataExist) {
    return res.send("An error occured");
  }

  await accountModel.updatePassword({
    userId: user.userId,
    password: password,
  });

  res.status(200).json({
    message: "Password reset sucessful",
  });
}

export default {
  httpCreateAccount,
  httpSignIn,
  httpInitiatePasswordReset,
  httpCompletePasswordReset,
};
