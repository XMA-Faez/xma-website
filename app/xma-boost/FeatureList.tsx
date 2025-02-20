import React from "react";
import { FaCogs, FaRocket, FaShieldAlt } from "react-icons/fa"; // Example icons from React Icons

const iconClasses = "text-white mx-auto";

const features = [
  {
    id: 1,
    icon: <FaCogs size={40} className={iconClasses} />, // Customize the icon size and color
    title: "Automation",
    description:
      "Automate your business processes and workflows with XMA Boost.",
  },
  {
    id: 2,
    icon: <FaRocket size={40} className={iconClasses} />,
    title: "Speed",
    description:
      "Increase the speed of your operations with our efficient tools.",
  },
  {
    id: 3,
    icon: <FaShieldAlt size={40} className={iconClasses} />,
    title: "Security",
    description: "Keep your data secure with our advanced protection measures.",
  },
];

const FeatureList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {features.map((feature) => (
        <div
          key={feature.id}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-center shadow-lg shadow-white/10 transition-transform transform hover:scale-105"
        >
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-200">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
