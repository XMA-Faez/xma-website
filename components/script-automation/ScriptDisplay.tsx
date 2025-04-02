// components/ScriptGenerator/ScriptDisplay.jsx
import React, { useState } from "react";
import { Clipboard, Download, CheckCircle2 } from "lucide-react";
import DOMPurify from "dompurify";
import ScriptContent from "./ScriptContent";
import ScriptPlanning from "./ScriptPlanning";

const ScriptDisplay = ({ generatedScript }) => {
  const [activeTab, setActiveTab] = useState("script");
  const [copied, setCopied] = useState(false);
  
  // Extract scriptPlanning and scriptContent from the generatedScript
  const extractScriptParts = (rawScript) => {
    if (!rawScript) return { planning: "", content: "" };

    try {
      // Create a temporary DOM element to parse the HTML/XML tags
      const parser = new DOMParser();
      // Wrap in a root element to ensure proper parsing
      const doc = parser.parseFromString(
        `<root>${rawScript}</root>`,
        "text/html"
      );

      // Extract script planning
      const planningElement = doc.querySelector("script_planning");
      const planning = planningElement
        ? planningElement.textContent.trim()
        : "";

      // Extract script content
      const scriptElement = doc.querySelector("script");
      const content = scriptElement ? scriptElement.textContent.trim() : "";

      // If no script tags were found but there is content, treat it all as script content
      if (!planning && !content && rawScript.trim()) {
        return { planning: "", content: rawScript.trim() };
      }

      return { planning, content };
    } catch (error) {
      console.error("Error parsing script:", error);
      return { planning: "", content: rawScript };
    }
  };

  const { planning, content } = extractScriptParts(generatedScript);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadScript = () => {
    const textToDownload = activeTab === "script" ? content : planning;
    const blob = new Blob([textToDownload], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ad-script-${activeTab}-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!generatedScript) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-white">
        Your Generated Ad Script:
      </h2>

      <div className="mb-4 border-b border-zinc-700">
        <div className="flex mb-2">
          <button
            onClick={() => setActiveTab("script")}
            className={`px-4 py-2 rounded-none border-b-2 ${
              activeTab === "script"
                ? "border-red-500 text-white"
                : "border-transparent text-zinc-400 hover:text-zinc-300"
            }`}
          >
            Final Script
          </button>

          {planning && (
            <button
              onClick={() => setActiveTab("planning")}
              className={`px-4 py-2 rounded-none border-b-2 ${
                activeTab === "planning"
                  ? "border-red-500 text-white"
                  : "border-transparent text-zinc-400 hover:text-zinc-300"
              }`}
            >
              Script Planning
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={() =>
              copyToClipboard(activeTab === "script" ? content : planning)
            }
            className="p-2 bg-zinc-700 hover:bg-zinc-600 rounded-full transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <CheckCircle2 className="w-4 h-4 text-green-400" />
            ) : (
              <Clipboard className="w-4 h-4 text-zinc-300" />
            )}
          </button>
        </div>

        <div className="p-6 bg-zinc-800/70 border border-zinc-700 rounded-lg text-white backdrop-blur-sm max-h-[600px] overflow-y-auto">
          {activeTab === "script" ? (
            <ScriptContent scriptText={content || generatedScript} />
          ) : (
            <ScriptPlanning planningText={planning} />
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <button
          onClick={() =>
            copyToClipboard(activeTab === "script" ? content : planning)
          }
          className="py-2 px-4 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-md flex items-center gap-2 border border-zinc-700 transition-all duration-300"
        >
          <Clipboard className="w-4 h-4" />
          <span>Copy to Clipboard</span>
        </button>
        <button
          onClick={downloadScript}
          className="py-2 px-4 bg-red-600 hover:bg-red-500 text-white font-medium rounded-md flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
        >
          <Download className="w-4 h-4" />
          <span>Download Script</span>
        </button>
      </div>
    </div>
  );
};

export default ScriptDisplay;
