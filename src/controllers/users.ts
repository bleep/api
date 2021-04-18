import { Context } from "koa";
import { createUser } from "../services/users";
import * as z from "zod";

export const postUsers = async (ctx: Context): Promise<void> => {
  const schema = z.object({
    name: z.object({
      first: z.string(),
      last: z.string(),
    }),
    email: z.string().email(),
    password: z.string(),
  });

  const { name, email, password } = schema.parse(ctx.request.body);

  try {
    await createUser({ name, email, password });
    ctx.status = 201;
  } catch (e) {
    ctx.throw(400, e);
  }
};
