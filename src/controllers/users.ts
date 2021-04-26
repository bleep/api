import { Context } from "koa";
import { createUser } from "../services/users";
import * as z from "zod";

export const postUsers = async (ctx: Context): Promise<void> => {
  const bodySchema = z.object({
    name: z.object({
      first: z.string(),
      last: z.string(),
    }),
    email: z.string().email(),
    password: z.string().min(5).max(50),
  });
  const { password, email, name } = bodySchema.parse(ctx.request.body);

  ctx.status = 201;
  await createUser({ name, email, password });
};
