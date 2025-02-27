import { useState } from "react"
import { useUser } from "../context/UserContext"

const SavedButton = ({isSaved,competition})=>{
  const {portnum8002}=useUser()
     const [ButtonState,setButtonState]=useState(isSaved)
    const handleSaved = async(competitiondata:any)=>{
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
                setButtonState(!ButtonState)
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
                setButtonState(!ButtonState)
              }else if(response.status==401){
        
              }
        }

    }
return (
 
    
    <button 
    onClick={()=>{handleSaved(competition)}}
    
    className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition">
    {ButtonState ? "Unsave" : "Save"} {/* Change button text based on saved status */}
  </button>
)

}

export default SavedButton;