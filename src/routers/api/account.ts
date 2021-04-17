import Router from "koa-router";
import {
  deleteAccount,
  getAccount,
  updateAccount,
} from "../../controllers/account";

const router = new Router();

router.get("/", getAccount);
router.delete("/", deleteAccount);
router.patch("/", updateAccount);

export default router;
