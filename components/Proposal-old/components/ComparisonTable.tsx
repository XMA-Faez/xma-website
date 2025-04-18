import React from "react";
import { Check, X } from "lucide-react";

const ComparisonTable = ({
  features,
  tiers = ["base", "standard", "premium"],
}) => {
  const renderCell = (value) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="text-red-400 w-4 h-4 sm:w-5 sm:h-5 mx-auto" />
      ) : (
        <X className="text-zinc-600 w-4 h-4 sm:w-5 sm:h-5 mx-auto" />
      );
    }
    return <span className="text-zinc-300 text-sm sm:text-base">{value}</span>;
  };

  return (
    <div className="border border-zinc-700 rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-900/50">
            <th className="p-3 sm:p-4 text-left text-xs sm:text-sm text-zinc-400 font-medium">
              Features
            </th>
            {tiers.map((tier) => (
              <th
                key={tier}
                className="p-3 sm:p-4 text-center text-xs sm:text-sm text-red-400 font-bold capitalize"
              >
                {tier}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-t border-zinc-700">
              <td className="p-3 sm:p-4 text-zinc-400 text-xs sm:text-sm">
                {typeof feature === "object" ? feature.name : feature}
              </td>
              {tiers.map((tier) => (
                <td key={`${index}-${tier}`} className="p-3 sm:p-4 text-center">
                  {renderCell(feature[tier])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
