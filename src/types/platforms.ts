// Platform types for ad integrations

export type AdPlatform =
  | "meta"
  | "google"
  | "tiktok"
  | "linkedin"
  | "pinterest"
  | "revive"      // Open source: Revive Adserver
  | "ethicalads"  // Open source: EthicalAds
  | "plausible"   // Open source: Plausible Analytics
  | "matomo"      // Open source: Matomo Analytics
  | "posthog";    // Open source: PostHog

export interface PlatformConfig {
  id: AdPlatform;
  name: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  isOpenSource: boolean;
  authType: "oauth" | "apiKey" | "credentials";
  docsUrl: string;
  features: string[];
}

export const PLATFORM_CONFIGS: Record<AdPlatform, PlatformConfig> = {
  meta: {
    id: "meta",
    name: "Meta Ads",
    description: "Facebook & Instagram advertising",
    icon: "facebook",
    color: "text-blue-400",
    bgColor: "bg-blue-500/20",
    isOpenSource: false,
    authType: "oauth",
    docsUrl: "https://developers.facebook.com/docs/marketing-apis",
    features: ["campaigns", "audiences", "creative", "reporting"],
  },
  google: {
    id: "google",
    name: "Google Ads",
    description: "Search, Display & YouTube advertising",
    icon: "google",
    color: "text-green-400",
    bgColor: "bg-green-500/20",
    isOpenSource: false,
    authType: "oauth",
    docsUrl: "https://developers.google.com/google-ads/api/docs/start",
    features: ["campaigns", "keywords", "audiences", "reporting"],
  },
  tiktok: {
    id: "tiktok",
    name: "TikTok Ads",
    description: "TikTok for Business advertising",
    icon: "tiktok",
    color: "text-pink-400",
    bgColor: "bg-pink-500/20",
    isOpenSource: false,
    authType: "oauth",
    docsUrl: "https://business-api.tiktok.com/portal/docs",
    features: ["campaigns", "creative", "audiences", "reporting"],
  },
  linkedin: {
    id: "linkedin",
    name: "LinkedIn Ads",
    description: "B2B advertising on LinkedIn",
    icon: "linkedin",
    color: "text-sky-400",
    bgColor: "bg-sky-500/20",
    isOpenSource: false,
    authType: "oauth",
    docsUrl: "https://learn.microsoft.com/linkedin/marketing/",
    features: ["campaigns", "audiences", "lead-gen", "reporting"],
  },
  pinterest: {
    id: "pinterest",
    name: "Pinterest Ads",
    description: "Visual discovery advertising",
    icon: "pinterest",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
    isOpenSource: false,
    authType: "oauth",
    docsUrl: "https://developers.pinterest.com/docs/ads/overview/",
    features: ["campaigns", "pins", "audiences", "reporting"],
  },
  revive: {
    id: "revive",
    name: "Revive Adserver",
    description: "Self-hosted open source ad server",
    icon: "server",
    color: "text-orange-400",
    bgColor: "bg-orange-500/20",
    isOpenSource: true,
    authType: "apiKey",
    docsUrl: "https://www.revive-adserver.com/support/",
    features: ["zones", "banners", "targeting", "reporting"],
  },
  ethicalads: {
    id: "ethicalads",
    name: "EthicalAds",
    description: "Privacy-first open source ad network",
    icon: "shield",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
    isOpenSource: true,
    authType: "apiKey",
    docsUrl: "https://www.ethicalads.io/advertisers/",
    features: ["placements", "targeting", "reporting"],
  },
  plausible: {
    id: "plausible",
    name: "Plausible Analytics",
    description: "Privacy-friendly web analytics",
    icon: "chart",
    color: "text-indigo-400",
    bgColor: "bg-indigo-500/20",
    isOpenSource: true,
    authType: "apiKey",
    docsUrl: "https://plausible.io/docs",
    features: ["pageviews", "goals", "funnels", "reporting"],
  },
  matomo: {
    id: "matomo",
    name: "Matomo Analytics",
    description: "Self-hosted Google Analytics alternative",
    icon: "analytics",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20",
    isOpenSource: true,
    authType: "apiKey",
    docsUrl: "https://developer.matomo.org/",
    features: ["visits", "goals", "ecommerce", "reporting"],
  },
  posthog: {
    id: "posthog",
    name: "PostHog",
    description: "All-in-one product analytics",
    icon: "hedgehog",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/20",
    isOpenSource: true,
    authType: "apiKey",
    docsUrl: "https://posthog.com/docs",
    features: ["events", "funnels", "experiments", "surveys"],
  },
};

export interface CampaignMetrics {
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
  roas: number;
}

export interface PlatformCampaign {
  id: string;
  externalId: string;
  platform: AdPlatform;
  name: string;
  status: "active" | "paused" | "completed" | "draft";
  metrics: CampaignMetrics;
  createdAt: Date;
  updatedAt: Date;
}

export interface PlatformConnection {
  id: string;
  platform: AdPlatform;
  accountId: string;
  accountName: string;
  credentials: {
    accessToken?: string;
    refreshToken?: string;
    apiKey?: string;
    apiSecret?: string;
    instanceUrl?: string;
  };
  connected: boolean;
  lastSync?: Date;
  error?: string;
}

// MCP Tool definitions for ad platforms
export interface MCPTool {
  name: string;
  description: string;
  inputSchema: {
    type: "object";
    properties: Record<string, { type: string; description: string }>;
    required: string[];
  };
}

export const AD_PLATFORM_MCP_TOOLS: MCPTool[] = [
  {
    name: "get_campaigns",
    description: "Fetch campaigns from a connected ad platform",
    inputSchema: {
      type: "object",
      properties: {
        platform: { type: "string", description: "The ad platform to query (meta, google, etc.)" },
        status: { type: "string", description: "Filter by campaign status (active, paused, all)" },
        dateRange: { type: "string", description: "Date range for metrics (7d, 30d, 90d, custom)" },
      },
      required: ["platform"],
    },
  },
  {
    name: "get_campaign_metrics",
    description: "Get detailed metrics for a specific campaign",
    inputSchema: {
      type: "object",
      properties: {
        campaignId: { type: "string", description: "The campaign ID to get metrics for" },
        platform: { type: "string", description: "The ad platform" },
        metrics: { type: "string", description: "Comma-separated list of metrics to fetch" },
      },
      required: ["campaignId", "platform"],
    },
  },
  {
    name: "optimize_campaign",
    description: "Get AI-powered optimization suggestions for a campaign",
    inputSchema: {
      type: "object",
      properties: {
        campaignId: { type: "string", description: "The campaign ID to optimize" },
        platform: { type: "string", description: "The ad platform" },
        goal: { type: "string", description: "Optimization goal (conversions, roas, cpc, reach)" },
      },
      required: ["campaignId", "platform", "goal"],
    },
  },
  {
    name: "compare_platforms",
    description: "Compare performance across multiple ad platforms",
    inputSchema: {
      type: "object",
      properties: {
        platforms: { type: "string", description: "Comma-separated list of platforms to compare" },
        metric: { type: "string", description: "Primary metric to compare (spend, roas, conversions)" },
        dateRange: { type: "string", description: "Date range for comparison" },
      },
      required: ["platforms", "metric"],
    },
  },
  {
    name: "sync_platform",
    description: "Trigger a data sync for a connected platform",
    inputSchema: {
      type: "object",
      properties: {
        platform: { type: "string", description: "The platform to sync" },
        fullSync: { type: "string", description: "Whether to do a full historical sync (true/false)" },
      },
      required: ["platform"],
    },
  },
];
