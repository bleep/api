import Router from "koa-router";
import { postTokens } from "../../controllers/tokens";

const router = new Router();

router.post("/", postTokens);

export default router;
