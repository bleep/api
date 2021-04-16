import Router from "koa-router";
import UserModel from "../../models/user";

const router = new Router();

router.get("/", async (ctx, next) => {
  try {
    const user = await UserModel.findById(ctx.state.user._id);

    if (user === null) {
      ctx.throw(400, new Error("User not found."));
    }

    ctx.body = user;
  } catch (e) {
    ctx.throw(400, e);
  }

  next();
});

router.delete("/", async (ctx, next) => {
  try {
    // TODO Block deletion if user is owner of any team.
    const deletedUser = await UserModel.findByIdAndDelete(ctx.state.user._id);

    if (deletedUser === null) {
      ctx.throw(400, new Error("User not found."));
    }

    ctx.body = deletedUser;
  } catch (e) {
    ctx.throw(400, e);
  }

  next();
});

router.patch("/", async (ctx, next) => {
  const { name, password, email } = ctx.request.body;

  const user = await UserModel.findById(ctx.state.user._id);

  if (user === null) {
    ctx.throw(400, new Error("User not found."));
    return;
  }

  if (name !== undefined) user.name = { first: name.first, last: name.last };
  if (email !== undefined) user.email = email;
  if (password !== undefined) user.password = password;

  try {
    const updatedUser = await user.save();
    ctx.body = updatedUser;
  } catch (e) {
    ctx.throw(400, e);
  }

  next();
});

export default router;
