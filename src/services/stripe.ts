import Stripe from "stripe";

const stripeApiKey = process.env.STRIPE_API_KEY || "";
const stripe = new Stripe(stripeApiKey, { apiVersion: "2020-08-27" });

export const createCustomer = async (properties: {
  name: string;
  email: string;
}): Promise<Stripe.Response<Stripe.Customer>> => {
  return await stripe.customers.create({
    name: properties.name,
    email: properties.email,
  });
};

export const removeCustomer = async (
  id: string
): Promise<Stripe.Response<Stripe.DeletedCustomer>> => {
  return await stripe.customers.del(id);
};

export const createBillingPortalSession = async (properties: {
  customerId: string;
  returnUrl: string;
}): Promise<Stripe.Response<Stripe.BillingPortal.Session>> => {
  return await stripe.billingPortal.sessions.create({
    customer: properties.customerId,
    return_url: properties.returnUrl,
  });
};

export const createCheckoutSession = async (properties: {
  successUrl: string;
  cancelUrl: string;
  customerId: string;
  priceId: string;
}): Promise<Stripe.Response<Stripe.Checkout.Session>> => {
  return await stripe.checkout.sessions.create({
    success_url: properties.successUrl,
    cancel_url: properties.cancelUrl,
    customer: properties.customerId,
    line_items: [{ price: properties.priceId, quantity: 1 }],
    payment_method_types: ["card"],
    mode: "subscription",
  });
};
