import Router from "koa-router";
import stripeRouter from "./stripe";

const router = new Router();

router.use("/stripe", stripeRouter.routes());

export default router;
