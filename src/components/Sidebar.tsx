import  { useState } from 'react';
import { Home, Bell, Mail, BookMarked, ListTodo, Users, BadgeCheck, User, MoreHorizontal, Trophy, Wallet, Info, Phone, HelpCircle, Shield, LifeBuoy, Settings, Radio, Share2, LogOut } from 'lucide-react';
import { Link } from './Link';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
import { RoleSwitcher } from './RoleSwitcher';
import { useUser } from '../context/UserContext';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onMoreNavigate: (page: string) => void;
  currentMorePage: string;
}

export function Sidebar({ onNavigate, currentPage, onMoreNavigate, currentMorePage }: SidebarProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const { user, logout } = useUser();

  const moreMenuItems = [
    { icon: Info, text: 'About', path: 'about' },
    { icon: Phone, text: 'Contact', path: 'contact' },
    { icon: HelpCircle, text: 'FAQ', path: 'faq' },
    { icon: Shield, text: 'Legal', path: 'legal' },
    { icon: LifeBuoy, text: 'Support', path: 'support' },
    // Only show admin dashboard for admin users
    ...(user?.role === 'admin' ? [{ icon: Settings, text: 'Admin Dashboard', path: 'admin-dashboard' }] : [])
  ];

  const getMenuItems = () => {
    const baseItems = [
      { icon: Home, text: 'Home', path: 'home' },
      { icon: Trophy, text: 'Competitions', path: 'competitions' },
      { icon: Radio, text: 'Live', path: 'live' },
      { icon: Share2, text: 'Social Feed', path: 'social' },
      { icon: Bell, text: 'Notifications', path: 'notifications' },
      { icon: Wallet, text: 'RNK$', path: 'wallet' },
      { icon: Mail, text: 'Messages', path: 'messages' },
    ];

    const roleSpecificItems = {
      artist: [
        { icon: ListTodo, text: 'My Entries', path: 'entries' },
        { icon: BookMarked, text: 'Saved', path: 'saved' },
        { icon: Users, text: 'Following', path: 'following' },
        { icon: BadgeCheck, text: 'Verified', path: 'verified' },
      ],
      fan: [
        { icon: BookMarked, text: 'Saved', path: 'saved' },
        { icon: Users, text: 'Following', path: 'following' },
      ],
      judge: [
        { icon: ListTodo, text: 'Judging Panel', path: 'judging' },
        { icon: BookMarked, text: 'Saved', path: 'saved' },
        { icon: Users, text: 'Following', path: 'following' },
      ],
      admin: [
        { icon: Settings, text: 'Admin', path: 'admin-dashboard' },
        { icon: BookMarked, text: 'Saved', path: 'saved' },
        { icon: Users, text: 'Following', path: 'following' },
      ]
    };

    const items = [...baseItems, ...(roleSpecificItems[user?.role || 'artist'])];
    items.push({ icon: User, text: 'Profile', path: 'profile' });
    return items;
  };

  const menuItems = getMenuItems();

  return (
    <div className="fixed h-screen  flex flex-col bg-gradient-to-b from-white to-orange-50 dark:from-gray-900 dark:to-gray-900 transition-colors border-r border-gray-200 dark:border-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-4">
          {menuItems.map((item) => (
            <Link 
              key={item.text} 
              Icon={item.icon} 
              text={item.text} 
              path={item.path}
              isActive={currentPage === item.path}
              onClick={() => onNavigate(item.path)}
            />
          ))}
          <div className="relative">
            <Link 
              Icon={MoreHorizontal} 
              text="More" 
              path="more"
              isActive={currentPage === 'more'}
              onClick={() => setShowMoreMenu(!showMoreMenu)}
            />
            {showMoreMenu && (
              <div className="absolute left-0 right-0 mt-2 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                {moreMenuItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => {
                      onMoreNavigate(item.path);
                      setShowMoreMenu(false);
                    }}
                    className={`flex items-center w-full px-4 py-2 space-x-3 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      currentPage === 'more' && currentMorePage === item.path
                        ? 'text-orange-500'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.text}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      <RoleSwitcher />

      <div className="p-4 space-y-4 border-t border-gray-200 dark:border-gray-800">
        <button 
          onClick={() => onNavigate('competitions')}
          className="w-full rounded-full bg-gradient-to-r from-green-500 to-yellow-500 py-3 text-white font-bold hover:from-green-600 hover:to-yellow-600 transition shadow-lg"
        >
          {user?.role === 'artist' ? 'Start Competing' : user?.role === 'fan' ? 'Browse Competitions' : 'Review Competitions'}
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-2 py-3 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}