// lib/leadTracking.js

/**
 * A utility to handle lead form submissions and tracking
 */
export const submitLeadForm = async (formData, source = "vsl-page") => {
  // Add tracking information
  const enrichedData = {
    ...formData,
    source,
    submission_date: new Date().toISOString(),
    utm_source: getUTMParam("utm_source"),
    utm_medium: getUTMParam("utm_medium"),
    utm_campaign: getUTMParam("utm_campaign"),
    utm_content: getUTMParam("utm_content"),
    utm_term: getUTMParam("utm_term"),
  };

  // Calculate lead score based on BANT
  const leadScore = calculateLeadScore(enrichedData);
  enrichedData.lead_score = leadScore;

  // Log for demonstration (replace with actual API call)
  console.log("Submitting lead form data:", enrichedData);

  // This would be your actual API endpoint
  try {
    // Uncomment when you have an actual API endpoint
    /*
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enrichedData),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return await response.json();
    */

    // For now, simulate success
    return {
      success: true,
      message: "Lead submitted successfully",
      lead_score: leadScore,
    };
  } catch (error) {
    console.error("Error submitting lead:", error);
    throw error;
  }
};

/**
 * Extract UTM parameters from URL
 */
function getUTMParam(param) {
  if (typeof window === "undefined") return "";

  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || "";
}

/**
 * Calculate lead score based on BANT criteria
 * Higher score = better qualified lead
 */
function calculateLeadScore(data) {
  let score = 0;

  // Budget scoring (max 25 points)
  if (data.budget) {
    if (data.budget === "30000+") score += 25;
    else if (data.budget === "20000-30000") score += 20;
    else if (data.budget === "10000-20000") score += 15;
    else if (data.budget === "5000-10000") score += 10;
  }

  // Authority scoring (max 25 points)
  if (data.authority) {
    if (data.authority === "final") score += 25;
    else if (data.authority === "key") score += 20;
    else if (data.authority === "part") score += 15;
    else if (data.authority === "research") score += 5;
  }

  // Need scoring (max 25 points)
  if (data.need) {
    // All needs get points, but leads directly align with our primary service
    if (data.need === "leads") score += 25;
    else if (data.need === "conversion") score += 20;
    else if (data.need === "automation") score += 20;
    else if (data.need === "awareness") score += 15;
    else score += 10; // Other needs
  }

  // Timeline scoring (max 25 points)
  if (data.timeline) {
    if (data.timeline === "immediate") score += 25;
    else if (data.timeline === "1month") score += 20;
    else if (data.timeline === "3months") score += 15;
    else if (data.timeline === "planning") score += 5;
  }

  return score; // 0-100 score
}

/**
 * Get lead priority category based on score
 */
export function getLeadPriority(score) {
  if (score >= 80) return "Hot";
  if (score >= 60) return "Warm";
  if (score >= 40) return "Cool";
  return "Cold";
}

/**
 * Categorize leads based on business type (for segmentation)
 */
export function categorizeLeadByBusinessType(company, need) {
  // This is a simple example - in real implementation, you might
  // use more sophisticated categorization logic or AI
  const companyNameLower = company.toLowerCase();

  if (
    companyNameLower.includes("salon") ||
    companyNameLower.includes("spa") ||
    companyNameLower.includes("beauty")
  ) {
    return "Beauty & Wellness";
  }

  if (
    companyNameLower.includes("restaurant") ||
    companyNameLower.includes("café") ||
    companyNameLower.includes("cafe") ||
    companyNameLower.includes("food")
  ) {
    return "Food & Beverage";
  }

  if (
    companyNameLower.includes("retail") ||
    companyNameLower.includes("shop") ||
    companyNameLower.includes("store")
  ) {
    return "Retail";
  }

  // If we can't determine by name, use need as a fallback hint
  if (need === "awareness") return "New Business";
  if (need === "conversion") return "E-commerce";
  if (need === "automation") return "Established Business";

  return "General Business";
}
