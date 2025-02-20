"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { AddonType } from "@/utils/stripe";

interface AddOnsProps {
  selectedAddOns: AddonType[];
  onAddOnToggle: (addonId: AddonType) => void;
}

const ADDONS = [
  {
    id: "website_design" as AddonType,
    name: "Website Design",
    description: "Custom website design tailored to your brand",
    price: "8,000 AED",
  },
  {
    id: "website_redesign" as AddonType,
    name: "Website Redesign",
    description: "Refresh and update your existing website",
    price: "4,000 AED",
  },
  {
    id: "logo_design" as AddonType,
    name: "Logo Design",
    description: "Professional logo design with multiple concepts",
    price: "2,000 AED",
  },
  {
    id: "business_email" as AddonType,
    name: "Business Email",
    description: "Professional email setup with your domain",
    price: "500 AED",
  },
  {
    id: "hosting" as AddonType,
    name: "Hosting",
    description: "Reliable web hosting for your website",
    price: "500 AED",
  },
  {
    id: "domain" as AddonType,
    name: "Domain",
    description: "Domain registration for one year",
    price: "200 AED",
  },
  {
    id: "payment_gateway" as AddonType,
    name: "Payment Gateway Integration",
    description: "Secure payment processing setup",
    price: "500 AED",
  },
];

export default function AddOns({ selectedAddOns, onAddOnToggle }: AddOnsProps) {
  const handleClick = (addonId: AddonType) => {
    console.log("Clicked addon:", addonId); // Debug log
    onAddOnToggle(addonId);
  };

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
                  Service
                </th>
                <th className="text-right bg-zinc-900/50 p-4 text-zinc-400 font-medium">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {ADDONS.map((addon) => {
                const isSelected = selectedAddOns.includes(addon.id);
                return (
                  <tr
                    key={addon.id}
                    className={`
                      border-b border-zinc-800 last:border-0
                      cursor-pointer transition-all
                      ${isSelected ? "bg-red-500/10" : ""}
                      hover:bg-zinc-800/50
                    `}
                    onClick={() => handleClick(addon.id)}
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
                          <div className="text-zinc-100">{addon.name}</div>
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
      </CardContent>
    </Card>
  );
}
