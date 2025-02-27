// import React, { useEffect, useState } from 'react';
// import { Clock, Trophy } from 'lucide-react';
// import type { Competition } from '../../types/competition';

// interface FeaturedPoolProps {
//   liveCompetitions: Competition[];
//   upcomingCompetitions: Competition[];
//   onCompetitionClick: (competition: Competition) => void;
// }
// interface CompetitionResponse {
//   upcomming: Competition[];
//   started: Competition[];
// }
// export function FeaturedPool({ liveCompetitions, upcomingCompetitions, onCompetitionClick }: FeaturedPoolProps) {
//   const [CompetitionData,setCompetitionData]=useState<CompetitionResponse|null>(null)
//   const [Time,setTime]=useState()
//   const FetchingData = async()=>{
//     const response = await fetch('http://localhost:8003/fetchingcompetition',{
//       method:'GET',
//       headers: {
//         'Content-Type': 'application/json', // Inform the server you're sending JSON
//       },
//       credentials:'include',
      
  
//     })
//     const result = await response.json()
//     if(response.status==200){
//       setCompetitionData(result)
//     }
//   }
//   useEffect(()=>{
//     FetchingData()
    
//   },[])

//   return (
//     <div className="mb-8">
//       {/* Live Competitions */}
//       <div className="mb-6">
//         <div className="flex items-center gap-2 mb-4">
//           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//           <h2 className="text-xl font-bold text-white">Live Now</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {CompetitionData?.started.map((competition) => (
//             <div
//               key={competition.name}
//               onClick={() => onCompetitionClick(competition)}
//               className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all border border-green-500/20 hover:border-green-500/40"
//             >
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-bold text-white">{competition.name}</h3>
//                 <span className="text-green-500 font-bold">{competition.prize}</span>
//               </div>
//               <p className="text-gray-400 text-sm mb-3 line-clamp-2">{competition.description}</p>
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-green-500 font-medium">{competition.participants} joined</span>
//                 <div className="flex items-center text-orange-500">
//                   <Clock className="w-4 h-4 mr-1" />
//                   <span>{competition.deadline}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Upcoming Competitions */}
//       <div>
//         <div className="flex items-center gap-2 mb-4">
//           <Trophy className="w-5 h-5 text-yellow-500" />
//           <h2 className="text-xl font-bold text-white">Starting Soon</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {CompetitionData?.upcomming.map((competition) => (
//             <div
//               key={competition.name}
//               onClick={() => onCompetitionClick(competition)}
//               className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all border border-yellow-500/20 hover:border-yellow-500/40"
//             >
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-bold text-white">{competition.name}</h3>
//                 <span className="text-yellow-500 font-bold">{competition.prize}</span>
//               </div>
//               <p className="text-gray-400 text-sm mb-2">{competition.genre}</p>
//               <div className="text-yellow-500 text-sm font-medium">
//                 {competition.deadline}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import React, { useEffect, useState } from 'react';
// import { Clock, Trophy } from 'lucide-react';
// import type { Competition } from '../../types/competition';
// import { competitions } from '../Feed/data';

// interface FeaturedPoolProps {
//   liveCompetitions: Competition[];
//   upcomingCompetitions: Competition[];
//   onCompetitionClick: (competition: Competition) => void;
// }

// interface CompetitionResponse {
//   upcomming: Competition[];
//   started: Competition[];
// }

// export function FeaturedPool({ liveCompetitions, upcomingCompetitions, onCompetitionClick }: FeaturedPoolProps) {
//   const [CompetitionData, setCompetitionData] = useState<CompetitionResponse | null>(null);
//   const handleSaved=async(competition:any)=>{
//     const data ={
//       _id:competition._id
//     }
//     const response = await fetch('http://localhost:8002/competitionsaved', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify(data)
//     });
//     const result = await response.json();
//     if (response.status === 200) {
//     }
//   }
  // const FetchingData = async () => {
  //   const response = await fetch('http://localhost:8003/fetchingcompetition', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'include',
  //   });
  //   const result = await response.json();
  //   if (response.status === 200) {
  //     setCompetitionData(result);
  //   }
  // };

  // useEffect(() => {
  //   FetchingData();
  // }, []);

//   const calculateTimeDifference = (deadline: string) => {
//     const now = Date.now();
//     const end = new Date(deadline).getTime();
//     const diffInMilliseconds = end - now;

//     if (diffInMilliseconds <= 0) {
//       return 'Ended';
//     }

//     const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//     const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

//     return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
//   };

//   const calculateTimeForUpcoming = (deadline: string) => {
//     const now = Date.now();
//     const end = new Date(deadline).getTime();
//     const diffInMilliseconds = end - now;

//     if (diffInMilliseconds <= 0) {
//       return 'Ended';
//     }

//     const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
//     if (days > 0) {
//       return `${days} day${days > 1 ? 's' : ''} left`;
//     }

//     const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
//     return `${hours} hour${hours > 1 ? 's' : ''} left`;
//   };

//   return (
//     <div className="mb-8">
//       {/* Live Competitions */}
//       <div className="mb-6">
//         <div className="flex items-center gap-2 mb-4">
//           <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//           <h2 className="text-xl font-bold text-white">Live Now</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {liveCompetitions.map((competition,index) => (
//             <div
//               key={competition.title}
//               onClick={() => onCompetitionClick(competition)}
//               className="bg-gradient-to-br relative from-gray-800 to-gray-900 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all border border-green-500/20 hover:border-green-500/40"
//             > 
//             <div className='absolute  bottom-32 left-72'>
//               <button
//               onClick={()=>handleSaved(competition)}><img width='20px' height='20px' src='/src/components/Competition/like.png'></img></button>
//             </div>
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-bold text-white">{competition.title}</h3>
//                 <span className="text-green-500 font-bold">{competition.prize}</span>
//               </div>
//               <p className="text-gray-400 text-sm mb-3 line-clamp-2">{competition.description}</p>
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-green-500 font-medium">{competition.participants} joined</span>
//                 <div className="flex items-center text-orange-500">
//                   <Clock className="w-4 h-4 mr-1" />
//                   <span>{calculateTimeDifference(competition.deadline)}</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Upcoming Competitions */}
//       <div>
//         <div className="flex items-center gap-2 mb-4">
//           <Trophy className="w-5 h-5 text-yellow-500" />
//           <h2 className="text-xl font-bold text-white">Starting Soon</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//           {upcomingCompetitions.map((competition) => (
//             <div
//               key={competition.title}
//               onClick={() => onCompetitionClick(competition)}
//               className="bg-gradient-to-br  from-gray-800 to-gray-900 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all border border-yellow-500/20 hover:border-yellow-500/40"
//             > 
//              <div className='absolute  '>
//               <button
//               onClick={()=>handleSaved(competition)}><img width='20px' height='20px' src='/src/components/Competition/like.png'></img></button>
//             </div>
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="font-bold text-white">{competition.title}</h3>
//                 <span className="text-yellow-500 font-bold">{competition.prize}</span>
//               </div>
//               <p className="text-gray-400 text-sm mb-2">{competition.genre}</p>
//               <div className="text-yellow-500 text-sm font-medium">
//                 {calculateTimeForUpcoming(competition.deadline)}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Clock, Trophy } from 'lucide-react';
import type { Competition } from '../../types/competition';
import LoginSignupAlert from '../auth/LoginAlert';
import { useMediaQuery } from 'react-responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import { useUser } from '../../context/UserContext';

interface FeaturedPoolProps {
  liveCompetitions: Competition[];
  upcomingCompetitions: Competition[];
  onCompetitionClick: (competition: Competition) => void;
  isLoading: boolean;
}

const LiveSkeleton = () => (
  <div className="animate-pulse bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-green-500/20">
    <div className="flex justify-between items-start mb-2">
      <div className="h-5 bg-gray-700 rounded w-1/3"></div>
      <div className="h-5 bg-gray-700 rounded w-1/4"></div>
    </div>
    <div className="space-y-2">
      <div className="h-3 bg-gray-700 rounded w-4/5"></div>
      <div className="h-3 bg-gray-700 rounded w-3/5"></div>
    </div>
    <div className="flex items-center justify-between mt-4">
      <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      <div className="flex items-center">
        <div className="h-4 bg-gray-700 rounded w-4 mr-2"></div>
        <div className="h-4 bg-gray-700 rounded w-12"></div>
      </div>
    </div>
  </div>
);

const UpcomingSkeleton = () => (
  <div className="animate-pulse bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 border border-yellow-500/20">
    <div className="flex justify-between items-start mb-2">
      <div className="h-5 bg-gray-700 rounded w-1/3"></div>
      <div className="h-5 bg-gray-700 rounded w-1/4"></div>
    </div>
    <div className="h-3 bg-gray-700 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
  </div>
);

export function FeaturedPool({ 
  liveCompetitions, 
  upcomingCompetitions, 
  onCompetitionClick, 
  isLoading 
}: FeaturedPoolProps) {
  const [ShowLoginAlert,setShowLoginAlert]=useState(false)
  const {portnum8002}=useUser()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' })
  const handleSaved = async (competition: any) => {
    const data = {
      _id: competition._id,
      category:competition.genre
    };
    //http://localhost:8002
    const response = await fetch(`${portnum8002}competitionsaved`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
    if (response.status === 200) {
      // Handle success if needed
    }else if(response.status==401){
      setShowLoginAlert(true)
    }
  };

  const calculateTimeDifference = (deadline: string) => {
    const now = Date.now();
    const end = new Date(deadline).getTime();
    const diffInMilliseconds = end - now;

    if (diffInMilliseconds <= 0) return 'Ended';

    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return `${days > 0 ? `${days}d ` : ''}${hours > 0 ? `${hours}h ` : ''}${minutes}m`;
  };

  const calculateTimeForUpcoming = (deadline: string) => {
    const now = Date.now();
    const end = new Date(deadline).getTime();
    const diffInMilliseconds = end - now;

    if (diffInMilliseconds <= 0) return 'Ended';

    const days = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} left`;

    const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    return `${hours} hour${hours > 1 ? 's' : ''} left`;
  };

  useEffect(()=>{
    console.log(liveCompetitions)
  console.log(isTabletOrMobile)
  },[isTabletOrMobile])
  return (
    <div className="mb-8">
         {ShowLoginAlert?<LoginSignupAlert setShowLoginAlert={setShowLoginAlert}></LoginSignupAlert>:null} 
      {/* Live Competitions */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <h2 className="text-xl font-bold text-white">Live Now</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {liveCompetitions.map((competition, index) => (
              <div
                key={`${competition.title}-${index}`}
                onClick={() => onCompetitionClick(competition)}
                className="bg-gradient-to-br relative from-gray-800 to-gray-900 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all border border-green-500/20 hover:border-green-500/40"
              > 
                <div className='absolute left-72'>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleSaved(competition);
                  }}>
                    <img width='20px' height='20px' src='/src/components/Competition/like.png' alt="Save" />
                  </button>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white">{competition.title}</h3>
                  <span className="text-green-500 font-bold">{competition.prize}</span>
                </div>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">{competition.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-500 font-medium">{competition.participants} joined</span>
                  <div className="flex items-center text-orange-500">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{calculateTimeDifference(competition.deadline)}</span>
                  </div>
                </div>
              </div>
            ))}
       
        </div>
      </div>

      {/* Upcoming Competitions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-bold text-white">Starting Soon</h2>
        </div>
    {isTabletOrMobile?
  //    <Swiper
  //    style={{ minHeight: "100px" } }
  //    spaceBetween={20}
  //    slidesPerView={1} // Default: Show 1 card
  //    breakpoints={{
  //      640: { slidesPerView: 3 }, // Show 2 cards at 640px+
  //      768: { slidesPerView: 3 }, // Show 3 cards at 768px+
  //      1024: { slidesPerView: 4 }, // Show 4 cards at 1024px+
  //    }}
  //  >
  //    {upcomingCompetitions.map((competition, index) => (
  //      <SwiperSlide key={`${competition.title}-${index}`}>
  //        <div
  //           // Prevent cutting off
  //          onClick={() => onCompetitionClick(competition)}
  //          className=" bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all border border-yellow-500/20 hover:border-yellow-500/40 flex flex-col justify-between"
  //        > 
  //          <div className='flex w-6 h-6 absolute bottom-20  left-56 bg-red-800 rounded-xl justify-center items-center '>
  //            <button onClick={(e) => {
  //              e.stopPropagation();
  //              handleSaved(competition);
  //            }}>
  //              <img width='15px' height='25px' src='/src/components/Competition/heart-shape-silhouette.png' alt="Save" />
  //            </button>
  //          </div>
  //          <div className="flex flex-col h-full">
  //            <div className="flex-grow">
  //              <h3 className="font-bold text-sm sm:text-base text-white">{competition.title}</h3>
  //              <p className="text-gray-400 text-xs sm:text-sm mb-2">{competition.genre}</p>
  //            </div>
  //            <div className="text-yellow-500 text-sm font-medium">
  //              {calculateTimeForUpcoming(competition.deadline)}
  //            </div>
  //          </div>
  //        </div>
  //      </SwiperSlide>
  //    ))}
  //  </Swiper>
  <Swiper
  spaceBetween={20}
  slidesPerView={2}
  breakpoints={{
    640: { slidesPerView: 3 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  }}
  // FIX 1: Add container height
  //style={{ height: "500px" }} // Adjust this value as needed
>
  {upcomingCompetitions.map((competition, index) => (
    <SwiperSlide 
      key={`${competition.title}-${index}`}
      // FIX 2: Add slide height control
      style={{ height: "auto" }}
    >
      <div
        style={{ minHeight: "100%" }}
        onClick={() => onCompetitionClick(competition)}
        // FIX 3: Add relative positioning for button containment
        className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all border border-yellow-500/20 hover:border-yellow-500/40 flex flex-col justify-between"
      > 
        {/* Changed positioning to prevent overflow */}
        <div className=' flex absolute top-2 right-2 w-6 h-6 bg-red-800 rounded-xl justify-center items-center'>
          <button onClick={(e) => {
            e.stopPropagation();
            handleSaved(competition);
          }}>
            <img width='15px' height='25px' src='/src/components/Competition/heart-shape-silhouette.png' alt="Save" />
          </button>
        </div>
        
        {/* Rest of the code remains unchanged */}
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <h3 className="font-bold text-white">{competition.title}</h3>
            <p className="text-gray-400 text-sm mb-2">{competition.genre}</p>
          </div>
          <div className="text-yellow-500 text-sm font-medium">
            {calculateTimeForUpcoming(competition.deadline)}
          </div>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>

     :    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         {
            upcomingCompetitions.map((competition, index) => (
              <div
                key={`${competition.title}-${index}`}
                onClick={() => onCompetitionClick(competition)}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 cursor-pointer hover:shadow-lg transition-all border border-yellow-500/20 hover:border-yellow-500/40"
              > 
                <div className='flex w-6 h-6 relative bottom-7 right-5 bg-red-800 rounded-xl justify-center items-center '>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleSaved(competition);
                  }}>
                    <img width='15px' height='25px' src='/src/components/Competition/heart-shape-silhouette.png' alt="Save" />
                  </button>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-white">{competition.title}</h3>
                  <span className="text-yellow-500 font-bold">{competition.prize}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{competition.genre}</p>
                <div className="text-yellow-500 text-sm font-medium">
                  {calculateTimeForUpcoming(competition.deadline)}
                </div>
              </div>
            ))
          }
        </div>}
      </div>
    </div>
  );
}