import Router from "koa-router";
import koaBody from "koa-body";
import usersRouter from "./users";
import tokensRouter from "./tokens";
import accountRouter from "./account";
import teamsRouter from "./teams";
import stripeRouter from "./stripe";
import verificationsRouter from "./verifications";
import jwt from "koa-jwt";

const router = new Router();

router.use(koaBody());
router.use("/users", usersRouter.routes());
router.use("/tokens", tokensRouter.routes());
router.use("/verifications", verificationsRouter.routes());

router.use(jwt({ secret: process.env.JWT_SECRET || "" }));
router.use("/account", accountRouter.routes());
router.use("/teams", teamsRouter.routes());
router.use("/stripe", stripeRouter.routes());

export default router;
