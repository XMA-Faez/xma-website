// components/ScriptGenerator/ScriptPlanning.jsx
import React from "react";
import DOMPurify from "dompurify";

const ScriptPlanning = ({ planningText }) => {
  if (!planningText) return null;

  // Format planning sections with better organization
  const formatScriptPlanning = (text) => {
    // Sanitize the input text
    const sanitizedText = DOMPurify.sanitize(text);
    
    // Split by numbered sections (e.g., "1. Primary pain points:")
    const sections = sanitizedText.split(/(\d+\.\s.*?:)/).filter(Boolean);
    const formattedSections = [];
    
    for (let i = 0; i < sections.length; i += 2) {
      const title = sections[i];
      const content = i + 1 < sections.length ? sections[i + 1] : "";
      
      // Special handling for sections with asterisks to keep them as a single block
      if (content.includes('* ')) {
        // For content with bullet points indicated by asterisks
        const formattedContent = content.split('\n').map((line, idx) => {
          if (line.trim().startsWith('* ')) {
            return (
              <li key={`${i}-${idx}`} className="text-zinc-300">
                {line.trim().substring(2)}
              </li>
            );
          }
          return null;
        }).filter(Boolean);
        
        formattedSections.push(
          <div key={i} className="mb-4">
            <h3 className="text-blue-400 text-lg font-bold mb-2">{title}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {formattedContent}
            </ul>
          </div>
        );
      } else {
        // For dash-separated content (regular format)
        // Handle multi-line entries that might be split across the content
        const contentLines = content.trim().split('\n').map(line => line.trim()).join(' ');
        
        // First, normalize common patterns that might be split incorrectly
        const normalizedContent = contentLines
          .replace(/Call\s+to\s+action/gi, 'Call to action')
          .replace(/Call-to-action/gi, 'Call to action');
        
        // Remove the first dash if the content starts with it
        let cleanedContent = normalizedContent;
        if (cleanedContent.trim().startsWith('-')) {
          cleanedContent = cleanedContent.trim().substring(1).trim();
        }
        
        // Now split by dashes, ensuring we don't split on dashes within words
        const points = cleanedContent.split(/\s+-\s+/).filter(Boolean);
        
        // Clean up each point - remove any leading/trailing dashes
        const cleanedPoints = points.map(point => {
          let cleaned = point.trim();
          if (cleaned.startsWith('-')) cleaned = cleaned.substring(1).trim();
          if (cleaned.endsWith('-')) cleaned = cleaned.substring(0, cleaned.length - 1).trim();
          return cleaned;
        });
        
        formattedSections.push(
          <div key={i} className="mb-4">
            <h3 className="text-blue-400 text-lg font-bold mb-2">{title}</h3>
            <ul className="list-disc pl-5 space-y-1">
              {cleanedPoints.map((point, idx) => (
                <li key={`${i}-${idx}`} className="text-zinc-300">{point}</li>
              ))}
            </ul>
          </div>
        );
      }
    }
    
    return formattedSections;
  };

  return <div>{formatScriptPlanning(planningText)}</div>;
};

export default ScriptPlanning;
