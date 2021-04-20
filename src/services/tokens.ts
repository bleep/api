import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { retrieveEmailByAddress } from "./email";
import { retrieveUserAndPasswordFromEmail } from "./users";
import { createVerification } from "./verifications";

export const createToken = async (
  emailAddress: string,
  password: string
): Promise<string> => {
  const email = await retrieveEmailByAddress(emailAddress);
  const user = await retrieveUserAndPasswordFromEmail(email);
  const match = await compare(password, user.password);

  if (match === false) {
    throw new Error("Invalid password.");
  }

  if (process.env.JWT_SECRET === undefined) {
    throw new Error("Required environement variable JWT_SECRET not found.");
  }

  if (user.email.verified !== true) {
    await createVerification({ emailId: user.email._id });
    throw new Error(
      `Email unverified. Verification sent to ${user.email.address}`
    );
  }

  return sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      customerId: user.customerId,
    },
    process.env.JWT_SECRET
  );
};
