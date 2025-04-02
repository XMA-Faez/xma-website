"use client";
// components/ScriptGenerator/AdScriptForm.jsx
import React, { useState } from "react";
import FormFields from "./FormFields";
import ErrorMessage from "./ErrorMessage";
import UsageInfo from "./UsageInfo";
import ScriptDisplay from "./ScriptDisplay";

const AdScriptForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    productName: "",
    targetAudience: "",
    keyBenefits: "",
    toneOfVoice: "professional",
    scriptLength: "short",
    callToAction: "",
  });

  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState("");
  const [error, setError] = useState("");
  const [usageInfo, setUsageInfo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate script");
      }

      setGeneratedScript(data.script);
      setUsageInfo({
        usageCount: data.usageCount,
        remainingAttempts: data.remainingAttempts,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-zinc-900/90 border border-zinc-800 rounded-lg backdrop-blur-sm">
      <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
        Video Ad Script Generator
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormFields formData={formData} handleChange={handleChange} />

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-500 text-white font-medium rounded-md transition-all duration-300 disabled:opacity-50 transform hover:scale-105"
        >
          {loading ? "Generating..." : "Generate Script"}
        </button>
      </form>

      <ErrorMessage error={error} />
      <UsageInfo usageInfo={usageInfo} />
      {generatedScript && <ScriptDisplay generatedScript={generatedScript} />}
    </div>
  );
};

export default AdScriptForm;
