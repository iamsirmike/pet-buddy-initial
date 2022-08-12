import nodemailer from "nodemailer";
import { nodeMailerConfig } from "./nodeMailConfig.js";

export async function sendEmail({ to, subject, html }) {
  const testAccount = nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodeMailerConfig);

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Michael Asamoah", // sender address
    to: to,
    subject: subject,
    html: html,
  });

  return info;
}

// export default sendEmail;
