import React from 'react';
import { Leaderboard } from './Leaderboard';
import { TopJudges } from './TopJudges';

const leaderboardData = [
  { artist: "Sarah Parker", category: "Hip Hop", points: 1283 },
  { artist: "Tech Weekly", category: "Electronic", points: 2891 },
  { artist: "John Doe", category: "Pop", points: 842 }
];

const topJudgesData = [
  { name: "Tech News", handle: "@technews", avatar: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80" },
  { name: "Startup Hub", handle: "@startups", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80" }
];

export function Widgets() {
  return (
    <div className="w-80 p-4 space-y-4">
      <Leaderboard items={leaderboardData} />
      <TopJudges judges={topJudgesData} />
    </div>
  );
}