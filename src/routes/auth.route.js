import { Router } from "express";

import authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/createAccount", authController.httpCreateAccount);
authRouter.post("/signIn", authController.httpSignIn);
authRouter.post(
  "/initiatePasswordReset",
  authController.httpInitiatePasswordReset
);
authRouter.post(
  "/completePasswordReset",
  authController.httpCompletePasswordReset
);

export default authRouter;
