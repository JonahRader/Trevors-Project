"use client";

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

interface CampaignTableProps {
  campaigns: Campaign[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}

function getPlatformBadge(platform: string) {
  const styles =
    platform === "meta"
      ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
      : "bg-green-500/20 text-green-400 border-green-500/30";
  const label = platform === "meta" ? "Meta" : "Google";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${styles}`}
    >
      {label}
    </span>
  );
}

function getStatusBadge(status: string) {
  const styles =
    status === "active"
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : "bg-gray-500/20 text-gray-400 border-gray-500/30";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border capitalize ${styles}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "active" ? "bg-emerald-400 animate-pulse" : "bg-gray-400"
        }`}
      />
      {status}
    </span>
  );
}

export function CampaignTable({ campaigns }: CampaignTableProps) {
  if (campaigns.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-gray-900/50 p-12 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-gray-800 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No campaigns yet</h3>
        <p className="text-sm text-gray-400">
          Connect your ad accounts to see campaign data here.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-gray-900/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Campaign
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Platform
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Spend
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Clicks
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Conv.
              </th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                ROAS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {campaigns.map((campaign, index) => (
              <tr
                key={campaign.id}
                className="hover:bg-white/5 transition-colors cursor-pointer group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                    {campaign.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getPlatformBadge(campaign.adAccount.platform)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(campaign.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-white font-medium">
                  {formatCurrency(campaign.spend)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-400">
                  {formatNumber(campaign.clicks)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-400">
                  {formatNumber(campaign.conversions)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span
                    className={`text-sm font-bold ${
                      campaign.roas >= 2
                        ? "text-green-400"
                        : campaign.roas >= 1
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                  >
                    {campaign.roas.toFixed(2)}x
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
