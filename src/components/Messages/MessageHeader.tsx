import React from 'react';
import { Search } from 'lucide-react';

interface MessageHeaderProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

export function MessageHeader({ filter, onFilterChange }: MessageHeaderProps) {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
      <div className="relative">
        <input
          type="text"
          placeholder="Search messages..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      <div className="  flex  gap-2 md:overflow-x-auto p-3 whitespace-nowrap   mt-4">
        {['all', 'fans', 'admin', 'results', 'disputes'].map((f) => (
          <button
            key={f}
            onClick={() => onFilterChange(f)}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === f
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}