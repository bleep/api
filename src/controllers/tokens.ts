import { Context } from "koa";
import { createToken } from "../services/tokens";
import * as z from "zod";

export const postTokens = async (ctx: Context): Promise<void> => {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });
  const { password, email } = bodySchema.parse(ctx.request.body);

  ctx.status = 201;
  ctx.body = await createToken(email, password);
};
