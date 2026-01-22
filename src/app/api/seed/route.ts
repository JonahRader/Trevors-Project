import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { generateMockCampaigns, getAccountName } from "@/lib/mock-data";

export async function POST() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Check if database is available
    if (!prisma) {
      return NextResponse.json(
        { message: "Database not configured, using demo data", seeded: false },
        { status: 200 }
      );
    }

    // Check if user already has ad accounts
    const existingAccounts = await prisma.adAccount.findMany({
      where: { userId },
    });

    if (existingAccounts.length > 0) {
      return NextResponse.json(
        { message: "Data already seeded", seeded: false },
        { status: 200 }
      );
    }

    // Create Meta Ads account with campaigns
    const metaAccount = await prisma.adAccount.create({
      data: {
        userId,
        platform: "meta",
        accountName: getAccountName("meta"),
        connected: true,
      },
    });

    const metaCampaigns = generateMockCampaigns("meta");
    await prisma.campaign.createMany({
      data: metaCampaigns.map((campaign) => ({
        ...campaign,
        adAccountId: metaAccount.id,
      })),
    });

    // Create Google Ads account with campaigns
    const googleAccount = await prisma.adAccount.create({
      data: {
        userId,
        platform: "google",
        accountName: getAccountName("google"),
        connected: true,
      },
    });

    const googleCampaigns = generateMockCampaigns("google");
    await prisma.campaign.createMany({
      data: googleCampaigns.map((campaign) => ({
        ...campaign,
        adAccountId: googleAccount.id,
      })),
    });

    return NextResponse.json(
      { message: "Mock data seeded successfully", seeded: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
