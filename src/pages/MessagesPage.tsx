import React, { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { MessageList } from '../components/Messages/MessageList';
import { MessageHeader } from '../components/Messages/MessageHeader';
import { FanMessage } from '../components/Messages/MessageDetails/FanMessage';
import { AdminMessage } from '../components/Messages/MessageDetails/AdminMessage';
import { ResultMessage } from '../components/Messages/MessageDetails/ResultMessage';
import { DisputeMessage } from '../components/Messages/MessageDetails/DisputeMessage';
import { messages } from '../data/mockMessages';
import type { Message } from '../types/messages';
import { useSocket } from '../context/SocketContext';
import { useMediaQuery } from 'react-responsive';
import MobileMessageList from '../components/Messages/MobileMessagesList';
import { useUser } from '../context/UserContext';
import LoginSignupAlert from '../components/auth/LoginAlert';

export function MessagesPage() {

  const {socket,numport8005} = useSocket()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1023px)' })
  const [UserStatus,setUserStatus]=useState(false)
  const [selectedMessage, setSelectedMessage] = useState<Message>(messages[0]);
  const [selectedMessageCopy,setSelectedMessageCopy]=useState<any|null>(null)
  const [Chatlist,setChatlist]=useState(null);
  const [replyText, setReplyText] = useState('');
  const [showLoginAlert,setShowLoginAlert]=useState(false)
  const [filter, setFilter] = useState('all');
  // console.log(selectedMessageCopy)
  const handleSendReply = async() => {
   setReplyText('')
  // console.log(selectedMessageCopy)
    const data = {
      YourName:selectedMessageCopy.YourName,
      reciver_id : selectedMessageCopy.participants[0].participant_id,
      chat_id:selectedMessageCopy.chat_id,
      message:replyText,
      Status:'Pending',
    }
    
    
    //http://localhost:8005/messagesend
    const response = await fetch(`${numport8005}messagesend`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',
      body: JSON.stringify(data),

    })
    if(response.status==200){
      
    }
   if(response.status==403){
    setShowLoginAlert(true)
   }
    
  };
   const FetchingChats = async()=>{
    
    //'http://localhost:8005/fetchingchats'
    const response = await fetch(`${numport8005}fetchingchats`,{
      method:'GET',
      headers: {
        'Content-Type': 'application/json', // Inform the server you're sending JSON
      },
      credentials:'include',
   

    })
    const result =  await response.json()
    if(response.status==200){
      console.log(result)
     setChatlist(result)
     
    }
    if(response.status == 403){
      setShowLoginAlert(true)
    }
   }
  useEffect(()=>{
   FetchingChats()

  },[])

  useEffect(()=>{
    const data = {
      reciver_id:selectedMessageCopy?.participants[0]?.participant_id,
      MyId:selectedMessageCopy?.YourId
    }
    socket?.emit('CallForOnlineStatusCheck',data)
    socket?.on('UserStatusOnline',(data)=>{
     
      setUserStatus(true)
    })
    socket?.on('UserStatusOffline',(data)=>{
      setUserStatus(false)
    })
    return ()=>{
      socket?.emit('Unmount','unmount')
    }
  },[selectedMessageCopy])
  const renderMessageDetails = () => {
    if (!selectedMessageCopy) return null;

    switch (selectedMessageCopy?.participants[0]?.role) {
      case 'artist':
        return <FanMessage chathistory={selectedMessageCopy as any} history={selectedMessage.history as any} />;
      case 'fan':
        return <FanMessage chathistory={selectedMessageCopy as any} history={selectedMessage.history as any} />;
      case 'judge':
        return <FanMessage chathistory={selectedMessageCopy as any} history={selectedMessage.history as any} />;
      case 'result':
        return <ResultMessage details={selectedMessage.details as any} />;
      case 'dispute':
        return <DisputeMessage history={selectedMessage.history as any} />;
      default:
        return null;
    }
  };

  return (

    isTabletOrMobile?
    showLoginAlert?<LoginSignupAlert setShowLoginAlert={setShowLoginAlert}></LoginSignupAlert>:
    <div>
      {selectedMessageCopy?
     <div>
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                {selectedMessageCopy.participants[0].role === 'artist' ? (
                  <img src={selectedMessage.avatar} alt="" className="w-12 h-12 rounded-full" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500" />
                )}
                <div>

                  <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                   {selectedMessageCopy.participants[0].name}
                    {/* {selectedMessageCopy.participants[0].role === 'artist' ? selectedMessage.from : selectedMessage.competitionName || 'System Message'} */}
                  </h2>
                
                  <p className="text-sm text-gray-500">

                    {new Date(selectedMessageCopy.lastMessage.timestamp).toLocaleDateString()}
                  </p>
                  {/* {UserStatus?<h1>Online</h1>:<h1>Offline</h1>} */}
                </div>
              </div>
            </div>
      <FanMessage chathistory={selectedMessageCopy as any} history={selectedMessage.history as any} />
     
     <div className="p-4 border-t border-gray-200 dark:border-gray-800 ">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button 
                    onClick={()=>handleSendReply()}
                    className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
     </div>

      :
      
      <MobileMessageList
    messages={Chatlist}
    selectedId={selectedMessageCopy}
    onSelect={setSelectedMessageCopy}
    ></MobileMessageList>}</div>
    
    :
    showLoginAlert?<LoginSignupAlert setShowLoginAlert={setShowLoginAlert}></LoginSignupAlert>:
    <div className="border-l border-r border-gray-200 dark:border-gray-800 min-h-screen overflow-y-hidden">
    <div className="flex h-screen">
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-800">
        <MessageHeader filter={filter} onFilterChange={setFilter} />
        <MessageList
         
          messages={Chatlist}
          selectedId={selectedMessageCopy}
          onSelect={setSelectedMessageCopy}
        />
      </div>

      <div className="flex-1 flex flex-col">
        {selectedMessageCopy && (
          <>
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                {selectedMessageCopy.participants[0].role === 'artist' ? (
                  <img src={selectedMessage.avatar} alt="" className="w-12 h-12 rounded-full" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500" />
                )}
                <div>

                  <h2 className="font-bold text-lg text-gray-900 dark:text-white">
                   {selectedMessageCopy.participants[0].name}
                    {/* {selectedMessageCopy.participants[0].role === 'artist' ? selectedMessage.from : selectedMessage.competitionName || 'System Message'} */}
                  </h2>
                
                  <p className="text-sm text-gray-500">

                    {new Date(selectedMessageCopy.lastMessage.timestamp).toLocaleDateString()}
                  </p>
                  {/* {UserStatus?<h1>Online</h1>:<h1>Offline</h1>} */}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {renderMessageDetails()}
            </div>

            {selectedMessageCopy.participants[0].role === 'artist' && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button 
                    onClick={()=>handleSendReply()}
                    className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  </div>
  );
}