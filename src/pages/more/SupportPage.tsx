import React, { useState } from 'react';
import { Search, Book, MessageSquare, LifeBuoy, Trophy, User, Settings } from 'lucide-react';

const categories = [
  { id: 'getting-started', name: 'Getting Started', icon: Book },
  { id: 'competitions', name: 'Competitions', icon: Trophy },
  { id: 'account', name: 'Account & Billing', icon: User },
  { id: 'technical', name: 'Technical Issues', icon: Settings }
];

const articles = {
  'getting-started': [
    { id: 1, title: 'How to Create an Account', views: '2.3k' },
    { id: 2, title: 'Setting Up Your Artist Profile', views: '1.8k' },
    { id: 3, title: 'Understanding Competition Types', views: '3.1k' }
  ],
  'competitions': [
    { id: 4, title: 'Competition Rules and Guidelines', views: '4.2k' },
    { id: 5, title: 'Submission Requirements', views: '3.7k' },
    { id: 6, title: 'Prize Distribution Process', views: '2.9k' }
  ],
  'account': [
    { id: 7, title: 'Managing Your Wallet', views: '1.5k' },
    { id: 8, title: 'Subscription Plans', views: '2.1k' },
    { id: 9, title: 'Payment Methods', views: '1.9k' }
  ],
  'technical': [
    { id: 10, title: 'Upload Troubleshooting', views: '2.7k' },
    { id: 11, title: 'Platform Requirements', views: '1.6k' },
    { id: 12, title: 'Common Error Solutions', views: '3.3k' }
  ]
};

export function SupportPage() {
  const [selectedCategory, setSelectedCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-4">
            Support Center
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find help and resources for THE RANKK
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search for help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <category.icon className="w-5 h-5" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-6">
                {categories.find(c => c.id === selectedCategory)?.name} Articles
              </h2>
              <div className="space-y-4">
                {articles[selectedCategory as keyof typeof articles].map((article) => (
                  <div
                    key={article.id}
                    className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">{article.title}</h3>
                      <span className="text-sm text-gray-500">{article.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-6 h-6" />
                <h2 className="text-xl font-bold">Need More Help?</h2>
              </div>
              <p className="mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <button className="px-6 py-2 bg-white text-orange-500 rounded-full font-bold hover:bg-orange-50 transition">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}