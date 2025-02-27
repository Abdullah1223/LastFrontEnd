import React from 'react';
import { Calendar, Users, Trophy } from 'lucide-react';

const recommendations = [
  {
    id: 1,
    type: 'event',
    title: "Summer Music Festival",
    date: "July 15-17, 2024",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=600&fit=crop",
    attendees: 1243
  },
  {
    id: 2,
    type: 'competition',
    title: "Beat Battle Championship",
    prize: "$5,000",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
    participants: 842
  }
];

export function RecommendedContent() {
  const handleClick = (id: number, type: string) => {
    alert(`Clicked on ${type} ${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {recommendations.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item.id, item.type)}
          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        >
          <div className="h-48 relative">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-lg">{item.title}</h3>
              {item.type === 'event' ? (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-sm">
                  <Trophy className="w-4 h-4" />
                  <span>{item.prize} Prize Pool</span>
                </div>
              )}
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="capitalize text-orange-500 font-medium">
                {item.type}
              </span>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-gray-500">
                  {item.type === 'event' ? item.attendees : item.participants}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}