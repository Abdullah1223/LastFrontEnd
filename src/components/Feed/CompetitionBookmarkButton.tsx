import { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"

const CompetitionBookmarkButton = ({isSaved,competition})=>{
     const [isBookmarked,setIsBookmarked]=useState(isSaved)
     const {portnum8002}=useUser()
    useEffect(()=>{
        setIsBookmarked(isSaved)
    },[isSaved]) 
    const handleSaved = async(competitiondata:any)=>{
    console.log(competitiondata)
        const data = {
                _id: competition._id,
                category:competition.genre
              };
        
        if(isSaved){
           
              const response = await fetch(`${portnum8002}removingsaved/${competitiondata?._id}/${competitiondata.genre}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
              });
              if(response.status==200){
                setIsBookmarked(!isBookmarked)
              }
        }else{
            const response = await fetch(`${portnum8002}competitionsaved`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(data)
              });
              if (response.status === 200) {
                setIsBookmarked(!isBookmarked)
              }else if(response.status==401){
        
              }
        }

    }
return (
    
    
    <button
            onClick={() => handleSaved(competition)}
            className="text-orange-600 bg-black rounded-full h-10 w-10 flex items-center justify-center shadow-lg hover:scale-105 transition-transform border border-orange-600"
            aria-label={isBookmarked ? "Remove bookmark" : "Bookmark competition"}
          >
            {isBookmarked ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            )}
          </button>
)

}

export default CompetitionBookmarkButton;