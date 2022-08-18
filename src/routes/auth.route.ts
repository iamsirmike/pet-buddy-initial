import { Router } from "express";

import { httpCompletePasswordReset, httpCreateAccount, httpInitiatePasswordReset, httpSignIn } from "../controllers/auth.controller";

export const authRouter: Router = Router();

authRouter.post("/createAccount", httpCreateAccount);
authRouter.post("/signIn", httpSignIn);
authRouter.post(
  "/initiatePasswordReset",
httpInitiatePasswordReset
);
authRouter.post(
  "/completePasswordReset",
  httpCompletePasswordReset
);

 