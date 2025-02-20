import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ComparisonToggleButton from "./ComparisonToggleButton";
import ComparisonTable from "./ComparisonTable";
import FeatureCard from "./FeatureCard";
import { retainers } from "@/data/proposalData";

const RetainerSelection = ({
  selectedRetainer,
  onRetainerSelect,
  isExpanded,
  onToggleExpand,
}) => {
  // Convert retainer features to table format for comparison
  const retainerFeatures = [
    { name: "CRM Subscription", base: true, standard: true, premium: true },
    {
      name: "Single Platform Ad Management",
      base: true,
      standard: true,
      premium: true,
    },
    {
      name: "Multi Platform Ad Management",
      base: false,
      standard: true,
      premium: true,
    },
    {
      name: "WhatsApp Marketing Management",
      base: false,
      standard: true,
      premium: true,
    },
    { name: "Monthly Graphics", base: "1", standard: "4", premium: "8" },
    {
      name: "Monthly Videos",
      base: "0",
      standard: "0",
      premium: "4 in 1 Shoots",
    },
    {
      name: "Ad Management Budget",
      base: "0 - 5,000",
      standard: "5,000 - 15,000",
      premium: "15,000+",
    },
  ];

  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-white">
            Monthly Retainer Selection
          </CardTitle>
          <ComparisonToggleButton
            isExpanded={isExpanded}
            onClick={onToggleExpand}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(retainers).map(([key, retainer]) => (
            <FeatureCard
              key={key}
              name={retainer.name}
              price={retainer.price}
              features={retainer.features}
              isSelected={selectedRetainer === key}
              onClick={() => onRetainerSelect(key)}
            />
          ))}
        </div>

        {isExpanded && (
          <ComparisonTable
            features={retainerFeatures}
            tiers={["base", "standard", "premium"]}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default RetainerSelection;
