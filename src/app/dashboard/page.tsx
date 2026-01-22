"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { AIRecommendations } from "@/components/dashboard/ai-recommendations";

interface Campaign {
  id: string;
  name: string;
  status: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  roas: number;
  adAccount: {
    platform: string;
    accountName: string;
  };
}

interface DashboardData {
  campaigns: Campaign[];
  summary: {
    totalSpend: number;
    totalConversions: number;
    averageRoas: number;
    totalImpressions: number;
  };
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const dashboardData = await res.json();
        setData(dashboardData);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      // Skip seeding for demo user (no database)
      const isDemoUser = session?.user?.id === "demo-user-id";

      if (!isDemoUser) {
        // Try to seed data first for real users (will skip if already seeded)
        try {
          await fetch("/api/seed", { method: "POST" });
        } catch {
          // Ignore seed errors
        }
      }

      await fetchData();
    };

    if (session) {
      init();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const campaigns = data?.campaigns || [];
  const summary = data?.summary || {
    totalSpend: 0,
    totalConversions: 0,
    averageRoas: 0,
    totalImpressions: 0,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your ad campaign performance
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards
        totalSpend={summary.totalSpend}
        totalConversions={summary.totalConversions}
        averageRoas={summary.averageRoas}
        totalImpressions={summary.totalImpressions}
      />

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Campaign Table */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Campaigns
          </h2>
          <CampaignTable campaigns={campaigns} />
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Insights</h2>
          <AIRecommendations />
        </div>
      </div>
    </div>
  );
}
