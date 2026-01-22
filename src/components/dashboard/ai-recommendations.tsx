"use client";

import { useState } from "react";

const recommendations = [
  {
    id: 1,
    type: "optimization",
    title: "Budget Reallocation",
    description: "Move $2,400 from underperforming Meta campaigns to high-ROAS Google campaigns for 15% efficiency gain.",
    impact: "+15%",
    impactType: "positive",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    gradient: "from-green-500 to-emerald-500",
  },
  {
    id: 2,
    type: "alert",
    title: "Audience Overlap Detected",
    description: "3 campaigns targeting similar audiences. Consolidate to reduce competition and lower CPC.",
    impact: "-12% CPC",
    impactType: "positive",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    id: 3,
    type: "insight",
    title: "Peak Performance Window",
    description: "Your ads perform 40% better between 6-9 PM. Consider increasing bids during this window.",
    impact: "+40%",
    impactType: "positive",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
  },
];

export function AIRecommendations() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-white/10 bg-gray-900/50 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center animate-pulse-glow">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Insights</h3>
            <p className="text-xs text-gray-500">Powered by ML</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Live
        </span>
      </div>

      {/* Recommendations List */}
      <div className="p-4 space-y-3">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setExpandedId(expandedId === rec.id ? null : rec.id)}
          >
            {/* Glow effect */}
            <div
              className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br ${rec.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity`}
            />

            <div className="relative p-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-r ${rec.gradient} flex items-center justify-center text-white flex-shrink-0`}
                >
                  {rec.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-sm font-medium text-white truncate">
                      {rec.title}
                    </h4>
                    <span
                      className={`text-xs font-bold ${
                        rec.impactType === "positive" ? "text-green-400" : "text-red-400"
                      }`}
                    >
                      {rec.impact}
                    </span>
                  </div>
                  <p
                    className={`text-xs text-gray-400 transition-all ${
                      expandedId === rec.id ? "" : "line-clamp-2"
                    }`}
                  >
                    {rec.description}
                  </p>
                </div>
              </div>

              {/* Expanded Actions */}
              {expandedId === rec.id && (
                <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                  <button className="flex-1 px-3 py-2 text-xs font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-opacity">
                    Apply Now
                  </button>
                  <button className="px-3 py-2 text-xs font-medium text-gray-400 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-white/10 bg-white/5">
        <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh Insights
        </button>
      </div>
    </div>
  );
}
