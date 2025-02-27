import React, { useEffect, useState } from 'react';
import { CompetitionList } from './CompetitionList';
import { FeaturedArtistList } from './FeaturedArtistList';
import { UpcomingEventList } from './UpcomingEventList';
import { HeroSection } from './HeroSection';
import { competitions, featuredArtists, upcomingEvents } from './data';
import { useUser } from '../../context/UserContext';


export function Feed({setCurrentPage}) {
  const {portnum8002,portnum8003}=useUser()
  const [LiveCompetitions,setLiveCompetitions]=useState([])
  const [UpcomingCompetitions,setUpcomingCompetitions]=useState([])
  const [ArtistData,setArtistData]=useState([])
  const [FollowingList,setFollowingList]=useState([])
  const FetchData = async()=>{
    
    //'http://localhost:8003/HomeCompetitions'
    const response = await fetch(`${portnum8003}HomeCompetitions`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',
    })
    const result = await response.json()
    if(response.status==200){
      console.log(result)
      setLiveCompetitions(result.LiveCompetitions)
      setUpcomingCompetitions(result.UpcomingCompetitions)
    }
  }

  const FetchingArtists = async()=>{
    const response = await fetch(`${portnum8002}FetchingArtistsForHome`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',
    })
    const result = await response.json()
    if(response.status==200){
      console.log(result)
      setArtistData(result.ArtistData)
      setFollowingList(result.FollowingList)      
    }
  }
  useEffect(()=>{
   FetchData()
   FetchingArtists()
},[])
  return (
    <div className="border-l border-r border-gray-200 dark:border-gray-800 w-full">
      <HeroSection setCurrentPage={setCurrentPage} />
      <div className="p-4 space-y-8">
        <FeaturedArtistList artists={ArtistData} followinglist={FollowingList} />
        <CompetitionList competitions={LiveCompetitions} />
        <UpcomingEventList events={UpcomingCompetitions} />
      </div>
    </div>
  );
}