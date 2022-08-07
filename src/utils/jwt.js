const jsonwebtoken = require("jsonwebtoken");

require("dotenv").config();

function generateToken(user) {
  return jsonwebtoken.sign(
    { userId: user.userId, username: user.userName },
    process.env.JWT_TOKEN,
    {
      expiresIn: "5h",
    }
  );
}

module.exports = generateToken;
