"use client";
import React, { useState } from "react";
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

// Service Info Component
const ServiceInfo = ({ service }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="relative">
      <div
        className="text-blue-400 cursor-pointer hover:text-blue-300 ml-2"
        onClick={() => setShowInfo(!showInfo)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 inline"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {showInfo && (
        <div className="absolute z-10 top-0 left-6 w-64 p-3 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg text-sm">
          {service.description}
        </div>
      )}
    </div>
  );
};

// Package Card Component
const PackageCard = ({ pkg, index, isSelected, onSelect }) => (
  <div
    className={`flex mt-0 md:mt-${index === 1 ? "0" : "4"} flex-col h-full rounded-xl border ${
      isSelected ? "border-red-500 shadow-lg" : "border-zinc-700"
    } ${
      pkg.popular && !isSelected ? "border-zinc-600" : ""
    } bg-zinc-900 backdrop-blur-sm transition-all hover:shadow-xl cursor-pointer`}
    onClick={() => onSelect(index)}
  >
    {pkg.popular && (
      <div className="bg-red-600 text-white text-center py-1 px-4 text-sm font-medium rounded-t-xl">
        Most Popular
      </div>
    )}
    <div className="p-6 flex flex-col h-full">
      <h3
        className={`text-xl font-bold ${pkg.popular ? "text-red-500" : "text-white"} mb-2`}
      >
        {pkg.name}
      </h3>
      <div className="mb-6">
        <div className="flex items-end">
          <span className="text-3xl font-bold text-white">{pkg.price}</span>
          <span className="text-zinc-400 ml-2 mb-1">{pkg.currency}</span>
        </div>
        <div className="text-zinc-400 text-sm mt-1">${pkg.usdPrice} USD</div>
      </div>
      <div className="flex-grow">
        <ul className="space-y-3">
          {pkg.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center ml-0">
              <div className="mr-2 mt-0.5">
                {feature.included ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-zinc-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span
                className={`${feature.included ? "" : "text-zinc-500"} ${feature.bold ? "font-bold" : ""}`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 text-sm text-zinc-400">{pkg.description}</div>
      <div
        className={`mt-4 w-full py-2 text-center rounded-md ${
          isSelected
            ? "bg-red-600 text-white font-medium"
            : "bg-zinc-800 text-zinc-300"
        }`}
      >
        {isSelected ? "Selected" : "Select Package"}
      </div>
    </div>
  </div>
);

// Utility function for base64 encoding
const encodeProposalData = (data) => {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(encodeURIComponent(jsonString));
  } catch (error) {
    console.error("Error encoding proposal data:", error);
    return null;
  }
};

// Main Component
const ProposalGenerator = () => {
  // State for form inputs
  const [clientName, setClientName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [proposalDate, setProposalDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(1); // Default to Standard package
  const [selectedServices, setSelectedServices] = useState([]);
  const [showProposal, setShowProposal] = useState(false);
  const [proposalLink, setProposalLink] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  
  // Calculate total price
  const calculateTotalPrice = () => {
    const packagePrice = parseInt(
      packages[selectedPackageIndex].price.replace(/,/g, ""),
    );
    const servicesPrice = selectedServices.reduce(
      (total, service) => total + service.price,
      0,
    );
    return new Intl.NumberFormat("en-US").format(packagePrice + servicesPrice);
  };

  // Toggle service selection
  const toggleService = (service) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  // Generate proposal and shareable link
  const generateProposal = (e) => {
    e.preventDefault();
    
    // Generate shareable link automatically
    generateShareableLink();
    
    setShowProposal(true);
  };
  
  // Generate shareable link
  const generateShareableLink = () => {
    // Create proposal data object
    const proposalData = {
      clientName,
      companyName,
      proposalDate,
      additionalInfo,
      selectedPackageIndex,
      selectedServices,
    };
    
    // Encode data for URL
    const encodedData = encodeProposalData(proposalData);
    
    // Create shareable link
    const baseUrl = window.location.origin;
    const url = `${baseUrl}/proposal?proposal=${encodedData}`;
    
    setProposalLink(url);
  };

  // Copy link to clipboard
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(proposalLink).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 3000);
    });
  };

  // Back to generator
  const backToGenerator = () => {
    setShowProposal(false);
    setProposalLink("");
  };

  return (
    <div className="min-h-screen pt-40 bg-zinc-900 text-white py-8">
      <div className="container mx-auto px-4">
        {!showProposal ? (
          // Proposal Generator Form
          <div>
            <div className="text-center mb-12">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Proposal Generator
              </h1>
              <p className="text-zinc-400 mt-2">
                Create a customized proposal for your client
              </p>
            </div>

            <form onSubmit={generateProposal} className="max-w-6xl mx-auto">
              {/* Client Information */}
              <div className="bg-zinc-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-red-500">
                  Client Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      Client Name*
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      Company Name*
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Proposal Date*
                  </label>
                  <input
                    type="date"
                    value={proposalDate}
                    onChange={(e) => setProposalDate(e.target.value)}
                    className="w-full bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                
                <div className="mt-4">
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                    placeholder="Add any specific requirements, project details, or notes for the client..."
                    className="w-full h-32 bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <p className="text-xs text-zinc-500 mt-1">
                    This information will be displayed in the proposal and can include project scope, timeline expectations, or any other relevant details.
                  </p>
                </div>
              </div>

              {/* Package Selection */}
              <div className="bg-zinc-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-red-500">
                  Select Package
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {packages.map((pkg, index) => (
                    <PackageCard
                      key={index}
                      pkg={pkg}
                      index={index}
                      isSelected={selectedPackageIndex === index}
                      onSelect={setSelectedPackageIndex}
                    />
                  ))}
                </div>
              </div>

              {/* Additional Services */}
              <div className="bg-zinc-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-red-500">
                  Additional Services (Optional)
                </h2>
                <div className="space-y-4">
                  {standaloneServices.map((service) => (
                    <div key={service.id} className="flex items-start">
                      <input
                        type="checkbox"
                        id={`service-${service.id}`}
                        checked={selectedServices.some(
                          (s) => s.id === service.id,
                        )}
                        onChange={() => toggleService(service)}
                        className="mt-1 h-4 w-4 text-red-600 focus:ring-red-500 border-zinc-600 rounded bg-zinc-700"
                      />
                      <label
                        htmlFor={`service-${service.id}`}
                        className="ml-3 flex items-center"
                      >
                        <div>
                          <span className="block font-medium">
                            {service.name} - {service.price} {service.currency}
                            {service.monthly && ` + ${service.setupFee}/mo`}
                          </span>
                          <span className="block text-sm text-zinc-400">
                            {service.description.substring(0, 80)}...
                          </span>
                        </div>
                        <ServiceInfo service={service} />
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-zinc-800 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold mb-4 text-red-500">Summary</h2>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Total Investment:</span>
                  <span className="text-2xl font-bold">
                    {calculateTotalPrice()} AED
                  </span>
                </div>
                <p className="text-sm text-zinc-400 mt-2">
                  (Excluding any monthly fees)
                </p>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
                >
                  Generate Proposal
                </button>
              </div>
            </form>
          </div>
        ) : (
          // Proposal Preview
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                Proposal Preview
              </h1>
              <p className="text-zinc-400 mt-2">
                Review your proposal before sharing
              </p>
            </div>

            {/* Shareable Link Section */}
            {proposalLink && (
              <div className="mb-8 bg-zinc-800 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-red-500">
                  Shareable Proposal Link
                </h3>
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <input
                    type="text"
                    value={proposalLink}
                    readOnly
                    className="flex-grow bg-zinc-700 border border-zinc-600 rounded-md px-3 py-2 text-white focus:outline-none w-full md:w-auto"
                  />
                  <button
                    onClick={copyLinkToClipboard}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors whitespace-nowrap w-full md:w-auto"
                  >
                    {linkCopied ? "Copied!" : "Copy Link"}
                  </button>
                </div>
                <div className="mt-4 text-sm text-zinc-400">
                  <p>Share this link with your client to let them view the proposal.</p>
                  <p className="mt-2">The link contains all the proposal information and can be accessed without requiring login.</p>
                </div>
                
                <div className="mt-6 flex flex-col md:flex-row gap-4">
                  <a 
                    href={proposalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md transition-colors text-center"
                  >
                    Open in New Tab
                  </a>
                  <button
                    onClick={() => {
                      // Create a direct email link with subject and body
                      const subject = encodeURIComponent(`Marketing Proposal for ${companyName}`);
                      const body = encodeURIComponent(`Dear ${clientName},\n\nThank you for your interest in XMA Agency. We've prepared a custom marketing proposal for ${companyName}.\n\nYou can view your proposal here: ${proposalLink}\n\nPlease let us know if you have any questions.\n\nBest regards,\nXMA Agency Team`);
                      window.location.href = `mailto:?subject=${subject}&body=${body}`;
                    }}
                    className="bg-zinc-700 hover:bg-zinc-600 text-white px-4 py-2 rounded-md transition-colors text-center"
                  >
                    Email This Link
                  </button>
                </div>
              </div>
            )}

            <div className="bg-zinc-800 rounded-lg p-6 mb-8">
              <div className="mb-4 text-center">
                <img
                  src="/XMA-White.svg"
                  alt="XMA Agency Logo"
                  className="h-10 mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-red-500">
                  XMA AGENCY PROPOSAL
                </h2>
              </div>

              {/* Client Information */}
              <div className="mb-6 pb-6 border-b border-zinc-700">
                <h3 className="text-lg font-bold mb-2 text-red-500">
                  Client Information
                </h3>
                <p>
                  <span className="font-medium">Name:</span> {clientName}
                </p>
                <p>
                  <span className="font-medium">Company:</span> {companyName}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {proposalDate}
                </p>
              </div>
              
              {additionalInfo && (
                <div className="mb-6 pb-6 border-b border-zinc-700">
                  <h3 className="text-lg font-bold mb-2 text-red-500">
                    Project Details
                  </h3>
                  <div className="bg-zinc-900 p-4 rounded-lg whitespace-pre-wrap">
                    {additionalInfo}
                  </div>
                </div>
              )}

              {/* Selected Package */}
              <div className="mb-6 pb-6 border-b border-zinc-700">
                <h3 className="text-lg font-bold mb-2 text-red-500">
                  Selected Package
                </h3>
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <h4 className="font-bold">
                    {packages[selectedPackageIndex].name} Package -{" "}
                    {packages[selectedPackageIndex].price}{" "}
                    {packages[selectedPackageIndex].currency}
                  </h4>
                  <ul className="mt-2 space-y-1">
                    {packages[selectedPackageIndex].features.map(
                      (feature, index) => (
                        <li key={index} className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-red-500 mr-2"
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
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              {/* Additional Services */}
              {selectedServices.length > 0 && (
                <div className="mb-6 pb-6 border-b border-zinc-700">
                  <h3 className="text-lg font-bold mb-2 text-red-500">
                    Additional Services
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-zinc-700">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                            Service
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-zinc-400 uppercase tracking-wider">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-700">
                        {selectedServices.map((service, index) => (
                          <tr key={index}>
                            <td className="px-4 py-2">{service.name}</td>
                            <td className="px-4 py-2">
                              {service.price} {service.currency}
                              {service.monthly && ` + ${service.setupFee}/mo`}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Total Price */}
              <div className="mb-6 pb-6 border-b border-zinc-700">
                <h3 className="text-lg font-bold mb-2 text-red-500">
                  Total Investment
                </h3>
                <p className="text-xl font-bold">{calculateTotalPrice()} AED</p>
                <p className="text-sm text-zinc-400">
                  (Excluding any monthly fees)
                </p>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2 text-red-500">
                  Terms and Conditions
                </h3>
                <div className="bg-zinc-900 p-4 rounded-lg">
                  {termsAndConditions.map((term, index) => (
                    <p key={index} className="text-sm mb-2">
                      {term}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-12">
              <button
                onClick={backToGenerator}
                className="bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Back to Generator
              </button>

              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={copyLinkToClipboard}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  {linkCopied ? "Link Copied!" : "Copy Link"}
                </button>
                
                <Link
                  href={proposalLink}
                  target="_blank"
                  className="bg-zinc-700 hover:bg-zinc-600 text-white font-medium py-2 px-6 rounded-lg transition-colors text-center"
                >
                  View Final Proposal
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProposalGenerator;

