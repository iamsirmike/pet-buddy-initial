import pkg from 'jsonwebtoken';
const { verify } = pkg;

const verifyToken = (req, res, next) => {
  const token = req.headers["token"];

  if (!token) {
    return res.status(400).send("No user token provided");
  }
  try {
    const decoded = verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("You are not authorized to see this page");
  }
  return next();
};

export default verifyToken;
