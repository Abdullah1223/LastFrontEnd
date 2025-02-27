import React from 'react';
import { Music, Trophy, Users, Star, Play, Heart, MessageCircle } from 'lucide-react';

export function ArtistPortfolioPage() {
  const artist = {
    name: "DJ Spark",
    handle: "@djspark",
    avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&fit=crop",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&h=400&fit=crop",
    bio: "Electronic music producer and beat maker. 2x Beat Battle Champion.",
    followers: 12453,
    following: 324,
    achievements: [
      { title: "Beat Battle Champion", year: "2024" },
      { title: "Most Innovative Producer", year: "2023" },
      { title: "Rising Star Award", year: "2023" }
    ],
    tracks: [
      {
        id: "1",
        title: "Summer Vibes",
        plays: 15234,
        likes: 1243,
        image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop"
      },
      {
        id: "2",
        title: "Night Drive",
        plays: 12453,
        likes: 987,
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop"
      }
    ],
    competitions: [
      {
        title: "Beat Battle Championship",
        result: "Winner",
        date: "2024-02-15"
      },
      {
        title: "Electronic Music Challenge",
        result: "Runner-up",
        date: "2024-01-20"
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Cover Image */}
      <div className="h-64 relative">
        <img 
          src={artist.coverImage}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Profile Info */}
      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="flex justify-between items-end absolute -top-16 left-6 right-6">
          <div className="flex items-end gap-6">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800"
            />
            <div className="mb-4 text-white">
              <h1 className="text-3xl font-bold">{artist.name}</h1>
              <p className="text-gray-200">{artist.handle}</p>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-lg">
              Follow
            </button>
            <button className="px-6 py-2 bg-white/20 text-white rounded-full font-bold hover:bg-white/30 transition backdrop-blur-sm">
              Message
            </button>
          </div>
        </div>

        <div className="pt-24 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bio and Stats */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">About</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{artist.bio}</p>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="font-bold">{artist.followers.toLocaleString()}</p>
                  <p className="text-gray-500">Followers</p>
                </div>
                <div>
                  <p className="font-bold">{artist.following.toLocaleString()}</p>
                  <p className="text-gray-500">Following</p>
                </div>
                <div>
                  <p className="font-bold">24</p>
                  <p className="text-gray-500">Tracks</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Achievements</h2>
              <div className="space-y-4">
                {artist.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-gray-500">{achievement.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column - Tracks */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Popular Tracks</h2>
              <div className="space-y-4">
                {artist.tracks.map((track) => (
                  <div key={track.id} className="flex items-center gap-4 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer">
                    <img
                      src={track.image}
                      alt={track.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{track.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Play className="w-4 h-4" />
                          <span>{track.plays.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{track.likes.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition">
                      <Play className="w-6 h-6 text-orange-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Competition History</h2>
              <div className="space-y-4">
                {artist.competitions.map((competition, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div>
                      <h3 className="font-bold">{competition.title}</h3>
                      <p className="text-sm text-gray-500">{new Date(competition.date).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      competition.result === 'Winner'
                        ? 'bg-green-500 text-white'
                        : 'bg-yellow-500 text-white'
                    }`}>
                      {competition.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}