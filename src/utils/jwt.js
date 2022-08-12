import jsonwebtoken from "jsonwebtoken";

function generateToken(user) {
  return jsonwebtoken.sign(
    { userId: user.userId, username: user.username },
    process.env.JWT_TOKEN,
    {
      expiresIn: "1h",
    }
  );
}

export default generateToken;
