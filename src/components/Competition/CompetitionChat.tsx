import React, { useState } from 'react';
import { Send, Users } from 'lucide-react';
import { mockChatMessages } from '../../data/mockChatMessages';

export function CompetitionChat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockChatMessages);
  const [activeGroup, setActiveGroup] = useState('general');

  const groups = [
    { id: 'general', name: 'General Chat' },
    { id: 'producers', name: 'Producers' },
    { id: 'vocalists', name: 'Vocalists' },
    { id: 'feedback', name: 'Feedback' }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      user: 'You',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop',
      content: message,
      timestamp: new Date().toISOString(),
      group: activeGroup
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const filteredMessages = messages.filter(msg => msg.group === activeGroup);

  return (
    <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold">Artist Community</h2>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-orange-500" />
          <span className="text-sm text-gray-500">1,243 online</span>
        </div>
      </div>

      <div className="flex">
        {/* Group List */}
        <div className="w-48 border-r border-gray-200 dark:border-gray-700">
          {groups.map(group => (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={`w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 ${
                activeGroup === group.id ? 'bg-orange-50 dark:bg-gray-700' : ''
              }`}
            >
              {group.name}
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="flex-1">
          <div className="h-64 overflow-y-auto p-4 space-y-4">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <img src={msg.avatar} alt="" className="w-8 h-8 rounded-full" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{msg.user}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="submit"
                className="p-2 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}