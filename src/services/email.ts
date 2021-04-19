import Email, { EmailDocument } from "../models/email";

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

  return await email.save();
};

export const removeEmail = async (id: string): Promise<EmailDocument> => {
  const removedEmail = await Email.findByIdAndDelete(id);

  if (removedEmail === null) {
    throw new Error(`Email with id ${id} not found.`);
  }

  return removedEmail;
};
