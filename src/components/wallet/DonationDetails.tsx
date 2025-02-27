import React from 'react';
import { Gavel, Star, Trophy, X, ArrowUpRight, DollarSign, Clock } from 'lucide-react';

interface DonationDetailsProps {
  onClose: () => void;
}

const mockPendingReviews = [
  {
    id: 1,
    competition: 'Beat Battle Championship',
    track: 'Summer Vibes 2024',
    artist: 'DJ Spark',
    fee: 150,
    deadline: '2024-03-22',
    status: 'Pending Review'
  },
  {
    id: 2,
    competition: 'Electronic Music Challenge',
    track: 'Neon Dreams',
    artist: 'Voltage',
    fee: 200,
    deadline: '2024-03-23',
    status: 'Not Started'
  }
];

const stats = {
  totalPending: 450,
  assignedTracks: 3,
  averageFee: 150,
  completedToday: 2
};

export function DonationDetails({ onClose }: DonationDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">Pending Reviews</h2>
              <p className="text-gray-500">Track your assigned reviews and earnings</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-4 rounded-xl text-white">
              <DollarSign className="w-6 h-6 mb-2" />
              <p className="text-sm font-medium">Pending Earnings</p>
              <p className="text-2xl font-bold">${stats.totalPending}</p>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl text-white">
              <Gavel className="w-6 h-6 mb-2" />
              <p className="text-sm font-medium">Assigned Tracks</p>
              <p className="text-2xl font-bold">{stats.assignedTracks}</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-xl text-white">
              <Star className="w-6 h-6 mb-2" />
              <p className="text-sm font-medium">Average Fee</p>
              <p className="text-2xl font-bold">${stats.averageFee}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-xl text-white">
              <Trophy className="w-6 h-6 mb-2" />
              <p className="text-sm font-medium">Completed Today</p>
              <p className="text-2xl font-bold">{stats.completedToday}</p>
            </div>
          </div>

          {/* Pending Reviews */}
          <div>
            <h3 className="text-lg font-bold mb-4">Pending Reviews</h3>
            <div className="space-y-4">
              {mockPendingReviews.map((review) => (
                <div 
                  key={review.id}
                  className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-600"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-lg">{review.competition}</h4>
                      <p className="text-gray-500">{review.track} by {review.artist}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-orange-500">
                          <DollarSign className="w-4 h-4" />
                          <span>${review.fee} fee</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>Due: {new Date(review.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      review.status === 'Pending Review'
                        ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {review.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Performance */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-bold mb-4">Monthly Performance</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Review Accuracy</p>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-5 h-5" />
                  <span className="text-2xl font-bold">98%</span>
                </div>
              </div>
              <Trophy className="w-8 h-8 opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}