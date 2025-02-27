import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center transform rotate-3 shadow-lg">
          <div className="bg-yellow-400 w-11 h-11 rounded-lg flex items-center justify-center transform -rotate-6">
            <span className="text-2xl font-black text-white transform rotate-3">RNK</span>
          </div>
        </div>
        {/* Claw mark overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute transform rotate-45 bg-green-500/20 w-8 h-1.5 rounded-full top-2 left-2" />
          <div className="absolute transform rotate-45 bg-green-500/20 w-8 h-1.5 rounded-full top-4 left-2" />
          <div className="absolute transform rotate-45 bg-green-500/20 w-8 h-1.5 rounded-full top-6 left-2" />
        </div>
      </div>
      <div className="text-2xl font-black bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
        THE RANKK
      </div>
    </div>
  );
}