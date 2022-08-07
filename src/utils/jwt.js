const jsonwebtoken = require("jsonwebtoken");
const crypto = require("crypto");

function generateToken(user) {
  return jsonwebtoken.sign(
    { userId: user.userId, username: user.userName },
    crypto.randomBytes(16).toString("hex"),
    {
      expiresIn: "5h",
    }
  );
}

module.exports = generateToken;
