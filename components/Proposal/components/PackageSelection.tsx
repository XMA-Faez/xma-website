import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ComparisonToggleButton from "./ComparisonToggleButton";
import ComparisonTable from "./ComparisonTable";
import FeatureCard from "./FeatureCard";
import { packages, packageFeatures } from "@/data/proposalData";

const PackageSelection = ({
  selectedPackage,
  onPackageSelect,
  isExpanded,
  onToggleExpand,
}) => {
  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <CardTitle className="text-white">Choose Your Package</CardTitle>
            <p className="text-sm text-zinc-400">
              Select the perfect package for your business needs
            </p>
          </div>
          <ComparisonToggleButton
            isExpanded={isExpanded}
            onClick={onToggleExpand}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(packages).map(([key, pkg]) => (
            <FeatureCard
              key={key}
              name={pkg.name}
              price={pkg.price}
              usdPrice={pkg.usdPrice}
              features={pkg.features}
              isSelected={selectedPackage === key}
              onClick={() => onPackageSelect(key)}
            />
          ))}
        </div>

        {isExpanded && (
          <ComparisonTable
            features={packageFeatures}
            tiers={["base", "standard", "premium"]}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PackageSelection;
