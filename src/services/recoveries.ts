import Recovery, { RecoveryDocument } from "../models/recovery";
import { retrieveEmailByAddress } from "./email";
import { sendRecoveryEmail } from "./sendgrid";
import { createToken } from "./tokens";

export const createRecovery = async (
  emailAddress: string
): Promise<RecoveryDocument> => {
  const email = await retrieveEmailByAddress(emailAddress);
  const recovery = new Recovery({ email });

  await sendRecoveryEmail(recovery);

  return await recovery.save();
};

export const removeRecovery = async (id: string): Promise<string> => {
  const recovery = await Recovery.findById(id);

  if (recovery === null) {
    throw new Error(`Recovery with id ${id} not found.`);
  }

  await recovery.delete();
  return await createToken(recovery.email.address);
};
