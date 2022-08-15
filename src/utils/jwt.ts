import jsonwebtoken from "jsonwebtoken";
import { AccountData } from "../schemas/account.schema";

function generateToken(user: AccountData) {
  return jsonwebtoken.sign(
    { userId: user.userId, username: user.username },
     'UEsO1gfN7cJqjP96',
    {
      expiresIn: "1h",
    }
  );
}

export default generateToken;
