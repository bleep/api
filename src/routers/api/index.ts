import Router from "koa-router";
import koaBody from "koa-body";
import usersRouter from "./users";
import tokensRouter from "./tokens";

const router = new Router();

router.use(koaBody());
router.use("/users", usersRouter.routes());
router.use("/tokens", tokensRouter.routes());

export default router;
