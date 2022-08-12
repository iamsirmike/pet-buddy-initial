import { Router } from "express";

import verificationController from "../controllers/verifyUser.controller.js";
import auth from "../middlewares/auth.middleware.js";

const verifyRouter = Router();

verifyRouter.post("/verify", auth, verificationController.httpVerifyUser);
verifyRouter.post(
  "/requestVerification",
  auth,
  verificationController.httpRequestVerification
);

export default verifyRouter;
