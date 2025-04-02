// components/ScriptGenerator/UsageInfo.jsx
import React from "react";

const UsageInfo = ({ usageInfo }) => {
  if (!usageInfo) return null;

  return (
    <div className="mt-6 p-4 bg-zinc-800/50 border border-zinc-700 text-zinc-300 rounded-md">
      <p>You have used {usageInfo.usageCount} of your 3 free attempts.</p>
      {usageInfo.remainingAttempts > 0 ? (
        <p>You have {usageInfo.remainingAttempts} attempts remaining.</p>
      ) : (
        <p>
          You have reached your limit of free attempts.
          <span className="text-red-500 ml-1">
            Upgrade to continue using this service.
          </span>
        </p>
      )}
    </div>
  );
};

export default UsageInfo;
