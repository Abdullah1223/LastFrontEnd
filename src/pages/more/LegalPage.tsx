import React, { useState } from 'react';
import { Shield, Lock } from 'lucide-react';

export function LegalPage() {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 text-transparent bg-clip-text mb-4">
            Legal Information
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Terms of Service and Privacy Policy
          </p>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition ${
              activeTab === 'terms'
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Shield className="w-5 h-5" />
            Terms of Service
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition ${
              activeTab === 'privacy'
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Lock className="w-5 h-5" />
            Privacy Policy
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          {activeTab === 'terms' ? (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Terms of Use</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  By accessing and using THE RANKK platform, you agree to comply with and be bound by these terms and conditions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Competition Rules</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>All submitted content must be original or properly licensed</li>
                  <li>Participants must be at least 18 years old</li>
                  <li>Multiple accounts are not permitted</li>
                  <li>Judges' decisions are final</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Intellectual Property</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Users retain rights to their original content while granting THE RANKK limited license to display and promote submissions.
                </p>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-bold mb-4">1. Data Collection</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We collect information necessary to provide our services, including account details, submission data, and usage analytics.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">2. Data Usage</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                  <li>Improve platform features and user experience</li>
                  <li>Process competition entries and voting</li>
                  <li>Communicate important updates</li>
                  <li>Provide customer support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">3. Data Protection</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  We implement industry-standard security measures to protect your personal information and maintain data privacy.
                </p>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}