import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Context } from "koa";
import User from "../models/user";

export const createToken = async (ctx: Context): Promise<void> => {
  // TODO: Check that user email is verified before issuing token.
  const { email, password } = ctx.request.body;

  const user = await User.findOne({ email: email }).select("password");

  if (user === null) {
    ctx.throw(400, new Error("User not found."));
  }

  const match = await compare(password, user.password);

  if (match) {
    if (process.env.JWT_SECRET === undefined) {
      throw new Error("Required environement variable JWT_SECRET not found.");
    }

    ctx.status = 201;
    ctx.body = sign(
      { _id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET
    );
  } else {
    ctx.throw(400, new Error("Invalid password."));
  }
};
