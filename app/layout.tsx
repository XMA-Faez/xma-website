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
    default: "XMA Agency | Growth Systems Built to Scale Revenue",
    template: "%s | XMA Agency",
  },
  description:
    "XMA designs and implements the marketing, sales, and conversion systems companies need to generate leads, acquire customers, and grow revenue predictably.",
  keywords: [
    "growth systems agency",
    "lead generation Dubai",
    "marketing infrastructure",
    "sales pipeline automation",
    "revenue growth agency",
  ],
  authors: [{ name: "XMA Agency", url: "https://www.xma.ae" }],
  creator: "XMA Agency",
  publisher: "XMA Agency",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.xma.ae",
    siteName: "XMA Agency",
    title: "XMA Agency | Growth Systems Built to Scale Revenue",
    description:
      "XMA designs and implements the marketing, sales, and conversion systems companies need to generate leads, acquire customers, and grow revenue predictably.",
    images: [
      {
        url: "/og-image.png",
        width: 1920,
        height: 1080,
        alt: "XMA Agency - Growth Systems Built to Scale Revenue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "XMA Agency | Growth Systems Built to Scale Revenue",
    description:
      "XMA designs and implements growth systems that help businesses generate leads, acquire customers, and scale revenue.",
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
