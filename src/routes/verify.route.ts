import { Router } from "express";

import { VerifyUserController } from "../controllers/verifyUser.controller";
import { AccountModel } from "../models/account.model";

import auth from "../middlewares/auth.middleware";

const verifyRouter: Router = Router();

const verifyUserController = new VerifyUserController(new AccountModel());

verifyRouter.post("/verify", auth, verifyUserController.httpVerifyUser);
verifyRouter.post(
  "/requestVerification",
  auth,
  verifyUserController.httpRequestVerification
);

export default verifyRouter;
