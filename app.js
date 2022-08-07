const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");

const authRouter = require("./src/routes/auth.route");

const app = express();

//secures our server by adding headers. this is a middleware!
app.use(helmet());

//We use morgan to log our requests.
app.use(morgan("combined"));

app.use(express.json());

app.use("/auth", authRouter);

module.exports = app;
