import { useEffect, useState } from 'react';
import { useSocket } from '../context/SocketContext';
import validator from 'validator'
import LoginSignupAlert from '../components/auth/LoginAlert';
const ChatDialog = ({ user,isOpen,setIsOpen }) => {
  
  const [message, setMessage] = useState('');
  const {socket,numport8005}=useSocket()
  const [isLogin,setisLogin]=useState(false)
const [MessageError,setMessageError]=useState<string|null>(null)
  const [UserStatus,setUserStatus]=useState<string|null>(null)
  const handleSend = async() => {

 if(validator.isEmpty(message.trim())){
    setMessageError('Message Cannot Be Empty')
 }else{
    const data = {
        reciver_id:user._id,
        message:message,
        Status:'Pending',
    }

     
    //'http://localhost:8005/FirstMessageCreate'
    const response = await fetch(`${numport8005}FirstMessageCreate`,{
        method:'POST',
        headers: {
          'Content-Type': 'application/json', // Inform the server you're sending JSON
        },
        credentials:'include',
       body:JSON.stringify(data)
    
      })
      if(response.status==200){
        setIsOpen();
      }else if(response.status==403){
         setisLogin(true)
      }
    }
     // Close the dialog after sending
  };

  const handleCancel = () => {
    setIsOpen(); // Close the dialog
  };

  useEffect(() => {
    if (isOpen) {
      console.log('Chat opened for:', user.name);
      const StatusData = {
        reciver_id:user._id
      }
      socket?.emit('CallForOnlineStatusCheck',StatusData)
      
     socket?.on('UserStatus',(data)=>{
        setUserStatus(data)
     }) 
     
    }
  }, [isOpen, user]);
  return (
    <>
      {/* Chat Button */}
     

      {/* Dialog Box */}
      {isOpen && (
        isLogin?<LoginSignupAlert setShowLoginAlert={setisLogin} ></LoginSignupAlert>:<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-20 z-50'>
          <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-md'>
            {/* User Profile Section */}
            <div className='flex items-center space-x-4 mb-4'>
              <img
                src={user.image}
                alt={user.name}
                className='w-12 h-12 rounded-full'
              />
              <div>
                <h2 className='text-lg font-semibold text-black'>{user.name}</h2>
                <p className='text-sm text-gray-600'>{UserStatus}</p>
              </div>
            </div>

            {/* Text Area */}
            <textarea
              className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none'
              rows={4}
              placeholder='Type your message...'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
           {MessageError ?<h1>{MessageError}</h1>:null}  
            {/* Buttons */}
            <div className='flex justify-end space-x-4 mt-4'>
              <button
                className='px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all duration-300'
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all duration-300'
                onClick={handleSend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatDialog