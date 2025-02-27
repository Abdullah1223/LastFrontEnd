import React from 'react';
import { Gift, Ticket, Music } from 'lucide-react';

const ads = [
  {
    id: 1,
    title: "Premium Fan Membership",
    description: "Get exclusive access to VIP events and early voting",
    icon: Gift,
    cta: "Join Now",
    bgColor: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    title: "Live Events Pass",
    description: "Attend all major competitions live for one low price",
    icon: Ticket,
    cta: "Get Pass",
    bgColor: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Artist Meet & Greets",
    description: "Connect with your favorite artists in person",
    icon: Music,
    cta: "Learn More",
    bgColor: "from-green-500 to-teal-500"
  }
];

export function FeaturedAds() {
  const handleAdClick = (adId: number) => {
    alert(`Clicked on ad ${adId}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {ads.map((ad) => (
        <button
          key={ad.id}
          onClick={() => handleAdClick(ad.id)}
          className={`bg-gradient-to-r ${ad.bgColor} p-6 rounded-xl text-white hover:shadow-lg transition-shadow`}
        >
          <ad.icon className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-bold mb-2">{ad.title}</h3>
          <p className="text-sm opacity-90 mb-4">{ad.description}</p>
          <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
            {ad.cta}
          </span>
        </button>
      ))}
    </div>
  );
}