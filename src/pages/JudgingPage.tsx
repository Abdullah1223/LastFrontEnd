import React from 'react';
import { Gavel, Star, Clock, Music } from 'lucide-react';

export function JudgingPage() {
  const pendingSubmissions = [
    {
      id: 1,
      title: "Summer Vibes 2024",
      artist: "DJ Spark",
      competition: "Beat Battle Championship",
      submittedAt: "2024-03-19T14:30:00",
      genre: "Electronic"
    },
    {
      id: 2,
      title: "Urban Flow",
      artist: "MC Flow",
      competition: "Hip Hop Masters",
      submittedAt: "2024-03-19T15:45:00",
      genre: "Hip Hop"
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Judging Panel
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Review and score competition submissions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Gavel className="w-6 h-6 text-orange-500" />
            <span className="text-lg font-semibold">
              {pendingSubmissions.length} Pending Reviews
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {pendingSubmissions.map((submission) => (
            <div 
              key={submission.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{submission.title}</h3>
                  <p className="text-gray-500">by {submission.artist}</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition">
                  Start Review
                </button>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{submission.competition}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-orange-500" />
                  <span>{submission.genre}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span>{new Date(submission.submittedAt).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}