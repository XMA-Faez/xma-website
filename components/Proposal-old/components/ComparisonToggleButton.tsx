import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ComparisonToggleButton = ({ isExpanded, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-zinc-400 hover:text-red-400 flex items-center gap-1 text-sm sm:text-base px-2 py-1 transition-colors duration-200"
    >
      <span>{isExpanded ? "Hide Comparison" : "View Comparison"}</span>
      {isExpanded ? (
        <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
      ) : (
        <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
      )}
    </button>
  );
};

export default ComparisonToggleButton;
