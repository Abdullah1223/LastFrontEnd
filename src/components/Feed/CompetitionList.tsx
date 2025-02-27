import React from 'react';
import { CompetitionCard } from './CompetitionCard';
import type { Competition } from './types';

interface CompetitionListProps {
  competitions: Competition[];
}

export function CompetitionList({ competitions }: CompetitionListProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
        Active Competitions
      </h2>
      <div className="space-y-4">
        {competitions.map((competition, index) => (
          <CompetitionCard key={index} {...competition} />
        ))}
      </div>
    </section>
  );
}