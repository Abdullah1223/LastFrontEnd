import React, { useState } from 'react';
import { Trophy, Star, TrendingUp, DollarSign, Calendar, Music, ArrowUpRight } from 'lucide-react';
import { competitions } from '../data/competitions';

export function MyEntriesPage() {
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const stats = {
    totalEntries: 24,
    winRate: "67%",
    avgScore: 8.4,
    earnings: "$12,450",
    rank: "Elite",
    rankPoints: 1250
  };

  const activeCompetitions = [
    {
      id: 1,
      name: "Beat Battle Championship",
      status: "In Progress",
      currentRank: 3,
      totalParticipants: 842,
      submissionDate: "2024-03-15",
      score: 92
    },
    {
      id: 2,
      name: "Electronic Music Challenge",
      status: "Judging",
      currentRank: 5,
      totalParticipants: 432,
      submissionDate: "2024-03-10",
      score: 88
    }
  ];

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Successfully added $${depositAmount} to your wallet!`);
    setShowDepositModal(false);
    setDepositAmount('');
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Competition Stats</h2>
              <Trophy className="w-6 h-6" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-75">Total Entries</p>
                <p className="text-2xl font-bold">{stats.totalEntries}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Win Rate</p>
                <p className="text-2xl font-bold">{stats.winRate}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Avg Score</p>
                <p className="text-2xl font-bold">{stats.avgScore}</p>
              </div>
              <div>
                <p className="text-sm opacity-75">Earnings</p>
                <p className="text-2xl font-bold">{stats.earnings}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Artist Rank</h2>
              <Star className="w-6 h-6" />
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold mb-2">{stats.rank}</p>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div className="bg-white rounded-full h-2 w-3/4"></div>
              </div>
              <p className="text-sm">{stats.rankPoints} points to next rank</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Quick Actions</h2>
              <TrendingUp className="w-6 h-6 text-orange-500" />
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => setShowDepositModal(true)}
                className="w-full py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md flex items-center justify-center gap-2"
              >
                <DollarSign className="w-5 h-5" />
                Add Funds
              </button>
              <button className="w-full py-2 bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition shadow-md flex items-center justify-center gap-2">
                <Music className="w-5 h-5" />
                Submit Track
              </button>
            </div>
          </div>
        </div>

        {/* Active Competitions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold">Active Competitions</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {activeCompetitions.map((competition) => (
              <div key={competition.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{competition.name}</h3>
                    <p className="text-sm text-gray-500">
                      Submitted: {competition.submissionDate}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    competition.status === 'In Progress'
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {competition.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Rank</p>
                    <p className="font-bold text-orange-500">#{competition.currentRank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="font-bold">{competition.totalParticipants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Score</p>
                    <p className="font-bold text-green-500">{competition.score}/100</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Competitions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold">Available Competitions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {competitions.map((competition) => (
              <div 
                key={competition.title}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg p-4 cursor-pointer hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">{competition.title}</h3>
                    <p className="text-sm text-gray-500">{competition.genre}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    competition.status === 'Live'
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {competition.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm">
                    <p className="text-gray-500">Prize Pool</p>
                    <p className="font-bold text-green-500">{competition.prize}</p>
                  </div>
                  <button className="flex items-center gap-1 px-4 py-2 bg-orange-500 text-white rounded-full text-sm font-bold hover:bg-orange-600 transition">
                    Enter Now
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Add Funds</h3>
            <form onSubmit={handleDeposit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="block w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="0.00"
                    required
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowDepositModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md"
                >
                  Add Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}