import { Context } from "koa";
import * as z from "zod";
import {
  createBillingPortalSession,
  createCheckoutSession,
} from "../services/stripe";

export const postBillingPortalSessions = async (
  ctx: Context
): Promise<void> => {
  const schema = z.object({
    returnUrl: z.string().url(),
  });
  const { returnUrl } = schema.parse(ctx.request.body);

  ctx.status = 201;
  ctx.body = await createBillingPortalSession({
    customerId: ctx.state.user.customerId,
    returnUrl,
  });
};

export const postCheckoutSessions = async (ctx: Context): Promise<void> => {
  const bodySchema = z.object({
    priceId: z.string(),
    successUrl: z.string().url(),
    cancelUrl: z.string().url(),
  });
  const { cancelUrl, successUrl, priceId } = bodySchema.parse(ctx.request.body);

  ctx.status = 201;
  ctx.body = await createCheckoutSession({
    customerId: ctx.state.user.customerId,
    priceId,
    successUrl,
    cancelUrl,
  });
};
