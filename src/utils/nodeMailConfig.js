import dotenv from "dotenv";

dotenv.config();

export const nodeMailerConfig = {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
};
