import React from 'react';
import { ArrowLeft, Bell, Calendar, Trophy, Star, MessageCircle } from 'lucide-react';

interface NotificationDetail {
  id: string;
  type: 'competition' | 'achievement' | 'message' | 'system';
  title: string;
  description: string;
  date: string;
  metadata?: {
    competitionName?: string;
    achievementName?: string;
    sender?: string;
    actionRequired?: boolean;
  };
}

const mockNotification: NotificationDetail = {
  id: '1',
  type: 'competition',
  title: 'Competition Starting Soon',
  description: 'Your registered competition "Beat Battle Championship" starts in 24 hours. Make sure your submission is ready!',
  date: '2024-03-20T15:30:00',
  metadata: {
    competitionName: 'Beat Battle Championship',
    actionRequired: true
  }
};

export function NotificationDetailPage() {
  const getNotificationIcon = (type: NotificationDetail['type']) => {
    switch (type) {
      case 'competition':
        return <Trophy className="w-6 h-6 text-orange-500" />;
      case 'achievement':
        return <Star className="w-6 h-6 text-yellow-500" />;
      case 'message':
        return <MessageCircle className="w-6 h-6 text-blue-500" />;
      default:
        return <Bell className="w-6 h-6 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-8">
          <ArrowLeft className="w-5 h-5" />
          Back to Notifications
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          {/* Notification Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                {getNotificationIcon(mockNotification.type)}
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{mockNotification.title}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(mockNotification.date).toLocaleString()}</span>
                  </div>
                  {mockNotification.metadata?.actionRequired && (
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
                      Action Required
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notification Content */}
          <div className="p-6">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {mockNotification.description}
            </p>

            {mockNotification.metadata?.competitionName && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2">Competition Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-orange-500" />
                    <span>{mockNotification.metadata.competitionName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Starts in 24 hours</span>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button className="flex-1 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md">
                View Competition
              </button>
              <button className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Dismiss
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}