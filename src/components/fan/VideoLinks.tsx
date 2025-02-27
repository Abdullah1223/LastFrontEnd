import React, { useState } from 'react';
import { Video, Link as LinkIcon, X } from 'lucide-react';

interface VideoLink {
  id: string;
  url: string;
  title: string;
  artist: string;
  platform: string;
  addedAt: string;
}

const mockVideoLinks: VideoLink[] = [
  {
    id: '1',
    url: 'https://youtube.com/watch?v=example1',
    title: 'Beat Battle Reaction',
    artist: 'DJ Spark',
    platform: 'YouTube',
    addedAt: '2024-03-20T15:30:00'
  },
  {
    id: '2',
    url: 'https://tiktok.com/@example/video2',
    title: 'Live Performance Reaction',
    artist: 'Luna Voice',
    platform: 'TikTok',
    addedAt: '2024-03-19T12:45:00'
  }
];

export function VideoLinks() {
  const [videoLinks, setVideoLinks] = useState(mockVideoLinks);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLink, setNewLink] = useState({
    url: '',
    title: '',
    artist: '',
    platform: 'YouTube'
  });

  const handleAddLink = () => {
    if (!newLink.url || !newLink.title || !newLink.artist) return;

    const videoLink: VideoLink = {
      id: Date.now().toString(),
      ...newLink,
      addedAt: new Date().toISOString()
    };

    setVideoLinks(prev => [videoLink, ...prev]);
    setShowAddModal(false);
    setNewLink({ url: '', title: '', artist: '', platform: 'YouTube' });
  };

  const handleRemoveLink = (id: string) => {
    setVideoLinks(prev => prev.filter(link => link.id !== id));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-white">My Reaction Videos</h2>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md flex items-center gap-2"
          >
            <LinkIcon className="w-4 h-4" />
            Add Video Link
          </button>
        </div>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {videoLinks.map((link) => (
          <div key={link.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-white">{link.title}</h3>
                <p className="text-gray-500">Reaction to {link.artist}</p>
              </div>
              <button
                onClick={() => handleRemoveLink(link.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-2 flex items-center gap-4 text-sm">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-500 hover:text-orange-600 flex items-center gap-1"
              >
                <LinkIcon className="w-4 h-4" />
                {link.platform}
              </a>
              <span className="text-gray-500">
                Added {new Date(link.addedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Video Link Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4 text-white">Add Video Link</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Video URL
                </label>
                <input
                  type="url"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newLink.title}
                  onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Video title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Artist
                </label>
                <input
                  type="text"
                  value={newLink.artist}
                  onChange={(e) => setNewLink({ ...newLink, artist: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Artist name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Platform
                </label>
                <select
                  value={newLink.platform}
                  onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Instagram">Instagram</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-300 rounded-full hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddLink}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md"
                >
                  Add Link
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}