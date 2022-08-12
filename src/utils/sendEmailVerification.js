import { sendEmail } from "./sendEmail.js";

export async function sendVerificationEmail({
  name,
  email,
  verificationToken,
}) {
  const message = `<p>Please confirm your email by entering this verification code in the app: ${verificationToken} </p>`;
  return sendEmail({
    to: email,
    subject: "Email from Sirmike",
    html: `<h4>Hello ${name}</h4> 
    ${message}
    `,
  });
}
