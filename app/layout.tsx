import { Theme } from "@radix-ui/themes";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "@radix-ui/themes/styles.css";
import "./globals.css";

import Footer from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import { PostHogProvider } from "@/components/PostHogProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "XMA Agency",
  description: "XMA Agency is a digital marketing agency.",
  appleWebApp: {
    title: "XMA Agency",
    statusBarStyle: "black-translucent",
  }
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="b4Ruz4qrwE5l_HVaxaP5_Nysz4MGIQaCWg8xYkKrJcM" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Theme appearance="dark" grayColor="slate">
          <PostHogProvider>
            {/* <AnimatedCursorComponent /> */}
            <Header />
            <SpeedInsights />
            <main className="bg-zinc-950">{children}</main>
            <Analytics />
            <Footer />
            <style>
              {`
            .dark,
            .dark-theme,
            :is(.dark, .dark-theme) :where(.radix-themes:not(.light, .light-theme)) {
              --color-background: #080808;
            }
          `}
            </style>
          </PostHogProvider>
        </Theme>
      </body>
    </html>
  );
}
