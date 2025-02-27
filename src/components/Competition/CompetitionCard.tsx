import React from 'react';
import { Users, Clock, Tag } from 'lucide-react';
import type { Competition } from '../../types/competition';

interface CompetitionCardProps extends Competition {
  onClick: () => void;
}

export function CompetitionCard({
  title,
  prize,
  status,
  entryFee,
  genre,
  participants,
  deadline,
  description,
  image,
  onClick
}: CompetitionCardProps) {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-48">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === 'Live'
              ? 'bg-green-500 text-white'
              : 'bg-yellow-500 text-white'
          }`}>
            {status}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-white">{title}</h3>
          <div className="text-green-500 font-bold">{prize}</div>
        </div>
        
        <p className="text-gray-400 text-sm mb-4">{description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center space-x-1 text-gray-400">
            <Tag className="w-4 h-4" />
            <span>Entry: {entryFee}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400">
            <Users className="w-4 h-4" />
            <span>{participants} joined</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-orange-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">{deadline}</span>
          </div>
          <button 
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full text-sm font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            Join Now
          </button>
        </div>
      </div>
    </div>
  );
}