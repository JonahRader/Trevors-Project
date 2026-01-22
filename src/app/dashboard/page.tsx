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

  const isAdmin = session?.user?.id === "demo-user-id";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="animate-slide-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
              {isAdmin && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-lg border border-yellow-500/20">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Full Access
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base text-gray-400 mt-1">
              {isAdmin ? "Admin view - Full campaign management" : "Overview of your ad campaign performance"}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {isAdmin && (
              <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-lg hover:bg-purple-500/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden sm:inline">Sync All</span>
              </button>
            )}
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm text-green-400">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions (Admin only) */}
      {isAdmin && (
        <div className="animate-slide-up grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3" style={{ animationDelay: "0.05s" }}>
          <button className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-white bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-white/10 rounded-xl hover:border-blue-500/30 transition-colors">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="hidden sm:inline">New Campaign</span>
            <span className="sm:hidden">Campaign</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-white bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-white/10 rounded-xl hover:border-purple-500/30 transition-colors">
            <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Export Report</span>
            <span className="sm:hidden">Report</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-white bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-white/10 rounded-xl hover:border-green-500/30 transition-colors">
            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span className="hidden sm:inline">Connect Platform</span>
            <span className="sm:hidden">Connect</span>
          </button>
          <button className="flex items-center justify-center gap-2 p-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-white/10 rounded-xl hover:border-orange-500/30 transition-colors">
            <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden sm:inline">AI Settings</span>
            <span className="sm:hidden">Settings</span>
          </button>
        </div>
      )}

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
      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {/* Campaign Table */}
        <div className="lg:col-span-2 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">Campaigns</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm text-gray-400">{campaigns.length} total</span>
              {isAdmin && (
                <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          <CampaignTable campaigns={campaigns} />
        </div>

        {/* AI Recommendations */}
        <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-white">AI Insights</h2>
            {isAdmin && (
              <span className="text-[10px] px-2 py-0.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-full border border-purple-500/20">
                Powered by AI
              </span>
            )}
          </div>
          <AIRecommendations />
        </div>
      </div>
    </div>
  );
}
