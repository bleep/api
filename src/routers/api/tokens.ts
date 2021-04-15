import Router from "koa-router";
import { createToken } from "../../handlers/tokens";

const router = new Router();

export type CreateTokenRequestParameters = {
  email: string | undefined;
  password: string | undefined;
};

router.post("/", (ctx, next) => {
  try {
    const { email, password }: CreateTokenRequestParameters = ctx.request.body;

    if (email === undefined) {
      ctx.throw(400, new Error("Email is required."));
      return;
    }
    if (password === undefined) {
      ctx.throw(400, new Error("Password is required."));
      return;
    }

    createToken(email, password);
  } catch (e) {
    ctx.throw(e);
    console.error(e);
  }

  next();
});
