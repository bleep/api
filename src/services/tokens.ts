import { compare } from "bcrypt";
import createHttpError from "http-errors";
import { sign } from "jsonwebtoken";
import { ENVIRONMENT } from "../constants";
import { retrieveEmailByAddress } from "./email";
import { retrieveUserAndPasswordFromEmail } from "./users";

export const createToken = async (
  emailAddress: string,
  password?: string
): Promise<string> => {
  if (ENVIRONMENT.JWT_SECRET === undefined) {
    throw createHttpError(
      500,
      "Required environment variable JWT_SECRET not found."
    );
  }

  const email = await retrieveEmailByAddress(emailAddress);
  const user = await retrieveUserAndPasswordFromEmail(email);
  const token = sign(
    {
      _id: user._id,
      email: user.email,
      name: user.name,
      customerId: user.customerId,
    },
    ENVIRONMENT.JWT_SECRET
  );

  if (password === undefined) {
    return token;
  }

  const match = await compare(password, user.password);

  if (match === false) {
    throw createHttpError(403, "Invalid password.");
  }

  return token;
};
