import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = {
  artists: [
    {
      question: "How do I participate in competitions?",
      answer: "Sign up for an account, browse active competitions, and submit your track following the competition guidelines. Make sure to read all rules and requirements before submitting."
    },
    {
      question: "How are winners selected?",
      answer: "Entries are judged by industry professionals based on criteria including originality, production quality, and adherence to competition rules. Some competitions may also include community voting."
    },
    {
      question: "When do I receive my prize?",
      answer: "Prizes are typically distributed within 14 days of competition completion, after verification of winner eligibility and completion of required documentation."
    }
  ],
  fans: [
    {
      question: "How can I support my favorite artists?",
      answer: "You can follow artists, vote in community competitions, leave comments, and send direct messages of support. Premium supporters can also send virtual gifts."
    },
    {
      question: "Can I judge competitions?",
      answer: "Community voting is available for selected competitions. To become an official judge, you need to apply and meet our qualification criteria."
    }
  ],
  judges: [
    {
      question: "What are the judging criteria?",
      answer: "Each competition has specific criteria, but common factors include originality, production quality, arrangement, and adherence to competition theme. Detailed rubrics are provided for each competition."
    },
    {
      question: "How long do I have to complete judging?",
      answer: "Judges typically have 48-72 hours after competition closure to submit their scores and feedback. Extensions may be granted in special circumstances."
    }
  ]
};

export function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('artists');
  const [openQuestions, setOpenQuestions] = useState<number[]>([]);

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Find answers to common questions about THE RANKK
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          {['artists', 'fans', 'judges'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-bold transition ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {faqs[activeCategory as keyof typeof faqs].map((faq, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <span className="font-semibold text-left">{faq.question}</span>
                {openQuestions.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-orange-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-orange-500" />
                )}
              </button>
              {openQuestions.includes(index) && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}