import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, UserRole } from '../types/user';
import { useSocket } from './SocketContext';

interface UserContextType {
  Check:true|false;
  user: User | null;
  setUser: (user: User | null) => void;
  switchRole: (role: UserRole) => void;
  logout: () => void;
  setCheck:any;
  IsNav:boolean,
  setIsNav:any,
  portnum8001:any,
  portnum8002:any,
  portnum8003:any,
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultPermissions = {
  artist: {
    canJudge: false,
    canSubmit: true,
    canVote: true,
    canDonate: true,
    canModerate: false,
    isAdmin: false
  },
  fan: {
    canJudge: false,
    canSubmit: false,
    canVote: true,
    canDonate: true,
    canModerate: false,
    isAdmin: false
  },
  judge: {
    canJudge: true,
    canSubmit: false,
    canVote: false,
    canDonate: true,
    canModerate: true,
    isAdmin: false
  },
  admin: {
    canJudge: true,
    canSubmit: true,
    canVote: true,
    canDonate: true,
    canModerate: true,
    isAdmin: true
  }
};

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [IsNav,setIsNav]=useState(true)
  const [Check,setCheck]=useState(true)
  const {disconnectSocket,connectSocket,socket} = useSocket()
  const [user, setUser] = useState<User | null >(null);
  const portnum8001 = 'https://rankmusic.zapto.org:8001/'
  const portnum8002 = 'https://rankmusic.zapto.org:8002/'
  const portnum8003 = 'https://rankmusic.zapto.org:8003/'
 const CheckingForUser = async()=>{
  const response = await fetch(`${portnum8001}cookiecheck`,{
    method:'GET',
    headers: {
      'Content-Type': 'application/json', // Inform the server you're sending JSON
    },
    credentials:'include',
  })
  const result = await response.json()
  if(response.status==404){
    
    setUser(null)
    setCheck(false)
  }else if(response.status==400){
     console.log('Tampered Token No Access Granted')
     setUser(null)
     setCheck(false)  
  }else{
    console.log('Acess Granted')
    if(socket==null){
      connectSocket()
    }
    console.log(result)
    setUser(
        {

    id: result?.payload?._id,
    name: 'Admin User',
    role: result?.payload?.role,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    handle: '@admin',
    bio: 'System Administrator',
    followers: 0,
    following: false,
    permissions: defaultPermissions.admin
  }
    )
  }
 }
  useEffect(()=>{
    console.log('User Context')
    CheckingForUser()
   },[])

  const switchRole = (role: UserRole) => {
    if (!user) return;
    setUser({
      ...user,
      role,
      permissions: defaultPermissions[role]
    });
  };

  const logout = async() => {
   
    const response = await fetch(`${portnum8001}logout`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',

    })
    if(response.status==200){
      disconnectSocket()
      setUser(null);
      setCheck(false)
    }else if(response.status==400){
      setUser(null)
      setCheck(false)
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, Check, switchRole, logout,IsNav,setIsNav,setCheck,portnum8001,portnum8002,portnum8003 }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
