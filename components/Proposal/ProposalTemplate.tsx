"use client";
import React, { useState } from "react";
import ProposalHeader from "./components/ProposalHeader";
import PackageSelection from "./components/PackageSelection";
import AddOns from "./components/AddOne";
import PaymentSummary from "./components/PaymentSummary";

const ProposalTemplate = ({
  onPayment = () => console.log("Payment initiated"),
}) => {
  const [selectedPackage, setSelectedPackage] = useState("premium");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [expandedSections, setExpandedSections] = useState({
    package: false,
  });

  const handleToggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleAddOnToggle = (addonId) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId],
    );
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

      <AddOns
        selectedAddOns={selectedAddOns}
        onAddOnToggle={handleAddOnToggle}
      />

      <PaymentSummary
        selectedPackage={selectedPackage}
        selectedAddOns={selectedAddOns}
        onPayment={onPayment}
      />
    </div>
  );
};

export default ProposalTemplate;
