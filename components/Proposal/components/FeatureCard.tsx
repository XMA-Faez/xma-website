import React from "react";
import { Check, X } from "lucide-react";

const FeatureCard = ({
  name,
  price,
  usdPrice,
  features,
  isSelected,
  onClick,
  renderFeature,
}) => {
  // Default feature renderer if none provided
  const defaultFeatureRenderer = (feature, value) => (
    <li
      key={typeof feature === "string" ? feature : feature.toString()}
      className="flex items-start sm:items-center gap-2 text-zinc-300"
    >
      {typeof value === "boolean" ? (
        value ? (
          <Check className="text-red-400 mt-1 sm:mt-0" size={16} />
        ) : (
          <X className="text-zinc-600 mt-1 sm:mt-0" size={16} />
        )
      ) : (
        <Check className="text-red-400 mt-1 sm:mt-0" size={16} />
      )}
      <span className="text-sm sm:text-base">
        {typeof feature === "object"
          ? feature
          : `${feature}${value !== true ? `: ${value}` : ""}`}
      </span>
    </li>
  );

  return (
    <div
      className={`p-4 sm:p-6 rounded-lg border-2 cursor-pointer transition-all h-full ${
        isSelected
          ? "border-red-500 bg-red-900/20"
          : "border-zinc-800 hover:border-zinc-600 bg-zinc-900"
      }`}
      onClick={onClick}
    >
      <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">{name}</h3>
      <div className="text-xl sm:text-2xl font-semibold mb-1 text-white">
        {price}
      </div>
      {usdPrice && (
        <div className="text-sm sm:text-base text-zinc-400 mb-4">
          {usdPrice}
        </div>
      )}
      <ul className="space-y-3">
        {Array.isArray(features)
          ? features.map((feature, index) =>
              defaultFeatureRenderer(feature, true),
            )
          : Object.entries(features).map(([feature, value]) =>
              renderFeature
                ? renderFeature(feature, value)
                : defaultFeatureRenderer(feature, value),
            )}
      </ul>
    </div>
  );
};

export default FeatureCard;
