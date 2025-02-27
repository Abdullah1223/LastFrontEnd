// import React, { SetStateAction, useEffect, useState } from 'react';
// import { CompetitionCard } from './CompetitionCard';
// import type { Competition } from '../../types/competition';
// import { InView, useInView } from 'react-intersection-observer';

// interface CompetitionGridProps {
//   competitions: Competition[];
//   onCompetitionClick: (competition: Competition) => void;
//   search:boolean;
//   SearchQuery:string,
//   ref:any
//   inView:any
// }

// export function CompetitionGrid({ competitions, onCompetitionClick, search,SearchQuery,inView,ref }: CompetitionGridProps) {
//   const [SearchResult,setSearchResult] = useState([])
//   //const {ref,inView}=useInView()
//  useEffect(()=>{
//   console.log(inView)
//   //SearchingData()
 
//  },[inView])
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       {search?
//       SearchResult?.data?.map((data:string)=>{
//         return <h1>{data.title}</h1>})
//       :null}
//       {competitions.map((competition, index) => (
//         <CompetitionCard 
//           key={index} 
//           {...competition} 
//           onClick={() => onCompetitionClick(competition)}
//         />
//       ))}
//       <div ref={ref}></div>
//     </div>
//   );
// }
// import React, { useEffect, useState, forwardRef } from 'react';
// import { CompetitionCard } from './CompetitionCard';
// import type { Competition } from '../../types/competition';

// interface CompetitionGridProps {
//   competitions: Competition[];
//   onCompetitionClick: (competition: Competition) => void;
//   search: boolean;
//   SearchQuery: string;
// }

// export const CompetitionGrid = forwardRef<HTMLDivElement, CompetitionGridProps>(
//   ({ competitions, onCompetitionClick, search, SearchQuery }, ref) => {
//     const [SearchResult, setSearchResult] = useState([]);

//     useEffect(() => {
//       console.log(`Search query: ${SearchQuery}`);
//     }, [SearchQuery]);

//     return (
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {search
//           ? SearchResult?.map((data: any, index: number) => (
//               <h1 key={index}>{data.title}</h1>
//             ))
//           : competitions.map((competition, index) => (
//               <CompetitionCard
//                 key={index}
//                 {...competition}
//                 onClick={() => onCompetitionClick(competition)}
//               />
//             ))}
//             <div ref={ref}></div>
//       </div>
//     );
//   }
// );

// CompetitionGrid.tsx
import React, { forwardRef } from 'react';
import { CompetitionCard } from './CompetitionCard';
import type { Competition } from '../../types/competition';

interface CompetitionGridProps {
  competitions: Competition[];
  onCompetitionClick: (competition: Competition) => void;
  search: boolean;
  SearchQuery: string;
  isLoading: boolean;
  hasMore:boolean
}

const SkeletonCompetitionCard = () => (
  <div className="animate-pulse bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
    </div>
  </div>
);

export const CompetitionGrid = forwardRef<HTMLDivElement, CompetitionGridProps>(
  ({ competitions, onCompetitionClick, search, SearchQuery, isLoading,hasMore }, ref) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isLoading && competitions.length === 0 ? (
          // Initial loading skeletons
          Array(2).fill(0).map((_, index) => (
            <SkeletonCompetitionCard key={`skeleton-${index}`} />
          ))
        ) : (
          <>
            {competitions.map((competition, index) => (
              <CompetitionCard
                key={index}
                {...competition}
                onClick={() => onCompetitionClick(competition)}
              />
            ))}
            {isLoading && (
              // Pagination loading skeletons
              Array(2).fill(0).map((_, index) => (
                <SkeletonCompetitionCard key={`pagination-skeleton-${index}`} />
              ))
            )}
          </>
        )}
        {hasMore && <div ref={ref} className="h-10" />}
      </div>
    );
  }
);
