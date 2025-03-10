// components/PricingPackages.jsx - Enhanced with functionality
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ChevronDown, ChevronUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { submitLeadForm } from "@/lib/leadTracking";

const packages = [
  {
    name: "Base",
    price: "8,000 AED",
    usdPrice: "$2,500 USD",
    features: [
      { name: "7 Ads", included: true },
      { name: "Ad Campaign(s) Set-up", included: true },
      { name: "5 Graphics", included: true },
      { name: "2 Videos", included: true },
      { name: "1 Variant per Video", included: true },
      { name: "2 Total Videos (with Variants)", included: true },
      { name: "CRM Setup", included: true },
      { name: "WhatsApp Integration", included: true },
      { name: "Chatbot", included: false },
      { name: "Marketing Tools", included: false },
      { name: "AI WhatsApp Chatbot", included: false },
    ],
    popular: false,
    color: "border-zinc-700",
    buttonClass: "bg-zinc-700 hover:bg-zinc-600",
  },
  {
    name: "Standard",
    price: "15,000 AED",
    usdPrice: "$4,500 USD",
    features: [
      { name: "20 Ads", included: true },
      { name: "Ad Campaign(s) Set-up", included: true },
      { name: "10 Graphics", included: true },
      { name: "5 Videos", included: true },
      { name: "2 Variants per Video", included: true },
      { name: "10 Total Videos (with Variants)", included: true },
      { name: "CRM Setup", included: true },
      { name: "WhatsApp Integration", included: true },
      { name: "Chatbot", included: true },
      { name: "Marketing Tools", included: true },
      { name: "AI WhatsApp Chatbot", included: false },
    ],
    popular: true,
    color: "border-red-600",
    buttonClass: "bg-red-600 hover:bg-red-700",
  },
  {
    name: "Premium",
    price: "25,000 AED",
    usdPrice: "$7,000 USD",
    features: [
      { name: "48 Ads", included: true },
      { name: "Ad Campaign(s) Set-up", included: true },
      { name: "20 Graphics", included: true },
      { name: "7 Videos", included: true },
      { name: "4 Variants per Video", included: true },
      { name: "28 Total Videos (with Variants)", included: true },
      { name: "CRM Setup", included: true },
      { name: "WhatsApp Integration", included: true },
      { name: "Chatbot", included: true },
      { name: "Marketing Tools", included: true },
      { name: "AI WhatsApp Chatbot", included: true },
    ],
    popular: false,
    color: "border-zinc-700",
    buttonClass: "bg-zinc-700 hover:bg-zinc-600",
  },
];

const PricingPackages = () => {
  const [showAllFeatures, setShowAllFeatures] = useState({
    base: false,
    standard: false,
    premium: false,
  });

  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);
  const [isCustomDialogOpen, setIsCustomDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    // BANT fields
    budget: "",
    authority: "",
    need: "",
    timeline: "",
  });

  const toggleFeatures = (packageName) => {
    setShowAllFeatures({
      ...showAllFeatures,
      [packageName]: !showAllFeatures[packageName],
    });
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setIsPackageDialogOpen(true);
  };

  const handleCustomRequest = () => {
    setIsCustomDialogOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Form type for tracking
      const formSource = isCustomDialogOpen
        ? "custom-package"
        : `package-${selectedPackage?.name.toLowerCase()}`;

      // Submit to tracking/CRM system
      const result = await submitLeadForm(formData, formSource);

      // Show success message
      alert("Thanks for your interest! Our team will contact you shortly.");

      // Close dialogs and reset form
      setIsPackageDialogOpen(false);
      setIsCustomDialogOpen(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        budget: "",
        authority: "",
        need: "",
        timeline: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div id="pricing" className="py-16 scroll-mt-20 bg-zinc-900/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent mb-4">
            Choose Your Package
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Tailored solutions to fit your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg, index) => {
            const packageKey = pkg.name.toLowerCase();
            const displayFeatures = showAllFeatures[packageKey]
              ? pkg.features
              : pkg.features.slice(0, 6);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  className={`bg-zinc-900/50 backdrop-blur-sm border-2 ${pkg.color} h-full flex flex-col relative overflow-hidden`}
                >
                  {pkg.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-red-600 text-white px-4 py-1 text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                    <div className="mb-6">
                      <span className="text-3xl font-bold">{pkg.price}</span>
                      <span className="block text-zinc-400 text-sm">
                        {pkg.usdPrice}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6 flex-grow">
                      {displayFeatures.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                          {feature.included ? (
                            <Check size={18} className="text-green-500" />
                          ) : (
                            <X size={18} className="text-zinc-600" />
                          )}
                          <span
                            className={
                              feature.included
                                ? "text-zinc-300"
                                : "text-zinc-500"
                            }
                          >
                            {feature.name}
                          </span>
                        </div>
                      ))}

                      {pkg.features.length > 6 && (
                        <button
                          onClick={() => toggleFeatures(packageKey)}
                          className="flex items-center gap-1 text-zinc-400 hover:text-zinc-300 text-sm mt-2"
                        >
                          {showAllFeatures[packageKey] ? (
                            <>
                              <span>Show less</span>
                              <ChevronUp size={16} />
                            </>
                          ) : (
                            <>
                              <span>Show all features</span>
                              <ChevronDown size={16} />
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    <Button
                      className={`w-full text-zinc-100 font-bold ${pkg.buttonClass}`}
                      onClick={() => handlePackageSelect(pkg)}
                    >
                      Choose {pkg.name}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-zinc-400 mb-4">
            Looking for a custom solution? Contact us for a tailored package.
          </p>
          <Button
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-600/10"
            onClick={handleCustomRequest}
          >
            Request Custom Package
          </Button>
        </div>
      </div>

      {/* Package Selection Dialog */}
      <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {selectedPackage?.name} Package
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Complete the form below to get started with the{" "}
              {selectedPackage?.name} package.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
            </div>
            <div>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
            </div>

            {/* BANT Questions */}
            <div>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              >
                <option value="" disabled>
                  Your marketing budget?
                </option>
                <option value="5000-10000">5,000 - 10,000 AED</option>
                <option value="10000-20000">10,000 - 20,000 AED</option>
                <option value="20000-30000">20,000 - 30,000 AED</option>
                <option value="30000+">30,000+ AED</option>
              </select>
            </div>

            <div>
              <select
                name="authority"
                value={formData.authority}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              >
                <option value="" disabled>
                  Your role in decision making?
                </option>
                <option value="final">Final Decision Maker</option>
                <option value="key">Key Influencer</option>
                <option value="part">Part of Decision Committee</option>
                <option value="research">Researching Options</option>
              </select>
            </div>

            <div>
              <select
                name="need"
                value={formData.need}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              >
                <option value="" disabled>
                  Your primary marketing challenge?
                </option>
                <option value="leads">Getting More Leads</option>
                <option value="conversion">Improving Conversion Rates</option>
                <option value="awareness">Brand Awareness</option>
                <option value="automation">Marketing Automation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              >
                <option value="" disabled>
                  When do you want to start?
                </option>
                <option value="immediate">Immediately</option>
                <option value="1month">Within 1 month</option>
                <option value="3months">Within 3 months</option>
                <option value="planning">Just planning ahead</option>
              </select>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium text-lg transition duration-300"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Custom Package Dialog */}
      <Dialog open={isCustomDialogOpen} onOpenChange={setIsCustomDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Request Custom Package
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              Tell us about your business needs and we'll create a tailored
              package for you.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
            </div>
            <div>
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
            </div>
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
            </div>

            {/* BANT Questions */}
            <div>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              >
                <option value="" disabled>
                  What's your marketing budget?
                </option>
                <option value="5000-10000">5,000 - 10,000 AED</option>
                <option value="10000-20000">10,000 - 20,000 AED</option>
                <option value="20000-30000">20,000 - 30,000 AED</option>
                <option value="30000+">30,000+ AED</option>
              </select>
            </div>

            <div>
              <select
                name="authority"
                value={formData.authority}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              >
                <option value="" disabled>
                  What's your role in decision making?
                </option>
                <option value="final">Final Decision Maker</option>
                <option value="key">Key Influencer</option>
                <option value="part">Part of Decision Committee</option>
                <option value="research">Researching Options</option>
              </select>
            </div>

            <div>
              <select
                name="need"
                value={formData.need}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              >
                <option value="" disabled>
                  What's your primary marketing challenge?
                </option>
                <option value="leads">Getting More Leads</option>
                <option value="conversion">Improving Conversion Rates</option>
                <option value="awareness">Brand Awareness</option>
                <option value="automation">Marketing Automation</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <select
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                required
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              >
                <option value="" disabled>
                  When are you looking to get started?
                </option>
                <option value="immediate">Immediately</option>
                <option value="1month">Within 1 month</option>
                <option value="3months">Within 3 months</option>
                <option value="planning">Just planning ahead</option>
              </select>
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Tell us about your specific needs"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-white"
              />
            </div>

            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium text-lg transition duration-300"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Submit Request
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PricingPackages;
