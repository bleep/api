import { compare } from "bcrypt";
import Router from "koa-router";
import UserModel from "../../models/user";
import { sign } from "jsonwebtoken";

const router = new Router();

router.post("/", async (ctx, next) => {
  const { email, password } = ctx.request.body;

  const user = await UserModel.findOne({ email: email }).select("password");

  if (user === null) {
    ctx.throw(400, new Error("User not found."));
    return;
  }

  const match = await compare(password, user.password);

  if (match) {
    if (process.env.JWT_SECRET === undefined) {
      ctx.throw();
      throw new Error("Required environement variable JWT_SECRET not found.");
    }

    ctx.body = sign(
      { _id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET
    );
  } else {
    ctx.throw(400, new Error("Invalid password."));
    return;
  }

  next();
});

export default router;
