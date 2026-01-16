import { client } from "./client";
import { urlFor } from "./image";
import type { ShowcaseWebsite, ShowcaseWebsiteCard } from "./types";

const showcaseQuery = `*[_type == "showcaseWebsite" && featured == true] | order(orderRank asc) [0...$limit] {
  _id,
  title,
  thumbnail,
  externalUrl
}`;

export async function getFeaturedShowcaseWebsites(
  limit: number = 4,
): Promise<ShowcaseWebsiteCard[]> {
  try {
    const websites = await client.fetch<ShowcaseWebsite[]>(showcaseQuery, {
      limit,
    });

    return websites.map((website) => ({
      _id: website._id,
      title: website.title,
      thumbnailUrl: website.thumbnail
        ? urlFor(website.thumbnail).quality(95).auto("format").url()
        : "",
      externalUrl: website.externalUrl,
    }));
  } catch (error) {
    console.error("Error fetching showcase websites:", error);
    return [];
  }
}
