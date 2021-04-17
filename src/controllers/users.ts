import { Context } from "koa";
import User from "../models/user";

export const createUser = async (ctx: Context): Promise<void> => {
  // TODO: Verify email before allowing login.
  const {
    name: { first, last },
    email,
    password,
  } = ctx.request.body;

  const user = new User({
    name: { first, last },
    email,
    password,
  });

  try {
    await user.save();
    ctx.status = 201;
  } catch (e) {
    ctx.throw(400, e);
  }
};
