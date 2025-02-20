"use client";
import React, { useState } from "react";
import ProposalHeader from "./components/ProposalHeader";
import PackageSelection from "./components/PackageSelection";
import PaymentSummary from "./components/PaymentSummary";

const ProposalTemplate = ({
  onPayment = () => console.log("Payment initiated"),
}) => {
  const [selectedPackage, setSelectedPackage] = useState("premium");
  const [expandedSections, setExpandedSections] = useState({
    package: false,
  });

  const handleToggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 text-zinc-100">
      <ProposalHeader />

      <PackageSelection
        selectedPackage={selectedPackage}
        onPackageSelect={setSelectedPackage}
        isExpanded={expandedSections.package}
        onToggleExpand={() => handleToggleSection("package")}
      />

      <PaymentSummary selectedPackage={selectedPackage} onPayment={onPayment} />
    </div>
  );
};

export default ProposalTemplate;
