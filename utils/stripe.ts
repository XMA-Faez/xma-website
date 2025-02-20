import { Stripe, loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
let stripePromise: Promise<Stripe | null>;
export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

// Package Configurations
export const PACKAGE_PRICE_IDS = {
  base: "price_1QudtlECnKVqamsU9urP93uB",
  standard: "price_1QudsZECnKVqamsUy6Bpd4zc",
  premium: "price_1QudrcECnKVqamsUq4OMeDKX",
} as const;

// Add-on Configurations
export const ADDON_PRICE_IDS = {
  website_design: "price_1QueF2ECnKVqamsUzwDuctnG",
  website_redesign: "price_1QueF3ECnKVqamsUHR31c770",
  logo_design: "price_1QueF4ECnKVqamsUx778FWCD",
  business_email: "price_1QueF4ECnKVqamsUKUbh96SV",
  hosting: "price_1QueF5ECnKVqamsURnfn5OOV",
  domain: "price_1QueF6ECnKVqamsUut6xRjdw",
  payment_gateway: "price_1QueF7ECnKVqamsUAIttuepa",
} as const;

// Type Definitions
export type PackageType = keyof typeof PACKAGE_PRICE_IDS;
export type AddonType = keyof typeof ADDON_PRICE_IDS;

// Helper Functions
export const formatPrice = (amount: number) => {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Utility functions for Stripe
export const createLineItems = (packageType: PackageType, addons: AddonType[]) => {
  return [
    {
      price: PACKAGE_PRICE_IDS[packageType],
      quantity: 1,
    },
    ...addons.map(addon => ({
      price: ADDON_PRICE_IDS[addon],
      quantity: 1,
    }))
  ];
};

export default getStripe;
