"use client";

import { useEffect, useState } from "react";

interface SummaryCardsProps {
  totalSpend: number;
  totalConversions: number;
  averageRoas: number;
  totalImpressions: number;
}

function AnimatedNumber({
  value,
  format,
}: {
  value: number;
  format: (n: number) => string;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepValue = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(stepValue * step, value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{format(displayValue)}</span>;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return Math.floor(num).toLocaleString();
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SummaryCards({
  totalSpend,
  totalConversions,
  averageRoas,
  totalImpressions,
}: SummaryCardsProps) {
  const cards = [
    {
      title: "Total Spend",
      value: totalSpend,
      format: formatCurrency,
      description: "Across all campaigns",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-500/10 to-cyan-500/10",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      trend: "+12.5%",
      trendUp: true,
    },
    {
      title: "Total Conversions",
      value: totalConversions,
      format: formatNumber,
      description: "All ad accounts",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-500/10 to-emerald-500/10",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      trend: "+8.2%",
      trendUp: true,
    },
    {
      title: "Average ROAS",
      value: averageRoas,
      format: (n: number) => `${n.toFixed(2)}x`,
      description: "Return on ad spend",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-500/10 to-pink-500/10",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      trend: "+5.1%",
      trendUp: true,
    },
    {
      title: "Total Impressions",
      value: totalImpressions,
      format: formatNumber,
      description: "Ad views",
      gradient: "from-orange-500 to-yellow-500",
      bgGradient: "from-orange-500/10 to-yellow-500/10",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      trend: "-2.3%",
      trendUp: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 stagger-children">
      {cards.map((card, index) => (
        <div
          key={card.title}
          className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-br ${card.bgGradient} border border-white/10 p-3 sm:p-4 md:p-6 hover-lift cursor-pointer`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {/* Background glow effect */}
          <div
            className={`absolute -top-12 -right-12 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br ${card.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity`}
          />

          <div className="relative">
            <div className="flex items-center justify-between mb-2 sm:mb-4">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-r ${card.gradient} flex items-center justify-center text-white`}
              >
                <div className="scale-75 sm:scale-100">{card.icon}</div>
              </div>
              <div
                className={`flex items-center gap-0.5 sm:gap-1 text-xs sm:text-sm ${
                  card.trendUp ? "text-green-400" : "text-red-400"
                }`}
              >
                {card.trendUp ? (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                <span className="hidden sm:inline">{card.trend}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 mb-0.5 sm:mb-1">{card.title}</p>
            <div
              className={`text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${card.gradient} bg-clip-text text-transparent`}
            >
              <AnimatedNumber value={card.value} format={card.format} />
            </div>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-2 hidden sm:block">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
