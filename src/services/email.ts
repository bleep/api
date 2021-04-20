import Email, { EmailDocument } from "../models/email";
import { createVerification } from "./verifications";

export const retrieveEmailByAddress = async (
  address: string
): Promise<EmailDocument> => {
  const email = await Email.findOne({ address });

  if (email === null) {
    throw new Error(`Email with address ${address} not found.`);
  }

  return email;
};

export const createEmail = async (properties: {
  address: string;
}): Promise<EmailDocument> => {
  const email = new Email({ address: properties.address });

  const savedEmail = await email.save();

  await createVerification({ emailId: savedEmail._id });

  return savedEmail;
};

export const removeEmail = async (id: string): Promise<EmailDocument> => {
  const removedEmail = await Email.findByIdAndDelete(id);

  if (removedEmail === null) {
    throw new Error(`Email with id ${id} not found.`);
  }

  return removedEmail;
};

export const updateEmail = async (
  id: string,
  properties: { verified: boolean }
): Promise<EmailDocument> => {
  const updatedEmail = await Email.findByIdAndUpdate(id, {
    verified: properties.verified,
  });

  if (updatedEmail === null) {
    throw new Error(`Email with id ${id} not found.`);
  }

  return updatedEmail;
};
