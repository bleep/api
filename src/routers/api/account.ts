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
    const user = await UserModel.findByIdAndDelete(ctx.state.user._id);

    if (user === null) {
      ctx.throw(400, new Error("User not found."));
    }

    ctx.body = user;
  } catch (e) {
    ctx.throw(400, e);
  }

  next();
});

export default router;
