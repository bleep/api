import { Context } from "koa";
import { createToken } from "../services/tokens";

export const postToken = async (ctx: Context): Promise<void> => {
  const { email, password } = ctx.request.body;

  try {
    ctx.status = 201;
    ctx.body = await createToken(email, password);
  } catch (e) {
    ctx.throw(400, e);
  }
};
