import React, { useEffect, useState } from 'react';
import { Bookmark, X, Calendar, Users, Trophy } from 'lucide-react';
import { ClipLoader } from 'react-spinners';
import { useUser } from '../context/UserContext';

interface SavedCompetition {
  _id: string;
  title: string;
  prize: string;
  deadline: string;
  participants: number;
  genre: string;
  description: string;
  status: 'started' | 'Upcoming';
  image: string;
}

const mockSavedCompetitions: SavedCompetition[] = [
  {
    _id: '1',
    title: 'Summer Beats 2024',
    prize: '$10,000',
    deadline: '2024-04-15',
    participants: 324,
    genre: 'Electronic',
    description: 'Create the ultimate summer anthem and compete for the grand prize!',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=600&fit=crop'
  },
  {
    _id: '2',
    title: 'Hip Hop Masters',
    prize: '$8,000',
    deadline: '2024-04-01',
    participants: 567,
    genre: 'Hip Hop',
    description: 'Show your skills in this prestigious hip hop production battle.',
    status: 'started',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop'
  },
  {
    _id: '3',
    title: 'Rock Revolution',
    prize: '$12,000',
    deadline: '2024-04-30',
    participants: 245,
    genre: 'Rock',
    description: 'Revolutionize rock music with your unique sound and vision.',
    status: 'Upcoming',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop'
  }
];

export function SavedPage() {
  const [savedCompetitions, setSavedCompetitions] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {portnum8002}=useUser()
  const [selectedCompetition, setSelectedCompetition] = useState<SavedCompetition | null>(null);
  const FetchingSaved = async()=>{
    
    //http://localhost:8002/
    const response = await fetch(`${portnum8002}fetchingsaved`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
   const result = await response.json()
   if(response.status==200){
    setSavedCompetitions(result)
   }
  }

  useEffect(()=>{
    FetchingSaved()

  },[])
  const handleRemove = (competition: SavedCompetition) => {
    setSelectedCompetition(competition);
    setShowConfirmModal(true);
  };

  const confirmRemove = async() => {
    
     const response = await fetch(`${portnum8002}removingsaved/${selectedCompetition?._id}/${selectedCompetition.genre}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
   const result = await response.json()
   if(response.status==200){
   
     if (selectedCompetition) {
      setSavedCompetitions(prev => prev.filter(comp => comp._id !== selectedCompetition._id));
    }
   }else{
    console.log('Error '+result)
   }
    
    setShowConfirmModal(false);
  };

  const handleEnterCompetition = (competition: SavedCompetition) => {
    // In a real app, this would navigate to the competition entry page
    alert(`Navigating to enter ${competition.title}`);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text">
              Saved Competitions
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track competitions you're interested in joining
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Bookmark className="w-6 h-6 text-orange-500" />
            <span className="text-lg font-semibold">{savedCompetitions?.length} Saved</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedCompetitions==null?
          <ClipLoader
          size={250}
          color={'orange'}
          ></ClipLoader>
          :
          savedCompetitions?.map((competition) => (
            <div 
              key={competition._id}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48">
                <img 
                  src={competition.image} 
                  alt={competition.title} 
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleRemove(competition)}
                  className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-red-500" />
                </button>
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    competition.status == 'started'
                      ? 'bg-green-500 text-white'
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {competition?.status}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{competition.title}</h3>
                  <div className="text-green-500 font-bold">{competition.prize}</div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {competition.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(competition.deadline).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{competition.participants} joined</span>
                  </div>
                </div>

                <button
                  onClick={() => handleEnterCompetition(competition)}
                  className="w-full py-2 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-md flex items-center justify-center gap-2"
                >
                  <Trophy className="w-5 h-5" />
                  Enter Competition
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold mb-4">Remove from Saved?</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to remove "{selectedCompetition?.title}" from your saved competitions?
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRemove}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition shadow-md"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}

        {savedCompetitions?.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No Saved Competitions</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse competitions and save the ones you're interested in joining
            </p>
          </div>
        )}
      </div>
    </div>
  );
}