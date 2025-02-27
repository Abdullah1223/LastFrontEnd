// import React from 'react';
// import { Search, Filter } from 'lucide-react';

// export function CompetitionFilters() {
//   return (
//     <div className="mb-6 space-y-4">
//       <div className="flex items-center space-x-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//             type="text"
//             placeholder="Search competitions..."
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//           />
//         </div>
//         <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
//           <Filter className="w-5 h-5" />
//           <span>Filters</span>
//         </button>
//       </div>
//       <div className="flex space-x-2 overflow-x-auto pb-2">
//         {['All', 'Live', 'Upcoming', 'Hip Hop', 'Electronic', 'Pop', 'Rock', 'Jazz'].map((filter) => (
//           <button
//             key={filter}
//             className="px-4 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap"
//           >
//             {filter}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
// import React, { useState } from 'react';
// import { Search, Filter } from 'lucide-react';

// interface CompetitionFiltersProps {
//   onGenreSelect: React.Dispatch<React.SetStateAction<string>>;
//   selectedGenre: string;
//   setSearch: React.Dispatch<React.SetStateAction<boolean>>;
 
// }

// export function CompetitionFilters({ onGenreSelect, selectedGenre,setSearch }: CompetitionFiltersProps) {
//   const genres = ['All', 'Live', 'Upcoming', 'Hip Hop', 'Electronic', 'Pop', 'Rock', 'Jazz'];
//   const [Searchval,setSearchval]=useState<string|null>(null)
//   const handleSearch =async(e)=>{
//     if(e.length!==0){
//       setSearch(true)
//     }else{
//       setSearch(false)
//     }
//   } 
//   return (
//     <div className="mb-6 space-y-4">
//       <div className="flex items-center space-x-4">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//           <input
//           onChange={(e)=>handleSearch(e.target.value)}
//             type="text"
//             placeholder="Search competitions..."
//             className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
//           />
//         </div>
//         <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
//           <Filter className="w-5 h-5" />
//           <span>Filters</span>
//         </button>
//       </div>
//       <div className="flex space-x-2 overflow-x-auto pb-2">
//         {genres.map((filter) => (
//           <button
//             key={filter}
//             onClick={() => onGenreSelect(filter)} // Update selected genre when clicked
//             className={`px-4 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap ${selectedGenre === filter ? 'bg-orange-500 text-white' : ''}`}
//           >
//             {filter}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';

interface CompetitionFiltersProps {
  onGenreSelect: React.Dispatch<React.SetStateAction<string>>;
  selectedGenre: string;
  setSearch: React.Dispatch<React.SetStateAction<boolean>>;
  onSearchQueryChange: (query: string) => void; 
}

export function CompetitionFilters({
  onGenreSelect,
  selectedGenre,
  setSearch,
  onSearchQueryChange,
}: CompetitionFiltersProps) {
  const genres = ['All', 'Live', 'Upcoming', 'Hip Hop', 'Electronic', 'Pop', 'Rock', 'Jazz'];
  const [searchValue, setSearchValue] = useState<string>('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('');

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchValue); 
    }, 500); 

    return () => {
      clearTimeout(handler); 
    };
  }, [searchValue]);

  useEffect(() => {
    if (debouncedSearchValue.trim() !== '') {
      setSearch(true); 
      onSearchQueryChange(debouncedSearchValue);
    } else {
      setSearch(false); 
      onSearchQueryChange(''); 
    }
  }, [debouncedSearchValue, setSearch, onSearchQueryChange]);

  return (
    <div className="mb-6 space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search competitions..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
          <Filter className="w-5 h-5" />
          <span>Filters</span>
        </button>
      </div>
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {genres.map((filter) => (
          <button
            key={filter}
            onClick={() => onGenreSelect(filter)} // Update selected genre when clicked
            className={`px-4 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 whitespace-nowrap ${
              selectedGenre === filter ? 'bg-orange-500 text-white' : ''
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
}
