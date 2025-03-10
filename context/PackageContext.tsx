// context/PackageContext.jsx
"use client";

import React, { createContext, useState, useContext } from "react";

export const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formType, setFormType] = useState("package"); // 'package' or 'custom'

  const selectPackage = (packageData) => {
    setSelectedPackage(packageData);
    setFormType("package");
    setShowContactForm(true);
  };

  const requestCustomPackage = () => {
    setSelectedPackage(null);
    setFormType("custom");
    setShowContactForm(true);
  };

  const closeContactForm = () => {
    setShowContactForm(false);
  };

  return (
    <PackageContext.Provider
      value={{
        selectedPackage,
        showContactForm,
        formType,
        selectPackage,
        requestCustomPackage,
        closeContactForm,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => useContext(PackageContext);
