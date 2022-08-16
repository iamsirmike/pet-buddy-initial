import { Router } from "express";

import { AccountController } from "../controllers/auth.controller";
import { AccountModel } from "../models/account.model";


export const authRouter: Router = Router();

const accountController = new AccountController(new AccountModel());

authRouter.post("/createAccount", accountController.httpCreateAccount);
authRouter.post("/signIn", accountController.httpSignIn);
authRouter.post(
  "/initiatePasswordReset",
  accountController.httpInitiatePasswordReset
);
authRouter.post(
  "/completePasswordReset",
  accountController.httpCompletePasswordReset
);

 