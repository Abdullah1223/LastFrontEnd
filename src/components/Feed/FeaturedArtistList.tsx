import React from 'react';
import { FeaturedArtist } from './FeaturedArtist';
import type { Artist } from './types';

interface FeaturedArtistListProps {
  artists: Artist[];
}

export function FeaturedArtistList({ artists,followinglist }: FeaturedArtistListProps) {
  
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
        Featured Artists
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {artists.map((artist) => (
          <FeaturedArtist key={artist.name} artist={artist} followinglist={followinglist} />
        ))}
      </div>
    </section>
  );
}