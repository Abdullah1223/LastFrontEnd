// import { useEffect, useRef, useState } from "react";
// import { useInView } from "react-intersection-observer";

// function AllCompetitionPage() {
//   // Dummy data for competitions
//   const [Data, setData] = useState([]);
//   const [LastCursors,setLastCursors]=useState()
//   const [hasMore, setHasMore] = useState(true);
//   const {ref,inView}=useInView()
//   const [Page,setPage]=useState(0)
//   //const pagenum = useRef(0);
//   const categories = [
//     { name: "All", competitions: ["Comp 1", "Comp 2", "Comp 3", "Comp 4"] },
//     {
//       name: "Upcoming",
//       competitions: ["Comp 5", "Comp 6", "Comp 7", "Comp 8"],
//     },
//     { name: "Live", competitions: ["Comp 9", "Comp 10", "Comp 11", "Comp 12"] },
//     { name: "Hip", competitions: ["Comp 13", "Comp 14", "Comp 15", "Comp 16"] },
//     {
//       name: "Electronic",
//       competitions: ["Comp 17", "Comp 18", "Comp 19", "Comp 20"],
//     },
//     {
//       name: "Category 6",
//       competitions: ["Comp 21", "Comp 22", "Comp 23", "Comp 24"],
//     },
//     {
//       name: "Category 7",
//       competitions: ["Comp 25", "Comp 26", "Comp 27", "Comp 28"],
//     },
//   ];

//   const FetchData = async (cursor: number | string, totalSaves:any,pagenum: number) => {
//     const response = await fetch(
//       `http://localhost:8003/BrowseAllCompetitions/${cursor}/${totalSaves}/${pagenum}`,
//       {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "Appilication/json",
//         },
//       }
//     );
    
//     if (response.status == 200) {
//         const result = await response.json();
//         console.log(result);
//       const lastcursor = result[result.length - 1]
//       setLastCursors(lastcursor.CategoryData)
     
//       setData((prev)=>([...prev,...result]));
//     }
//     if(response.status==204){
//         setHasMore(false)
//     }
//   };

//   useEffect(() => {
//     FetchData(0,0,0);
//   }, []);
// //   useEffect(()=>{
// //      pagenum.current=Page
// //   },[Page])
//   useEffect(()=>{
//    if(inView){
//     console.log('inview worked')
//     // console.log(pagenum.current)
//     // const NewPage = pagenum.current + 1
//     // console.log(NewPage)
//      setPage((prev)=>(prev+1))
//      console.log(Page)
//     if(Page!=0){
//     console.log(Page)
//     console.log(LastCursors)
//         FetchData(LastCursors?.CategoryDataId||LastCursors?.CategoryName,LastCursors?.totalSaves,Page)  
//     }  
//    }
    
//   },[inView])
//   return (
//     <div className="bg-black text-white min-h-screen p-8">
//       <h1 className="text-4xl font-bold text-orange-500 mb-8">Competitions</h1>
//       <div className="space-y-12">
//         {Data?.map((category: any, index: number) => (
//           <div key={index}>
//             <h1 className="text-white">
//               {category?.CategoryData?.CategoryName}
//             </h1>
//             {/* Category Name */}
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-2xl font-semibold text-orange-500">
//                 {category?.CategoryName}
//               </h2>
//               {/* View All Link */}
//               <a
//                 href="#"
//                 className="text-orange-500 hover:text-orange-400 text-lg font-semibold"
//               >
//                 View All →
//               </a>
//             </div>

//             {/* Competition Boxes */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//               {category.CompetitionData?.map(
//                 (competition: any, idx: number) => (
//                   <div
//                     key={idx}
//                     className="bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//                   >
//                     {/* Competition Image */}
//                     <img
//                       src={competition.image}
//                       alt={competition.title}
//                       className="w-full h-40 object-cover rounded-md mb-4"
//                     />

//                     {/* Competition Details */}
//                     <h3 className="text-xl  font-bold mb-2">
//                       {competition.title}
//                     </h3>
//                     <p className="text-sm text-gray-700 mb-2">
//                       {competition.description}
//                     </p>

//                     {/* Time */}
//                     <p className="text-sm text-gray-600 mb-4">
//                       🕒 Time:{" "}
//                       {new Date(competition.startdate).toLocaleString(
//                         undefined,
//                         {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                           second: "2-digit",
//                           hour12: true,
//                         }
//                       )}
//                     </p>

//                     {/* Buttons */}
//                     <div className="flex justify-between">
//                       <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
//                         Join
//                       </button>
//                       <button className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition">
//                         Save
//                       </button>
//                     </div>
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//       {hasMore?<div  ref={ref}></div>:null}
//     </div>
//   );
// }

// export default AllCompetitionPage;

//this was second working code
// import { useEffect, useRef, useState } from "react";
// import { useInView } from "react-intersection-observer";
// import SavedButton from "./SavedButton";

// function AllCompetitionPage() {
//   const [Data, setData] = useState([]);
//   const [LastCursors, setLastCursors] = useState();
//   const [hasMore, setHasMore] = useState(true);
//   const { ref, inView } = useInView();
//   const [Page, setPage] = useState(0);
//   const [isLoading,setisLoading]=useState(true)
//   const isFetching = useRef(false); // To track if a fetch is in progress
//   const [Saved,setSaved]=useState()
//   const FetchData = async (cursor: number | string, totalSaves: any, pagenum: number) => {
//     if (isFetching.current) return; // Prevent multiple fetches
//     isFetching.current = true;

//     const response = await fetch(
//       `http://localhost:8003/BrowseAllCompetitions/${cursor}/${totalSaves}/${pagenum}`,
//       {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "Application/json",
//         },
//       }
//     );

//     if (response.status == 200) {
//       const result = await response.json();
//       //console.log(result);
      
//       const lastcursor = result[result.length - 1];
//       setLastCursors(lastcursor.CategoryData);
//       setSaved(result[0])
    
//       setData((prev) => {
//         const filteredResult = result.filter(item => !item.hasOwnProperty('Saved'));
        
//         console.log(filteredResult);
        
//         return [...prev, ...filteredResult];
//       });
//       setisLoading(false)
//     }
//     if (response.status == 204) {
//       setHasMore(false);
//     }

//     isFetching.current = false; // Reset the flag after fetch is done
//   };

//   useEffect(() => {
//     FetchData(0, 0, 0);
//   }, []);

//   useEffect(() => {
//     if (inView && hasMore && !isFetching.current) {
      
//       console.log('inview worked');
//       setPage((prev) => prev + 1);
//     }
//   }, [inView]);

//   useEffect(() => {
//     if (Page !== 0 && hasMore) {
//       FetchData(LastCursors?.CategoryDataId || LastCursors?.CategoryName, LastCursors?.totalSaves, Page);
//       setisLoading(true)
//     }
//   }, [Page]);
  
//  //console.log(Data)
//   return (
//   <div className="bg-black text-white min-h-screen p-8">
//   <h1 className="text-4xl font-bold text-orange-500 mb-8">Competitions</h1>
//   <div className="space-y-12">
//     {isLoading ? ( // Show skeleton if data is not loaded
//       Array.from({ length: 4 }).map((_, index) => (
//         <div key={index}>
//           <div className="flex justify-between items-center mb-6">
//             <div className="h-8 w-48 bg-gray-800 rounded animate-pulse"></div> {/* Skeleton for category name */}
//             <div className="h-6 w-24 bg-gray-800 rounded animate-pulse"></div> {/* Skeleton for "View All" */}
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
//             {Array.from({ length: 4 }).map((_, idx) => (
//               <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow-lg">
//                 <div className="w-full h-40 bg-gray-700 rounded-md mb-4 animate-pulse"></div> {/* Skeleton for image */}
//                 <div className="h-6 w-3/4 bg-gray-700 rounded mb-2 animate-pulse"></div> {/* Skeleton for title */}
//                 <div className="h-4 w-full bg-gray-700 rounded mb-2 animate-pulse"></div> {/* Skeleton for description */}
//                 <div className="h-4 w-1/2 bg-gray-700 rounded mb-4 animate-pulse"></div> {/* Skeleton for time */}
//                 <div className="flex justify-between">
//                   <div className="h-10 w-24 bg-gray-700 rounded-md animate-pulse"></div> {/* Skeleton for Join button */}
//                   <div className="h-10 w-24 bg-gray-700 rounded-md animate-pulse"></div> {/* Skeleton for Save button */}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))
//     ) : (
//       // Render actual data when loaded
//       Data?.map((category, index) => (
//         <div key={index}>
//           <h1 className="text-white">{category?.CategoryData?.CategoryName}</h1>
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-2xl font-semibold text-orange-500">{category?.CategoryName}</h2>
//             <a href="#" className="text-orange-500 hover:text-orange-400 text-lg font-semibold">
//               View All →
//             </a>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
//             {category.CompetitionData?.map((competition:any, idx:any) => {
//               // Check if the competition is saved
//               //console.log(competition)
//               const isSaved = Saved?.Saved?.some((comp:any) => comp._id == competition._id); // Replace `id` with the correct property
//               //console.log(isSaved)
//               return (
//                 <div key={idx} className="bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
//                   {isSaved && <div className="text-sm text-green-500 mb-2">Saved</div>} {/* Render "Saved" badge if competition is saved */}
//                   <img src={competition.image} alt={competition.title} className="w-full h-40 object-cover rounded-md mb-4" />
//                   <h3 className="text-xl break-words font-bold mb-2">{competition.title}</h3>
//                   <p className="text-sm break-words text-gray-700 mb-2">{competition.description}</p>
//                   <p className="text-sm text-gray-600 mb-4">
//                     🕒 Time:{" "}
//                     {new Date(competition.startdate).toLocaleString(undefined, {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       second: "2-digit",
//                       hour12: true,
//                     })}
//                   </p>
//                   <div className="flex justify-between">
//                     <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">Join</button>
//                    <SavedButton isSaved={isSaved} competition={competition}  ></SavedButton>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))
//     )}
//   </div>
//   {hasMore ? <div ref={ref}></div> : null}
// </div>
//   );
// }

// export default AllCompetitionPage;


import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import SavedButton from "./SavedButton";
import { useUser } from "../context/UserContext";

function AllCompetitionPage({setCurrentPage,setDataAsProps}) {
  const [Data, setData] = useState([]);
  const [LastCursors, setLastCursors] = useState();
  const [hasMore, setHasMore] = useState(false);
  const { ref, inView } = useInView();
  const [Page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Change to false initially
  const isFetching = useRef(false); // To track if a fetch is in progress
  const [Saved, setSaved] = useState();
  const {portnum8003}=useUser()
  const FetchData = async (cursor, totalSaves, pagenum) => {
    if (isFetching.current) return; // Prevent multiple fetches
    isFetching.current = true;
    setIsLoading(true); // Set loading state to true when fetching new data

    const response = await fetch(
     //`http://localhost:8003/BrowseAllCompetitions/${cursor}/${totalSaves}/${pagenum}`,
     
     
      `${portnum8003}BrowseAllCompetitions/${cursor}/${totalSaves}/${pagenum}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "Application/json",
        },
      }
    );

    if (response.status == 200) {
      setHasMore(true)
      const result = await response.json();
      console.log(result)
      const lastcursor = result[result.length - 1];
      setLastCursors(lastcursor.CategoryData);
      setSaved(result[0]);

      setData((prev) => {
        const filteredResult = result.filter(item => !item.hasOwnProperty('Saved'));
        return [...prev, ...filteredResult];
      });
    }
    if (response.status == 204) {
      setHasMore(false);
    }

    setIsLoading(false); // Reset loading state after fetch is done
    isFetching.current = false; // Reset the flag after fetch is done
  };

  useEffect(() => {
    let ignore = false;
  
    FetchData(0, 0, 0);
  
    return () => {
      ignore = true; // Prevents state updates if component is unmounted
    };
  }, []);

  useEffect(() => {
    if (inView && hasMore && !isFetching.current) {
      setPage((prev) => prev + 1);
    }

  }, [inView]);

  useEffect(() => {
    if (Page !== 0 && hasMore) {
      FetchData(LastCursors?.CategoryDataId || LastCursors?.CategoryName, LastCursors?.totalSaves||0, Page);
    }
  }, [Page]);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-orange-500 mb-8">Competitions</h1>
      <div className="space-y-12">
        {Data?.map((category, index) => (
          <div key={index}>
            <h1 className="text-white">{category?.CategoryData?.CategoryName}</h1>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-orange-500">{category?.CategoryName}</h2>
              <a onClick={()=>{
                setCurrentPage('ViewAllCompetitions')
                setDataAsProps(category?.CategoryData)
              }} className="text-orange-500 hover:text-orange-400 text-lg font-semibold">
                View All →
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {category.CompetitionData?.map((competition, idx) => {
                const isSaved = Saved?.Saved?.some((comp) => comp._id == competition._id);
               // console.log(isSaved)
                // const isSaved = true
                return (
                  <div key={idx} className="bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {isSaved && <div className="text-sm text-green-500 mb-2">Saved</div>}
                    <img src={competition.image} alt={competition.title} className="w-full h-40 object-cover rounded-md mb-4" />
                    <h3 className="text-xl break-words font-bold mb-2">{competition.title}</h3>
                    <p className="text-sm break-words text-gray-700 mb-2">{competition.description}</p>
                    <p className="text-sm text-gray-600 mb-4">
                      🕒 Time:{" "}
                      {new Date(competition.startdate).toLocaleString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                      })}
                    </p>
                    <div className="flex justify-between">
                      <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">Join</button>
                      <SavedButton isSaved={isSaved} competition={competition} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {isLoading && ( // Only show loading skeletons for new items
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="h-8 w-48 bg-gray-800 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-gray-800 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                  <div className="w-full h-40 bg-gray-700 rounded-md mb-4 animate-pulse"></div>
                  <div className="h-6 w-3/4 bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-700 rounded mb-4 animate-pulse"></div>
                  <div className="flex justify-between">
                    <div className="h-10 w-24 bg-gray-700 rounded-md animate-pulse"></div>
                    <div className="h-10 w-24 bg-gray-700 rounded-md animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {hasMore ? <div ref={ref}></div> : null}
    </div>
  );
}

export default AllCompetitionPage;