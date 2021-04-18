import { Context } from "koa";
import { createToken } from "../services/tokens";
import * as z from "zod";

export const postTokens = async (ctx: Context): Promise<void> => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = schema.parse(ctx.request.body);

  try {
    ctx.status = 201;
    ctx.body = await createToken(email, password);
  } catch (e) {
    ctx.throw(400, e);
  }
};
