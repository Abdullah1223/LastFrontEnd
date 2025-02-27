import React, { useEffect, useRef, useState, useMemo } from 'react';
import { CompetitionHeader } from '../components/Competition/CompetitionHeader';
import { CompetitionChat } from '../components/Competition/CompetitionChat';
import { CompetitionGrid } from '../components/Competition/CompetitionGrid';
import { CompetitionFilters } from '../components/Competition/CompetitionFilters';
import { FeaturedPool } from '../components/Competition/FeaturedPool';
import { CompetitionSubmissionPage } from './CompetitionSubmissionPage';
import { InView, useInView } from 'react-intersection-observer';

interface Competition {
  status: string;
  genre: string;
  // Add other competition properties here
}

export function CompetitionPage() {
  const { ref: GridRef, inView } = useInView();
  const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [competitionData, setCompetitionData] = useState<Competition[]>([]);
  const [featuredData, setFeaturedData] = useState<{ live: Competition[]; upcoming: Competition[] }>({ 
    live: [], 
    upcoming: [] 
  });
  const [SearchSet, setSearchSet] = useState(false);
  const [Page, setPage] = useState(0);
  const [SearchQuery, setSearchQuery] = useState<string>("");
   const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(Page);
  //const initialLoadDone = useRef(false);

  // Sync pageRef with Page state
  useEffect(() => {
    pageRef.current = Page;
  }, [Page]);

  const fetchAllData = async (page: number,genre:string) => {
    try {
      // setIsLoading(true);
      const response = await fetch(`https://3.229.148.115:8003/fetchingallcompetitions/${genre}/${page}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();

      if (result.length === 0 || response.status===204) {
        setHasMore(false);
        console.log('SetMoreFalse Worked Here')
      }

      setCompetitionData((prev)=>[...prev,...result])

  
  }catch(err){
    console.log(err)
  };
  }

  useEffect(()=>{
     fetchAllData(0,'All')
     setPage(0)
  },[])

  useEffect(()=>{
    if(inView){
      const pagenum = pageRef.current+1;
    setPage(pagenum)
    fetchAllData(pagenum,selectedGenre||'all')
    }
  },[inView])
 
  useEffect(()=>{
    setCompetitionData([])
    setPage(0)
    setHasMore(true)
   fetchAllData(0,selectedGenre)
  },[selectedGenre])

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
          liveCompetitions={featuredData.live}
          upcomingCompetitions={featuredData.upcoming}
          onCompetitionClick={setSelectedCompetition}
          isLoading={isLoading}
        />
        <CompetitionFilters 
          onSearchQueryChange={setSearchQuery}
          onGenreSelect={setSelectedGenre} 
          selectedGenre={selectedGenre}
          setSearch={setSearchSet}
        />
        <CompetitionGrid 
          SearchQuery={SearchQuery}
          search={SearchSet}
          competitions={competitionData}
          onCompetitionClick={setSelectedCompetition}
          ref={GridRef}
          isLoading={isLoading}
          hasMore={hasMore}
        />
      </div>
    </div>
  );
}