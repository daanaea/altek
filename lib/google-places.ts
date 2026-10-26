// Google Places API (New) - Server-side only
// Documentation: https://developers.google.com/maps/documentation/places/web-service/place-details

export interface GoogleReview {
  name: string; // Resource name
  relativePublishTimeDescription: string;
  rating: number;
  text: {
    text: string;
    languageCode: string;
  };
  authorAttribution: {
    displayName: string;
    uri: string;
    photoUri: string;
  };
  publishTime: string;
}

export interface GooglePlaceDetails {
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
  googleMapsUri: string;
}

interface PlacesSearchResult {
  places?: Array<{
    id: string;
    displayName: { text: string };
    nationalPhoneNumber?: string;
  }>;
}

// Search for Place ID using text query
export async function searchPlaceId(textQuery: string): Promise<string | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_PLACES_API_KEY is not set");
    return null;
  }

  try {
    const response = await fetch(
      "https://places.googleapis.com/v1/places:searchText",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask":
            "places.id,places.displayName,places.nationalPhoneNumber",
        },
        body: JSON.stringify({
          textQuery,
          includePureServiceAreaBusinesses: true,
        }),
      }
    );

    if (!response.ok) {
      console.error("Places search failed:", response.status);
      return null;
    }

    const data: PlacesSearchResult = await response.json();
    return data.places?.[0]?.id ?? null;
  } catch (error) {
    console.error("Error searching for place:", error);
    return null;
  }
}

// Fetch place details including reviews
export async function fetchGoogleReviews(
  placeId: string
): Promise<GooglePlaceDetails | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error("GOOGLE_PLACES_API_KEY is not set");
    return null;
  }

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${placeId}`,
      {
        method: "GET",
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
        },
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );

    if (!response.ok) {
      console.error("Places details fetch failed:", response.status);
      return null;
    }

    const data: GooglePlaceDetails = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching place details:", error);
    return null;
  }
}

// Combined function: search for place and fetch reviews
export async function getGoogleReviews(): Promise<GooglePlaceDetails | null> {
  // Hardcoded Place ID for Altek Pro
  // This was obtained from Google Places searchText API
  const ALTEK_PRO_PLACE_ID = process.env.GOOGLE_PLACE_ID;

  if (!ALTEK_PRO_PLACE_ID) {
    // If no Place ID configured, try to search for it
    console.log("No GOOGLE_PLACE_ID set, searching for place...");
    const placeId = await searchPlaceId("Altek Pro handyman Orange County CA");
    if (!placeId) {
      return null;
    }
    console.log("Found Place ID:", placeId);
    // You should add this to your .env.local: GOOGLE_PLACE_ID=<placeId>
    return fetchGoogleReviews(placeId);
  }

  return fetchGoogleReviews(ALTEK_PRO_PLACE_ID);
}
