import React, { useState } from 'react';
import { Trophy, Star, TrendingUp, Filter, Search, Calendar } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    handle: string;
    avatar: string;
  };
  points: number;
  wins: number;
  genre: string;
  trend: 'up' | 'down' | 'stable';
}

const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      name: 'DJ Spark',
      handle: '@djspark',
      avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=64&h=64&fit=crop'
    },
    points: 15420,
    wins: 12,
    genre: 'Electronic',
    trend: 'up'
  },
  {
    rank: 2,
    user: {
      name: 'Luna Voice',
      handle: '@lunavoice',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop'
    },
    points: 14280,
    wins: 10,
    genre: 'Pop',
    trend: 'stable'
  },
  {
    rank: 3,
    user: {
      name: 'Beat Master',
      handle: '@beatmaster',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop'
    },
    points: 13150,
    wins: 8,
    genre: 'Hip Hop',
    trend: 'up'
  }
];

export function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState('all');
  const [genre, setGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Top performers and rankings
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4">
          {/* Second Place */}
          <div className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 text-center transform translate-y-4">
            <div className="relative">
              <img
                src={mockLeaderboard[1].user.avatar}
                alt=""
                className="w-20 h-20 rounded-full mx-auto border-4 border-white dark:border-gray-800"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold">
                2
              </div>
            </div>
            <h3 className="mt-4 font-bold">{mockLeaderboard[1].user.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{mockLeaderboard[1].points} points</p>
          </div>

          {/* First Place */}
          <div className="bg-gradient-to-br from-yellow-200 to-yellow-300 dark:from-yellow-700 dark:to-yellow-800 rounded-xl p-6 text-center">
            <div className="relative">
              <img
                src={mockLeaderboard[0].user.avatar}
                alt=""
                className="w-24 h-24 rounded-full mx-auto border-4 border-white dark:border-gray-800"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 dark:bg-yellow-600 rounded-full flex items-center justify-center text-xl font-bold">
                1
              </div>
            </div>
            <h3 className="mt-4 font-bold text-lg">{mockLeaderboard[0].user.name}</h3>
            <p className="text-gray-600 dark:text-gray-400">{mockLeaderboard[0].points} points</p>
          </div>

          {/* Third Place */}
          <div className="bg-gradient-to-br from-orange-200 to-orange-300 dark:from-orange-700 dark:to-orange-800 rounded-xl p-6 text-center transform translate-y-8">
            <div className="relative">
              <img
                src={mockLeaderboard[2].user.avatar}
                alt=""
                className="w-16 h-16 rounded-full mx-auto border-4 border-white dark:border-gray-800"
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-400 dark:bg-orange-600 rounded-full flex items-center justify-center text-xl font-bold">
                3
              </div>
            </div>
            <h3 className="mt-4 font-bold">{mockLeaderboard[2].user.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{mockLeaderboard[2].points} points</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
            <option value="day">Today</option>
          </select>
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="all">All Genres</option>
            <option value="electronic">Electronic</option>
            <option value="hiphop">Hip Hop</option>
            <option value="pop">Pop</option>
          </select>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Artist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Points
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Wins
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Genre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {mockLeaderboard.map((entry) => (
                  <tr key={entry.rank} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text">
                          #{entry.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={entry.user.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-4">
                          <div className="font-medium">{entry.user.name}</div>
                          <div className="text-sm text-gray-500">{entry.user.handle}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{entry.points.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
                        <span>{entry.wins}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-sm rounded-full bg-gray-100 dark:bg-gray-700">
                        {entry.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center ${
                        entry.trend === 'up'
                          ? 'text-green-500'
                          : entry.trend === 'down'
                          ? 'text-red-500'
                          : 'text-gray-500'
                      }`}>
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}