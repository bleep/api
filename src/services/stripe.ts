import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51IhQLMA4gTFSLq4qSltIgKoIXAuFMEK23dvffoM1X4jkmm6Zv1ihXjp73hD3ivgzOBy0LSbijr7xam9NkMiONtqz00JjoZX4TK",
  { apiVersion: "2020-08-27" }
);

export const createCustomer = async (properties: {
  name: string;
  email: string;
}): Promise<Stripe.Response<Stripe.Customer>> => {
  return await stripe.customers.create({
    name: properties.name,
    email: properties.email,
  });
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
