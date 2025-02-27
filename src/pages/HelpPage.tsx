import React, { useState } from 'react';
import { Search, HelpCircle, Book, MessageCircle, ExternalLink, ChevronRight } from 'lucide-react';

interface HelpCategory {
  id: string;
  title: string;
  description: string;
  articles: HelpArticle[];
}

interface HelpArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  views: number;
}

const mockCategories: HelpCategory[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of using THE RANKK platform',
    articles: [
      {
        id: '1',
        title: 'How to Create an Account',
        excerpt: 'Step-by-step guide to creating your account and setting up your profile.',
        category: 'getting-started',
        views: 1234
      },
      {
        id: '2',
        title: 'Entering Your First Competition',
        excerpt: 'Learn how to find and enter music competitions on the platform.',
        category: 'getting-started',
        views: 987
      }
    ]
  },
  {
    id: 'competitions',
    title: 'Competitions',
    description: 'Everything you need to know about participating in competitions',
    articles: [
      {
        id: '3',
        title: 'Competition Rules and Guidelines',
        excerpt: 'Understand the rules and requirements for participating in competitions.',
        category: 'competitions',
        views: 2345
      },
      {
        id: '4',
        title: 'Submission Requirements',
        excerpt: 'Technical requirements and guidelines for competition submissions.',
        category: 'competitions',
        views: 1876
      }
    ]
  }
];

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = selectedCategory
    ? mockCategories.find(c => c.id === selectedCategory)?.articles || []
    : mockCategories.flatMap(c => c.articles);

  const searchResults = filteredArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-4">
            How can we help you?
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-200 dark:border-gray-700 text-left">
            <Book className="w-8 h-8 text-orange-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Documentation</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse our comprehensive guides and tutorials
            </p>
          </button>

          <button className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-200 dark:border-gray-700 text-left">
            <MessageCircle className="w-8 h-8 text-green-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">Contact Support</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get help from our support team
            </p>
          </button>

          <button className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-200 dark:border-gray-700 text-left">
            <HelpCircle className="w-8 h-8 text-blue-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">FAQs</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Find answers to common questions
            </p>
          </button>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition border border-gray-200 dark:border-gray-700 text-left"
            >
              <h3 className="font-bold text-lg mb-2">{category.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {category.description}
              </p>
              <div className="flex items-center text-orange-500">
                <span>View articles</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-6">
            {searchQuery ? 'Search Results' : 'Popular Articles'}
          </h2>
          <div className="space-y-4">
            {searchResults.map((article) => (
              <div
                key={article.id}
                className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium mb-1">{article.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {article.excerpt}
                    </p>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
                <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span>{article.views} views</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl p-8 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Still need help?</h2>
            <p className="mb-6">
              Our support team is available 24/7 to assist you with any questions or issues.
            </p>
            <button className="px-6 py-2 bg-white text-orange-500 rounded-full font-bold hover:bg-orange-50 transition">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}