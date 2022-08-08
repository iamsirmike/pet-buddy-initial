import { Router } from "express";

import authController from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/createAccount", authController.httpCreateAccount);
authRouter.post("/signIn", authController.httpSignIn);

export default authRouter;
