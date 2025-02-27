import { useEffect, useState } from 'react';
import CompetitionBookmarkButton from './CompetitionBookmarkButton';
import { useUser } from '../../context/UserContext';

const CompetitionDialog = ({ competition, onClose,competitionid }: any) => {
    const {portnum8003}=useUser()
  //const [isBookmarked, setIsBookmarked] = useState(false);
  const [CompetitionData,setCompetitionData]=useState({})
  const [SavedList,setSavedList]=useState([])    
  
  const FetchData = async(competitionid:any)=>{
    
    //`http://localhost:8003/FetchingSpecificCompetition/${competitionid}`
    const response = await fetch(`${portnum8003}FetchingSpecificCompetition/${competitionid}`,{
        method:'GET',
        headers: {
          'Content-Type': 'application/json', // Inform the server you're sending JSON
        },
        credentials:'include',
      })
      const result = await response.json()
      if(response.status==200){
        console.log(result)
        setCompetitionData(result.competitionData)
        setSavedList(result.SavedList)
        
      }
  }

  useEffect(()=>{
    FetchData(competitionid)
  },[])
 
  const isBookmarked = SavedList?.some((data)=>data?._id==CompetitionData?._id)
  
 
  return (       
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-black text-white border-2 border-orange-600 rounded-lg w-[95%] max-w-[800px] max-h-[90vh] flex flex-col">
        {/* Bookmark and Close Buttons */}
        <div className="absolute -right-3 -top-3 z-50 flex gap-2">
         <CompetitionBookmarkButton competition={CompetitionData} isSaved={isBookmarked} ></CompetitionBookmarkButton>
          <button
            onClick={onClose}
            className="text-orange-600 bg-black rounded-full h-10 w-10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform border border-orange-600"
            aria-label="Close dialog"
          >
            &times;
          </button>
        </div>

        {/* Cover Image */}
        <div 
          className="h-52 bg-center bg-cover bg-no-repeat rounded-t-lg"
          style={{ backgroundImage: `url(${CompetitionData?.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop'})` }}
        />

        {/* Content Area */}
        <div className="p-6 overflow-y-auto h-[calc(90vh-200px)]">
          <h1 className="text-3xl md:text-4xl font-bold text-orange-600 mb-6">
            {CompetitionData?.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 bg-gray-900 p-4 rounded-lg">
            <div>
              <label className="text-orange-600 font-semibold block">Start Date</label>
              <p>{CompetitionData?.startdate}</p>
            </div>
            <div>
              <label className="text-orange-600 font-semibold block">End Date</label>
              <p>{CompetitionData?.deadline}</p>
            </div>
            <div>
              <label className="text-orange-600 font-semibold block">Entry Fee</label>
              <p className="text-orange-600 font-bold">${CompetitionData?.entryFee}</p>
            </div>
            <div>
              <label className="text-orange-600 font-semibold block">Category</label>
              <p>{CompetitionData?.genre}</p>
            </div>
          </div>

          <div className="mb-6 bg-gray-900 p-4 rounded-lg">
            <h2 className="text-orange-600 text-xl font-semibold mb-3">Description</h2>
            <p className="leading-relaxed break-words text-gray-300">{CompetitionData?.description}</p>
          </div>

          <div className="mb-6 bg-gray-900 p-4 rounded-lg">
            <h2 className="text-orange-600 text-xl font-semibold mb-3">Participants</h2>
            <div className="flex flex-wrap gap-2">
              {competition?.participants?.map((participant: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-black rounded-full text-sm border border-orange-600"
                >
                  {participant}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 text-sm text-gray-400 border-t border-gray-800 pt-4">
            <span>Created by: {CompetitionData?.createdby?.name}</span>
            <span className="hidden sm:inline">•</span>
            <span>On: {CompetitionData?.createdate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDialog;