import React, { useState } from 'react';
import { BadgeCheck, Star, Music, Users, Filter, Search } from 'lucide-react';

interface VerifiedUser {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: 'artist' | 'judge';
  bio: string;
  followers: number;
  achievements: string[];
  genre?: string;
  rating?: number;
}

const mockVerifiedUsers: VerifiedUser[] = [
  {
    id: '1',
    name: 'DJ Spark',
    handle: '@djspark',
    avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&h=200&fit=crop',
    role: 'artist',
    bio: 'Electronic music producer and beat maker. 2x Beat Battle Champion.',
    followers: 12453,
    achievements: ['Beat Battle Champion 2024', 'Most Innovative Producer 2023'],
    genre: 'Electronic'
  },
  {
    id: '2',
    name: 'Sarah Parker',
    handle: '@sarahp',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    role: 'judge',
    bio: 'Industry veteran with 15+ years experience. Head judge for major competitions.',
    followers: 8921,
    achievements: ['Judge of the Year 2023', '500+ Competitions Judged'],
    rating: 4.9
  }
];

export function VerifiedPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockVerifiedUsers.filter(user => {
    const matchesFilter = filter === 'all' || user.role === filter;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.handle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
            Verified Members
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Discover our verified artists and judges
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search verified members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
          >
            <option value="all">All Members</option>
            <option value="artist">Artists</option>
            <option value="judge">Judges</option>
          </select>
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition"
            >
              <div className="flex items-start gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <BadgeCheck className="w-5 h-5 text-blue-500" />
                  </div>
                  <p className="text-gray-500">{user.handle}</p>
                </div>
              </div>

              <p className="mt-4 text-gray-600 dark:text-gray-400">{user.bio}</p>

              <div className="mt-4 flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span>{user.followers.toLocaleString()} followers</span>
                </div>
                {user.genre && (
                  <div className="flex items-center gap-1">
                    <Music className="w-4 h-4 text-gray-500" />
                    <span>{user.genre}</span>
                  </div>
                )}
                {user.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{user.rating}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 space-y-2">
                {user.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-sm bg-gray-50 dark:bg-gray-700 p-2 rounded-lg"
                  >
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md">
                {user.role === 'artist' ? 'Follow Artist' : 'View Profile'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}