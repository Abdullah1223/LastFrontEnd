import React from 'react';
import { TrendingUp, Users, Trophy, DollarSign, Calendar, Download } from 'lucide-react';

export function AnalyticsPage() {
  const stats = {
    totalUsers: 12543,
    activeCompetitions: 24,
    revenue: 45250,
    growthRate: 28
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Analytics & Reports
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Platform performance and insights
            </p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border border-gray-200 dark:border-gray-700 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Last 30 Days
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Users</h3>
              <Users className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12% increase</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Active Competitions</h3>
              <Trophy className="w-5 h-5 text-yellow-500" />
            </div>
            <p className="text-2xl font-bold">{stats.activeCompetitions}</p>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>3 new today</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</h3>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold">${stats.revenue.toLocaleString()}</p>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{stats.growthRate}% growth</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">User Engagement</h3>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-2xl font-bold">85%</p>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>5% increase</span>
            </div>
          </div>
        </div>

        {/* Charts and Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">User Growth</h2>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - User growth over time</p>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Revenue Analysis</h2>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - Revenue breakdown</p>
            </div>
          </div>

          {/* Competition Statistics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Competition Statistics</h2>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - Competition metrics</p>
            </div>
          </div>

          {/* User Engagement Metrics */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">User Engagement</h2>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-500">Chart placeholder - Engagement metrics</p>
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-bold mb-2">Most Popular Genre</h3>
              <p className="text-gray-600 dark:text-gray-400">Hip Hop (45% of competitions)</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-bold mb-2">Peak Activity Time</h3>
              <p className="text-gray-600 dark:text-gray-400">8 PM - 10 PM EST</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-bold mb-2">User Retention</h3>
              <p className="text-gray-600 dark:text-gray-400">78% monthly active users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}