import React, { useEffect, useRef, useState } from 'react';
import { Users, Heart, DollarSign, Star, MessageCircle } from 'lucide-react';
import { useSocket } from '../context/SocketContext';
import FollowButton from './FollowButton';
import { ClipLoader } from 'react-spinners';
import { InView, useInView } from 'react-intersection-observer';
import ChatDialog from './NewMessageChatDialouge';
import LoginSignupAlert from '../components/auth/LoginAlert';
import UserProfileDialog from '../components/Feed/ProfileDialog';
import { useUser } from '../context/UserContext';

interface User {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  isArtist: boolean;
  followers: number;
  following: boolean;
  donations?: number;
  recentDonation?: {
    amount: number;
    date: string;
  };
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'DJ Spark',
    handle: '@djspark',
    avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&h=200&fit=crop',
    bio: 'Electronic music producer | 2x Beat Battle Champion',
    isArtist: true,
    followers: 12453,
    following: true,
    donations: 450
  },
  {
    id: '2',
    name: 'Luna Voice',
    handle: '@lunavoice',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    bio: 'Vocalist | Pop/R&B | Competition Winner 2023',
    isArtist: true,
    followers: 8921,
    following: false
  },
  {
    id: '3',
    name: 'John Music Lover',
    handle: '@johnml',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    bio: 'Music enthusiast | Supporting great artists',
    isArtist: false,
    followers: 342,
    following: true,
    recentDonation: {
      amount: 50,
      date: '2024-03-15'
    }
  }
];

export function FollowingPage() {
  const [users, setUsers] = useState(mockUsers);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const[FetchedUsers,setFetchedUsers]=useState([])
  const [isOpen,setIsOpen]=useState(false)
  const [IsClicked,setIsClicked]=useState(false)
  const [StateForButton,setStateForButton]=useState(false)
  const [donationAmount, setDonationAmount] = useState('');
  const [isLogin,setisLogin]=useState(false)
  const {socket}=useSocket()
  const [MyId,setMyId]=useState()
  const {ref,inView}=useInView()
  const [Cursor,setCursor]=useState()
  const [hasMore,sethasMore]=useState(true)
  const [selectedUserForChat, setSelectedUserForChat] = useState<string | null>(null);
  const [isProfileDialogue,setisProfileDialogue]=useState(false)
  const CheckForHasMore = useRef()
  const [ChatDialouge,setChatDialouge]=useState()
  const {ref:allref,inView:allinview}=useInView()
  const {portnum8002}=useUser()
  const [activeTab, setActiveTab] = useState<'all' | 'artists' | 'fans'>('all');
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
      setisLogin(true)
    }
  }
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
      setisLogin(true)
    }
  }
  const Chat= async()=>{
    setChatDialouge(true)
  }
  const Fetching = async(cursor,role)=>{
    const response = await fetch(`${portnum8002}fetchingfollowing/${cursor}/${role}`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',
     
  
    })
    const result = await response.json()
    if(response.status==200){
      console.log(result)
      
      setFetchedUsers((prev=[])=>[...prev,...result.data])
      setMyId(result.YourId)
      
      const lastcursor = result.data[result.data.length - 1]
      if(result.data.length==0){
        sethasMore(false)
      }
      
      setCursor(lastcursor?._id)
    }else{
      console.log(result)
    }
    if(response.status==403){
      setisLogin(true)
    }
  }
  useEffect(()=>{
    console.log('Render')
    setFetchedUsers([])
    sethasMore(true)
   Fetching(0,activeTab)
   console.log(activeTab)
 },[activeTab])
 useEffect(()=>{
  if(inView)
    {Fetching(Cursor,activeTab)}
  
 },[inView])
 useEffect(()=>{
  if(allinview)
  {Fetching(Cursor,activeTab)}
 },[allinview])
  const handleFollow = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, following: !user.following } : user
    ));
  };

  const handleDonate = (user: User) => {
    setSelectedUser(user);
    setShowDonationModal(true);
  };

  const submitDonation = () => {
    if (!selectedUser || !donationAmount) return;
    
    const amount = parseFloat(donationAmount);
    setUsers(prev => prev.map(user => 
      user.id === selectedUser.id 
        ? { 
            ...user, 
            donations: (user.donations || 0) + amount,
            recentDonation: { amount, date: new Date().toISOString() }
          } 
        : user
    ));
    
    setShowDonationModal(false);
    setDonationAmount('');
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user => {
    if (activeTab === 'artists') return user.isArtist;
    if (activeTab === 'fans') return !user.isArtist;
    return true;
  });

  return (
    isLogin?<LoginSignupAlert setShowLoginAlert={setisLogin}></LoginSignupAlert>:<div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Following
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Connect with artists and fans
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-orange-500" />
            <span className="text-lg font-semibold">
             {/* {FetchedUsers?.data?.length} Following */}
                 following
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4">
          {(['all', 'artist', 'fan'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-bold transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* User Grid */}
        <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 p-4">
  {FetchedUsers==null?
  
  
         <div className='flex flex-col   items-center min-h-screen w-screen'>

        <ClipLoader
      size={250}
      color={'orange'}
      >

      </ClipLoader>
         </div>
  :FetchedUsers?.map((users: any, index: number) => {
    
    if(activeTab=='all'){
   let isFollowing = users?.followers?.some(
    (followerUser) => followerUser?.user?._id === MyId
  );
    return (
      isProfileDialogue?<UserProfileDialog isFollowed={isFollowing} users={users} setIsOpen={setisProfileDialogue} ></UserProfileDialog>:<div
        key={index}
        
        className="bg-white p-4     rounded-lg shadow-md flex flex-col justify-center items-center"
      >
        {/* User Profile Image */}
        <img
        onClick={(e)=>{
          e.stopPropagation()
          setisProfileDialogue(true)}}
          src={users.avatar || "/src/download.jpg"}
          alt={users.name}
          className="w-24 h-16 rounded-full mb-4 object-contain"
        />  
        {/* Username and Followers Count */}
        <h2
        onClick={(e)=>{
          e.stopPropagation()
          setisProfileDialogue(true)}}
        className="text-xl font-semibold text-gray-800">{users.name}</h2>
        <p className="text-gray-600 mt-1 text-sm lg:text-md">{users?.followers?.length} Followers</p>
        <div className='flex gap-2 items-center justify-center flex-wrap'>
  <FollowButton 
    isFollowing={isFollowing} 
    Following={Following} 
    users={users} 
    RemovingFollowing={RemovingFollowing} 
  />
    <button
        className='rounded-full text-white transition-all duration-300 hover:bg-opacity-80 flex items-center justify-center'
        onClick={() => setSelectedUserForChat(users?._id)}
      >
        <img src='/src/pages/chat.png' alt="Chat" className='w-5 h-5' />
      </button>
      
      <ChatDialog 
  user={users} 
  isOpen={selectedUserForChat === users?._id} // Pass correct open state
  setIsOpen={() => setSelectedUserForChat(null)} 
/>
   {/* {isOpen?<ChatDialog user={users}  setIsOpen={setIsOpen} ></ChatDialog>
  :null} */}
</div>      
       {hasMore? <div  ref={allref}></div>:null}

      </div>
    );
  }else if(users.role==activeTab){
    let isFollowing = users?.followers?.some(
      (followerUser) => followerUser?.user?._id === MyId
    );
      return (
        isProfileDialogue?<UserProfileDialog isFollowed={isFollowing} users={users} setIsOpen={setisProfileDialogue} ></UserProfileDialog>:    <div
          key={index}
          onClick={()=>{setisProfileDialogue(true)}}
          className="bg-white p-4  rounded-lg shadow-md flex flex-col  items-center"
        >
          {/* User Profile Image */}
          <img
            src={users.avatar || "https://via.placeholder.com/100"}
            alt={users.name}
            className="w-24 h-16 rounded-full mb-4 object-cover"
          />  
          {/* Username and Followers Count */}
          <h2 className="text-xl font-semibold text-gray-800">{users.name}</h2>
          <p className="text-gray-600 mt-1 text-sm lg:text-md">{users.followers.length} Followers</p>
         {/* <div className='flex gap-2 items-center justify-center'>
          <FollowButton isFollowing={isFollowing} Following={Following} users = {users} RemovingFollowing={RemovingFollowing} ></FollowButton>
          <button
          className='rounded-full text-white transition-all duration-300' onClick={()=>Chat(users)}>
            <img src='/src/pages/chat.png' width={20}></img>
          </button>
         </div> */}
        <div className='flex gap-2 items-center justify-center flex-wrap'>
  <FollowButton 
    isFollowing={isFollowing} 
    Following={Following} 
    users={users} 
    RemovingFollowing={RemovingFollowing} 
  />
  <button
        className='rounded-full text-white transition-all duration-300 hover:bg-opacity-80 flex items-center justify-center'
        onClick={() => setSelectedUserForChat(users?._id)}
      >
        <img src='/src/pages/chat.png' alt="Chat" className='w-5 h-5' />
      </button>
      
      <ChatDialog 
  user={users} 
  isOpen={selectedUserForChat === users?._id} // Pass correct open state
  setIsOpen={() => setSelectedUserForChat(null)} 
/>
  
</div>
        {hasMore? <div ref={ref}></div>:null}
        </div>
        
      );
  }
  
  })}
</div>

        {/* Donation Modal */}
        {showDonationModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Support {selectedUser.name}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500">$</span>
                    </div>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="block w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDonationModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitDonation}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md"
                  >
                    Send Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
