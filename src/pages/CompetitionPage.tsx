
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { CompetitionHeader } from '../components/Competition/CompetitionHeader';
import { CompetitionChat } from '../components/Competition/CompetitionChat';
import { CompetitionGrid } from '../components/Competition/CompetitionGrid';
import { CompetitionFilters } from '../components/Competition/CompetitionFilters';
import { FeaturedPool } from '../components/Competition/FeaturedPool';
import { CompetitionSubmissionPage } from './CompetitionSubmissionPage';
import { InView, useInView } from 'react-intersection-observer';
import { useUser } from '../context/UserContext';

interface Competition {
  status: string;
  genre: string;
  // Add other competition properties here
}


export function CompetitionPage({setCurrentPage}) {
  const { ref: GridRef, inView } = useInView();
  const [showLoginAlert, setShowLoginAlert] = useState(false);

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
  const initialLoadDone = useRef(false);
  const {portnum8003}=useUser()
  // Sync pageRef with Page state
  useEffect(() => {
    pageRef.current = Page;
  }, [Page]);

  const fetchAllData = async (page: number,genre:string) => {
    try {
      setIsLoading(true);
      
      //`http://localhost:8003/fetchingallcompetitions/${genre}/${page}`
      const response = await fetch(`${portnum8003}fetchingallcompetitions/${genre}/${page}`);
      if (!response.ok) throw new Error('Failed to fetch');
      const result = await response.json();

      if (result.length === 0) {
        setHasMore(false);
         setIsLoading(false) 
         console.log('worked')
      }
       console.log(result)
      // setCompetitionData((prev)=>[...prev,...result])
      // setIsLoading(false)
      if (page === 0 && !initialLoadDone.current) {
        const initialLive = result.filter((data: Competition) => data.status === 'started');
        console.log(initialLive)
        const initialUpcoming = result.filter((data: Competition) => data.status === 'upcoming');
        setFeaturedData({ live: initialLive, upcoming: initialUpcoming });
        console.log(initialLive)
        console.log(initialUpcoming)
        setCompetitionData(result);
        setIsLoading(false)
        initialLoadDone.current = true;
      } else {
        setCompetitionData(prev => [...prev, ...result]);
        setIsLoading(false)
      }

      if (result.length < 4) {setHasMore(false); setIsLoading(false)};
    } catch (error) {
      console.log('Fetch error:', error);
    } 
  };

  // Initial load only
  useEffect(() => {
    if (!initialLoadDone.current) {
      fetchAllData(0,selectedGenre);
    }
  }, []);

  // Pagination trigger with 1-second delay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (inView  && initialLoadDone&&  hasMore) {
      timer = setTimeout(() => {
      
        const nextPage = pageRef.current + 1;
        setPage(nextPage);
        fetchAllData(nextPage,selectedGenre);
      }, 1000);
    }
  
    return () => {
      if (timer) clearTimeout(timer);
    };
   
  }, [inView, hasMore]);

  useEffect(()=>{
    setPage(0)
    setIsLoading(true)
    setCompetitionData([])
    fetchAllData(0,selectedGenre)
    setHasMore(true)
  },[selectedGenre])
  // Client-side filtered data - NO RESET ON FILTER CHANGE

  // const filteredData = useMemo(() => {
   
  //   if (selectedGenre === 'Upcoming') {
  //     return competitionData.filter(item => item.status === 'upcoming');
  //   }
  //   if (selectedGenre === 'Live') {
  //     return competitionData.filter(item => item.status === 'started');
  //   }
  //   if (!['all', 'All', 'Upcoming', 'Live'].includes(selectedGenre)) {
  //     return competitionData.filter(item => item.genre === selectedGenre.toLowerCase());
  //   }
  //   return competitionData;
  // }, [competitionData, selectedGenre]);

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
 
      <CompetitionHeader setCurrentPage={setCurrentPage} />
      <div className="p-4">
        <CompetitionChat />
        <FeaturedPool
          liveCompetitions={featuredData.live}
          upcomingCompetitions={featuredData.upcoming}
          onCompetitionClick={setSelectedCompetition}
          //isLoading={isLoading}
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