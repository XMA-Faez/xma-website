"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Main packages data
const packages = [
  {
    name: "Base",
    price: "8,000",
    currency: "AED",
    usdPrice: "2,300",
    popular: false,
    features: [
      { text: "8 Total Ads", bold: true, included: true },
      { text: "5 Static Ads", included: true },
      { text: "3 Video Ads", included: true },
      { text: "Ad Campaign(s) Set-up", included: true },
      { text: "CRM", included: true },
      { text: "WhatsApp Integration", included: true },
    ],
    description:
      "Our Base package is perfect for businesses just starting their digital marketing journey. It provides essential advertising assets and foundational tools to establish your online presence and begin generating leads.",
  },
  {
    name: "Standard",
    price: "15,000",
    currency: "AED",
    usdPrice: "4,500",
    popular: true,
    features: [
      { text: "18 Total Ads", bold: true, included: true },
      { text: "10 Static Ads", included: true },
      { text: "8 Video Ads", included: true },
      { text: "Ad Campaign(s) Set-up", included: true },
      { text: "CRM", included: true },
      { text: "WhatsApp Integration", included: true },
    ],
    description:
      "Our most popular option, the Standard package delivers the perfect balance of value and performance. With more than double the advertising assets of the Base package, it gives you the resources needed to create a comprehensive marketing strategy.",
  },
  {
    name: "Premium",
    price: "25,000",
    currency: "AED",
    usdPrice: "6,800",
    popular: false,
    features: [
      { text: "34 Total Ads", bold: true, included: true },
      { text: "20 Static Ads", included: true },
      { text: "14 Video Ads", included: true },
      { text: "Ad Campaign(s) Set-up", included: true },
      { text: "CRM", included: true },
      { text: "WhatsApp Integration", included: true },
    ],
    description:
      "The Premium package is designed for businesses ready to dominate their market. With our most comprehensive set of advertising assets and full-service implementation, this package delivers maximum impact and results.",
  },
];

// Standalone products/services
const standaloneServices = [
  {
    id: 1,
    name: "Website Optimization",
    price: 5000,
    currency: "AED",
    description:
      "Transform your existing website into a high-converting sales machine. Our optimization service includes speed improvements, SEO enhancements, mobile responsiveness, and conversion rate optimization to ensure your website performs at its best.",
  },
  {
    id: 2,
    name: "Website Creation",
    price: 10000,
    currency: "AED",
    description:
      "Get a professionally designed, custom-built website that perfectly represents your brand. Includes responsive design, SEO optimization, content management system, contact forms, and integration with your marketing tools.",
  },
  {
    id: 3,
    name: "CRM",
    price: 3000,
    setupFee: 300,
    monthly: true,
    currency: "AED",
    description:
      "Our CRM solution helps you manage customer relationships effectively. Includes lead capture, customer segmentation, automated follow-ups, sales pipeline management, and detailed reporting. Setup fee plus monthly subscription.",
  },
  {
    id: 4,
    name: "Content Package",
    price: 7500,
    currency: "AED",
    description:
      "Get 5 professionally produced videos to showcase your products or services. Our content team handles everything from concept to final delivery, ensuring high-quality videos that engage your audience and drive conversions.",
  },
];

// Terms and Conditions
const termsAndConditions = [
  "1. Payment Terms: 50% deposit required to initiate the project, with the remaining 50% due upon completion.",
  "2. Revisions: Package includes up to 2 rounds of revisions for each deliverable. Additional revisions will be billed at our standard hourly rate.",
  "3. Timeline: Estimated completion time is 4-6 weeks from project start date, dependent on client feedback turnaround times.",
  "4. Content: Client is responsible for providing necessary content (text, product information, etc.) within 7 days of project start.",
  "5. Intellectual Property: Upon full payment, client receives full rights to all deliverables created specifically for this project.",
  "6. Cancellation: In case of cancellation, client is responsible for payment of all work completed up to the cancellation date.",
  "7. Confidentiality: XMA Agency agrees to maintain confidentiality of all client information.",
  "8. Additional Services: Any services not specified in this proposal will require a separate agreement.",
  "9. Validity: This proposal is valid for 30 days from the date issued.",
];

// Utility function for decoding proposal data
const decodeProposalData = (encodedData) => {
  try {
    const jsonString = decodeURIComponent(atob(encodedData));
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error decoding proposal data:", error);
    return null;
  }
};

const ProposalPage = () => {
  const searchParams = useSearchParams();
  const proposalParam = searchParams.get("proposal");

  const [proposalData, setProposalData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (proposalParam) {
      try {
        const decodedData = decodeProposalData(proposalParam);
        if (decodedData) {
          setProposalData(decodedData);
        } else {
          setError("Invalid proposal data");
        }
      } catch (error) {
        setError("Failed to parse proposal data");
        console.error(error);
      }
    } else {
      setError("No proposal data found");
    }
    setIsLoading(false);
  }, [proposalParam]);

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!proposalData) return "0";

    const packagePrice = parseInt(
      packages[proposalData.selectedPackageIndex].price.replace(/,/g, ""),
    );

    const servicesPrice = proposalData.selectedServices.reduce(
      (total, service) => total + service.price,
      0,
    );

    return new Intl.NumberFormat("en-US").format(packagePrice + servicesPrice);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !proposalData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white p-4">
        <div className="text-center max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-red-500 mx-auto mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Proposal Not Found
          </h1>
          <p className="mb-6 text-zinc-400">
            {error ||
              "The proposal you're looking for doesn't exist or has expired."}
          </p>
          <Link
            href="/"
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  const selectedPackage = packages[proposalData.selectedPackageIndex];

  return (
    <div className="min-h-screen bg-zinc-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-800 rounded-lg p-6 mb-8 shadow-xl">
          {/* Proposal Header */}
          <div className="mb-8 text-center border-b border-zinc-700 pb-8">
            <img
              src="/XMA-White.svg"
              alt="XMA Agency Logo"
              className="h-12 mx-auto mb-6"
            />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-2">
              MARKETING PROPOSAL
            </h1>
            <p className="text-zinc-400">
              Prepared exclusively for {proposalData.companyName}
            </p>
          </div>

          {/* Client Information */}
          <div className="mb-8 pb-6 border-b border-zinc-700">
            <h2 className="text-xl font-bold mb-4 text-red-500">
              Client Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-zinc-900/50 p-4 rounded-lg">
                <p className="text-sm text-zinc-400">Client Name:</p>
                <p className="font-medium">{proposalData.clientName}</p>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded-lg">
                <p className="text-sm text-zinc-400">Company:</p>
                <p className="font-medium">{proposalData.companyName}</p>
              </div>
              <div className="bg-zinc-900/50 p-4 rounded-lg">
                <p className="text-sm text-zinc-400">Proposal Date:</p>
                <p className="font-medium">{proposalData.proposalDate}</p>
              </div>
            </div>
          </div>

          {/* Project Details - Additional Information */}
          {proposalData.additionalInfo && (
            <div className="mb-8 pb-6 border-b border-zinc-700">
              <h2 className="text-xl font-bold mb-4 text-red-500">
                Project Details
              </h2>
              <div className="bg-zinc-900/50 p-5 rounded-lg">
                <div className="whitespace-pre-wrap text-zinc-300">
                  {proposalData.additionalInfo}
                </div>
              </div>
            </div>
          )}

          {/* Selected Package */}
          <div className="mb-8 pb-6 border-b border-zinc-700">
            <h2 className="text-xl font-bold mb-4 text-red-500">
              Selected Package
            </h2>
            <div className="bg-zinc-900 p-5 rounded-lg">
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold">
                    {selectedPackage.name} Package
                  </h3>
                  <p className="text-sm text-zinc-400">
                    {selectedPackage.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">
                    {selectedPackage.price} {selectedPackage.currency}
                  </div>
                  <div className="text-sm text-zinc-400">
                    ${selectedPackage.usdPrice} USD
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {selectedPackage.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={feature.bold ? "font-medium" : ""}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Services */}
          {proposalData.selectedServices.length > 0 && (
            <div className="mb-8 pb-6 border-b border-zinc-700">
              <h2 className="text-xl font-bold mb-4 text-red-500">
                Additional Services
              </h2>
              <div className="space-y-4">
                {proposalData.selectedServices.map((service, index) => (
                  <div key={index} className="bg-zinc-900 p-4 rounded-lg">
                    <div className="flex flex-wrap justify-between items-start">
                      <div>
                        <h3 className="font-medium">{service.name}</h3>
                        <p className="text-sm text-zinc-400 mt-1">
                          {service.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">
                          {service.price} {service.currency}
                        </div>
                        {service.monthly && (
                          <div className="text-sm text-zinc-400">
                            +{service.setupFee} {service.currency}/month
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total Investment */}
          <div className="mb-8 pb-6 border-b border-zinc-700">
            <h2 className="text-xl font-bold mb-4 text-red-500">
              Total Investment
            </h2>
            <div className="bg-zinc-900 p-5 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg">Total One-Time Investment:</span>
                <span className="text-2xl font-bold">
                  {calculateTotalPrice()} AED
                </span>
              </div>

              {proposalData.selectedServices.some(
                (service) => service.monthly,
              ) && (
                <div className="text-sm text-zinc-400 mt-2">
                  *Plus any applicable monthly fees as detailed above
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-zinc-700">
                <p className="text-sm text-zinc-400">
                  This proposal is valid for 30 days from the date issued. To
                  proceed, please contact us at{" "}
                  <a
                    href="mailto:admin@xmaagency.com"
                    className="text-red-400 hover:text-red-300"
                  >
                    admin@xmaagency.com
                  </a>{" "}
                  or call{" "}
                  <a
                    href="tel:+971503636856"
                    className="text-red-400 hover:text-red-300"
                  >
                    +971 50 363 6856
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-red-500">
              Terms and Conditions
            </h2>
            <div className="bg-zinc-900 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {termsAndConditions.map((term, index) => (
                  <p key={index} className="text-sm text-zinc-300">
                    {term}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-6 mb-6">
            <a
              href="mailto:admin@xmaagency.com"
              className="flex items-center text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              admin@xmaagency.com
            </a>
            <a
              href="tel:+971503636856"
              className="flex items-center text-zinc-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +971 50 363 6856
            </a>
          </div>
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} XMA Agency. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProposalPage;
