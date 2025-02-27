import React, { useState } from 'react';
import CompetitionDialog from './CompetitionDialogBox';

interface UpcomingEventProps {
  title: string;
  startdate: string;
  location: string;
  image: string;
  description: string;
  _id:any
}

export function UpcomingEvent({ title, startdate, location, image, description,_id }: UpcomingEventProps) {
 const [isOpen,setisOpen]=useState(false)
  return (
    
    <div
    
    className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-lg overflow-hidden shadow-lg border border-orange-100 dark:border-gray-700">
    {isOpen?<CompetitionDialog competitionid={_id} onClose={()=>setisOpen(false)}></CompetitionDialog>:null}
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover hover:scale-105 transition" />
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <div className="flex items-center space-x-2 text-sm mb-2">
          <span className="text-orange-500 dark:text-orange-400">{new Date(startdate).toLocaleString("en-US", {
        timeZone: "Asia/Karachi",
        weekday: "short", // e.g., "Mon"
        day: "2-digit", // e.g., "12"
        month: "short", // e.g., "Feb"
        year: "numeric", // e.g., "2025"
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // e.g., "10:30 AM"
      })}</span>
          <span className="text-gray-400">•</span>
          <span className="text-green-500">{location}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
        <button 
        onClick={()=>setisOpen(true)}
        className="mt-4 w-full py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md">
          Learn More
        </button>
      </div>
    </div>
  );
}