import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { retrieveUserWithPasswordFromEmail } from "./users";

export const createToken = async (
  email: string,
  password: string
): Promise<string> => {
  const user = await retrieveUserWithPasswordFromEmail(email);
  const match = await compare(password, user.password);

  if (match) {
    if (process.env.JWT_SECRET === undefined) {
      throw new Error("Required environement variable JWT_SECRET not found.");
    }

    return sign(
      { _id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET
    );
  } else {
    throw new Error("Invalid password.");
  }
};
