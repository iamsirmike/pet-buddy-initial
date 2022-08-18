import { Router } from "express";

import { httpRequestVerification, httpVerifyUser } from "../controllers/verifyUser.controller";
import auth from "../middlewares/auth.middleware";

const verifyRouter: Router = Router();

verifyRouter.post("/verify", auth, httpVerifyUser);
verifyRouter.post(
  "/requestVerification",
  auth,
httpRequestVerification
);

export default verifyRouter;
