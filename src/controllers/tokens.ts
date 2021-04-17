import { Context } from "koa";
import { createToken } from "../services/tokens";

export const postToken = async (ctx: Context): Promise<void> => {
  const { email, password } = ctx.request.body;

  await createToken(email, password);
};
