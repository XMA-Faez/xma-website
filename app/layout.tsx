import { Theme } from "@radix-ui/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";

import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { GlobalAnalyticsProvider } from "@/components/tracking/GlobalAnalyticsProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import Script from "next/script";
import { DM_Sans, Manrope } from "next/font/google";

const primaryFont = Manrope({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-primary",
});

const secondaryFont = DM_Sans({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-secondary",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.xma.ae"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "XMA Agency | Premium Web Design for Luxury Car Rentals",
    template: "%s | XMA Agency",
  },
  description:
    "We craft websites that look as premium as your fleet. Specialized web design for luxury car rental companies in Dubai and UAE.",
  keywords: [
    "luxury car rental website",
    "car rental web design",
    "Dubai web agency",
    "premium website design",
    "automotive web design",
  ],
  authors: [{ name: "XMA Agency", url: "https://www.xma.ae" }],
  creator: "XMA Agency",
  publisher: "XMA Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.xma.ae",
    siteName: "XMA Agency",
    title: "XMA Agency | Premium Web Design for Luxury Car Rentals",
    description:
      "We craft websites that look as premium as your fleet. Specialized web design for luxury car rental companies in Dubai and UAE.",
    images: [
      {
        url: "/og-image.png",
        width: 1920,
        height: 1080,
        alt: "XMA Agency - Premium Web Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XMA Agency | Premium Web Design for Luxury Car Rentals",
    description:
      "We craft websites that look as premium as your fleet. Specialized web design for luxury car rental companies.",
    images: ["/og-image.png"],
    creator: "@xma_agency",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  appleWebApp: {
    title: "XMA Agency",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <head>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="54YwLrhms6OQtemWpi9xNQ"
          strategy="afterInteractive"
        />
        <meta
          name="google-site-verification"
          content="b4Ruz4qrwE5l_HVaxaP5_Nysz4MGIQaCWg8xYkKrJcM"
        />
      </head>
      <body className={`antialiased ${primaryFont.variable} ${secondaryFont.variable}`}>
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange={false}
        >
          <Theme grayColor="gray" hasBackground={false} radius="full">
            <QueryProvider>
              <PostHogProvider>
                <GlobalAnalyticsProvider>
                  <SpeedInsights />
                  {children}
                  <Analytics />
                </GlobalAnalyticsProvider>
              </PostHogProvider>
            </QueryProvider>
            <style>
              {`
              .dark,
              .dark-theme,
              :is(.dark, .dark-theme) :where(.radix-themes:not(.light, .light-theme)) {
                --color-background: #0a0a0a;
              }
            `}
            </style>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
