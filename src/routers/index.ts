import Router from "koa-router";
import apiRouter from "./api";
import webhooksRouter from "./webhooks";

const router = new Router();

router.use("/api", apiRouter.routes());
router.use("/webhooks", webhooksRouter.routes());

export default router;
