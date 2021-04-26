import createHttpError from "http-errors";
import Verification, {
  VerificationDocument,
  VerificationPopulatedDocument,
} from "../models/verification";
import { updateEmail } from "./email";
import { sendVerificationEmail } from "./sendgrid";

export const createVerification = async (properties: {
  emailId: string;
}): Promise<VerificationDocument> => {
  const verification = new Verification({ email: properties.emailId });
  const savedVerification = await verification.save();

  await sendVerificationEmail(savedVerification);

  return savedVerification;
};

export const removeVerification = async (
  id: string
): Promise<VerificationPopulatedDocument> => {
  const verification = await Verification.findById(id);

  if (verification === null) {
    throw createHttpError(403, "Verification not found.");
  }

  await updateEmail(verification.email._id, { verified: true });
  return await verification.delete();
};
