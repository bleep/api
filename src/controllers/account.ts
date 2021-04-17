import { Context } from "koa";
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
    ctx.body = removeUser(ctx.state.user._id);
  } catch (e) {
    ctx.throw(404, e);
  }
};

export const patchAccount = async (ctx: Context): Promise<void> => {
  const { name, password, email } = ctx.request.body;

  try {
    ctx.body = updateUser(ctx.state.user._id, { name, password, email });
  } catch (e) {
    ctx.throw(400, e);
  }
};
