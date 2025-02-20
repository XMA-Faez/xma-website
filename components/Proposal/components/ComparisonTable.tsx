import React from 'react';
import { Check, X } from 'lucide-react';

const ComparisonTable = ({ features, tiers = ['base', 'standard', 'premium'] }) => {
  const renderCell = (value) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="text-red-400" />
      ) : (
        <X className="text-zinc-600" />
      );
    }
    return <span className="text-zinc-300">{value}</span>;
  };

  return (
    <div className="overflow-x-auto border border-zinc-700 rounded-lg">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-900/50">
            <th className="p-4 text-left text-zinc-400">Features</th>
            {tiers.map((tier) => (
              <th key={tier} className="p-4 text-red-400 font-bold capitalize">
                {tier}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className="border-t border-zinc-700">
              <td className="p-4 text-zinc-400">
                {typeof feature === 'object' ? feature.name : feature}
              </td>
              {tiers.map((tier) => (
                <td key={`${index}-${tier}`} className="p-4">
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
