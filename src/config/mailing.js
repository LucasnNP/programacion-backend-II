import nodemailer from "nodemailer";

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS:", process.env.MAIL_PASS ? "CARGADA" : "NO CARGADA");

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
