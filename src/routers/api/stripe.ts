import Router from "koa-router";
import {
  postBillingPortalSessions,
  postCheckoutSessions,
} from "../../controllers/stripe";

const router = new Router();

router.post("/billing-portal-sessions", postBillingPortalSessions);
router.post("/checkout-sessions", postCheckoutSessions);

export default router;
