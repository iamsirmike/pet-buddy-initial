const express = require("express");

const {
  httpCreateAccount,
  httpSignIn,
} = require("../controllers/auth.controller");

const authRouter = express.Router();

authRouter.post("/createAccount", httpCreateAccount);
authRouter.post("/signIn", httpSignIn);

module.exports = authRouter;
