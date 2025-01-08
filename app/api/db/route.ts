import { NextRequest, NextResponse } from "next/server";

// Base URL for GhastlyDB
const GHASTLY_DB_URL = process.env.GHASTLYDB_URL || "http://localhost:8080";

// Helper function to make API calls to GhastlyDB
async function ghastlyRequest(endpoint: string, method: string, body?: any) {
  try {
    const response = await fetch(`${GHASTLY_DB_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error(`GhastlyDB responded with status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("GhastlyDB request failed:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { operation, key, value, query } = await req.json();

    switch (operation) {
      case "put":
        // Store key-value pair in GhastlyDB
        const putResult = await ghastlyRequest("/v1/documents", "POST", {
          key,
          value,
        });
        return NextResponse.json({
          success: true,
          message: `Stored key "${key}" with value "${value}"`,
          data: putResult,
        });

      case "get":
        // Retrieve value by key
        const getResult = await ghastlyRequest(`/v1/documents/${key}`, "GET");
        if (!getResult) {
          return NextResponse.json(
            { success: false, message: "Key not found" },
            { status: 404 },
          );
        }
        return NextResponse.json({
          success: true,
          data: getResult.value,
        });

      case "delete":
        // Delete key-value pair
        await ghastlyRequest(`/v1/documents/${key}`, "DELETE");
        return NextResponse.json({
          success: true,
          message: `Deleted key "${key}"`,
        });

      case "search":
        // Perform semantic search
        const searchResult = await ghastlyRequest("/v1/search", "POST", {
          query,
        });
        console.log(searchResult);
        return NextResponse.json({
          success: true,
          data: searchResult,
        });

      default:
        return NextResponse.json(
          { success: false, message: "Invalid operation" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    );
  }
}
