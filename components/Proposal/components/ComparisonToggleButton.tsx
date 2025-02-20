import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ComparisonToggleButton = ({ isExpanded, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="text-zinc-400 hover:text-red-400 flex items-center gap-1"
    >
      {isExpanded ? 'Hide Comparison' : 'View Comparison'}
      {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
  );
};

export default ComparisonToggleButton;
