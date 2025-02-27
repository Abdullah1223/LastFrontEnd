import React from 'react';
import { LucideIcon } from 'lucide-react';

interface LinkProps {
  Icon: LucideIcon;
  text: string;
  path: string;
  isActive?: boolean;
  onClick: () => void;
}

export function Link({ Icon, text, isActive, onClick }: LinkProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center space-x-4 p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors w-full text-left
        ${isActive ? 'bg-gray-200 dark:bg-gray-800' : ''}`}
    >
      <Icon className={`h-6 w-6 ${isActive ? 'text-orange-500' : ''}`} />
      <span className={`text-xl ${isActive ? 'text-orange-500 font-semibold' : 'text-gray-900 dark:text-white'}`}>
        {text}
      </span>
    </button>
  );
}