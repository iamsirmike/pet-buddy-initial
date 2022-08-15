import nodemailer from 'nodemailer';
import { nodeMailerConfig } from "./nodeMailConfig";

export  const sendEmail = async(to: string, subject :string, html :string): Promise<any> => {
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
