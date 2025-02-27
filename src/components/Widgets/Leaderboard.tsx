import React from 'react';

interface LeaderboardItem {
  artist: string;
  category: string;
  points: number;
}

interface LeaderboardProps {
  items: LeaderboardItem[];
}

export function Leaderboard({ items }: LeaderboardProps) {
  return (
    <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-4 shadow-lg">
      <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
        Leaderboard
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.artist} className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700 p-3 rounded-lg transition-colors border border-orange-100/50 dark:border-gray-700">
            <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">{item.category}</p>
            <p className="font-bold text-gray-900 dark:text-white">{item.artist}</p>
            <p className="text-sm text-green-500 font-semibold">{item.points} points</p>
          </div>
        ))}
      </div>
    </div>
  );
}