import accountModel from "../models/account.model.js";

async function checkIfUserExistInDb(username, res) {
  const user = await accountModel.checkIfUserExist(username);
  if (!user) {
    return res.status(401).json({
      message: "User does not exist",
    });
  }
  return user;
}

export default checkIfUserExistInDb;
