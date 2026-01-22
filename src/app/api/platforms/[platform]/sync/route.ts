import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createPlatformClient } from "@/lib/integrations/platform-service";
import { AdPlatform, PLATFORM_CONFIGS } from "@/types/platforms";

// POST /api/platforms/[platform]/sync - Sync data from a platform
export async function POST(
  request: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  try {
    const session = await auth();
    const resolvedParams = await params;

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const platform = resolvedParams.platform as AdPlatform;

    // Validate platform
    if (!PLATFORM_CONFIGS[platform]) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    const body = await request.json().catch(() => ({}));

    // In production, you would fetch credentials from the database
    // For demo, we use the provided credentials or mock ones
    const credentials = {
      apiKey: body.apiKey || "demo-api-key",
      apiUrl: body.apiUrl || "https://demo.example.com",
      siteId: body.siteId || "demo-site",
      projectId: body.projectId || "demo-project",
      publisherId: body.publisherId || "demo-publisher",
    };

    const client = createPlatformClient(platform, credentials);

    if (!client) {
      return NextResponse.json(
        { error: `Platform ${platform} requires OAuth authentication (coming soon)` },
        { status: 400 }
      );
    }

    // Test connection
    const isConnected = await client.testConnection();
    if (!isConnected) {
      return NextResponse.json(
        { error: "Failed to connect to platform" },
        { status: 500 }
      );
    }

    // Fetch campaigns
    const campaigns = await client.getCampaigns();

    // Sync data
    const syncResult = await client.syncData();

    return NextResponse.json({
      success: true,
      platform: PLATFORM_CONFIGS[platform],
      campaigns: campaigns.map((c) => ({
        id: c.id,
        name: c.name,
        status: c.status,
        spend: c.metrics.spend,
        impressions: c.metrics.impressions,
        clicks: c.metrics.clicks,
        conversions: c.metrics.conversions,
        roas: c.metrics.roas,
      })),
      syncResult,
    });
  } catch (error) {
    console.error("Error syncing platform:", error);
    return NextResponse.json({ error: "Failed to sync platform" }, { status: 500 });
  }
}

// GET /api/platforms/[platform]/sync - Get current sync status
export async function GET(
  request: Request,
  { params }: { params: Promise<{ platform: string }> }
) {
  try {
    const session = await auth();
    const resolvedParams = await params;

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const platform = resolvedParams.platform as AdPlatform;

    if (!PLATFORM_CONFIGS[platform]) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    // In production, this would return actual sync status from the database
    return NextResponse.json({
      platform,
      config: PLATFORM_CONFIGS[platform],
      lastSync: new Date().toISOString(),
      status: "ready",
      connected: true,
    });
  } catch (error) {
    console.error("Error getting sync status:", error);
    return NextResponse.json({ error: "Failed to get sync status" }, { status: 500 });
  }
}
