import shortId from "short-uuid";
import accountDb from "../schemas/account.schema.js";

async function checkIfUserExist(username) {
  return await accountDb.findOne({
    username: username,
  });
}

async function createAccount(data) {
  try {
    const accountData = Object.assign(data, {
      userId: shortId.generate(),
    });
    const account = await accountDb.create(accountData);
    return account;
  } catch (error) {
    throw new Error(error);
  }
}

export default {
  checkIfUserExist,
  createAccount,
};
