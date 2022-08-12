import userExistInDb from "../common/userExist.js";
import accountModel from "../models/account.model.js";

//verify users account
async function httpVerifyUser(req, res) {
  const { otp } = req.body;
  const username = req.user.username;

  if (!username) {
    return res.send("You are not authenticated");
  }

  if (!otp) {
    return res.send("OTP is required");
  }

  const user = await userExistInDb(username, res);

  if (user.isVerified) {
    return res.status(400).json({
      message: "User is already verified",
    });
  }
  const verificationData = await accountModel.findUserToVerify(user.userId);

  if (!verificationData) {
    return res.send("An error occured, try again");
  }
  if (!(verificationData.otp === otp)) {
    return res.status(400).json({
      message: "Invalid otp, check and try again",
    });
  }
  await accountModel.verifyAccount(user);

  res.status(200).json({
    message: "account verified",
  });
}

//request for new verification code
async function httpRequestVerification(req, res) {
  const username = req.user.username;

  if (!username) {
    return res.send("You are not authenticated");
  }

  const user = await accountModel.checkIfUserExist(username);

  if (!user) {
    return res.status(401).json({
      message: "User does not exist",
    });
  }

  if (user.isVerified) {
    return res.status(400).json({
      message: "User is already verified",
    });
  }

  const otp = await accountModel.sendAccountVerificationCode(user);

  if (!otp) {
    res.send("An error occured");
  }

  await accountModel.saveOtp(user.userId, otp);

  res.status(200).json({
    message: "OTP sent successfuolly",
  });
}

export default {
  httpVerifyUser,
  httpRequestVerification,
};
