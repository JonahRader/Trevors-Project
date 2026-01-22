import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

// Demo data for test user
const demoData = {
  campaigns: [
    {
      id: "1",
      name: "Summer Sale Awareness",
      status: "active",
      spend: 12450.50,
      impressions: 458000,
      clicks: 12540,
      conversions: 892,
      roas: 3.24,
      adAccount: { platform: "meta", accountName: "Meta Ads - Primary" },
    },
    {
      id: "2",
      name: "Brand Awareness Q1",
      status: "active",
      spend: 8920.00,
      impressions: 325000,
      clicks: 8450,
      conversions: 456,
      roas: 2.85,
      adAccount: { platform: "meta", accountName: "Meta Ads - Primary" },
    },
    {
      id: "3",
      name: "Lead Gen - Healthcare",
      status: "paused",
      spend: 5680.25,
      impressions: 189000,
      clicks: 4520,
      conversions: 234,
      roas: 1.92,
      adAccount: { platform: "meta", accountName: "Meta Ads - Primary" },
    },
    {
      id: "4",
      name: "Retargeting - Website Visitors",
      status: "active",
      spend: 3245.75,
      impressions: 98000,
      clicks: 3890,
      conversions: 312,
      roas: 4.15,
      adAccount: { platform: "meta", accountName: "Meta Ads - Primary" },
    },
    {
      id: "5",
      name: "Lookalike - High Value Customers",
      status: "active",
      spend: 7890.00,
      impressions: 267000,
      clicks: 6780,
      conversions: 423,
      roas: 2.67,
      adAccount: { platform: "meta", accountName: "Meta Ads - Primary" },
    },
    {
      id: "6",
      name: "Search - Brand Terms",
      status: "active",
      spend: 4560.80,
      impressions: 145000,
      clicks: 8920,
      conversions: 567,
      roas: 3.89,
      adAccount: { platform: "google", accountName: "Google Ads - Main Account" },
    },
    {
      id: "7",
      name: "Search - Competitor Terms",
      status: "active",
      spend: 6780.50,
      impressions: 198000,
      clicks: 5670,
      conversions: 289,
      roas: 1.85,
      adAccount: { platform: "google", accountName: "Google Ads - Main Account" },
    },
    {
      id: "8",
      name: "Display - Remarketing",
      status: "paused",
      spend: 2340.25,
      impressions: 456000,
      clicks: 2340,
      conversions: 156,
      roas: 2.45,
      adAccount: { platform: "google", accountName: "Google Ads - Main Account" },
    },
    {
      id: "9",
      name: "Shopping - Best Sellers",
      status: "active",
      spend: 9870.00,
      impressions: 234000,
      clicks: 7890,
      conversions: 678,
      roas: 3.56,
      adAccount: { platform: "google", accountName: "Google Ads - Main Account" },
    },
    {
      id: "10",
      name: "Performance Max - All Products",
      status: "active",
      spend: 11250.75,
      impressions: 389000,
      clicks: 9450,
      conversions: 734,
      roas: 2.98,
      adAccount: { platform: "google", accountName: "Google Ads - Main Account" },
    },
  ],
  summary: {
    totalSpend: 72988.80,
    totalConversions: 4741,
    averageRoas: 2.96,
    totalImpressions: 2759000,
  },
};

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Return demo data for test user
    if (session.user.id === "demo-user-id") {
      return NextResponse.json(demoData);
    }

    const userId = session.user.id;

    // Check if database is available
    if (!prisma) {
      return NextResponse.json(demoData); // Return demo data if no DB
    }

    // Fetch all campaigns for the user with their ad account info
    const campaigns = await prisma.campaign.findMany({
      where: {
        adAccount: {
          userId,
        },
      },
      include: {
        adAccount: {
          select: {
            platform: true,
            accountName: true,
          },
        },
      },
      orderBy: {
        spend: "desc",
      },
    });

    // Calculate summary metrics
    const totalSpend = campaigns.reduce((sum, c) => sum + c.spend, 0);
    const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0);
    const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0);
    const averageRoas =
      campaigns.length > 0
        ? campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length
        : 0;

    return NextResponse.json({
      campaigns,
      summary: {
        totalSpend,
        totalConversions,
        averageRoas,
        totalImpressions,
      },
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
