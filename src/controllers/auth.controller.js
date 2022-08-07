const bcrypt = require("bcryptjs");

const generateToken = require("../utils/jwt");
const { createAccount, checkIfUserExist } = require("../models/account.model");

require("dotenv").config();

async function httpCreateAccount(req, res) {
  try {
    const userData = req.body;

    //validate user input
    if (!(userData.username && userData.password)) {
      return res.status(400).send("All input is required");
    }

    const findUser = await checkIfUserExist(userData.username);

    if (findUser) {
      return res.status(409).send("A user with this username already exist");
    }

    //encrypt password
    const encryptedPassword = await bcrypt.hash(userData.password, 10);

    userData.password = encryptedPassword;

    const user = await createAccount(userData);

    //generate userToken
    const token = generateToken(user);

    // assign JWT
    user.token = token;

    res.status(201).json({
      message: "Acount created successfully",
      data: {
        username: user.username,
        token: user.token,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function httpSignIn(req, res) {
  try {
    const body = req.body;

    //validate user input
    if (!(body.username && body.password)) {
      return res.status(400).send("All inputs are required");
    }

    //check if a user with the provided username exist
    const user = await checkIfUserExist(body.username);

    if (!user) {
      return res.status(400).send("User does not exist");
    }

    //compare passwords
    const validatePassword = await bcrypt.compare(body.password, user.password);

    if (!validatePassword) {
      return res.status(400).send("Invalid username or password");
    }

    const token = generateToken(user);

    // assign JWT
    user.token = token;

    res.status(201).json({
      username: user.username,
      token: user.token,
    });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  httpCreateAccount,
  httpSignIn,
};
