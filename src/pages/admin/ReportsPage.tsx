import React, { useState } from 'react';
import { BarChart, PieChart, TrendingUp, Download, Calendar, Filter } from 'lucide-react';

export function ReportsPage() {
  const [dateRange, setDateRange] = useState('30');
  const [reportType, setReportType] = useState('overview');

  const stats = {
    totalUsers: 12543,
    newUsers: 324,
    activeCompetitions: 24,
    totalRevenue: 45250,
    userGrowth: 12,
    competitionGrowth: 8
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
              Detailed insights and platform statistics
            </p>
          </div>
          <div className="flex gap-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-lg font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Users</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500">+{stats.userGrowth}%</span>
              <span className="text-gray-500 ml-2">vs last period</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Active Competitions</h3>
              <BarChart className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-2xl font-bold">{stats.activeCompetitions}</p>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500">+{stats.competitionGrowth}%</span>
              <span className="text-gray-500 ml-2">vs last period</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</h3>
              <PieChart className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</p>
            <div className="mt-2 flex items-center text-sm">
              <span className="text-green-500">+15%</span>
              <span className="text-gray-500 ml-2">vs last period</span>
            </div>
          </div>
        </div>

        {/* Report Types */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex gap-4">
              <button
                onClick={() => setReportType('overview')}
                className={`px-4 py-2 rounded-lg ${
                  reportType === 'overview'
                    ? 'bg-orange-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setReportType('users')}
                className={`px-4 py-2 rounded-lg ${
                  reportType === 'users'
                    ? 'bg-orange-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                User Analytics
              </button>
              <button
                onClick={() => setReportType('competitions')}
                className={`px-4 py-2 rounded-lg ${
                  reportType === 'competitions'
                    ? 'bg-orange-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Competition Stats
              </button>
              <button
                onClick={() => setReportType('revenue')}
                className={`px-4 py-2 rounded-lg ${
                  reportType === 'revenue'
                    ? 'bg-orange-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                Revenue Analysis
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Chart placeholder */}
            <div className="h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
              <p className="text-gray-500">Chart visualization would go here</p>
            </div>

            {/* Data table */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Detailed Data</h3>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-5 h-5" />
                    Filter by date
                  </button>
                  <button className="flex items-center gap-2 text-gray-500">
                    <Filter className="w-5 h-5" />
                    More filters
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                      <th className="pb-3 font-medium text-gray-500">Date</th>
                      <th className="pb-3 font-medium text-gray-500">Users</th>
                      <th className="pb-3 font-medium text-gray-500">Competitions</th>
                      <th className="pb-3 font-medium text-gray-500">Revenue</th>
                      <th className="pb-3 font-medium text-gray-500">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3">Mar 20, 2024</td>
                      <td className="py-3">1,234</td>
                      <td className="py-3">8</td>
                      <td className="py-3">$2,345</td>
                      <td className="py-3 text-green-500">+12%</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <td className="py-3">Mar 19, 2024</td>
                      <td className="py-3">1,198</td>
                      <td className="py-3">7</td>
                      <td className="py-3">$2,156</td>
                      <td className="py-3 text-green-500">+8%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}