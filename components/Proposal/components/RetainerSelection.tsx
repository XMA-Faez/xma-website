import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ComparisonToggleButton from "./ComparisonToggleButton";
import ComparisonTable from "./ComparisonTable";
import FeatureCard from "./FeatureCard";

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
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl sm:text-2xl text-white">
            Monthly Retainer Selection
          </CardTitle>
          <ComparisonToggleButton
            isExpanded={isExpanded}
            onClick={onToggleExpand}
          />
        </div>
      </CardHeader>
    </Card>
  );
};

export default RetainerSelection;
