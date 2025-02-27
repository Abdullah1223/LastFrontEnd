import { useEffect, useState } from 'react';
import { useUser } from '../../context/UserContext';

const UserProfileDialog = ({isFollowed,users,setIsOpen}) => {
    
  const [isFollowing, setIsFollowing] = useState(isFollowed);
  const [showFollowers, setShowFollowers] = useState(false);
  const {portnum8002}=useUser()
  const [user,setUser]=useState({})
  console.log(isFollowed)
  console.log(users)
  // Sample data - replace with actual data from your backend

  const Following = async(_id:any)=>{
    const data = {
      _id:_id
    }
    console.log(data)
    const response = await fetch(`${portnum8002}addingfollowing`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',
     body:JSON.stringify(data)
  
    })
    const result = await response.json()
    if(response.status == 200){
      // setIsClicked(!IsClicked)
    }
    if(response.status==403){
      // setisLogin(true)
    }
  }

  const RemovingFollowing=async(_id:any)=>{
    //http://localhost:8002/
      const response = await fetch(`${portnum8002}removingfollowing/`+_id,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json', // Inform the server you're sending JSON
        },
        credentials:'include',
       
    
      })
      if(response.status===403){
        // setisLogin(true)
      }
    }

    const handleFollowing = ()=>{
      if(isFollowing==true){
        RemovingFollowing(users._id)
        setIsFollowing(!isFollowed)
      }else{
        Following(users._id)
        setIsFollowing(!isFollowed)
      }
    }
  const FetchingData = async(_id:any)=>{

    const response = await fetch(`${portnum8002}fetchingspecificuser/${_id}`,{
        headers:{
            'Content-Type':'Application/json'
        },
        method:'GET',
        credentials:'include'
    })
    const result = await response.json()
    if(response.status==200){
        setUser(result)
    }
  }
 
 useEffect(()=>{
    FetchingData(users._id)
 },[])
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div 
       
        className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">User Profile</h2>
          <button 
           onClick={()=>setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {/* Profile Section */}
        <div className="p-6 space-y-4">
          <div className="flex items-center space-x-4">
            <img 
              src={user?.avatar} 
              alt="Profile" 
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{user?.name}</h3>
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isFollowing 
                      ? 'bg-gray-200 text-gray-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
              <p className="text-sm text-gray-600">{user?.role}</p>
              <p className="text-sm text-gray-500 mt-1">{user?.bio}</p>
            </div>
          </div>

          {/* Followers */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Followers</h4>
              <span className="text-gray-500 text-sm">
                {user?.followers?.length} followers
              </span>
            </div>
            <div className="flex space-x-2">
              {user?.followers?.map(follower => (
                <img 
                  key={follower.id}
                  src={follower.avatar}
                  alt={follower.name}
                  className="w-8 h-8 rounded-full cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-2">
            <h4 className="font-medium">Recent Activity</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              {user?.recentActivities?.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileDialog;