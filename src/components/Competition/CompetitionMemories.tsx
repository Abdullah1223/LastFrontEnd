import React, { useState } from 'react';
import { Camera, Video, Heart, MessageCircle, Share2, X } from 'lucide-react';

interface Memory {
  id: string;
  type: 'photo' | 'video';
  url: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  comments: number;
  caption: string;
  timestamp: string;
}

const mockMemories: Memory[] = [
  {
    id: '1',
    type: 'photo',
    url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop',
    author: {
      name: 'Sarah Parker',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop'
    },
    likes: 234,
    comments: 42,
    caption: 'Amazing performance at the Beat Battle! 🎵🔥',
    timestamp: '2024-03-20T15:30:00'
  },
  {
    id: '2',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop',
    author: {
      name: 'John Music',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop'
    },
    likes: 567,
    comments: 89,
    caption: 'The crowd went wild during this drop! 🎉',
    timestamp: '2024-03-20T14:45:00'
  }
];

export function CompetitionMemories() {
  const [memories, setMemories] = useState(mockMemories);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState<'photo' | 'video' | null>(null);

  const handleUpload = (type: 'photo' | 'video') => {
    setUploadType(type);
    setShowUploadModal(true);
  };

  const handleLike = (memoryId: string) => {
    setMemories(prev => prev.map(memory => 
      memory.id === memoryId 
        ? { ...memory, likes: memory.likes + 1 }
        : memory
    ));
  };

  return (
    <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Fan Memories</h2>
          <div className="flex gap-2">
            <button
              onClick={() => handleUpload('photo')}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              <Camera className="w-4 h-4" />
              Photo
            </button>
            <button
              onClick={() => handleUpload('video')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              <Video className="w-4 h-4" />
              Video
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {memories.map((memory) => (
          <div key={memory.id} className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="relative">
              <img 
                src={memory.url} 
                alt={memory.caption}
                className="w-full h-48 object-cover"
              />
              {memory.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Video className="w-12 h-12 text-white" />
                </div>
              )}
            </div>
            
            <div className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src={memory.author.avatar}
                  alt={memory.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">{memory.author.name}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(memory.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-3">{memory.caption}</p>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(memory.id)}
                  className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition"
                >
                  <Heart className="w-5 h-5" />
                  <span>{memory.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-400 hover:text-blue-500 transition">
                  <MessageCircle className="w-5 h-5" />
                  <span>{memory.comments}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-400 hover:text-green-500 transition">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">
                Upload {uploadType === 'photo' ? 'Photo' : 'Video'}
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <div className="mx-auto w-12 h-12 mb-4 text-gray-400">
                  {uploadType === 'photo' ? <Camera className="w-12 h-12" /> : <Video className="w-12 h-12" />}
                </div>
                <div className="text-sm text-gray-500">
                  <label className="relative cursor-pointer rounded-md font-medium text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-600">
                    <span>Upload a file</span>
                    <input type="file" className="sr-only" accept={uploadType === 'photo' ? "image/*" : "video/*"} />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                  <p className="text-xs text-gray-500">
                    {uploadType === 'photo' ? 'PNG, JPG up to 10MB' : 'MP4, MOV up to 50MB'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Caption
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Write a caption..."
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Memory uploaded successfully!');
                    setShowUploadModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}