"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { SummaryCards } from "@/components/dashboard/summary-cards";
import { CampaignTable } from "@/components/dashboard/campaign-table";
import { AIRecommendations } from "@/components/dashboard/ai-recommendations";
import { PerformanceChart } from "@/components/dashboard/performance-chart";

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

function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-gray-900/50 border border-white/10 p-6">
      <div className="animate-shimmer h-10 w-10 rounded-xl mb-4" />
      <div className="animate-shimmer h-4 w-24 rounded mb-2" />
      <div className="animate-shimmer h-8 w-32 rounded mb-2" />
      <div className="animate-shimmer h-3 w-20 rounded" />
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="rounded-2xl bg-gray-900/50 border border-white/10 p-6">
      <div className="animate-shimmer h-6 w-48 rounded mb-2" />
      <div className="animate-shimmer h-4 w-32 rounded mb-6" />
      <div className="animate-shimmer h-80 w-full rounded" />
    </div>
  );
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
      const isDemoUser = session?.user?.id === "demo-user-id";

      if (!isDemoUser) {
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
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div>
          <div className="animate-shimmer h-8 w-48 rounded mb-2" />
          <div className="animate-shimmer h-4 w-64 rounded" />
        </div>

        {/* Cards Skeleton */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        {/* Chart Skeleton */}
        <SkeletonChart />
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
      <div className="animate-slide-up">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Overview of your ad campaign performance
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-green-400">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards
        totalSpend={summary.totalSpend}
        totalConversions={summary.totalConversions}
        averageRoas={summary.averageRoas}
        totalImpressions={summary.totalImpressions}
      />

      {/* Performance Chart */}
      <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
        <PerformanceChart />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Campaign Table */}
        <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Campaigns</h2>
            <span className="text-sm text-gray-400">{campaigns.length} total</span>
          </div>
          <CampaignTable campaigns={campaigns} />
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <h2 className="text-xl font-semibold text-white mb-4">AI Insights</h2>
          <AIRecommendations />
        </div>
      </div>
    </div>
  );
}
