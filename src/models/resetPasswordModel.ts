import resetPasswordSchema, { RequestResetData, SaveResetData } from "../schemas/resetPassword.schema";
import { generatedId } from "../utils/otpGeneration";
import { sendVerificationEmail } from "../utils/sendEmailVerification";

export const saveResetPasswordData = async (saveResetData: SaveResetData) => {
  await resetPasswordSchema.findOneAndUpdate(
    {
      userId: saveResetData.userId,
    },
    saveResetData,
    { upsert: true }
  );
}

export const checkIfResetDataExit = async(userId: string)=> {
  return await resetPasswordSchema.findOne({
    userId: userId,
  });
}

export const requestResetPasswordCode = async(requestData: RequestResetData) =>{
  const otp = await generatedId();

  //send verification email to user
  await sendVerificationEmail(
    requestData.username,
    requestData.email,
    otp,
  );

  return otp;
}




// export default {
//   requestResetPasswordCode,
//   // saveResetPasswordData,
//   checkIfResetDataExit,
// };
