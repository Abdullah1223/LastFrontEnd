// import React, { useState } from 'react';
// import { Heart, MessageCircle, Share2, Image, Video, Music, X } from 'lucide-react';
// import { useUser } from '../context/UserContext';

// interface Post {
//   id: string;
//   author: {
//     name: string;
//     handle: string;
//     avatar: string;
//   };
//   content: string;
//   media?: {
//     type: 'image' | 'video' | 'audio';
//     url: string;
//   };
//   likes: number;
//   comments: number;
//   shares: number;
//   timestamp: string;
//   isLiked: boolean;
// }

// const mockPosts: Post[] = [
//   {
//     id: '1',
//     author: {
//       name: 'DJ Spark',
//       handle: '@djspark',
//       avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&h=200&fit=crop'
//     },
//     content: 'Just dropped my latest track in the Beat Battle Championship! Check it out and let me know what you think 🎵🔥',
//     media: {
//       type: 'audio',
//       url: 'https://example.com/track.mp3'
//     },
//     likes: 234,
//     comments: 45,
//     shares: 12,
//     timestamp: '2024-03-20T15:30:00',
//     isLiked: false
//   },
//   {
//     id: '2',
//     author: {
//       name: 'Luna Voice',
//       handle: '@lunavoice',
//       avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
//     },
//     content: 'Behind the scenes at the studio! Working on something special for the upcoming competition 🎤✨',
//     media: {
//       type: 'image',
//       url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop'
//     },
//     likes: 567,
//     comments: 89,
//     shares: 23,
//     timestamp: '2024-03-20T14:45:00',
//     isLiked: true
//   }
// ];

// export function SocialFeedPage() {
//   const { user } = useUser();
//   const [posts, setPosts] = useState(mockPosts);
//   const [showPostModal, setShowPostModal] = useState(false);
//   const [newPost, setNewPost] = useState({
//     content: '',
//     media: null as File | null,
//     userId:'',
//     timestamp:Date.now(),

//   });

//   const handleLike = (postId: string) => {
//     setPosts(prev => prev.map(post => 
//       post.id === postId 
//         ? { 
//             ...post, 
//             isLiked: !post.isLiked,
//             likes: post.isLiked ? post.likes - 1 : post.likes + 1
//           }
//         : post
//     ));
//   };

//   const handleSubmitPost = () => {
//     if (!newPost.content.trim()) return;
//     console.log(user?.id)
//     console.log(newPost)
//     // // In a real app, this would upload the media and create a new post
//     // alert('Post created successfully!');
//     // setShowPostModal(false);
//     setNewPost({ content: '', media: null });
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-2xl mx-auto space-y-6">
//         {/* Create Post Button */}
//         <button
//           onClick={() => setShowPostModal(true)}
//           className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
//         >
//           <img
//             src={user?.avatar}
//             alt={user?.name}
//             className="w-10 h-10 rounded-full"
//           />
//           <span className="text-gray-500">Share your thoughts...</span>
//         </button>

//         {/* Posts Feed */}
//         <div className="space-y-6">
//           {posts.map((post) => (
//             <div
//               key={post.id}
//               className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
//             >
//               <div className="flex items-start gap-4">
//                 <img
//                   src={post.author.avatar}
//                   alt={post.author.name}
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2">
//                     <h3 className="font-bold">{post.author.name}</h3>
//                     <span className="text-gray-500">{post.author.handle}</span>
//                     <span className="text-gray-500">•</span>
//                     <span className="text-gray-500">
//                       {new Date(post.timestamp).toLocaleDateString()}
//                     </span>
//                   </div>
//                   <p className="mt-2">{post.content}</p>
                  
//                   {post.media && (
//                     <div className="mt-4">
//                       {post.media.type === 'image' ? (
//                         <img
//                           src={post.media.url}
//                           alt="Post media"
//                           className="rounded-lg w-full"
//                         />
//                       ) : post.media.type === 'audio' ? (
//                         <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-4">
//                           <Music className="w-8 h-8 text-orange-500" />
//                           <div className="flex-1">
//                             <div className="h-1 bg-orange-500 rounded-full" />
//                           </div>
//                           <span className="text-sm text-gray-500">3:45</span>
//                         </div>
//                       ) : null}
//                     </div>
//                   )}

//                   <div className="flex items-center gap-6 mt-4">
//                     <button
//                       onClick={() => handleLike(post.id)}
//                       className={`flex items-center gap-2 ${
//                         post.isLiked ? 'text-red-500' : 'text-gray-500'
//                       }`}
//                     >
//                       <Heart className="w-5 h-5" />
//                       <span>{post.likes}</span>
//                     </button>
//                     <button className="flex items-center gap-2 text-gray-500">
//                       <MessageCircle className="w-5 h-5" />
//                       <span>{post.comments}</span>
//                     </button>
//                     <button className="flex items-center gap-2 text-gray-500">
//                       <Share2 className="w-5 h-5" />
//                       <span>{post.shares}</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Create Post Modal */}
//       {showPostModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-xl font-bold">Create Post</h3>
//               <button
//                 onClick={() => setShowPostModal(false)}
//                 className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               >
//                 <X className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <textarea
//                 value={newPost.content}
//                 onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//                 placeholder="What's on your mind?"
//                 className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
//                 rows={4}
//               />

//               <div className="flex gap-2">
//                 <button className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
//                   <Image className="w-5 h-5" />
//                   Photo
//                 </button>
//                 <button className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
//                   <Video className="w-5 h-5" />
//                   Video
//                 </button>
//                 <button className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
//                   <Music className="w-5 h-5" />
//                   Audio
//                 </button>
//               </div>

//               <div className="flex gap-4 mt-4">
//                 <button
//                   onClick={() => setShowPostModal(false)}
//                   className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleSubmitPost}
//                   className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md"
//                 >
//                   Post
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, Image, Video, Music, X } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
  };
  content: string;
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string;
  };
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  isLiked: boolean;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: {
      name: 'DJ Spark',
      handle: '@djspark',
      avatar: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&h=200&fit=crop'
    },
    content: 'Just dropped my latest track in the Beat Battle Championship! Check it out and let me know what you think 🎵🔥',
    media: {
      type: 'audio',
      url: 'https://example.com/track.mp3'
    },
    likes: 234,
    comments: 45,
    shares: 12,
    timestamp: '2024-03-20T15:30:00',
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: 'Luna Voice',
      handle: '@lunavoice',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
    },
    content: 'Behind the scenes at the studio! Working on something special for the upcoming competition 🎤✨',
    media: {
      type: 'image',
      url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop'
    },
    likes: 567,
    comments: 89,
    shares: 23,
    timestamp: '2024-03-20T14:45:00',
    isLiked: true
  }
];

const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20MB

export function SocialFeedPage() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [showPostModal, setShowPostModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [newPost, setNewPost] = useState<{
    content: string;
    media: {
      type: 'image' | 'video' | 'audio';
      file: File;
      previewUrl: string;
    } | null;
  }>({
    content: '',
    media: null,
  });

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const handleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleMediaUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'video' | 'audio'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert(`File size exceeds 20MB limit. Please choose a smaller file.`);
      e.target.value = '';
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setNewPost(prev => ({
      ...prev,
      media: { type, file, previewUrl },
    }));
  };

  const removeMedia = () => {
    if (newPost.media) {
      URL.revokeObjectURL(newPost.media.previewUrl);
      setNewPost(prev => ({ ...prev, media: null }));
    }
  };

  const handleSubmitPost = async () => {
    if (!newPost.content.trim() && !newPost.media) return;
  
    console.log('Current newPost state:', newPost); // Debug current state
  
    const formData = new FormData();
    formData.append('content', newPost.content);
  
    if (newPost.media) {
      console.log('Appending media file:', newPost.media.file); // Debug file
      formData.append('media', newPost.media.file, newPost.media.file.name);
      formData.append('mediaType', newPost.media.type);
    }
  
    // Verify FormData contents
    console.log('--- FormData Contents ---');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
    console.log('-------------------------');
  
    setIsProcessing(true);
  
    try {
      const response = await fetch('http://localhost:8007/postcreation', {
        method: 'POST',
        
        credentials: 'include',
        body: formData,
      });
  
      if (!response.ok) throw new Error('Network response was not ok');
      
      const result = await response.json();
      console.log('Server response:', result);
      
      // Reset state after successful post
      setNewPost({ content: '', media: null });
      setShowPostModal(false);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const closeModal = () => {
    if (newPost.media) {
      URL.revokeObjectURL(newPost.media.previewUrl);
    }
    setShowPostModal(false);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <button
          onClick={() => setShowPostModal(true)}
          className="w-full bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition text-left"
        >
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-gray-500">Share your thoughts...</span>
        </button>
        <div className="w-auto space-y-6">
    {posts.map((post) => (
      <div
        key={post.id}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden" // Added overflow-hidden
      >
        {/* Post Author and Metadata */}
        <div className="flex items-start gap-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full flex-shrink-0" // Ensure the image doesn't shrink
          />
          <div className="flex-1 min-w-0"> {/* Added min-w-0 to prevent overflow */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="font-bold truncate">{post.author.name}</h3> {/* Truncate long names */}
              <span className="text-gray-500 truncate">{post.author.handle}</span> {/* Truncate long handles */}
              <span className="text-gray-500 hidden sm:inline">•</span>
              <span className="text-gray-500 whitespace-nowrap">
                {new Date(post.timestamp).toLocaleDateString()}
              </span>
            </div>
            {/* Post Content */}
            <p className="mt-2 break-words">{post.content}</p> {/* Ensure text wraps and breaks */}
            
            {/* Post Media */}
            {post.media && (
              <div className="mt-4">
                {post.media.type === 'image' && (
                  <img
                    src={post.media.url}
                    alt="Post media"
                    className="rounded-lg w-full max-w-full h-auto" // Ensure image scales properly
                  />
                )}
                {post.media.type === 'video' && (
                  <video
                    controls
                    src={post.media.url}
                    className="rounded-lg w-full max-w-full h-auto" // Ensure video scales properly
                  />
                )}
                {post.media.type === 'audio' && (
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-4">
                    <Music className="w-8 h-8 text-orange-500 flex-shrink-0" />
                    <audio
                      controls
                      src={post.media.url}
                      className="w-full max-w-full" // Ensure audio scales properly
                    />
                  </div>
                )}
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center gap-6 mt-4">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 ${
                  post.isLiked ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                <Heart className="w-5 h-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500">
                <Share2 className="  w-5 h-5" />
                <span>{post.shares}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
      </div>

      {/* Create Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Create Post</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder="What's on your mind?"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                rows={4}
              />

              {newPost.media && (
                <div className="relative mt-4">
                  <button
                    onClick={removeMedia}
                    className="absolute top-2 right-2 bg-gray-800/50 text-white rounded-full p-1 hover:bg-gray-800/75 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {newPost.media.type === 'image' && (
                    <img
                      src={newPost.media.previewUrl}
                      alt="Media preview"
                      className="rounded-lg max-h-48 w-full object-cover"
                    />
                  )}
                  {newPost.media.type === 'video' && (
                    <video
                      controls
                      src={newPost.media.previewUrl}
                      className="rounded-lg w-full"
                    />
                  )}
                  {newPost.media.type === 'audio' && (
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 flex items-center gap-4">
                      <Music className="w-8 h-8 text-orange-500" />
                      <audio
                        controls
                        src={newPost.media.previewUrl}
                        className="flex-1"
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  ref={imageInputRef}
                  onChange={(e) => handleMediaUpload(e, 'image')}
                  className="hidden"
                />
                <button
                  onClick={() => imageInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <Image className="w-5 h-5" />
                  Photo
                </button>

                <input
                  type="file"
                  accept="video/*"
                  ref={videoInputRef}
                  onChange={(e) => handleMediaUpload(e, 'video')}
                  className="hidden"
                />
                <button
                  onClick={() => videoInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <Video className="w-5 h-5" />
                  Video
                </button>

                <input
                  type="file"
                  accept="audio/*"
                  ref={audioInputRef}
                  onChange={(e) => handleMediaUpload(e, 'audio')}
                  className="hidden"
                />
                <button
                  onClick={() => audioInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                >
                  <Music className="w-5 h-5" />
                  Audio
                </button>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitPost}
                  disabled={isProcessing}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              <h3 className="text-lg font-bold">Processing your post...</h3>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <div className="bg-orange-500 h-2 rounded-full animate-pulse w-full"></div>
              </div>
              <p className="text-sm text-gray-500">This may take a few seconds</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}