
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Book, Search, Award, Ambulance } from 'lucide-react';
import { cn } from '@/lib/utils';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [{
    icon: Book,
    label: 'Library',
    route: '/library'
  }, {
    icon: () => <span className="text-xl">💬</span>,
    label: 'Global Chat',
    route: '/global-chat'
  }, {
    icon: Ambulance,
    label: 'Request Help',
    route: '/help-request'
  }, {
    icon: Search,
    label: 'Search',
    route: '/search'
  }, {
    icon: Award,
    label: 'Achievements',
    route: '/achievements'
  }];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 border-t border-gray-200 flex justify-around items-center px-2 z-40 bg-white shadow-lg">
      {navItems.map(item => (
        <button 
          key={item.label} 
          onClick={() => navigate(item.route)} 
          className={cn(
            "flex flex-col items-center justify-center w-full h-full", 
            isActive(item.route) ? "text-gradpath-teal" : "text-gray-500"
          )}
        >
          <item.icon size={20} strokeWidth={2} />
          <span className="text-xs mt-1">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
