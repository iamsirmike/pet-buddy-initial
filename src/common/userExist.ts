import { AccountModel } from "../models/account.model";

const accountModel = new AccountModel();

export const checkIfUserExistInDb = async(username:string, res:any)=> {
  const user = await accountModel.checkIfUserExist(username);
  if (!user) {
    return res.status(401).json({
      message: "User does not exist",
    });
  }
  return user;
}
