import Router from "koa-router";
import koaBody from "koa-body";
import usersRouter from "./users";
import tokensRouter from "./tokens";
import accountRouter from "./account";
import jwt from "koa-jwt";

const router = new Router();

router.use(koaBody());
router.use("/users", usersRouter.routes());
router.use("/tokens", tokensRouter.routes());

router.use(jwt({ secret: process.env.JWT_SECRET || "" }));
router.use("/account", accountRouter.routes());

export default router;
