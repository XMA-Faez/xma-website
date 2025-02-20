'use client';

import { useState } from 'react';
import getStripe from './stripe';
import { ADDON_PRICE_IDS, PACKAGE_PRICE_IDS, PackageType, AddonType } from './stripe';

export function useStripeCheckout() {
  const [isLoading, setIsLoading] = useState(false);

  const createCheckoutSession = async (packageType: PackageType, selectedAddOns: AddonType[] = []) => {
    try {
      setIsLoading(true);

      // Create line items array
      const lineItems = [
        {
          price: PACKAGE_PRICE_IDS[packageType],
          quantity: 1,
        },
        ...selectedAddOns.map(addonId => ({
          price: ADDON_PRICE_IDS[addonId],
          quantity: 1,
        }))
      ];

      // First create the checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lineItems,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      // Load Stripe
      const stripe = await getStripe();
      
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      // Redirect to checkout
      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }

    } catch (error) {
      console.error('Error in checkout:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCheckoutSession,
    isLoading
  };
}
