import "express-async-errors";

import userExistInDb from "../common/userExist.js";
import accountModel from "../models/account.model.js";
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

export default {
  httpCreateAccount,
  httpSignIn,
};
