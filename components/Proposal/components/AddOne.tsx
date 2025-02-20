import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { addOns } from "@/data/proposalData";

const AddOns = ({ selectedAddOns = [], onAddOnToggle }) => {
  return (
    <Card className="bg-zinc-950 border-zinc-800">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-white">Additional Services</CardTitle>
          <p className="text-sm text-zinc-400">
            Select additional services to enhance your package
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-lg border border-zinc-800">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left bg-zinc-900/50 p-4 text-zinc-400 font-medium">
                  Feature
                </th>
                <th className="text-right bg-zinc-900/50 p-4 text-zinc-400 font-medium">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {addOns.map((addon) => {
                const isSelected = selectedAddOns.includes(addon.id);
                return (
                  <tr
                    key={addon.id}
                    onClick={() => onAddOnToggle(addon.id)}
                    className={`
                      border-b border-zinc-800 last:border-0
                      cursor-pointer transition-all
                      ${isSelected ? "bg-red-500/10 hover:bg-red-500/20" : "hover:bg-zinc-800/50"}
                    `}
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                          w-5 h-5 rounded border flex items-center justify-center
                          ${
                            isSelected
                              ? "bg-red-500 border-red-500"
                              : "border-zinc-600"
                          }
                        `}
                        >
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="text-zinc-100">{addon.feature}</div>
                          <div className="text-xs text-zinc-400">
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

        <p className="mt-4 text-sm text-zinc-400 italic">
          * Prices may vary based on specific requirements
        </p>
      </CardContent>
    </Card>
  );
};

export default AddOns;
