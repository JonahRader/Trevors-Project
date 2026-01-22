import { AdPlatform, PlatformCampaign, CampaignMetrics, PLATFORM_CONFIGS } from "@/types/platforms";

// Base interface for platform-specific clients
export interface PlatformClient {
  platform: AdPlatform;
  testConnection(): Promise<boolean>;
  getCampaigns(options?: { status?: string; dateRange?: string }): Promise<PlatformCampaign[]>;
  getCampaignMetrics(campaignId: string): Promise<CampaignMetrics>;
  syncData(): Promise<{ success: boolean; message: string; campaignsUpdated?: number }>;
}

// Mock data generator for demo purposes
function generateMockMetrics(): CampaignMetrics {
  const spend = Math.random() * 10000 + 500;
  const impressions = Math.floor(Math.random() * 500000 + 10000);
  const ctr = Math.random() * 0.03 + 0.005;
  const clicks = Math.floor(impressions * ctr);
  const conversionRate = Math.random() * 0.08 + 0.02;
  const conversions = Math.floor(clicks * conversionRate);
  const cpc = spend / clicks;
  const cpa = conversions > 0 ? spend / conversions : 0;
  const roas = Math.random() * 3 + 0.5;

  return {
    spend,
    impressions,
    clicks,
    conversions,
    ctr,
    cpc,
    cpa,
    roas,
  };
}

// Revive Adserver client (open source)
export class ReviveClient implements PlatformClient {
  platform: AdPlatform = "revive";
  private apiUrl: string;
  private apiKey: string;

  constructor(apiUrl: string, apiKey: string) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async testConnection(): Promise<boolean> {
    // In production, this would call the Revive API
    // For demo, we simulate a successful connection
    return true;
  }

  async getCampaigns(): Promise<PlatformCampaign[]> {
    // In production, this would call Revive's XML-RPC or REST API
    // For demo, we return mock data
    const campaigns: PlatformCampaign[] = [
      {
        id: "revive-1",
        externalId: "rv_campaign_001",
        platform: "revive",
        name: "Homepage Banner Campaign",
        status: "active",
        metrics: generateMockMetrics(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "revive-2",
        externalId: "rv_campaign_002",
        platform: "revive",
        name: "Sidebar Display Ads",
        status: "active",
        metrics: generateMockMetrics(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return campaigns;
  }

  async getCampaignMetrics(campaignId: string): Promise<CampaignMetrics> {
    return generateMockMetrics();
  }

  async syncData() {
    return { success: true, message: "Revive data synced", campaignsUpdated: 2 };
  }
}

// Plausible Analytics client (open source)
export class PlausibleClient implements PlatformClient {
  platform: AdPlatform = "plausible";
  private siteId: string;
  private apiKey: string;
  private baseUrl: string;

  constructor(siteId: string, apiKey: string, baseUrl: string = "https://plausible.io") {
    this.siteId = siteId;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async testConnection(): Promise<boolean> {
    // Would call /api/v1/stats/realtime/visitors
    return true;
  }

  async getCampaigns(): Promise<PlatformCampaign[]> {
    // Plausible tracks goals/conversions, mapped as "campaigns"
    const campaigns: PlatformCampaign[] = [
      {
        id: "plausible-goal-1",
        externalId: "signup",
        platform: "plausible",
        name: "Signup Goal Tracking",
        status: "active",
        metrics: generateMockMetrics(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "plausible-goal-2",
        externalId: "purchase",
        platform: "plausible",
        name: "Purchase Conversion",
        status: "active",
        metrics: generateMockMetrics(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return campaigns;
  }

  async getCampaignMetrics(campaignId: string): Promise<CampaignMetrics> {
    return generateMockMetrics();
  }

  async syncData() {
    return { success: true, message: "Plausible data synced", campaignsUpdated: 2 };
  }
}

// PostHog client (open source)
export class PostHogClient implements PlatformClient {
  platform: AdPlatform = "posthog";
  private projectId: string;
  private apiKey: string;
  private baseUrl: string;

  constructor(projectId: string, apiKey: string, baseUrl: string = "https://app.posthog.com") {
    this.projectId = projectId;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async testConnection(): Promise<boolean> {
    return true;
  }

  async getCampaigns(): Promise<PlatformCampaign[]> {
    // PostHog tracks experiments and funnels, mapped as "campaigns"
    const campaigns: PlatformCampaign[] = [
      {
        id: "posthog-exp-1",
        externalId: "exp_pricing_test",
        platform: "posthog",
        name: "Pricing Page A/B Test",
        status: "active",
        metrics: generateMockMetrics(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "posthog-funnel-1",
        externalId: "funnel_onboarding",
        platform: "posthog",
        name: "Onboarding Funnel",
        status: "active",
        metrics: generateMockMetrics(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return campaigns;
  }

  async getCampaignMetrics(campaignId: string): Promise<CampaignMetrics> {
    return generateMockMetrics();
  }

  async syncData() {
    return { success: true, message: "PostHog data synced", campaignsUpdated: 2 };
  }
}

// Matomo Analytics client (open source)
export class MatomoClient implements PlatformClient {
  platform: AdPlatform = "matomo";
  private siteId: string;
  private apiKey: string;
  private baseUrl: string;

  constructor(siteId: string, apiKey: string, baseUrl: string) {
    this.siteId = siteId;
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async testConnection(): Promise<boolean> {
    return true;
  }

  async getCampaigns(): Promise<PlatformCampaign[]> {
    const campaigns: PlatformCampaign[] = [
      {
        id: "matomo-camp-1",
        externalId: "email_newsletter",
        platform: "matomo",
        name: "Email Newsletter Campaign",
        status: "active",
        metrics: generateMockMetrics(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "matomo-camp-2",
        externalId: "social_media",
        platform: "matomo",
        name: "Social Media Traffic",
        status: "active",
        metrics: generateMockMetrics(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return campaigns;
  }

  async getCampaignMetrics(campaignId: string): Promise<CampaignMetrics> {
    return generateMockMetrics();
  }

  async syncData() {
    return { success: true, message: "Matomo data synced", campaignsUpdated: 2 };
  }
}

// EthicalAds client (open source)
export class EthicalAdsClient implements PlatformClient {
  platform: AdPlatform = "ethicalads";
  private publisherId: string;
  private apiKey: string;

  constructor(publisherId: string, apiKey: string) {
    this.publisherId = publisherId;
    this.apiKey = apiKey;
  }

  async testConnection(): Promise<boolean> {
    return true;
  }

  async getCampaigns(): Promise<PlatformCampaign[]> {
    const campaigns: PlatformCampaign[] = [
      {
        id: "ethical-1",
        externalId: "tech_audience",
        platform: "ethicalads",
        name: "Developer Audience Ads",
        status: "active",
        metrics: generateMockMetrics(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return campaigns;
  }

  async getCampaignMetrics(campaignId: string): Promise<CampaignMetrics> {
    return generateMockMetrics();
  }

  async syncData() {
    return { success: true, message: "EthicalAds data synced", campaignsUpdated: 1 };
  }
}

// Factory to create platform clients
export function createPlatformClient(
  platform: AdPlatform,
  credentials: {
    apiKey?: string;
    apiUrl?: string;
    siteId?: string;
    projectId?: string;
    publisherId?: string;
  }
): PlatformClient | null {
  switch (platform) {
    case "revive":
      return new ReviveClient(credentials.apiUrl || "", credentials.apiKey || "");
    case "plausible":
      return new PlausibleClient(credentials.siteId || "", credentials.apiKey || "");
    case "posthog":
      return new PostHogClient(credentials.projectId || "", credentials.apiKey || "");
    case "matomo":
      return new MatomoClient(credentials.siteId || "", credentials.apiKey || "", credentials.apiUrl || "");
    case "ethicalads":
      return new EthicalAdsClient(credentials.publisherId || "", credentials.apiKey || "");
    default:
      // Meta, Google, TikTok, LinkedIn, Pinterest would need OAuth implementations
      return null;
  }
}

// Get all available platforms with their configs
export function getAvailablePlatforms() {
  return Object.values(PLATFORM_CONFIGS);
}

// Get only open source platforms
export function getOpenSourcePlatforms() {
  return Object.values(PLATFORM_CONFIGS).filter((p) => p.isOpenSource);
}
