import Router from "koa-router";
import { createUser } from "../../controllers/users";

const router = new Router();

router.post("/", createUser);

export default router;
