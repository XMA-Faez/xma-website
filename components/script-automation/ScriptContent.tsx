import React from "react";
import DOMPurify from "dompurify";

const ScriptContent = ({ scriptText }) => {
  if (!scriptText) return null;

  // Format script content with proper visual styling
  const formatScriptContent = (text) => {
    // Sanitize the input text
    const sanitizedText = DOMPurify.sanitize(text);

    // Parse script sections - identifying visuals and narration
    const parts = sanitizedText.split(/(\[VISUAL:.*?\])/g).filter(Boolean);

    return parts.map((part, index) => {
      // Check if this part is a visual instruction
      if (part.startsWith("[VISUAL:")) {
        const visualText = part.replace(/\[VISUAL:|\]/g, "").trim();
        return (
          <div key={index} className="mb-4">
            <div className="bg-zinc-700/70 p-3 rounded-lg border border-zinc-600 flex items-center">
              <span className="text-blue-400 font-medium text-sm">VISUAL:</span>
              <span className="text-zinc-300 text-sm ml-2">{visualText}</span>
            </div>
          </div>
        );
      }

      // Check if this is the narrator part (which follows a VISUAL instruction)
      if (index > 0 && parts[index - 1].startsWith("[VISUAL:")) {
        // Fix the "Narrator: Narrator:" issue by removing any duplicated prefix
        const narratorText = part.trim().replace(/^Narrator:\s*/i, "");

        return (
          <div key={index} className="mb-4 pl-4 border-l-2 border-zinc-700">
            <span className="text-amber-500 font-medium mr-2">Narrator:</span>
            <span>{narratorText}</span>
          </div>
        );
      }

      // Regular text
      return (
        <p key={index} className="mb-4">
          {part}
        </p>
      );
    });
  };

  return <div>{formatScriptContent(scriptText)}</div>;
};

export default ScriptContent;
