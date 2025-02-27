// import { useEffect, useRef, useState } from "react";
// import { useInView } from "react-intersection-observer";

// const ViewAllDynamicPage = ({ CategoryData }:any) => {
//   const [competitions, setCompetitions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const {ref,inView}=useInView()
//   const [hasMore,sethasMore]=useState(true)
//   const [Cursor,setCursor]=useState()
//   const [Page,setPage]=useState(0)
//   const page = useRef(Page)
//   const fetchData = async (CategoryData:any,Cursor:any,Page:any) => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(
//         `http://localhost:8003/viewallcompetitions/${CategoryData.CategoryName}/${Cursor}/${Page}`,
//         {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "Application/json",
//           },
//         }
//       );
//       const result = await response.json();
//       if (response.status === 200) {
//         setCompetitions(result);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(CategoryData,Cursor||0,0);
//   }, [CategoryData]);


// useEffect(()=>{
//     if(inView){
//         const PageNumberInc = page.current +1;
//         setPage(PageNumberInc)
      
//         fetchData(CategoryData,Cursor,PageNumberInc)
       
//     }
// },[inView])

// useEffect(()=>{
//     page.current = Page
// },[Page])
//   return (
//     <div className="bg-black text-white min-h-screen p-8">
//       <h1 className="text-4xl font-bold text-orange-500 mb-8">Competitions</h1>
//       <div className="space-y-12">
//         <div>
//           <h2 className="text-2xl font-semibold text-orange-500 mb-6">
//             {CategoryData?.CategoryName}
//           </h2>
//           {isLoading ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
//               {Array.from({ length: 4 }).map((_, idx) => (
//                 <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow-lg">
//                   <div className="w-full h-40 bg-gray-700 rounded-md mb-4 animate-pulse"></div>
//                   <div className="h-6 w-3/4 bg-gray-700 rounded mb-2 animate-pulse"></div>
//                   <div className="h-4 w-full bg-gray-700 rounded mb-2 animate-pulse"></div>
//                   <div className="h-4 w-1/2 bg-gray-700 rounded mb-4 animate-pulse"></div>
//                   <div className="flex justify-between">
//                     <div className="h-10 w-24 bg-gray-700 rounded-md animate-pulse"></div>
//                     <div className="h-10 w-24 bg-gray-700 rounded-md animate-pulse"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
//               {competitions.map((competition, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
//                 >
//                   <img
//                     src={competition.image}
//                     alt={competition.title}
//                     className="w-full h-40 object-cover rounded-md mb-4"
//                   />
//                   <h3 className="text-xl break-words font-bold mb-2">
//                     {competition.title}
//                   </h3>
//                   <p className="text-sm break-words text-gray-700 mb-2">
//                     {competition.description}
//                   </p>
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
//                     <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
//                       Join
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       {hasMore?<div ref={ref} ></div>:null}
//     </div>
   
// );
// };

// export default ViewAllDynamicPage;
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useUser } from "../context/UserContext";

const ViewAllDynamicPage = ({ CategoryData }: any) => {
  const [competitions, setCompetitions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [Cursor, setCursor] = useState<string | undefined>();
  const [Page, setPage] = useState(0);
  const [firstLoad, setFirstLoad] = useState(true); // Track first load
  const page = useRef(Page);
  const { ref, inView } = useInView({ triggerOnce: false });
  const {portnum8003}=useUser()
  const fetchData = async (CategoryData: any, Cursor: any, Page: any) => {
    setIsLoading(true);
    try {
      const response = await fetch(
       // `http://localhost:8003/viewallcompetitions/${CategoryData.CategoryName}/${Cursor}/${Page}`,
      
        
        `${portnum8003}viewallcompetitions/${CategoryData.CategoryName}/${Cursor}/${Page}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "Application/json",
          },
        }
      );

      if (response.status === 200) {
        const result = await response.json();
        if (result.length === 0) {
          setHasMore(false);
          return;
        }
        setCompetitions((prev) => [...prev, ...result]);
        setCursor(result[result.length - 1]?.createdate); // Update cursor from last item
      } else if (response.status === 204) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchData(CategoryData, Cursor || 0, 0).then(() => setFirstLoad(false));
  }, [CategoryData]);

  // Load more data when inView is triggered
  useEffect(() => {
    if (inView && hasMore && !isLoading && !firstLoad) {
      const PageNumberInc = page.current + 1;
      setPage(PageNumberInc);
      fetchData(CategoryData, Cursor || 0, PageNumberInc);
    }
  }, [inView]);

  // Keep page ref updated
  useEffect(() => {
    page.current = Page;
  }, [Page]);

  return (
    <div className="bg-black text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold text-orange-500 mb-8">Competitions</h1>
      <div className="space-y-12">
        <div>
          <h2 className="text-2xl font-semibold text-orange-500 mb-6">
            {CategoryData?.CategoryName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {competitions.map((competition, idx) => (
              <div
                key={idx}
                className="bg-white text-black p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={competition.image}
                  alt={competition.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl break-words font-bold mb-2">
                  {competition.title}
                </h3>
                <p className="text-sm break-words text-gray-700 mb-2">
                  {competition.description}
                </p>
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
                  <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition">
                    Join
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Infinite scroll trigger */}
      {hasMore && !firstLoad ? <div ref={ref}></div> : null}
    </div>
  );
};

export default ViewAllDynamicPage;
