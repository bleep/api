import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import { RecoveryPopulatedDocument } from "../models/recovery";
import { VerificationPopulatedDocument } from "../models/verification";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

export const sendVerificationEmail = async (
  verification: VerificationPopulatedDocument
): Promise<void> => {
  const message: MailDataRequired = {
    to: verification.email.address,
    from: process.env.SENDGRID_SENDER_FROM_EMAIL_ADDRESS || "",
    subject: "Bleep: Verify Email",
    text: `Please click the following link to verify your email: ${process.env.WEB_CLIENT_URL}/verifications/${verification._id}`,
  };

  await sendgrid.send(message);

  return;
};

export const sendRecoveryEmail = async (
  recovery: RecoveryPopulatedDocument
): Promise<void> => {
  const message: MailDataRequired = {
    to: recovery.email.address,
    from: process.env.SENDGRID_SENDER_FROM_EMAIL_ADDRESS || "",
    subject: "Bleep: Recover Account",
    text: `Please click the link to recover your Bleep account: ${process.env.WEB_CLIENT_URL}/recoveries/${recovery._id}`,
  };

  await sendgrid.send(message);

  return;
};
