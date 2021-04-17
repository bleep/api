import Router from "koa-router";
import { postUser } from "../../controllers/users";

const router = new Router();

router.post("/", postUser);

export default router;
