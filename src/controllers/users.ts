import { Context } from "koa";
import { createUser } from "../services/users";

export const postUser = async (ctx: Context): Promise<void> => {
  const { name, email, password } = ctx.request.body;

  try {
    await createUser(name, email, password);
    ctx.status = 201;
  } catch (e) {
    ctx.throw(400, e);
  }
};
