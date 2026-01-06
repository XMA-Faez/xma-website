"use client";

import React from "react";
import { motion } from "framer-motion";
import { WhatsappLogo } from "phosphor-react";

interface WhatsAppWidgetProps {
  phoneNumber?: string;
  message?: string;
}

const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  phoneNumber = "971503636856",
  message = "Hi, I'm interested in learning more about your luxury car rental marketing services.",
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center shadow-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
      >
        <WhatsappLogo className="w-7 h-7 text-white" weight="fill" />
      </motion.a>
    </div>
  );
};

export default WhatsAppWidget;
