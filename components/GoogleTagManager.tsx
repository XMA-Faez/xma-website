'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { GTM_ID, GA_MEASUREMENT_ID, GOOGLE_ADS_ID, pageview, initializeRemarketing } from '@/lib/google-ads';

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function GoogleTagManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      pageview(url);
      initializeRemarketing();
    }
  }, [pathname, searchParams]);

  if (!GTM_ID || !GA_MEASUREMENT_ID || !GOOGLE_ADS_ID) {
    console.warn('Google tracking IDs not configured');
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />

      {/* Global Site Tag (gtag.js) - Google Analytics & Google Ads */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Google Analytics configuration
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
            
            // Google Ads configuration
            gtag('config', '${GOOGLE_ADS_ID}', {
              page_path: window.location.pathname,
            });
            
            // Enhanced conversions setup
            gtag('config', '${GOOGLE_ADS_ID}', {
              'allow_enhanced_conversions': true
            });
          `,
        }}
      />

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

// Component for enhanced conversion tracking with user data
export function EnhancedConversionScript({ email, phone }: { email?: string; phone?: string }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag && (email || phone)) {
      // Hash sensitive data before sending
      const hashedEmail = email ? btoa(email.toLowerCase()) : undefined;
      const hashedPhone = phone ? btoa(phone.replace(/\D/g, '')) : undefined;
      
      window.gtag('set', 'user_data', {
        email: hashedEmail,
        phone_number: hashedPhone,
      });
    }
  }, [email, phone]);

  return null;
}