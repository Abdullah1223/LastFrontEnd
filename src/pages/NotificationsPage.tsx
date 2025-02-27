// import React, { useEffect, useState } from 'react';
// import { Trophy, Star, Clock, AlertCircle } from 'lucide-react';
// import { useSocket } from '../context/SocketContext';
// import ActiveNotificationsComponent from './ActiveNotifications';

// // Mock data - In a real app, this would come from an API
// const personalResults = [
//   {
//     id: 1,
//     competitionName: "Beat Battle Championship",
//     result: "Winner",
//     prize: "$5,000",
//     date: "2024-03-15",
//     feedback: "Outstanding production quality and unique sound design.",
//     score: 98
//   },
//   {
//     id: 2,
//     competitionName: "Electronic Music Challenge",
//     result: "Runner-up",
//     prize: "$1,000",
//     date: "2024-03-10",
//     feedback: "Excellent arrangement and creative approach.",
//     score: 92
//   }
// ];

// const recentResults = [
//   {
//     id: 1,
//     competitionName: "Songwriting Contest",
//     winnerName: "Sarah Parker",
//     prize: "$3,000",
//     date: "2024-03-16",
//     genre: "Pop"
//   },
//   {
//     id: 2,
//     competitionName: "Hip Hop Producer Battle",
//     winnerName: "DJ Spark",
//     prize: "$2,500",
//     date: "2024-03-15",
//     genre: "Hip Hop"
//   },
//   {
//     id: 3,
//     competitionName: "Rock Band Showdown",
//     winnerName: "Electric Storm",
//     prize: "$4,000",
//     date: "2024-03-14",
//     genre: "Rock"
//   }
// ];

// export function NotificationsPage() {
//   const [ActiveNotifications,setActiveNotifications]=useState([])
//   const {socket} = useSocket()
 

//   const FetchingNotifications = async()=>{
//     const response = await fetch('http://localhost:8002/fetchingnotifications',{
//       method:'GET',
//       headers: {
//         'Content-Type': 'application/json', // Inform the server you're sending JSON
//       },
//       credentials:'include',
     

//     })
//     const result = await response.json()
//     if(response.status==200){
//       console.log(result)
//       setActiveNotifications(result.Notifications.ActiveNotifications)
//     }
//   }
//   useEffect(()=>{
// FetchingNotifications()
//     socket?.on('ActiveNotifications',(Notifications)=>{
//       setActiveNotifications((prev) => [...new Set([...prev, ...Notifications])]);
//     })
//     socket?.on('CompetitionCreated',(Notifications)=>{
//       setActiveNotifications((prev) => [...new Set([...prev, ...Notifications])]);
//     })
//   },[])
//   return (
//     <div className="border-l border-r border-gray-200 dark:border-gray-800 min-h-screen p-6">
//       <div className="max-w-4xl mx-auto space-y-8">
//         {/* Personal Results Section */}
//         <section>
//           <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
//             Your Competition Results
//           </h2>
//           <div className="space-y-4">
//             {personalResults.map((result) => (
//               <div 
//                 key={result.id}
//                 className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 shadow-lg border border-orange-100 dark:border-gray-700"
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
//                       {result.competitionName}
//                     </h3>
//                     <div className="flex items-center gap-2">
//                       <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
//                         result.result === 'Winner' 
//                           ? 'bg-green-500 text-white' 
//                           : 'bg-yellow-500 text-white'
//                       }`}>
//                         {result.result}
//                       </span>
//                       <span className="text-green-500 font-semibold">{result.prize}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Star className="w-5 h-5 text-yellow-500" />
//                     <span className="text-2xl font-bold text-yellow-500">{result.score}</span>
//                   </div>
//                 </div>
//                 <p className="text-gray-600 dark:text-gray-400 mb-3">
//                   "{result.feedback}"
//                 </p>
//                 <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
//                   <Clock className="w-4 h-4 mr-1" />
//                   <span>{new Date(result.date).toLocaleDateString()}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Recent Results Feed */}
//         <section>
//           <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
//             Recent Competition Results
//           </h2>
//           <div className="space-y-4">
//             {recentResults.map((result) => (
//               <div 
//                 key={result.id}
//                 className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow flex items-center gap-4 border border-gray-200 dark:border-gray-700"
//               >
//                 <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-3 rounded-full">
//                   <Trophy className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-semibold text-gray-900 dark:text-white">
//                     {result.competitionName}
//                   </h3>
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     Winner: {result.winnerName} • Prize: {result.prize}
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300">
//                     {result.genre}
//                   </span>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                     {new Date(result.date).toLocaleDateString()}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Active Notifications */}
//       <ActiveNotificationsComponent ActiveNotifications={ActiveNotifications}></ActiveNotificationsComponent> 
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Trophy, Star, Clock, AlertCircle } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import ActiveNotificationsComponent from './ActiveNotifications';
import { useInView } from 'react-intersection-observer';
import { useUser } from '../context/UserContext';

// Mock data - In a real app, this would come from an API
const personalResults = [
  {
    id: 1,
    competitionName: "Beat Battle Championship",
    result: "Winner",
    prize: "$5,000",
    date: "2024-03-15",
    feedback: "Outstanding production quality and unique sound design.",
    score: 98
  },
  {
    id: 2,
    competitionName: "Electronic Music Challenge",
    result: "Runner-up",
    prize: "$1,000",
    date: "2024-03-10",
    feedback: "Excellent arrangement and creative approach.",
    score: 92
  }
];

const recentResults = [
  {
    id: 1,
    competitionName: "Songwriting Contest",
    winnerName: "Sarah Parker",
    prize: "$3,000",
    date: "2024-03-16",
    genre: "Pop"
  },
  {
    id: 2,
    competitionName: "Hip Hop Producer Battle",
    winnerName: "DJ Spark",
    prize: "$2,500",
    date: "2024-03-15",
    genre: "Hip Hop"
  },
  {
    id: 3,
    competitionName: "Rock Band Showdown",
    winnerName: "Electric Storm",
    prize: "$4,000",
    date: "2024-03-14",
    genre: "Rock"
  }
];

export function NotificationsPage() {
  const [ActiveNotifications, setActiveNotifications] = useState<Array<any>>([]);
  const {portnum8002}=useUser()
  const { socket } = useSocket();
  const [ActiveNotificationsCursor,setActiveNotificationCursor]=useState()
  const {ref:ActiveNotificationRef,inView:ActiveNotificationsView}=useInView()
  const FetchingNotifications = async (cursor,type) => {
   // http://localhost:8002/
    const response = await fetch(`${portnum8002}fetchingnotifications/${cursor}/${type}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await response.json();
    if (response.status === 200) {
      setActiveNotifications(result.Notifications.ActiveNotifications);
      const lastCursor = result.Notifications.ActiveNotifications[result.Notifications.ActiveNotifications.length - 1]
      setActiveNotificationCursor(lastCursor._id)
    }
  };
useEffect(()=>{
  if(ActiveNotificationsView){
    FetchingNotifications(ActiveNotificationsCursor,'ActiveNotifications')
  }
},[ActiveNotificationsView])
  useEffect(() => {
    FetchingNotifications(0,0);
    socket?.on('ActiveNotifications', (Notifications) => {
      console.log(Notifications)
      setActiveNotifications((prev) => [...new Set([...prev, Notifications])]);
    });
    socket?.on('CompetitionCreated', (Notifications) => {
      console.log(Notifications)
      setActiveNotifications((prev) => {
        const existingIndex = prev.findIndex((msg) =>   msg?._id=== Notifications?._id);
        if (existingIndex !== -1) {
          const updatedHistory = [...prev];
          updatedHistory[existingIndex] = {
            ...updatedHistory[existingIndex],
            Notification:Notifications.Notification,
            NotificationType:Notifications.NotificationType,
            timestamp:Notifications.timestamp
          };
          return updatedHistory;
        }
        return [...prev, Notifications];
      });
    });
  }, []);

  return (
    <div className="border-l border-r border-gray-200 dark:border-gray-800 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Personal Results Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
            Your Competition Results
          </h2>
          <div className="space-y-4">
            {personalResults.map((result) => (
              <div
                key={result.id}
                className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 shadow-lg border border-orange-100 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {result.competitionName}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          result.result === 'Winner' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                        }`}
                      >
                        {result.result}
                      </span>
                      <span className="text-green-500 font-semibold">{result.prize}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="text-2xl font-bold text-yellow-500">{result.score}</span>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  "{result.feedback}"
                </p>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{new Date(result.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Results Feed */}
        <section>
          <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
            Recent Competition Results
          </h2>
          <div className="space-y-4">
            {recentResults.map((result) => (
              <div
                key={result.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow flex items-center gap-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-3 rounded-full">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {result.competitionName}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Winner: {result.winnerName} • Prize: {result.prize}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300">
                    {result.genre}
                  </span>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(result.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Active Notifications */}
        {ActiveNotifications.map((data, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-3 text-orange-500">
            <AlertCircle className="w-5 h-5" />
            <p className="text-sm">{data.Notification}</p>
          </div>
        </div>
      ))}
        {/* <ActiveNotificationsComponent ref={ActiveNotificationRef} ActiveNotifications={ActiveNotifications || []} /> */}
      </div>
    </div>
  );
}