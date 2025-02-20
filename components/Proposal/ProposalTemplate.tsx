"use client";

import React, { useState } from "react";
import { PackageType, AddonType } from "@/utils/stripe";
import PackageSelection from "./components/PackageSelection";
import AddOns from "./components/AddOne";
import PaymentSummary from "./components/PaymentSummary";
import ProposalHeader from "./components/ProposalHeader";

export default function ProposalTemplate() {
  const [selectedPackage, setSelectedPackage] =
    useState<PackageType>("premium");
  const [selectedAddOns, setSelectedAddOns] = useState<AddonType[]>([]);

  const handleAddOnToggle = (addonId: AddonType) => {
    console.log("Toggling addon:", addonId); // Debug log
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
      />

      <AddOns
        selectedAddOns={selectedAddOns}
        onAddOnToggle={handleAddOnToggle}
      />

      <PaymentSummary
        selectedPackage={selectedPackage}
        selectedAddOns={selectedAddOns}
      />
    </div>
  );
}
