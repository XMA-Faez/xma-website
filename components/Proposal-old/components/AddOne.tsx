import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { AddonType } from "@/utils/stripe";
import { addOns } from "@/data/proposalData";

interface AddOnsProps {
  selectedAddOns: AddonType[];
  onAddOnToggle: (addonId: AddonType) => void;
}

export default function AddOns({ selectedAddOns, onAddOnToggle }: AddOnsProps) {
  const handleClick = (addonId: AddonType) => {
    onAddOnToggle(addonId);
  };

  // Mobile card view component
  const MobileView = () => (
    <div className="space-y-4">
      {addOns.map((addon) => {
        const isSelected = selectedAddOns.includes(addon.id as AddonType);
        return (
          <div
            key={addon.id}
            className={`
              p-4 rounded-lg border cursor-pointer transition-all
              ${isSelected ? "border-red-500 bg-red-500/10" : "border-zinc-800 bg-zinc-900"}
              hover:border-zinc-600
            `}
            onClick={() => handleClick(addon.id as AddonType)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <div
                    className={`
                      w-5 h-5 mt-1 rounded border flex-shrink-0 flex items-center justify-center
                      ${isSelected ? "bg-red-500 border-red-500" : "border-zinc-600"}
                    `}
                  >
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <div className="font-medium text-zinc-100">
                      {addon.feature}
                    </div>
                    <div className="text-sm text-zinc-400 mt-1">
                      {addon.description}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right font-medium text-red-400">
                {addon.price}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // Desktop table view component
  const DesktopView = () => (
    <div className="border border-zinc-800 rounded-lg overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="text-left bg-zinc-900/50 p-4 text-zinc-400 font-medium">
              Service
            </th>
            <th className="text-right bg-zinc-900/50 p-4 text-zinc-400 font-medium">
              Price
            </th>
          </tr>
        </thead>
        <tbody>
          {addOns.map((addon) => {
            const isSelected = selectedAddOns.includes(addon.id as AddonType);
            return (
              <tr
                key={addon.id}
                className={`
                  border-b border-zinc-800 last:border-0
                  cursor-pointer transition-all
                  ${isSelected ? "bg-red-500/10" : ""}
                  hover:bg-zinc-800/50
                `}
                onClick={() => handleClick(addon.id as AddonType)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`
                        w-5 h-5 rounded border flex items-center justify-center
                        ${isSelected ? "bg-red-500 border-red-500" : "border-zinc-600"}
                      `}
                    >
                      {isSelected && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <div className="text-zinc-100">{addon.feature}</div>
                      <div className="text-sm text-zinc-400">
                        {addon.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-right font-medium text-red-400">
                  {addon.price}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardHeader className="p-4 md:p-6">
        <div className="space-y-1">
          <CardTitle className="text-xl md:text-2xl text-white">
            Additional Services
          </CardTitle>
          <p className="text-sm text-zinc-400">
            Select additional services to enhance your package
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4 md:p-6">
        {/* Mobile view (hidden on md and above) */}
        <div className="md:hidden">
          <MobileView />
        </div>

        {/* Desktop view (hidden on smaller than md) */}
        <div className="hidden md:block">
          <DesktopView />
        </div>
      </CardContent>
    </Card>
  );
}
