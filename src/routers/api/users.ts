import Router from "koa-router";
import User from "../../models/user";

const router = new Router();

router.post("/", async (ctx, next) => {
  try {
    const {
      name: { first, last },
      email,
      password,
    } = ctx.request.body;

    const user = new User({
      name: { first, last },
      email,
      password,
    });

    ctx.body = await user.save();
  } catch (e) {
    ctx.throw(400, e);
  }

  next();
});

export default router;
