import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { retrieveEmailByAddress } from "./email";
import { retrieveUserAndPasswordFromEmail } from "./users";

export const createToken = async (
  emailAddress: string,
  password: string
): Promise<string> => {
  const email = await retrieveEmailByAddress(emailAddress);
  const user = await retrieveUserAndPasswordFromEmail(email);
  const match = await compare(password, user.password);

  if (match) {
    if (process.env.JWT_SECRET === undefined) {
      throw new Error("Required environement variable JWT_SECRET not found.");
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
  } else {
    throw new Error("Invalid password.");
  }
};
