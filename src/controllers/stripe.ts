import { Context } from "koa";
import {
  createBillingPortalSession,
  createCheckoutSession,
} from "../services/stripe";

export const postBillingPortalSessions = async (
  ctx: Context
): Promise<void> => {
  const { returnUrl } = ctx.request.body;

  try {
    ctx.status = 201;
    ctx.body = await createBillingPortalSession({
      customerId: ctx.state.user.customerId,
      returnUrl,
    });
  } catch (e) {
    ctx.throw(400, e);
  }
};

export const postCheckoutSessions = async (ctx: Context): Promise<void> => {
  const { priceId, successUrl, cancelUrl } = ctx.request.body;

  try {
    ctx.status = 201;
    ctx.body = await createCheckoutSession({
      customerId: ctx.state.user.customerId,
      priceId: priceId,
      successUrl,
      cancelUrl,
    });
  } catch (e) {
    ctx.throw(400, e);
  }
};
