"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-4 w-48 h-48 sm:w-72 sm:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 -right-4 w-48 h-48 sm:w-72 sm:h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/10 glass-dark sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center animate-pulse-glow">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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
              <span className="text-lg sm:text-xl font-bold gradient-text">Lumora</span>
            </div>
            {/* Desktop Nav */}
            <div className="hidden sm:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-white/10">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0">
                  Get Started
                </Button>
              </Link>
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden py-4 border-t border-white/10 space-y-2">
              <Link href="/login" className="block">
                <Button variant="ghost" className="w-full justify-center text-gray-300 hover:text-white hover:bg-white/10">
                  Log in
                </Button>
              </Link>
              <Link href="/signup" className="block">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Now with AI-powered insights</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            All your ad metrics,
            <br />
            <span className="gradient-text">one dashboard</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 px-4">
            Track performance across Meta Ads and Google Ads in a single view.
            Get insights, optimize spend, and grow your ROAS.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4 sm:px-0">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 animate-pulse-glow">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-white/5 border-white/10 text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6">
                View Demo
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 stagger-children px-2 sm:px-0">
          {[
            { label: "Active Users", value: 12000, suffix: "+" },
            { label: "Ads Tracked", value: 2.5, suffix: "M+", decimals: 1 },
            { label: "Avg ROAS Increase", value: 34, suffix: "%" },
            { label: "Time Saved", value: 10, suffix: "hrs/week" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text">
                <AnimatedCounter
                  end={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals || 0}
                />
              </div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Dashboard Preview */}
        <div className="mt-12 sm:mt-20 relative mx-2 sm:mx-0">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent z-10 pointer-events-none" />
          <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden animate-float">
            <div className="bg-gray-900/50 px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10 flex items-center gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
              <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-gray-500 truncate">dashboard.lumora.io</span>
            </div>
            <div className="p-3 sm:p-6 bg-gray-900/30">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
                {[
                  { label: "Total Spend", value: "$45,231", color: "from-blue-500 to-cyan-500" },
                  { label: "Conversions", value: "1,429", color: "from-green-500 to-emerald-500" },
                  { label: "Avg. ROAS", value: "2.84x", color: "from-purple-500 to-pink-500" },
                  { label: "Impressions", value: "2.1M", color: "from-orange-500 to-yellow-500" },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="bg-gray-800/50 rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-white/5 hover-lift cursor-pointer"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <p className="text-xs sm:text-sm text-gray-400">{stat.label}</p>
                    <p className={`text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Animated Chart Preview */}
              <div className="bg-gray-800/50 rounded-lg sm:rounded-xl border border-white/5 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="text-xs sm:text-sm font-medium text-gray-300">Performance Overview</span>
                  <div className="flex gap-1.5 sm:gap-2">
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-blue-500/20 text-blue-400 rounded">Meta</span>
                    <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs bg-green-500/20 text-green-400 rounded">Google</span>
                  </div>
                </div>
                <div className="h-28 sm:h-40 flex items-end justify-around gap-1 sm:gap-2">
                  {[40, 65, 45, 80, 55, 70, 90, 75, 60, 85, 50, 95].map((height, i) => (
                    <div
                      key={i}
                      className="w-full rounded-t relative overflow-hidden group cursor-pointer"
                      style={{ height: `${height}%` }}
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${
                          i % 2 === 0 ? "from-blue-500 to-blue-400" : "from-purple-500 to-purple-400"
                        } opacity-80 group-hover:opacity-100 transition-all`}
                        style={{
                          animation: `slide-up 0.5s ease-out forwards`,
                          animationDelay: `${i * 0.05}s`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 sm:py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Everything you need to{" "}
              <span className="gradient-text">optimize ad performance</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
              Powerful features designed for modern marketers
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 stagger-children">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "Real-time Sync",
                description: "Connect your Meta and Google Ads accounts and see metrics update in real-time.",
                gradient: "from-yellow-500 to-orange-500",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Unified Metrics",
                description: "Compare performance across platforms with standardized metrics and reporting.",
                gradient: "from-blue-500 to-cyan-500",
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "AI Insights",
                description: "Get AI-powered recommendations to optimize your ad spend and improve ROAS.",
                gradient: "from-purple-500 to-pink-500",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover-lift cursor-pointer"
              >
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Ready to optimize your ads?</h2>
            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
              Join thousands of marketers who trust Lumora for their ad analytics.
            </p>
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 border-0 text-base sm:text-lg px-8 sm:px-10 py-5 sm:py-6">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-lg font-bold gradient-text">Lumora</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500">&copy; 2026 Lumora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
