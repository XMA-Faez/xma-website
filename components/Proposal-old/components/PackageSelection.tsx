import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ComparisonToggleButton from "./ComparisonToggleButton";
import ComparisonTable from "./ComparisonTable";
import FeatureCard from "./FeatureCard";
import { packages, packageFeatures } from "@/data/proposalData";

const PackageSelection = ({ selectedPackage, onPackageSelect }) => {
  const [isComparisonExpanded, setIsComparisonExtended] = useState(false);

  function onToggleComparisonExpand() {
    setIsComparisonExtended(!isComparisonExpanded);
  }

  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <CardTitle className="text-xl sm:text-2xl text-white">
              Choose Your Package
            </CardTitle>
            <p className="text-sm text-zinc-400">
              Select the perfect package for your business needs
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

          <div className="mx-auto w-fit">
            <ComparisonToggleButton
            isExpanded={isComparisonExpanded}
            onClick={onToggleComparisonExpand}
          />
          </div>
        {isComparisonExpanded && (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <div className="min-w-[640px] px-4 sm:px-0">
              <ComparisonTable
                features={packageFeatures}
                tiers={["base", "standard", "premium"]}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PackageSelection;
