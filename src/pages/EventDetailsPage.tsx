import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Ticket, Share2, BookmarkPlus, MessageCircle } from 'lucide-react';

export function EventDetailsPage() {
  const [showTicketModal, setShowTicketModal] = useState(false);

  const event = {
    title: "Summer Music Festival 2024",
    date: "July 15-17, 2024",
    time: "12:00 PM - 11:00 PM",
    location: "Los Angeles Convention Center",
    address: "1201 S Figueroa St, Los Angeles, CA 90015",
    description: "Join us for the biggest music competition event of the summer! Featuring live performances, competitions, workshops, and networking opportunities.",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&h=600&fit=crop",
    attendees: 1243,
    capacity: 2000,
    price: {
      early: 149,
      regular: 199,
      vip: 299
    },
    features: [
      "Live Competition Finals",
      "Industry Networking",
      "Artist Workshops",
      "VIP Meet & Greets",
      "Equipment Showcase",
      "After Party Access"
    ],
    schedule: [
      {
        day: "Day 1",
        events: [
          { time: "12:00 PM", title: "Doors Open" },
          { time: "1:00 PM", title: "Opening Ceremony" },
          { time: "2:00 PM", title: "Beat Battle Preliminaries" }
        ]
      },
      {
        day: "Day 2",
        events: [
          { time: "12:00 PM", title: "Producer Workshops" },
          { time: "3:00 PM", title: "Industry Panel" },
          { time: "7:00 PM", title: "Live Performances" }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-white">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">About the Event</h2>
              <p className="text-gray-600 dark:text-gray-400">{event.description}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                {event.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Schedule</h2>
              <div className="space-y-6">
                {event.schedule.map((day) => (
                  <div key={day.day}>
                    <h3 className="font-bold text-lg mb-3">{day.day}</h3>
                    <div className="space-y-3">
                      {day.events.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                          <div className="w-24 font-medium">{item.time}</div>
                          <div>{item.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">{event.attendees} attending</span>
                </div>
                <span className="text-sm text-gray-500">
                  {event.capacity - event.attendees} spots left
                </span>
              </div>

              <button
                onClick={() => setShowTicketModal(true)}
                className="w-full py-3 bg-gradient-to-r from-green-500 to-yellow-500 text-white rounded-full font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-lg mb-4"
              >
                Get Tickets
              </button>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <BookmarkPlus className="w-5 h-5" />
                  Save
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Location</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{event.address}</p>
              <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                Map placeholder
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Modal */}
      {showTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6">Select Tickets</h2>
            <div className="space-y-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">Early Bird</h3>
                    <p className="text-sm text-gray-500">Limited availability</p>
                  </div>
                  <span className="font-bold">${event.price.early}</span>
                </div>
                <button className="w-full py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">
                  Select
                </button>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">Regular</h3>
                    <p className="text-sm text-gray-500">General admission</p>
                  </div>
                  <span className="font-bold">${event.price.regular}</span>
                </div>
                <button className="w-full py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">
                  Select
                </button>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold">VIP</h3>
                    <p className="text-sm text-gray-500">All access pass</p>
                  </div>
                  <span className="font-bold">${event.price.vip}</span>
                </div>
                <button className="w-full py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition">
                  Select
                </button>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowTicketModal(false)}
                className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}