import React from 'react';
import { Users, Trophy, DollarSign, TrendingUp, AlertCircle, Activity } from 'lucide-react';

const stats = {
  totalUsers: 12543,
  activeCompetitions: 24,
  revenue: 45250,
  growthRate: 28,
  pendingReports: 15,
  systemHealth: 98
};

const recentActivities = [
  {
    id: 1,
    type: 'user',
    action: 'New user registration spike detected',
    timestamp: '2024-03-20T15:30:00Z',
    priority: 'high'
  },
  {
    id: 2,
    type: 'competition',
    action: 'Beat Battle Championship started',
    timestamp: '2024-03-20T15:00:00Z',
    priority: 'medium'
  },
  {
    id: 3,
    type: 'payment',
    action: 'Monthly payout processing completed',
    timestamp: '2024-03-20T14:30:00Z',
    priority: 'low'
  }
];

export function AdminDashboardPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Platform overview and management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                <p className="text-2xl font-bold mt-1">{stats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>12% increase this month</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active Competitions</p>
                <p className="text-2xl font-bold mt-1">{stats.activeCompetitions}</p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Trophy className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>3 new today</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</p>
                <p className="text-2xl font-bold mt-1">${stats.revenue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <DollarSign className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-500">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>{stats.growthRate}% growth</span>
            </div>
          </div>
        </div>

        {/* Activity Feed and System Health */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className={`p-2 rounded-full ${
                    activity.priority === 'high' 
                      ? 'bg-red-100 dark:bg-red-900' 
                      : activity.priority === 'medium'
                      ? 'bg-yellow-100 dark:bg-yellow-900'
                      : 'bg-green-100 dark:bg-green-900'
                  }`}>
                    <AlertCircle className={`w-5 h-5 ${
                      activity.priority === 'high'
                        ? 'text-red-500'
                        : activity.priority === 'medium'
                        ? 'text-yellow-500'
                        : 'text-green-500'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4">System Health</h2>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">System Status</span>
                  <span className="text-sm font-medium text-green-500">Operational</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${stats.systemHealth}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">API Status</span>
                  </div>
                  <p className="text-2xl font-bold text-green-500">99.9%</p>
                  <p className="text-sm text-gray-500">Uptime this month</p>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium">Reports</span>
                  </div>
                  <p className="text-2xl font-bold">{stats.pendingReports}</p>
                  <p className="text-sm text-gray-500">Pending review</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}