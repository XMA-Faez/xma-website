"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PhoneInput } from "@/components/ui/phone-input";
import { ScanningButton } from "@/components/ui/ScanningButton";
import { cn } from "@/lib/utils";
import { useTrackEvent } from "@/hooks/useTrackEvent";
import { POSTHOG_EVENTS } from "@/lib/posthog-events";
import { sendGTMEvent } from "@next/third-parties/google";

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

const initialFormData: LeadFormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  message: "",
};

const formVariants = cva("w-full", {
  variants: {
    variant: {
      default: "space-y-6",
      compact: "space-y-4",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const inputVariants = cva(
  "w-full border transition-colors focus:outline-none focus:ring-2",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:ring-blue-500/20 focus:border-blue-500",
        compact:
          "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white/20 focus:border-white/40",
      },
      size: {
        default: "h-12 px-4 rounded-lg",
        compact: "h-10 px-3 rounded-md text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const textareaVariants = cva(
  "w-full border transition-colors focus:outline-none focus:ring-2 resize-none",
  {
    variants: {
      variant: {
        default:
          "bg-white dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 focus:ring-blue-500/20 focus:border-blue-500",
        compact:
          "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:ring-white/20 focus:border-white/40",
      },
      size: {
        default: "min-h-[120px] p-4 rounded-lg",
        compact: "min-h-[80px] p-3 rounded-md text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const labelVariants = cva("block text-sm font-medium mb-1.5", {
  variants: {
    variant: {
      default: "text-slate-700 dark:text-zinc-300",
      compact: "text-white/80",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface LeadFormProps extends VariantProps<typeof formVariants> {
  source?: string;
  onSuccess?: () => void;
  className?: string;
}

export function LeadForm({
  variant = "default",
  source = "book_page",
  onSuccess,
  className,
}: LeadFormProps) {
  const router = useRouter();
  const trackEvent = useTrackEvent();
  const [formData, setFormData] = useState<LeadFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | undefined>(undefined);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handlePhoneChange = (fullNumber: string, isValid: boolean, validationError?: string) => {
    setFormData((prev) => ({ ...prev, phone: fullNumber }));
    setIsPhoneValid(isValid);
    setPhoneError(isValid ? undefined : validationError);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPhoneValid) {
      setPhoneError("Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await axios.post("/api/leads", {
        ...formData,
        source,
      });

      trackEvent(POSTHOG_EVENTS.LEAD_FORM_SUBMITTED, {
        source,
        form_variant: variant,
        has_company: !!formData.company,
        has_message: !!formData.message,
      });

      sendGTMEvent({
        event: "lead_form_submitted",
        source,
        form_variant: variant,
        has_company: !!formData.company,
        has_message: !!formData.message,
      });

      onSuccess?.();
      router.push(`/success?type=lead&source=${encodeURIComponent(source)}`);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
      setIsSubmitting(false);
    }
  };

  const isCompact = variant === "compact";
  const inputSize = isCompact ? "compact" : "default";

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
      className={cn(formVariants({ variant }), className)}
    >
      {isCompact ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelVariants({ variant })}>
              Full Name <span className="text-red-400">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label htmlFor="email">
              Email <span className="text-red-400">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@company.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
        </div>
      ) : (
        <>
          <div>
            <label htmlFor="name">
              Full Name <span className="text-red-400">*</span>
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="email">
              Email <span className="text-red-400">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@company.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>
        </>
      )}

      <div className={isCompact ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}>
        <PhoneInput
          label="Phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handlePhoneChange}
          disabled={isSubmitting}
          error={phoneError}
          defaultCountryIso="AE"
        />

        <div className={isCompact ? "" : "mt-6"}>
          <label htmlFor="company">Company</label>
          <Input
            id="company"
            name="company"
            type="text"
            placeholder="Your Company"
            value={formData.company}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message">Message</label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your business and what you're looking to achieve..."
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-3 rounded-lg text-sm",
            variant === "compact"
              ? "bg-red-500/20 text-red-200 border border-red-500/30"
              : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800",
          )}
        >
          {error}
        </motion.div>
      )}

      <ScanningButton
        type="submit"
        disabled={isSubmitting}
        color={isCompact ? "white" : "blue"}
        size={isCompact ? "md" : "lg"}
        className="w-full "
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Send className="w-4 h-4" />
            Send Message
          </span>
        )}
      </ScanningButton>
    </motion.form>
  );
}

export default LeadForm;
