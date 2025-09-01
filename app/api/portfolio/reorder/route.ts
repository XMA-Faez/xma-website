import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { itemUpdates } = await request.json();
    
    if (!itemUpdates || !Array.isArray(itemUpdates)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Import contentful-management here to avoid client-side usage
    const contentfulManagement = require('contentful-management');
    
    const managementClient = contentfulManagement.createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    });

    const space = await managementClient.getSpace(process.env.CONTENTFUL_SPACE_ID!);
    const environment = await space.getEnvironment('master');

    // Process updates in smaller batches to avoid rate limiting
    const batchSize = 3; // Process only 3 items at a time
    const results = [];
    
    for (let i = 0; i < itemUpdates.length; i += batchSize) {
      const batch = itemUpdates.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async ({ id, order }: { id: string; order: number }) => {
        try {
          const entry = await environment.getEntry(id);
          entry.fields.order = { 'en-US': order };
          const updatedEntry = await entry.update();
          return await updatedEntry.publish();
        } catch (error: any) {
          console.error(`Error updating order for item ${id}:`, error);
          
          // If rate limited, throw error to stop processing
          if (error.status === 429 || error.message?.includes('rate limit')) {
            throw new Error('Rate limit exceeded. Please try again in a few moments.');
          }
          
          return null;
        }
      });

      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
      
      // Add delay between batches to respect rate limits
      if (i + batchSize < itemUpdates.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // Return true if all updates succeeded
    const success = results.every(result => result !== null);
    
    return NextResponse.json({ success });
    
  } catch (error) {
    console.error('Error in reorder API:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}