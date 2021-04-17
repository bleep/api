import Router from "koa-router";
import {
  deleteAccount,
  getAccount,
  patchAccount,
} from "../../controllers/account";

const router = new Router();

router.get("/", getAccount);
router.delete("/", deleteAccount);
router.patch("/", patchAccount);

export default router;
