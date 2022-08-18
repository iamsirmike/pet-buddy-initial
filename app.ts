import dotenv from "dotenv";
import express, { json } from "express";
import helmet from "helmet";
import morgan from "morgan";

import accountRouter from "./src/routes/accountRoute";
import { authRouter } from "./src/routes/auth.route";

dotenv.config();

const app = express();

//secures our server by adding headers. this is a middleware!
app.use(helmet());

//We use morgan to log our requests.
app.use(morgan("combined"));

app.use(json());

app.use("/auth", authRouter);

app.use("/account", accountRouter);
app.use("/account", accountRouter);


export default app;
