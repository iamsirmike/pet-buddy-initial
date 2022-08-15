import { sendEmail } from "./sendEmail";

export async function sendVerificationEmail(
  name: string,
  email:string,
  verificationToken:string,
) {
  const message = `<p>Please confirm your email by entering this verification code in the app: ${verificationToken} </p>`;
  return sendEmail(
    email,
   "Email from Sirmike",
   `<h4>Hello ${name}</h4> 
    ${message}
    `,
  );
}
