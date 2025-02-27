import React from 'react';
import { Trophy, Heart, Music, Users, Star, Wallet } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { FeaturedAds } from '../components/fan/FeaturedAds';
import { TrendingArtists } from '../components/fan/TrendingArtists';
import { RecommendedContent } from '../components/fan/RecommendedContent';

export function HomePage() {
  const { user } = useUser();

  if (user?.role === 'fan') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Fan Welcome Section */}
          <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl p-8 text-white">
            <h1 className="text-3xl font-bold mb-4">Welcome back, {user?.name}!</h1>
            <p className="text-lg opacity-90 mb-6">Discover and support amazing artists</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <Heart className="w-6 h-6 mb-2" />
                <p className="font-semibold">12 Artists Supported</p>
                <p className="text-sm opacity-75">Total: $225 donated</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Star className="w-6 h-6 mb-2" />
                <p className="font-semibold">24 Competitions Voted</p>
                <p className="text-sm opacity-75">Help choose winners</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Users className="w-6 h-6 mb-2" />
                <p className="font-semibold">156 Following</p>
                <p className="text-sm opacity-75">Stay updated with artists</p>
              </div>
            </div>
          </div>

          {/* Featured Ads */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Special Offers</h2>
            <FeaturedAds />
          </section>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition flex items-center gap-3">
              <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                <Trophy className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Vote Now</p>
                <p className="text-sm text-gray-500">Support artists</p>
              </div>
            </button>
            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition flex items-center gap-3">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Wallet className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Add Funds</p>
                <p className="text-sm text-gray-500">Support artists</p>
              </div>
            </button>
            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition flex items-center gap-3">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <Music className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Live Events</p>
                <p className="text-sm text-gray-500">Watch shows</p>
              </div>
            </button>
            <button className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition flex items-center gap-3">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Find Artists</p>
                <p className="text-sm text-gray-500">Discover talent</p>
              </div>
            </button>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">Recommended For You</h2>
              <RecommendedContent />
            </div>
            <div>
              <TrendingArtists />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Return the original artist dashboard for other roles
  return (
    <div className="border-l border-r border-gray-200 dark:border-gray-800 min-h-screen p-4">
      <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 shadow-lg mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-4">
          Welcome to THE RANKK
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Your journey in music competitions starts here. Discover trending battles, connect with artists, and showcase your talent.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold text-orange-500">Quick Stats</h3>
            <ul className="mt-2 space-y-2">
              <li className="text-green-500">🏆 5 Active Competitions</li>
              <li className="text-yellow-500">👥 1.2k Online Users</li>
              <li className="text-orange-500">🎵 328 Submissions Today</li>
            </ul>
          </div>
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="font-bold text-orange-500">Your Activity</h3>
            <ul className="mt-2 space-y-2">
              <li className="text-green-500">📈 Rank: Rising Star</li>
              <li className="text-yellow-500">🎯 2 Competitions Joined</li>
              <li className="text-orange-500">💫 15 Points Earned</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-orange-500 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-sm">DJ Spark won "Beat Battle #123"</p>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <p className="text-sm">New competition: "Summer Vibes 2024"</p>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <p className="text-sm">Luna Voice posted a new submission</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-orange-500 mb-4">Recommended</h2>
          <div className="space-y-4">
            <div className="group p-3 bg-white dark:bg-gray-700 rounded-lg cursor-pointer hover:shadow-md transition">
              <h4 className="font-semibold group-hover:text-orange-500">Beat Production Workshop</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Learn from industry experts</p>
            </div>
            <div className="group p-3 bg-white dark:bg-gray-700 rounded-lg cursor-pointer hover:shadow-md transition">
              <h4 className="font-semibold group-hover:text-orange-500">Remix Challenge</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prize pool: $2,000</p>
            </div>
            <div className="group p-3 bg-white dark:bg-gray-700 rounded-lg cursor-pointer hover:shadow-md transition">
              <h4 className="font-semibold group-hover:text-orange-500">Collaboration Hub</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Connect with 50+ artists</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}