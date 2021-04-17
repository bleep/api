import Router from "koa-router";
import { createToken } from "../../controllers/tokens";

const router = new Router();

router.post("/", createToken);

export default router;
