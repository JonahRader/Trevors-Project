import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getAvailablePlatforms, getOpenSourcePlatforms } from "@/lib/integrations/platform-service";

// GET /api/platforms - Get list of available platforms
export async function GET(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const openSourceOnly = searchParams.get("openSourceOnly") === "true";

    const platforms = openSourceOnly ? getOpenSourcePlatforms() : getAvailablePlatforms();

    return NextResponse.json({
      platforms,
      total: platforms.length,
      openSourceCount: platforms.filter((p) => p.isOpenSource).length,
    });
  } catch (error) {
    console.error("Error fetching platforms:", error);
    return NextResponse.json({ error: "Failed to fetch platforms" }, { status: 500 });
  }
}
