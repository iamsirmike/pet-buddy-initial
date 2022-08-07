import { verify } from "jsonwebtoken";

require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.status(403).send("You are not logged in. Log in to access this data");
  }
  try {
    const decoded = verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken;
