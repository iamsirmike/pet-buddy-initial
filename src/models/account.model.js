const accountDb = require("../schemas/account.schema");
const short = require("short-uuid");

async function checkIfUserExist(username) {
  return await accountDb.findOne({
    username: username,
  });
}

async function createAccount(data) {
  try {
    const accountData = Object.assign(data, {
      userId: short.generate(),
    });
    const account = await accountDb.create(accountData);
    return account;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  checkIfUserExist,
  createAccount,
};
