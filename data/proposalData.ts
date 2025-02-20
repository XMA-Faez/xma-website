export const packages = {
  base: {
    name: 'Base',
    price: '8,000 AED',
    usdPrice: '$2,300',
    features: ['7 Ads', '5 Graphics', '2 Videos', 'CRM & WhatsApp Integration']
  },
  standard: {
    name: 'Standard',
    price: '15,000 AED',
    usdPrice: '$4,500',
    features: ['20 Ads', '10 Graphics', '10 Videos (with variants)', 'Marketing Tools & Chatbot']
  },
  premium: {
    name: 'Premium',
    price: '25,000 AED',
    usdPrice: '$6,800',
    features: ['48 Ads', '20 Graphics', '28 Videos (with variants)', 'AI WhatsApp Chatbot']
  }
};

export const packageFeatures = [
  { name: 'ADs', base: '7', standard: '20', premium: '48' },
  { name: 'Ad Campaign(s) Set-up', base: true, standard: true, premium: true },
  { name: 'Graphics', base: '5', standard: '10', premium: '20' },
  { name: 'Videos', base: '2', standard: '5', premium: '7' },
  { name: 'Variants', base: '1', standard: '2', premium: '4' },
  { name: 'Total Videos (with Variants)', base: '2', standard: '10', premium: '28' },
  { name: 'CRM', base: true, standard: true, premium: true },
  { name: 'WhatsApp Integration', base: true, standard: true, premium: true },
  { name: 'Chatbot', base: false, standard: true, premium: true },
  { name: 'Marketing Tools', base: false, standard: true, premium: true },
  { name: 'AI WhatsApp Chatbot', base: false, standard: false, premium: true }
];
