import Router from "koa-router";
import { postUsers } from "../../controllers/users";

const router = new Router();

router.post("/", postUsers);

export default router;
