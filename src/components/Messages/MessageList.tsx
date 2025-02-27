import React from 'react';
import { MessageCircle, Star, Trophy, AlertTriangle } from 'lucide-react';
import type { Message } from '../../types/messages';

interface MessageListProps {
  messages: Message[];
  selectedId: number;
  onSelect: (message: Message) => void;
  
}

export function MessageList({ messages, selectedId, onSelect, }: MessageListProps) {
  const fetchingid = (message:Message)=>{
    console.log(message)
  }
 // {console.log(messages)}
  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'fan':
        return <MessageCircle className="w-5 h-5 text-blue-500" />;
      case 'admin':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'result':
        return <Trophy className="w-5 h-5 text-green-500" />;
      case 'dispute':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <MessageCircle className="w-5 h-5" />;
    }
  };

  return (
    
    <div className="overflow-y-auto h-full">
      {messages?.map((message) => (
        <div
          key={message?.chat_id}
          onClick={() => onSelect(message)}
       
          className={`p-4 border-b border-gray-200 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
            selectedId === message._id ? 'bg-gray-50 dark:bg-gray-800' : ''
          }`}
        >
         
          <div className="flex items-start gap-3">
            {message.type === 'fan' ? (
              <img src={message.avatar} alt="" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                {getMessageIcon(message.type)}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900 dark:text-white">
                  {/* {message.type === 'fan' ? message.from : message.competitionName || 'System Message'} */}
                  {message?.participants[0].name}
                </p>
                <span className="text-sm text-gray-500">
                 
                  {new Date(message.lastMessage.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                {message?.lastMessage.message}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}