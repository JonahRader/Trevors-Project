"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Jan", meta: 4000, google: 2400 },
  { name: "Feb", meta: 3000, google: 1398 },
  { name: "Mar", meta: 2000, google: 9800 },
  { name: "Apr", meta: 2780, google: 3908 },
  { name: "May", meta: 1890, google: 4800 },
  { name: "Jun", meta: 2390, google: 3800 },
  { name: "Jul", meta: 3490, google: 4300 },
  { name: "Aug", meta: 4000, google: 2400 },
  { name: "Sep", meta: 3000, google: 1398 },
  { name: "Oct", meta: 2000, google: 9800 },
  { name: "Nov", meta: 2780, google: 3908 },
  { name: "Dec", meta: 1890, google: 4800 },
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-xl">
        <p className="text-gray-400 text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function PerformanceChart() {
  return (
    <div className="bg-gray-900/50 rounded-xl sm:rounded-2xl border border-white/10 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-white">
            Performance Overview
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">Monthly ad spend comparison</p>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500" />
            <span className="text-xs sm:text-sm text-gray-400">Meta Ads</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500" />
            <span className="text-xs sm:text-sm text-gray-400">Google Ads</span>
          </div>
        </div>
      </div>
      <div className="h-60 sm:h-72 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMeta" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorGoogle" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              dataKey="name"
              stroke="#6b7280"
              tick={{ fill: "#9ca3af" }}
              axisLine={{ stroke: "#374151" }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fill: "#9ca3af" }}
              axisLine={{ stroke: "#374151" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="meta"
              name="Meta Ads"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorMeta)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="google"
              name="Google Ads"
              stroke="#a855f7"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGoogle)"
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
