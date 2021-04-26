import koaBody from "koa-body";
import jwt from "koa-jwt";
import Router from "koa-router";
import { ENVIRONMENT } from "./constants";
import { deleteAccount, getAccount, patchAccount } from "./controllers/account";
import { deleteRecovery, postRecoveries } from "./controllers/recoveries";
import {
  postBillingPortalSessions,
  postCheckoutSessions,
} from "./controllers/stripe";
import {
  deleteTeam,
  getTeam,
  getTeams,
  patchTeam,
  postTeams,
} from "./controllers/teams";
import { postTokens } from "./controllers/tokens";
import { postUsers } from "./controllers/users";
import {
  deleteVerification,
  postVerifications,
} from "./controllers/verifications";

const router = new Router();

router.prefix("/api");

router.use(koaBody());

router
  .post("/users", postUsers)
  .post("/tokens", postTokens)
  .post("/verifications", postVerifications)
  .delete("/verifications/:verificationId", deleteVerification)
  .post("/recoveries", postRecoveries)
  .del("/recoveries/:recoveryId", deleteRecovery);

router.use(jwt({ secret: ENVIRONMENT.JWT_SECRET || "" }));

router
  .get("/account", getAccount)
  .del("/account", deleteAccount)
  .patch("/account", patchAccount)
  .get("/teams", getTeams)
  .post("/teams", postTeams)
  .get("/teams/:teamId", getTeam)
  .del("/teams/:teamId", deleteTeam)
  .patch("/teams/:teamId", patchTeam)
  .post("/stripe/billing-portal-sessions", postBillingPortalSessions)
  .post("/stripe/checkout-sessions", postCheckoutSessions);

export default router;
