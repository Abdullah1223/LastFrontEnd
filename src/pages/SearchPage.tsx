import React, { useState } from 'react';
import { Search, Filter, Music, User, Trophy } from 'lucide-react';

interface SearchResult {
  type: 'artist' | 'competition' | 'track';
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
}

const mockResults: SearchResult[] = [
  {
    type: 'artist',
    id: '1',
    title: 'DJ Spark',
    subtitle: 'Electronic Music Producer',
    image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&h=200&fit=crop',
    tags: ['Electronic', 'Producer', 'DJ']
  },
  {
    type: 'competition',
    id: '2',
    title: 'Beat Battle Championship',
    subtitle: 'Prize Pool: $5,000',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop',
    tags: ['Hip Hop', 'Live', 'Featured']
  },
  {
    type: 'track',
    id: '3',
    title: 'Summer Vibes 2024',
    subtitle: 'By Luna Voice',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop',
    tags: ['Pop', 'Summer', 'Trending']
  }
];

export function SearchPage() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [results, setResults] = useState(mockResults);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger an API search
    console.log('Searching for:', query);
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'artist':
        return <User className="w-5 h-5 text-orange-500" />;
      case 'competition':
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 'track':
        return <Music className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-4">
            Search
          </h1>
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search artists, competitions, or tracks..."
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
              />
            </div>
          </form>
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {['All', 'Artists', 'Competitions', 'Tracks'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f.toLowerCase())}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                filter === f.toLowerCase()
                  ? 'bg-orange-500 text-white'
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-xl transition cursor-pointer border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center gap-4">
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    {getResultIcon(result.type)}
                    <h3 className="font-bold">{result.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {result.subtitle}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {result.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}