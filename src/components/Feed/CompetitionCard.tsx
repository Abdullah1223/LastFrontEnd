import React from 'react';
import type { Competition } from './types';

export function CompetitionCard({ 
  title, 
  prize, 
  status, 
  entryFee, 
  genre, 
  participants, 
  deadline, 
  description 
}: Competition) {
  return (
    <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-lg p-4 shadow-lg border border-orange-100 dark:border-gray-700">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">{title}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
           
             'bg-gradient-to-r from-green-500 to-green-600 text-white' 
            
        }`}>
          {'Live'}
        </span>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-2">{description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center space-x-1">
          <span className="text-green-500 font-semibold">Prize Pool:</span>
          <span>{prize}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-orange-500 font-semibold">Entry Fee:</span>
          <span>{entryFee}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-yellow-500 font-semibold">Genre:</span>
          <span>{genre}</span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-green-500 font-semibold">Participants:</span>
          <span>{participants}</span>
        </div>
      </div>
      <div className="mt-2 text-sm font-medium text-orange-600 dark:text-orange-400">{deadline}</div>
    </div>
  );
}