import sendgrid, { MailDataRequired } from "@sendgrid/mail";
import { VerificationPopulatedDocument } from "../models/verification";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "");

export const sendVerificationEmail = async (
  verification: VerificationPopulatedDocument
): Promise<void> => {
  const message: MailDataRequired = {
    to: verification.email.address,
    from: process.env.SENDGRID_SENDER_FROM_EMAIL_ADDRESS || "",
    subject: "test",
    text: `Verify email: ${process.env.WEB_CLIENT_URL}/verifications/${verification._id}`,
  };

  await sendgrid.send(message);

  return;
};
