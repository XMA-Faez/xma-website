"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { useGoogleAds } from "@/hooks/useGoogleAds";

interface ContactFormProps {
  onSuccess?: () => void;
}

export function ContactFormWithTracking({ onSuccess }: ContactFormProps) {
  const { trackConversion, trackForm, trackButtonClick } = useGoogleAds();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track form submission start
      trackButtonClick("contact_submit", "contact_form");

      // Your existing form submission logic here
      // Example: await submitContactForm(formData);

      // Track successful conversion
      trackConversion("contact_form");
      
      // Track form submission with details
      trackForm("contact", {
        company: formData.company || "not_provided",
        has_phone: !!formData.phone,
        message_length: formData.message.length,
      });

      // Call success callback
      onSuccess?.();
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      // Track failed submission
      trackForm("contact_error", {
        error: error instanceof Error ? error.message : "unknown",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Track form field interactions
    if (field === "email" && value.includes("@")) {
      trackForm("contact_email_entered", { valid: true });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Input
          placeholder="Your Name *"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="bg-slate-100/50 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
          required
        />
      </div>
      
      <div>
        <Input
          type="email"
          placeholder="Your Email *"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className="bg-slate-100/50 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
          required
        />
      </div>
      
      <div>
        <Input
          type="tel"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          className="bg-slate-100/50 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
        />
      </div>
      
      <div>
        <Input
          placeholder="Company Name"
          value={formData.company}
          onChange={(e) => handleInputChange("company", e.target.value)}
          className="bg-slate-100/50 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400"
        />
      </div>
      
      <div>
        <Textarea
          placeholder="Your Message *"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          className="bg-slate-100/50 dark:bg-zinc-800/50 border-slate-300 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-zinc-400 min-h-[150px]"
          required
        />
      </div>
      
      <ScanningButton 
        type="submit" 
        variant="primary"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </ScanningButton>
    </form>
  );
}