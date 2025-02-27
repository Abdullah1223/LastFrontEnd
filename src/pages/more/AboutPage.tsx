import React from 'react';
import { Info, Users, Award, Shield, Trophy } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-4">
            About THE RANKK
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            The ultimate platform for music competition and artist discovery
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8 text-orange-500" />
              <h2 className="text-xl font-bold">Competitions</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Host and participate in music competitions across various genres. Win prizes, gain exposure, and get feedback from industry professionals.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-yellow-500" />
              <h2 className="text-xl font-bold">Community</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with fellow artists, fans, and industry professionals. Build your network and grow your audience.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-green-500" />
              <h2 className="text-xl font-bold">Recognition</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Get recognized for your talent. Winners receive prizes, industry exposure, and opportunities for career advancement.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
              <h2 className="text-xl font-bold">Fair Play</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Our platform ensures fair competition with transparent judging criteria and professional evaluation.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">
            To provide artists with a platform to showcase their talent, compete fairly, and connect with industry professionals while building a supportive community of music creators and fans.
          </p>
        </div>
      </div>
    </div>
  );
}