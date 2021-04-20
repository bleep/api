import Router from "koa-router";
import { deleteRecovery, postRecoveries } from "../../controllers/recoveries";

const router = new Router();

router.post("/", postRecoveries);
router.delete("/:recoveryId", deleteRecovery);

export default router;
