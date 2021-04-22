import { Context } from "koa";
import * as z from "zod";
import { removeUser, retrieveUser, updateUser } from "../services/users";

export const getAccount = async (ctx: Context): Promise<void> => {
  try {
    ctx.body = await retrieveUser(ctx.state.user._id);
  } catch (e) {
    ctx.throw(404, e);
  }
};

export const deleteAccount = async (ctx: Context): Promise<void> => {
  try {
    ctx.body = await removeUser(ctx.state.user._id);
  } catch (e) {
    ctx.throw(404, e);
  }
};

export const patchAccount = async (ctx: Context): Promise<void> => {
  try {
    const schema = z.object({
      name: z
        .object({
          first: z.string(),
          last: z.string(),
        })
        .optional(),
      password: z.string().min(5).max(50).optional(),
      email: z.string().email().optional(),
    });

    const { email, password, name } = schema.parse(ctx.request.body);

    ctx.body = await updateUser(ctx.state.user._id, { name, password, email });
  } catch (e) {
    ctx.throw(400, e);
  }
};
