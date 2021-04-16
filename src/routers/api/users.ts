import Router from "koa-router";
import User from "../../models/user";

const router = new Router();

router.post("/", async (ctx, next) => {
  // TODO: Verify email before allowing login.
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

  try {
    ctx.status = 201;
    ctx.body = await user.save();
  } catch (e) {
    ctx.throw(400, e);
    return;
  }

  next();
});

export default router;
