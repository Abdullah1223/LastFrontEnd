import React from 'react';
import { useUser } from '../context/UserContext';
import { User, Users, Gavel } from 'lucide-react';

export function RoleSwitcher() {
  const { user, switchRole } = useUser();

  if (!user) return null;

  return (
    <div className="p-4 border-t border-gray-200 dark:border-gray-800">
      <p className="text-sm text-gray-500 mb-2">Switch Role</p>
      <div className="flex gap-2">
        <button
          onClick={() => switchRole('artist')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 ${
            user.role === 'artist'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          <User className="w-4 h-4" />
          Artist
        </button>
        <button
          onClick={() => switchRole('fan')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 ${
            user.role === 'fan'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          <Users className="w-4 h-4" />
          Fan
        </button>
        <button
          onClick={() => switchRole('judge')}
          className={`flex-1 py-2 px-3 rounded-lg flex items-center justify-center gap-2 ${
            user.role === 'judge'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
        >
          <Gavel className="w-4 h-4" />
          Judge
        </button>
      </div>
    </div>
  );
}