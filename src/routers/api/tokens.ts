import Router from "koa-router";
import { postToken } from "../../controllers/tokens";

const router = new Router();

router.post("/", postToken);

export default router;
