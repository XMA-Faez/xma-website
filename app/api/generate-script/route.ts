// app/api/generate-script/route.js
import { NextResponse } from "next/server";
import Airtable from "airtable";
import { v4 as uuidv4 } from "uuid";
import { Anthropic } from "@anthropic-ai/sdk";

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Initialize Airtable
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID!,
);

async function generateAdScript(formData) {
  const {
    productName,
    targetAudience,
    keyBenefits,
    toneOfVoice,
    scriptLength,
    callToAction,
  } = formData;

  // Call Anthropic's Claude API to generate the script
  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1000,
    system: "You are a advertisor and your job is to create video advertisement scripts for business. Skip the preamble; go straight into the script.",
    messages: [
      {
        role: "user",
        content: ` You are an expert video script writer specializing in creating compelling advertising content. Your task is to craft a video script based on client information provided in a form. The script should effectively promote the client's offerings while addressing their customers' pain points.

Here are the form responses to review:

<form_responses>
        Product Name: ${productName}
        Target Audience: ${targetAudience}
        Key Benefits/Features: ${keyBenefits}
        Tone of Voice: ${toneOfVoice}
        Script Length: ${scriptLength} (${scriptLength === "short" ? "15-30 seconds" : scriptLength === "medium" ? "30-60 seconds" : "60-90 seconds"})
        Call to Action: ${callToAction || "Visit our website today"}
</form_responses>

Before writing the script, please plan your approach in <script_planning> tags:

1. Identify and list the primary pain points mentioned in the form responses.
2. For each pain point, note a specific example or anecdote that illustrates it.
3. List the key features of the business, products, or services that address these pain points.
4. Note the brand voice and tone specified in the form responses.
5. Brainstorm 2-3 metaphors or analogies that could make the script more engaging and relatable.
6. Outline the emotional journey you want the viewer to experience (e.g., frustration → hope → excitement → motivation).
7. Outline a structure for the script, including:
   - A hook to grab attention
   - Main content addressing pain points and showcasing solutions
   - A strong call-to-action
8. Brainstorm potential visual elements that align with the brand and enhance the script's message.
9. Consider how to incorporate the Unique Selling Proposition (USP) effectively.

It's OK for this section to be quite long as you thoroughly analyze the form responses and plan your approach.

Now, using your planning as a guide, create a video script that adheres to the following guidelines:

1. Structure: Maintain a clear beginning, middle, and end.
2. Length: Aim for 60-90 seconds when read aloud at a normal pace.
3. Content:
   - Start with a powerful hook that resonates with the target audience's pain points.
   - Address at least two specific pain points mentioned in the form responses.
   - Briefly introduce the business using information from the Business Overview.
   - Highlight how the products/services directly solve customer problems.
   - Incorporate the Unique Selling Proposition (USP).
   - Target the script towards the primary audience, with consideration for the secondary audience if applicable.
4. Tone: Maintain the specified brand voice and tone throughout the script.
5. Call-to-Action: Conclude with a clear and compelling call-to-action.
6. Visuals: Include brief notes in [brackets] suggesting visuals to accompany the narration.

Remember to focus on making the leads feel understood by emphasizing their pain points and how the business addresses them. The script should demonstrate a deep understanding of the customers' challenges and position the business as the solution.

Please present your video script within <script> tags, formatted as follows:

<script>
[VISUAL: Opening scene description]
Narrator: Attention-grabbing opening line addressing a key pain point...

[VISUAL: Transition to business introduction]
Narrator: Introduction of the business and how it relates to the pain point...

[VISUAL: Showcase of products/services]
Narrator: Explanation of how the business solves the problem, highlighting USP...

[VISUAL: Customer satisfaction imagery]
Narrator: Addressing secondary pain point and its solution...

[VISUAL: Call-to-action visual]
Narrator: Strong call-to-action, encouraging next steps...
</script>

Your script should be engaging, informative, and true to the brand's identity as described in the form responses. Focus on creating an emotional connection with the audience by demonstrating a clear understanding of their challenges.            `,
      },
    ],
    temperature: 0.7,
  });

  // Extract the generated script from the response
  const script = response.content[0].text;

  return script;
}

// Save the generated script and form data to Airtable
async function saveScriptData(formData, generatedScript, ipAddress) {
  try {
    // Create a record in the Scripts table
    const scriptRecord = await base("Scripts").create({
      "Requester Name": formData.name,
      "Requester Email": formData.email,
      "Requester Phone Number": formData.phoneNumber,
      "Product Name": formData.productName,
      "Target Audience": formData.targetAudience,
      "Key Benefits": formData.keyBenefits,
      "Tone of Voice": formData.toneOfVoice,
      "Script Length": formData.scriptLength,
      "Call to Action": formData.callToAction || "",
      "Generated Script": generatedScript,
      "Requester IP Address": ipAddress || "unknown",
    });

    // Update usage analytics
    await updateAnalytics(ipAddress);

    return { success: true, recordId: scriptRecord.id };
  } catch (error) {
    console.error("Error saving script data:", error);
    return { success: false, error: error.message };
  }
}

// Track usage analytics and enforce the 3-free-attempts limit
async function updateAnalytics(ipAddress) {
  if (!ipAddress) return { success: false, error: "No IP address provided" };

  try {
    // Check if this IP has been recorded before
    const records = await base("Usage")
      .select({
        filterByFormula: `{IP Address} = '${ipAddress}'`,
      })
      .firstPage();

    if (records.length > 0) {
      // IP exists, update the usage count
      const record = records[0];
      const currentCount = record.get("Usage Count") || 0;
      const updatedCount = currentCount + 1;

      await base("Usage").update(record.id, {
        "Usage Count": updatedCount,
        "Last Used": new Date().toISOString(),
      });

      return {
        success: true,
        usageCount: updatedCount,
        limitReached: updatedCount > 3,
      };
    } else {
      // New IP, create a record
      await base("Usage").create({
        "IP Address": ipAddress,
        "Usage Count": 1,
      });

      return { success: true, usageCount: 1, limitReached: false };
    }
  } catch (error) {
    console.error("Error updating analytics:", error);
    return { success: false, error: error.message };
  }
}

// Check if the user has reached their limit of free attempts
async function checkUsageLimit(ipAddress) {
  if (!ipAddress) return { limitReached: false, usageCount: 0 };

  try {
    const records = await base("Usage")
      .select({
        filterByFormula: `{IP Address} = '${ipAddress}'`,
      })
      .firstPage();

    if (records.length > 0) {
      const record = records[0];
      const usageCount = record.get("Usage Count") || 0;
      return {
        limitReached: usageCount >= 3,
        usageCount,
      };
    }

    return { limitReached: false, usageCount: 0 };
  } catch (error) {
    console.error("Error checking usage limit:", error);
    return { limitReached: false, usageCount: 0 };
  }
}

export async function POST(request) {
  try {
    const formData = await request.json();
    console.log("Received form data:", formData);

    // Validate required fields
    if (
      !formData.productName ||
      !formData.targetAudience ||
      !formData.keyBenefits
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get client IP address (from Vercel headers or request)
    const ipAddress = request.headers.get("x-forwarded-for") || "unknown";

    // Check if user has reached their usage limit
    const usageCheck = await checkUsageLimit(ipAddress);
    if (usageCheck.limitReached) {
      return NextResponse.json(
        {
          error: "Usage limit reached",
          usageCount: usageCheck.usageCount,
          message:
            "You have used your 3 free attempts. Please contact us for more information on paid plans.",
        },
        { status: 403 },
      );
    }

    // Generate the script
    const script = await generateAdScript(formData);

    // Save the data
    const saveResult = await saveScriptData(formData, script, ipAddress);

    if (!saveResult.success) {
      console.warn("Failed to save script data:", saveResult.error);
      // Continue anyway since the main functionality is script generation
    }

    // Return the generated script along with usage information
    return NextResponse.json({
      script,
      usageCount: usageCheck.usageCount + 1,
      remainingAttempts: Math.max(0, 3 - (usageCheck.usageCount + 1)),
    });
  } catch (error) {
    console.error("Script generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate script" },
      { status: 500 },
    );
  }
}
