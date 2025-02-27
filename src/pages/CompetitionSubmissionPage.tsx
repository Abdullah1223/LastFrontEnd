import React, { useState } from 'react';
import { Music, Link as LinkIcon, Image, Globe } from 'lucide-react';
import type { Competition } from '../types/competition';

interface CompetitionSubmissionPageProps {
  competition: Competition;
  onBack: () => void;
}

export function CompetitionSubmissionPage({ competition, onBack }: CompetitionSubmissionPageProps) {
  const [formData, setFormData] = useState({
    trackUrl: '',
    albumArt: null as File | null,
    spotifyUrl: '',
    appleMusicUrl: '',
    soundcloudUrl: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(competition)
    // Handle submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={onBack}
          className="text-orange-500 hover:text-orange-600 mb-6 flex items-center gap-2"
        >
          ← Back to Competitions
        </button>

        <div className="bg-gradient-to-br from-white to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 shadow-lg mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">{competition.title}</h1>
          
          <div className="flex items-center gap-4 text-white">
            <span className="bg-green-500 px-3 py-1 rounded-full text-sm">Prize: {competition.prize}</span>
            <span className="bg-orange-500 px-3 py-1 rounded-full text-sm">Deadline: {competition.deadline}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2 font-medium">Track Upload</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <Music className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="text-sm text-gray-500">
                    <label className="relative cursor-pointer rounded-md font-medium text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-600">
                      <span>Upload your track</span>
                      <input type="file" className="sr-only" accept=".mp3,.wav" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                    <p className="text-xs text-gray-500">MP3 or WAV up to 20MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Album Art</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                  <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="text-sm text-gray-500">
                    <label className="relative cursor-pointer rounded-md font-medium text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-600">
                      <span>Upload album art</span>
                      <input type="file" className="sr-only" accept="image/*" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Streaming Platforms</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Spotify URL</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://open.spotify.com/track/..."
                      value={formData.spotifyUrl}
                      onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Apple Music URL</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://music.apple.com/..."
                      value={formData.appleMusicUrl}
                      onChange={(e) => setFormData({ ...formData, appleMusicUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">SoundCloud URL</label>
                  <div className="relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="url"
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="https://soundcloud.com/..."
                      value={formData.soundcloudUrl}
                      onChange={(e) => setFormData({ ...formData, soundcloudUrl: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  rows={4}
                  className="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Tell us about your track..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-green-500 to-yellow-500 text-white font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-lg"
              >
                Submit Entry
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}