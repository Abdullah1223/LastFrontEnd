import { Bell, Home, LogOut, Mail, Radio, Share2, Trophy, User, Users, Wallet, X } from "lucide-react";
import { useUser } from "../context/UserContext";

const MenuToggle = ({ isOpen, onClose, onNavigate }) => {
  const {logout}=useUser()
    const menuItems = [
      { icon: Home, text: 'Home', path: 'home' },
      { icon: Trophy, text: 'Competitions', path: 'competitions' },
      { icon: Radio, text: 'Live', path: 'live' },
      { icon: Share2, text: 'Social Feed', path: 'social' },
      { icon: Mail, text: 'Messages', path: 'messages' },
      { icon: Bell, text: 'Notifications', path: 'notifications' },
      { icon: Wallet, text: 'Transactions', path: 'transactions' },
      { icon: Users, text: 'Following', path: 'following' },
      { icon: User, text: 'Profile', path: 'profile' },
      {icon:LogOut,text:'Logout', path:logout}
    ];
  
    return (
      <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Menu Container */}
        <div className="relative h-full w-full">
          <div className="absolute top-0 left-0 w-[85%] h-full bg-gray-900 transform transition-transform duration-300 ease-in-out">
            <div className="p-4 flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <button
                  onClick={onClose}
                  className="text-white p-2 hover:bg-gray-800 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-white">Menu</h1>
              </div>
  
              {/* Menu Items */}
              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <button
                        onClick={() => {
                          onNavigate(item.path);
                          onClose();
                        }}
                        className="w-full hover:bg-orange-400 flex items-center space-x-4 p-3 rounded-lg transition-colors text-white"
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="text-lg">{item.text}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
  
              {/* Footer */}
              <div className="pt-4 border-t border-gray-800">
                <button className="text-white text-sm hover:text-orange-500">
                  Privacy Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default MenuToggle