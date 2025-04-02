import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorMessage = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mt-6 p-4 bg-red-900/30 border border-red-600/50 text-red-400 rounded-md flex items-center gap-2">
      <AlertCircle className="w-5 h-5" />
      <span>{error}</span>
    </div>
  );
};

export default ErrorMessage;
