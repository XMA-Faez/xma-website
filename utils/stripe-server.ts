import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined");
}

// This is for server-side Stripe operations
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
});

export const createCheckoutSession = async (
  lineItems: any[],
  successUrl: string,
  cancelUrl: string,
) => {
  try {
    return await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      billing_address_collection: "required",
      phone_number_collection: {
        enabled: true,
      },
      metadata: {
        items: JSON.stringify(lineItems.map((item) => item.price)),
      },
      locale: "en",
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
