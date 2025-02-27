import React, { useEffect, useState } from 'react';
import { CompetitionHeader } from './CompetitionHeader';
import { CompetitionChat } from './CompetitionChat';
import { CompetitionGrid } from './CompetitionGrid';
import { CompetitionFilters } from './CompetitionFilters';
import { FeaturedPool } from './FeaturedPool';
import { CompetitionMemories } from './CompetitionMemories';
import { CompetitionSubmissionPage } from '../../pages/CompetitionSubmissionPage';
import { competitions } from '../../data/competitions';
import { useUser } from '../../context/UserContext';

export function CompetitionPage() {
  const { user } = useUser();
  const [selectedCompetition, setSelectedCompetition] = useState<typeof competitions[0] | null>(null);
  const [selectedGenre, setSelectedGenre] = useState('all');
  
  
  const filteredCompetitions = selectedGenre === 'all' 
    ? competitions 
    : competitions.filter(comp => comp.genre.toLowerCase() === selectedGenre.toLowerCase());

  const { liveCompetitions, upcomingCompetitions } = React.useMemo(() => {
    return {
      liveCompetitions: filteredCompetitions.filter(comp => comp.status === 'Live'),
      upcomingCompetitions: filteredCompetitions.filter(comp => comp.status === 'Upcoming')
    };
  }, [filteredCompetitions]);

  if (selectedCompetition) {
    return (
      <CompetitionSubmissionPage 
        competition={selectedCompetition}
        onBack={() => setSelectedCompetition(null)}
      />
    );
  }

  return (
    
    <div className="border-l border-r border-gray-200 dark:border-gray-800 min-h-screen">
      
      <CompetitionHeader />
      <div className="p-4">
        <CompetitionChat />
        <FeaturedPool
          liveCompetitions={liveCompetitions}
          upcomingCompetitions={upcomingCompetitions}
          onCompetitionClick={setSelectedCompetition}
        />
        {user?.role === 'fan' && <CompetitionMemories />}
        <CompetitionFilters onGenreSelect={setSelectedGenre} selectedGenre={selectedGenre} />
        <CompetitionGrid 
          competitions={filteredCompetitions}
          onCompetitionClick={setSelectedCompetition}
        />
      </div>
    </div>
  
);
  
}