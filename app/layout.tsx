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
      {
        url: "/logos/xma/SVG/Logo Light.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
      },
      {
        url: "/logos/xma/SVG/Logo Dark.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/web-app-manifest-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
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
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link
          rel="icon"
          href="/logos/xma/SVG/Logo Light.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/logos/xma/SVG/Logo Dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
      </head>
      <body className={`antialiased`}>
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
          enableSystem
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
                --color-background: #080808;
              }
            `}
            </style>
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
