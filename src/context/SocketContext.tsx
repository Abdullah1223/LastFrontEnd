import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextProps {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
  numport8005:any;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const numport8005 = 'https://rankmusic.zapto.org:8005/'
  const connectSocket = () => {
    
    //http://localhost:8005
    const newSocket = io('https://rankmusic.zapto.org:8005/',{
        withCredentials:true,
        auth:{
            token:"token"
        }
    });

    newSocket.on('connect', () => {
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    setSocket(newSocket);
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

//   useEffect(() => {
//     return () => {
//       disconnectSocket(); // Cleanup on unmount
//     };
//   }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, connectSocket, disconnectSocket,numport8005 }}>
      {children}
    </SocketContext.Provider>
  );
};
