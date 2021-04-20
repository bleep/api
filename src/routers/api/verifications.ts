import Router from "koa-router";
import {
  deleteVerification,
  postVerifications,
} from "../../controllers/verifications";

const router = new Router();

router.post("/", postVerifications);
router.delete("/:verificationId", deleteVerification);

export default router;
