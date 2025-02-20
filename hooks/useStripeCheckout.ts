"use client";

import { loadStripe } from "@stripe/stripe-js";
import {
  ADDON_PRICE_IDS,
  PACKAGE_PRICE_IDS,
  PackageType,
  AddonType,
} from "@/utils/stripe";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);

  const createCheckoutSession = async (
    packageType: PackageType,
    selectedAddOns: AddonType[] = [],
  ) => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error("Stripe failed to initialize");
      }

      // Create line items starting with the selected package
      const lineItems = [
        {
          price: PACKAGE_PRICE_IDS[packageType],
          quantity: 1,
        },
        ...selectedAddOns.map((addonId) => ({
          price: ADDON_PRICE_IDS[addonId],
          quantity: 1,
        })),
      ];

      // Create Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineItems,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/cancel`,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        throw new Error(result.error.message);
      }
    } catch (error) {
      console.error("Error in checkout:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCheckoutSession,
    isLoading,
  };
}
