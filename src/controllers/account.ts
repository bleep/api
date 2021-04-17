import { Context } from "koa";
import User from "../models/user";
import Team from "../models/team";

export const getAccount = async (ctx: Context): Promise<void> => {
  try {
    const account = await User.findById(ctx.state.user._id);

    if (account === null) {
      ctx.status = 404;
      return;
    }

    ctx.body = account;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const deleteAccount = async (ctx: Context): Promise<void> => {
  try {
    const deletedUser = await User.findByIdAndDelete(ctx.state.user._id);

    if (deletedUser === null) {
      ctx.status = 404;
      return;
    }

    const teamsUserOwns = await Team.find({ owner: ctx.state.user._id });

    if (teamsUserOwns.length > 0) {
      ctx.throw(403, new Error("User owns teams."));
    }

    ctx.body = deletedUser;
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const updateAccount = async (ctx: Context): Promise<void> => {
  const { name, password, email } = ctx.request.body;

  const account = await User.findById(ctx.state.user._id);
  if (account === null) {
    ctx.status = 404;
    return;
  }

  if (name) account.name = name;
  if (email) account.email = email;
  if (password) account.password = password;

  try {
    const updatedUser = await account.save();
    ctx.body = updatedUser;
  } catch (e) {
    ctx.throw(400, e);
  }
};
