import React from 'react';
import { Play, Heart } from 'lucide-react';

const trendingArtists = [
  {
    id: 1,
    name: "Luna Voice",
    genre: "Pop/R&B",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    preview: "https://example.com/preview1.mp3",
    likes: 1234
  },
  {
    id: 2,
    name: "DJ Spark",
    genre: "Electronic",
    image: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=400&h=400&fit=crop",
    preview: "https://example.com/preview2.mp3",
    likes: 982
  },
  {
    id: 3,
    name: "Rock Revolution",
    genre: "Rock",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=400&fit=crop",
    preview: "https://example.com/preview3.mp3",
    likes: 756
  }
];

export function TrendingArtists() {
  const handlePlayPreview = (artistId: number) => {
    alert(`Playing preview for artist ${artistId}`);
  };

  const handleLike = (artistId: number) => {
    alert(`Liked artist ${artistId}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4">Trending Artists</h2>
      <div className="space-y-4">
        {trendingArtists.map((artist) => (
          <div key={artist.id} className="flex items-center gap-4">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h3 className="font-bold">{artist.name}</h3>
              <p className="text-sm text-gray-500">{artist.genre}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlayPreview(artist.id)}
                className="p-2 bg-orange-100 dark:bg-orange-900 rounded-full text-orange-500"
              >
                <Play className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleLike(artist.id)}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
              >
                <Heart className="w-4 h-4" />
                <span className="text-sm">{artist.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}