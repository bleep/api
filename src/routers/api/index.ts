import Router from "koa-router";
import usersRouter from "./users";
import koaBody from "koa-body";

const router = new Router();

router.use(koaBody());
router.use("/users", usersRouter.routes());

export default router;
