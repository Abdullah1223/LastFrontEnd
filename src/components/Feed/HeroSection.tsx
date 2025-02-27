import React from 'react';

export function HeroSection({setCurrentPage}) {
  return (
    <div className="relative w-full h-64 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative  h-full flex items-center justify-center text-white text-center p-8">
        <div>
          <h1 className="text-3xl   md:text-4xl font-bold mb-4">Compete. Create. Conquer.</h1>
          <p className="text-xl mb-6">Join the world's largest music competition platform</p>
          <button onClick={()=>{setCurrentPage('browse-all')}} className=" bg-white text-orange-500 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition">
            Start Competing
          </button>
        </div>
      </div>
    </div>
  );
}