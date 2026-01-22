const metaCampaignNames = [
  "Summer Sale Awareness",
  "Brand Awareness Q1",
  "Lead Gen - Healthcare",
  "Retargeting - Website Visitors",
  "Lookalike - High Value Customers",
];

const googleCampaignNames = [
  "Search - Brand Terms",
  "Search - Competitor Terms",
  "Display - Remarketing",
  "Shopping - Best Sellers",
  "Performance Max - All Products",
];

function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function randomInt(min: number, max: number): number {
  return Math.floor(randomBetween(min, max));
}

export interface MockCampaign {
  name: string;
  status: "active" | "paused";
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
}

export function generateMockCampaigns(
  platform: "meta" | "google"
): MockCampaign[] {
  const names = platform === "meta" ? metaCampaignNames : googleCampaignNames;

  return names.map((name, index) => {
    const spend = randomBetween(500, 15000);
    const impressions = randomInt(10000, 500000);
    const ctr = randomBetween(0.005, 0.035);
    const clicks = Math.floor(impressions * ctr);
    const conversionRate = randomBetween(0.02, 0.08);
    const conversions = Math.floor(clicks * conversionRate);
    const roas = randomBetween(0.5, 4.0);
    const status = index % 3 === 0 ? "paused" : "active";

    return {
      name,
      status,
      spend: Math.round(spend * 100) / 100,
      impressions,
      clicks,
      conversions,
      roas: Math.round(roas * 100) / 100,
    };
  });
}

export function getAccountName(platform: "meta" | "google"): string {
  if (platform === "meta") {
    return "Meta Ads - Primary";
  }
  return "Google Ads - Main Account";
}
