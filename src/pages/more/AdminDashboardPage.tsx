import React from 'react';
import { Users, Trophy, BarChart, Shield, Mail, Settings, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminModule {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  stats?: {
    value: string;
    label: string;
  };
}

const adminModules: AdminModule[] = [
  {
    title: 'User Management',
    description: 'Manage user accounts, roles, and permissions',
    icon: Users,
    path: '/admin/users',
    stats: {
      value: '12.5k',
      label: 'Active Users'
    }
  },
  {
    title: 'Competition Management',
    description: 'Create and manage music competitions',
    icon: Trophy,
    path: '/admin/competitions',
    stats: {
      value: '24',
      label: 'Active Competitions'
    }
  },
  {
    title: 'Analytics & Reports',
    description: 'View platform statistics and insights',
    icon: BarChart,
    path: '/admin/analytics',
    stats: {
      value: '+28%',
      label: 'Growth Rate'
    }
  },
  {
    title: 'Content Moderation',
    description: 'Review and moderate user content',
    icon: Shield,
    path: '/admin/moderation',
    stats: {
      value: '15',
      label: 'Pending Reviews'
    }
  },
  {
    title: 'Email Templates',
    description: 'Manage system email notifications',
    icon: Mail,
    path: '/admin/emails',
    stats: {
      value: '8',
      label: 'Active Templates'
    }
  },
  {
    title: 'Payment Management',
    description: 'Monitor transactions and payouts',
    icon: DollarSign,
    path: '/admin/payments',
    stats: {
      value: '$45.2k',
      label: 'Monthly Revenue'
    }
  },
  {
    title: 'System Settings',
    description: 'Configure platform settings',
    icon: Settings,
    path: '/admin/settings'
  }
];

export function AdminDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage and monitor all aspects of the platform
          </p>
        </div>

        {/* Admin Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminModules.map((module) => (
            <button
              key={module.title}
              onClick={() => navigate(module.path)}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <module.icon className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-xl font-bold">{module.title}</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {module.description}
              </p>
              {module.stats && (
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-2xl text-orange-500">
                    {module.stats.value}
                  </span>
                  <span className="text-gray-500">{module.stats.label}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}