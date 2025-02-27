import React, { useEffect, useState, useRef } from 'react';
import type { FanMessageHistory } from '../../../types/messages';
import { useSocket } from '../../../context/SocketContext';
import { useInView } from 'react-intersection-observer';
import LoginSignupAlert from '../../auth/LoginAlert';

interface Message {
  sender_id: {
    _id: string;
    name: string;
  };
  message: string;
  timestamp: string;
  [key: string]: any;
}

interface FanMessageProps {
  history: FanMessageHistory[];
  chathistory: { chat_id: string; YourId: string };
}

export function FanMessage({ history, chathistory }: FanMessageProps) {
  const [Chathistory, setChatHistory] = useState<Message[]>([]);
  const [MyId, setMyId] = useState<string | undefined>();
  const [NoChats, setNoChats] = useState(false);
  const { socket,numport8005 } = useSocket();
  const [isList,setisList]=useState<string|null>(null)
  const { ref, inView } = useInView();
  const [IsEdit,setIsEdit]=useState<string|null>(null)
  const [EditedMessage,setEditedMessage]=useState()
  const [IsHover,setIsHover]=useState<string|null>(null)
  const [Page, setPage] = useState(0);
  const [showLoginAlert,setShowLoginAlert]=useState(false)
  const [LastCursor, setLastCursor] = useState<string|number>(0);
  const pageRef = useRef(Page);
  const [StartCon, setStartCon] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chat_id = chathistory.chat_id;
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    pageRef.current = Page;
    setMyId(chathistory?.YourId);
  }, [Page]);

  const MessageEdit = async(msg:any,type:string,MessageForEdit:any)=>{
    const Data = {
      DataForModification:msg,
      type,
      MessageForEdit,
    }
   // console.log(msg)
    if(MessageForEdit==msg.message){
      console.log('Messages Cannot Be Same')
    }else if(MessageForEdit==undefined){
      console.log('Messages Cannot Be Empty')
    }else{
      
    //http://localhost:8005/messagDeleteNEdit
      const response = await fetch(
      `${numport8005}messagDeleteNEdit`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:JSON.stringify(Data)
      }
     );
     if(response.status==200){
      setisList(null)
      setIsEdit(null)
    }
    }
  }
  const MessageModification=async(msg:any,type:string)=>{
    const Data = {
      DataForModification:msg,
      type,
    }
    const response = await fetch(
      
      //http://localhost:8005/messagDeleteNEdit
      `${numport8005}messagDeleteNEdit`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body:JSON.stringify(Data)
      }
    );
    if(response.status==200){
      setisList(null)
    }
    if(response.status==403){
      setShowLoginAlert(true)
    }

  }
  const FetchingChatHistory = async (page: any) => {
    try {
      const response = await fetch(
        
        //`http://localhost:8005/fetchingchatshistory/${chat_id}/${page}`,
        `${numport8005}fetchingchatshistory/${chat_id}/${page}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );

      if (response.status === 200) {
        const result = await response.json();
        console.log(result.sendingmessages)
        setChatHistory((prev) => [...result?.sendingmessages, ...prev]);
        //const lastcursorval = result?.sendingmessages[result.sendingmessages.length - 1];
        const lastcursorval  = result?.sendingmessages[0]
        console.log(lastcursorval)
        setLastCursor(lastcursorval?.timestamp);
        setMyId(result.yourid);
      //  console.log(result)  
        if (page === 0) {
          setInitialLoadDone(true);
          setTimeout(() => {
            if (chatContainerRef.current) {
              chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
            }
          }, 100);
        }
      } else if (response.status === 204) {
        if (Page === 0) setStartCon(true);
        setNoChats(true);
        setInitialLoadDone(true);
      }
      if(response.status==403){
        setShowLoginAlert(true)
      }
    } catch (error) {
      console.error('Error fetching chat history:', error);
      setInitialLoadDone(true);
    }
  };

  useEffect(() => {
    setChatHistory([]);
    setNoChats(false);
    setStartCon(false);
    setPage(0);
    setInitialLoadDone(false);
    FetchingChatHistory(0);

    const handleNewMessage = (data1: any) => {
      if (chathistory.chat_id === data1.chat_id) {
        //console.log(data1)
        setChatHistory((prev) => {
          const existingIndex = prev.findIndex((msg) => msg.uid === data1.uid);
          if (existingIndex !== -1) {
            const updatedHistory = [...prev];
            updatedHistory[existingIndex] = {
              ...updatedHistory[existingIndex],
              Status: data1.Status,
              _id: data1.message_id,
            };
            return updatedHistory;
          }
          return [...prev, data1];
        });
       // console.log(Chathistory)
      }
    };

    const handleMessage = (data1: any) => {
      if (chathistory.chat_id === data1.chat_id) {
        setChatHistory((prev) => [...prev, data1]);
     //   console.log(data1)
      }
    };

    const handleStatusUpdate = (data: any) => {
    //  console.log(data)
      if (chathistory.chat_id === data.chat_id) {
        //console.log(data)
        
        setChatHistory((prev) => {
          const index = prev.findIndex((i) => i.uid === data.uid);
          if (index !== -1) {
            const updated = [...prev];
            updated[index] = { ...updated[index], Status: data.Status,_id: data.message_id, }
            
            return updated;
          }
          return prev;
        });
      }
    };

    socket?.on('MessagePending', handleNewMessage);
        socket?.on('UserOnlineMessageDelivered',(data)=>{
      //console.log(Chathistory)
     // console.log(data)
       if(chathistory.chat_id==data?.chat_id){setChatHistory((prev)=>{
        //console.log(prev)
        const indecheck =  prev.findIndex((i)=>i.uid==data.uid)
        ///console.log(indecheck)
        if(indecheck!==-1){
          const UpdatedChat=[...prev];
          UpdatedChat[indecheck]={
            ...UpdatedChat[indecheck],
            Status:data.Status,
            _id: data.message_id,
          }
          return UpdatedChat;
        }
        return [...prev,data]
       })
      }
    })
    socket?.on('Message', handleMessage);
    socket?.on('MessageProcessed', handleStatusUpdate);
    socket?.on('MessageSeen',(data)=>{
      //console.log(data)
     if(chathistory.chat_id==data?.chat_id){
      setChatHistory((prev)=>{
        const ExisitingIndex = prev?.findIndex((p)=>p.uid==data.uid)
     
        if(ExisitingIndex!==-1){
          const UpdatedChat=[...prev];
          UpdatedChat[ExisitingIndex]={
            ...UpdatedChat[ExisitingIndex],
            Status:data.Status,
            _id: data.message_id,
          }
          return UpdatedChat;

        }
        return prev
      })
     }
    })
    socket?.on('MessageDeletedForEveryone',(data)=>{
      if(data?.chat_id==chathistory?.chat_id){
        if(data.type=='DeleteForEveryone'){
          setChatHistory((prev)=>{
            const ExisitingIndex = prev?.findIndex((p)=>p.uid==data.uid)
     
            if(ExisitingIndex!==-1){
              const UpdatedChat=[...prev];
              UpdatedChat[ExisitingIndex]={
                ...UpdatedChat[ExisitingIndex],
                 Status:'Deleted',
                message:data.message,
                isDelete:true
              }
              return UpdatedChat;
    
            }
            return prev
          })
        }
      }
    })
    socket?.on('DeleteForYou', (data) => {
     // console.log(data);
    
      if (data?.chat_id == chathistory?.chat_id) {
        setChatHistory((prev) => {
          const existingIndex = prev?.findIndex((p) => p.uid == data.uid);
    
          if (existingIndex !== -1) {
            const updatedChat = [...prev];
    
            updatedChat[existingIndex] = {
              ...updatedChat[existingIndex],
              DeleteFor: [...(updatedChat[existingIndex]?.DeleteFor || []),data.currentuserid], // Add `yourid`
            };
    
            return updatedChat;
          }
          
          return prev;
        });
      }
    });
    socket?.on('MessageEdited',(data)=>{
      console.log(data)
      if(data?.chat_id==chathistory?.chat_id){
      
        if(data.type=='Edit'){
          setChatHistory((prev)=>{
            const ExisitingIndex = prev?.findIndex((p)=>p.uid==data.uid)
     
            if(ExisitingIndex!==-1){
              const UpdatedChat=[...prev];
              UpdatedChat[ExisitingIndex]={
                ...UpdatedChat[ExisitingIndex],
                // Status:'',
                message:data.MessageForEdit,
                isEdit:true
              }
              return UpdatedChat;
    
            }
            return prev
          })
        }
      }
    })
    setIsHover(null)

    setIsEdit(null)
    setisList(null)
    return () => {
      socket?.off('MessagePending', handleNewMessage);
      socket?.off('UserOnlineMessageDelivered', handleStatusUpdate);
      socket?.off('Message', handleMessage);
      socket?.off('MessageProcessed', handleStatusUpdate);
      socket?.emit('Unmount',)
    };
  }, [chathistory]);

  useEffect(() => {
    if (inView && initialLoadDone && !NoChats) {
      const pagenum = pageRef.current + 1;
      setPage(pagenum);
      FetchingChatHistory(LastCursor);
    }
  }, [inView, initialLoadDone, NoChats]);

  useEffect(() => {
    if (chatContainerRef.current && Chathistory?.length > 0) {
      const container = chatContainerRef.current;
      const wasAtBottom =
        container.scrollHeight - container.clientHeight <= container.scrollTop + 100;

      if (wasAtBottom) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [Chathistory]);

  return (
    showLoginAlert?<LoginSignupAlert setShowLoginAlert={setShowLoginAlert}></LoginSignupAlert>:
    <div
      className="space-y-4 overflow-y-auto h-[calc(100vh-200px)] "
      ref={chatContainerRef}
    >
      <div ref={ref} />
      {NoChats ? (
        <div className="text-center py-4 text-gray-500">No chats available</div>
      ) : StartCon ? (
        <div className="text-center py-4 text-gray-500">Start the conversation!</div>
      ) : null}
    
      {Chathistory?.map((msg:any,index)=>{
         const isMessage  = msg?.sender_id?._id === MyId || msg?.sender_id === MyId;
         const isDeleted = msg?.DeleteFor?.some((Data:any)=>Data==MyId)
       
         //console.log(msg)
        // console.log(msg)
         //console.log(isDeleted)
             return(
          isDeleted?null: isMessage?
             <div className="flex justify-end p-2   ">
            
   {IsHover!=null && IsHover==msg.uid && isList==null && msg.isDelete!=true? <button
    onMouseLeave={()=>setIsHover(null)}
   onClick={()=>setisList(msg.uid)}
   >
    <img src='/src/components/Messages/MessageDetails/more.png' width={15} height={15}></img>
    </button>
    :null
    }
    {isList!=null && isList==msg.uid?
    <ul 
    onMouseLeave={(e)=>setisList(null)}
    className="bg-white rounded-xl h-40 shadow-lg w-56 font-sans overflow-hidden animate-[slideIn_0.3s_ease-out]">
    <li
    onClick={()=>setIsEdit(msg.uid)}
    className="group relative px-5 py-3.5 cursor-pointer transition-all duration-300 hover:bg-gray-50 border-b border-gray-200 hover:translate-x-1 flex items-center text-gray-800 text-sm">
      <span className="mr-3 transition-transform duration-200 group-hover:scale-110">✏️</span>
      Edit
      <div className="absolute left-0 top-0 h-full w-0 group-hover:w-1 bg-blue-500 transition-all duration-300"></div>
    </li>
  
    <li 
    onClick={()=>MessageModification(msg,'DeleteForYou')}
    className="group relative px-5 py-3.5 cursor-pointer transition-all duration-300 hover:bg-gray-50 border-b border-gray-200 hover:translate-x-1 flex items-center text-red-600 text-sm">
      <span className="mr-3 transition-transform duration-200 group-hover:scale-110">🗑️</span>
      Delete For You
      <div className="absolute left-0 top-0 h-full w-0 group-hover:w-1 bg-red-500 transition-all duration-300"></div>
    </li>
  
    <li
    onClick={()=>MessageModification(msg,'DeleteForEveryone')}
    className="group relative px-5 py-3.5 cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:translate-x-1 flex items-center text-red-700 font-medium text-sm">
      <span className="mr-3 transition-transform duration-200 group-hover:scale-110">⚠️</span>
      Delete For Everyone
      <div className="absolute left-0 top-0 h-full w-0 group-hover:w-1 bg-red-600 transition-all duration-300"></div>
    </li>
  </ul>
   :null}
  
  
  <div 
   onMouseEnter={()=>setIsHover(msg.uid)}
   
  className="flex flex-col items-start max-w-xs md:max-w-md bg-orange-400 p-4 rounded-2xl gap-2 break-words shadow-lg hover:shadow-xl transition-all duration-200 ease-out ml-4 overflow-x-hidden">

    <span className="font-semibold text-sm text-white/90 tracking-wide">
      {msg.SenderName || msg.sender_id?.name}
    </span>

    {IsEdit!=null && IsEdit==msg.uid? 
    <div className='flex flex-col bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto'>
    <textarea 
    onChange={(e)=>{setEditedMessage(e.target.value)}}
      className='w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 resize-y transition-all duration-200 placeholder-gray-400 text-gray-700'
     
      placeholder={msg.message}
    ></textarea>
    
    <div className='flex w-full justify-between items-center mt-4'>
      <button 
      onClick={()=>setIsEdit(null)}
      className='px-5 py-2 rounded-md font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200 border-2 border-gray-200 hover:border-gray-300'>
        Cancel
      </button>
      
      <div className='flex gap-3'>
        <button 
        onClick={()=>MessageEdit(msg,'Edit',EditedMessage)}
        className='px-6 py-2 bg-orange-500 text-white rounded-md font-semibold hover:bg-orange-600 transition-all duration-200 shadow-sm hover:shadow-orange-200 hover:shadow-md'>
          Edit
          <span className='ml-2 text-xs'>✏️</span>
        </button>
      </div>
    </div>
  </div>:<p className="whitespace-normal text-base text-white leading-relaxed">
      {msg.message}
    </p>
}
   {msg.isEdit==true?
  <h1 className='whitespace-normal text-sm font-bold text-white leading-relaxed'>Edited</h1>
  :null 
  }
    <div className="w-full flex items-center justify-end gap-2">
      <time className="text-xs text-white/80 font-medium">
        {new Date(msg?.timestamp).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </time>
      {(msg?.sender_id?._id === MyId || msg?.sender_id === MyId) && (
        <img
          className="p-1 transition-opacity hover:opacity-80"
          src={`/src/components/Messages/MessageDetails/${
            msg?.Status === 'Pending'
              ? 'circle.png'
              : msg?.Status === 'Sent'
              ? 'check.png'
              : msg?.Status === 'Delivered'
              ? 'checked.png'
              : msg?.Status=="Deleted"?'forbidden-sign.png'
              : 'user.png'
          }`}
          width={20}
          
          alt="status"
        />
      )}
    </div>
    
  </div>
  
            </div>:
            
              <div className="flex h-auto justify-start">
          
              <div 
              onMouseEnter={()=>setIsHover(msg.uid)}
              className="flex flex-col items-start max-w-xs md:max-w-md bg-white p-4 rounded-xl gap-2 break-words shadow-md hover:shadow-lg transition-shadow duration-200 overflow-x-hidden">
                {/* Sender Name with orange accent */}
                <span className="text-orange-600 font-semibold text-sm tracking-wide">
                  {msg.SenderName || msg.sender_id.name}
                </span>
                
                {/* Message text with proper contrast */}
                
           <p className="text-gray-800 text-base leading-relaxed">
                  {msg.message}
                </p>
                {msg.isEdit==true?
  <h1 className='whitespace-normal text-sm font-bold text-gray-400 leading-relaxed'>Edited</h1>
  :null 
  }
        
                {/* Timestamp with subtle orange hint */}
                <div className="self-end flex items-center gap-1">
                  <span className="text-gray-400 text-xs font-medium">
                    {new Date(msg?.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                  <svg 
                    className="w-3 h-3 text-orange-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z"/>
                  </svg>
                </div>
              </div>
              {IsHover!=null && IsHover==msg.uid && isList==null?<button
     onMouseLeave={()=>setIsHover(null)}
    onClick={()=>setisList(msg.uid)}
   >
    <img src='/src/components/Messages/MessageDetails/more.png' width={15} height={15}></img>
    </button>
    :null
    }

{isList!=null && isList==msg.uid?
    <ul 
    onMouseLeave={(e)=>setisList(null)}
    className="bg-white rounded-xl h-40 shadow-lg w-56 font-sans overflow-hidden animate-[slideIn_0.3s_ease-out]">  
    <li 
    onClick={()=>MessageModification(msg,'DeleteForYou')}
    className="group relative px-5 py-3.5 cursor-pointer transition-all duration-300 hover:bg-gray-50 border-b border-gray-200 hover:translate-x-1 flex items-center text-red-600 text-sm">
      <span className="mr-3 transition-transform duration-200 group-hover:scale-110">🗑️</span>
      Delete For You
      <div className="absolute left-0 top-0 h-full w-0 group-hover:w-1 bg-red-500 transition-all duration-300"></div>
    </li></ul>:null}
            </div>
             )
      })}
      {/* {Chathistory?.map((msg: any, index) => (
        <div
        // {...(msg?.sender_id?._id === MyId || msg?.sender_id === MyId
        //   ? { onMouseMove: (e) =>setIsHover(msg.uid) }
        //   : {})}
        //   {...(msg?.sender_id?._id === MyId || msg?.sender_id === MyId
        //     ? { onMouseLeave: (e) =>setIsHover(null) }
        //     : {})}
          key={`${msg._id}-${index}`}
          className={`relative  flex  ${
            msg?.sender_id?._id === MyId || msg?.sender_id === MyId
              ? 'justify-end'
              : 'justify-start'
          }`}
        > 
        {msg.sender_id._id===MyId || msg?.sender_id ==MyId?
        msg.uid==IsHover?
        IsHover!=null && isList==null?
        <button className='mr-3'
        onClick={()=>setisList(msg.uid)}
        {...(msg?.sender_id?._id === MyId || msg?.sender_id === MyId
          ? {     onMouseLeave:() => setIsHover(null)  }
          : {})}
        ><img  width={25} height={25} src='/src/components/Messages/MessageDetails/more.png'></img></button>
        :null
        :null:null}
       
       {isList!=null && msg.sender_id._id == MyId || msg.sender_id == MyId  ? 
      isList==msg.uid?<ul className="bg-white rounded-xl shadow-lg w-56 font-sans overflow-hidden animate-[slideIn_0.3s_ease-out]">
  <li className="group relative px-5 py-3.5 cursor-pointer transition-all duration-300 hover:bg-gray-50 border-b border-gray-200 hover:translate-x-1 flex items-center text-gray-800 text-sm">
    <span className="mr-3 transition-transform duration-200 group-hover:scale-110">✏️</span>
    Edit
    <div className="absolute left-0 top-0 h-full w-0 group-hover:w-1 bg-blue-500 transition-all duration-300"></div>
  </li>

  <li className="group relative px-5 py-3.5 cursor-pointer transition-all duration-300 hover:bg-gray-50 border-b border-gray-200 hover:translate-x-1 flex items-center text-red-600 text-sm">
    <span className="mr-3 transition-transform duration-200 group-hover:scale-110">🗑️</span>
    Delete For You
    <div className="absolute left-0 top-0 h-full w-0 group-hover:w-1 bg-red-500 transition-all duration-300"></div>
  </li>

  <li className="group relative px-5 py-3.5 cursor-pointer transition-all duration-300 hover:bg-gray-50 hover:translate-x-1 flex items-center text-red-700 font-medium text-sm">
    <span className="mr-3 transition-transform duration-200 group-hover:scale-110">⚠️</span>
    Delete For Everyone
    <div className="absolute left-0 top-0 h-full w-0 group-hover:w-1 bg-red-600 transition-all duration-300"></div>
  </li>
</ul>:null:null}
          <div
             {...(msg?.sender_id?._id === MyId || msg?.sender_id === MyId
              ? { onMouseEnter: (e) =>setIsHover(msg.uid) }
              : {})}
              // {...(msg?.sender_id?._id === MyId || msg?.sender_id === MyId
              //   ? { onMouseLeave: (e) =>{setIsHover(null)} }
              //   : {})}
            className={`max-w-[80%] w-fit inline-block p-3 rounded-lg ${
              msg?.sender_id?._id === MyId || msg?.sender_id === MyId
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            <p className="text-sm font-semibold mb-1">
              {msg?.sender_id?.name || msg?.SenderName}
            </p>
            <div 
            className="break-words   ">{msg?.message}</div>
            <p className="text-xs mt-1 opacity-70">
              {new Date(msg?.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
          {(msg?.sender_id?._id === MyId || msg?.sender_id === MyId) && (
            <img
              className="self-end p-1"
              src={`/src/components/Messages/MessageDetails/${
                msg?.Status === 'Pending'
                  ? 'circle.png'
                  : msg?.Status === 'Sent'
                  ? 'check.png'
                  : msg?.Status === 'Delivered'
                  ? 'checked.png'
                  : 'user.png'
              }`}
              width={20}
              alt="status"
            />
          )}
        </div>
      ))} */}
    </div>
  );
}