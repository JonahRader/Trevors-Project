"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardsProps {
  totalSpend: number;
  totalConversions: number;
  averageRoas: number;
  totalImpressions: number;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toLocaleString();
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
      value: formatCurrency(totalSpend),
      description: "Across all campaigns",
      color: "text-blue-600",
    },
    {
      title: "Total Conversions",
      value: formatNumber(totalConversions),
      description: "All ad accounts",
      color: "text-green-600",
    },
    {
      title: "Average ROAS",
      value: `${averageRoas.toFixed(2)}x`,
      description: "Return on ad spend",
      color: "text-purple-600",
    },
    {
      title: "Total Impressions",
      value: formatNumber(totalImpressions),
      description: "Ad views",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${card.color}`}>
              {card.value}
            </div>
            <p className="text-xs text-gray-500 mt-1">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
