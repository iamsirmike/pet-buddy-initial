import { checkIfUserExist } from "../models/account.model";

export const checkIfUserExistInDb = async(username:string, res:any)=> {
  const user = await checkIfUserExist(username);
  if (!user) {
    return res.status(401).json({
      message: "User does not exist",
    });
  }
  return user;
}
