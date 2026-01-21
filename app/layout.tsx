import { Theme } from "@radix-ui/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "./globals.css";

import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { GlobalAnalyticsProvider } from "@/components/tracking/GlobalAnalyticsProvider";
import Script from "next/script";
import {
  DM_Sans,
  Inter,
  Manrope,
  Outfit,
  Zalando_Sans,
} from "next/font/google";

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
  title: "XMA Agency",
  description: "XMA Agency is a digital marketing agency.",
  appleWebApp: {
    title: "XMA Agency",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WDR7CP7Z');`,
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17530915091"
          strategy="afterInteractive"
        />
        <Script
          id="google-ads-gtag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-17530915091');`,
          }}
        />
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WDR7CP7Z"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
