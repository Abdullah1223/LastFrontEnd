import React, { useState } from 'react';
import type { Artist } from './types';
import FollowButton from '../../pages/FollowButton';
import { useUser } from '../../context/UserContext';
import UserProfileDialog from './ProfileDialog';

export function FeaturedArtist({followinglist,artist}:any) {
  const [IsOpen,setIsOpen]=useState(false)
  const {portnum8002}=useUser()
  const Following = async(_id:any)=>{
    const data = {
      _id:_id
    }
    console.log(data)
    const response = await fetch(`${portnum8002}addingfollowing`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',
     body:JSON.stringify(data)
  
    })
    const result = await response.json()
    if(response.status == 200){
      // setIsClicked(!IsClicked)
    }
    if(response.status==403){
      // setisLogin(true)
    }
  }
  const RemovingFollowing=async(_id:any)=>{
    //http://localhost:8002/
      const response = await fetch(`${portnum8002}removingfollowing/`+_id,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json', // Inform the server you're sending JSON
        },
        credentials:'include',
       
    
      })
      if(response.status===403){
        // setisLogin(true)
      }
    }
  const isFollowing = followinglist?.some((data)=>data?.user==artist?._id)
  console.log(artist)
  return (
     
    <div 
    
    className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-lg overflow-hidden shadow-lg border border-orange-100 dark:border-gray-700">
    {IsOpen?<UserProfileDialog setIsOpen={setIsOpen} isFollowed={isFollowing} users={artist}></UserProfileDialog>:null}
      <div className="h-48 overflow-hidden">
        <img src={artist?.avatar} alt={name} className="w-full h-full object-cover hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <h3
        onClick={()=>setIsOpen(true)}
        className="font-bold cursor-pointer text-lg mb-1">{artist?.name}</h3>
        <p className="text-orange-500 dark:text-orange-400 text-sm mb-2">
        {artist?.role.charAt(0).toUpperCase() + artist?.role.slice(1)}
        </p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{artist?.achievements}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-500 font-semibold">{artist?.followers} followers</span>
          <FollowButton isFollowing={isFollowing} users={artist} Following={Following} RemovingFollowing={RemovingFollowing}></FollowButton>
          {/* <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md">
            Follow
          </button> */}
        </div>
      </div>
    </div>
  );
}