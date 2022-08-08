import jsonwebtoken from "jsonwebtoken";

function generateToken(user) {
  return jsonwebtoken.sign(
    { userId: user.userId, username: user.userName },
    process.env.JWT_TOKEN,
    {
      expiresIn: "5h",
    }
  );
}

export default generateToken;
