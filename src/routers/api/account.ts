import Router from "koa-router";
import jwt from "koa-jwt";
import UserModel from "../../models/user";

const router = new Router();

router.get(
  "/",
  jwt({ secret: process.env.JWT_SECRET || "" }),
  async (ctx, next) => {
    try {
      if (ctx.state?.user?._id === undefined) {
        ctx.throw(400, new Error("Stale JWT body."));
      }

      const user = await UserModel.findById(ctx.state.user._id);
      console.log(user);

      ctx.body = user;
    } catch (e) {
      ctx.throw(400, e);
    }

    next();
  }
);

export default router;
