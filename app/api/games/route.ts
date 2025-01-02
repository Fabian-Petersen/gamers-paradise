import { NextResponse } from "next/server";

const BASE_URL = "https://api.rawg.io/api";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function GET(request: Request) {
  try {
    // Get the search params from the request URL
    const { searchParams } = new URL(request.url);

    // Get the endpoint path from params or default to 'games'
    const path = searchParams.get("path") || "games";

    // Create a new URLSearchParams for the RAWG API
    const apiParams = new URLSearchParams(searchParams);

    // Remove the path parameter as it's not needed for the RAWG API
    apiParams.delete("path");

    // Add the API key
    apiParams.set("key", API_KEY as string);

    // Construct the full URL
    const apiUrl = `${BASE_URL}/${path}?${apiParams.toString()}`;
    console.log("Fetching from:", apiUrl); // For debugging

    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from RAWG API" },
      { status: 500 }
    );
  }
}
