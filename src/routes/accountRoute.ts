import { Router } from "express";

import { httpRequestVerification, httpUpdateProfile, httpVerifyUser } from "../controllers/accountController";
import auth from "../middlewares/auth.middleware";

const accountRouter: Router = Router();

accountRouter.post("/verify", auth, httpVerifyUser);

accountRouter.post(
  "/requestVerification",
  auth,
httpRequestVerification
);

accountRouter.put(
  "/updateProfile",
  auth,
  httpUpdateProfile
);

export default accountRouter;
