
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, Home, Bell, User, MessageSquare } from 'lucide-react';
import Logo from '@/components/Logo';
import { Link, useNavigate } from "react-router-dom";

interface MobileNavBarProps {
  onMenuClick?: () => void;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  
  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="border-b bg-gradpath-navy text-white sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Logo clickable={false} className="ml-0" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <Search size={24} strokeWidth={1.5} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/10"
            onClick={onMenuClick}
          >
            <Menu size={24} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      <div className="h-14 flex items-center justify-between border-t border-white/10 px-6">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10"
          onClick={handleHomeClick}
        >
          <Home size={24} strokeWidth={1.5} />
        </Button>
        <Link to="/global-chat">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
            <MessageSquare size={24} strokeWidth={1.5} />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <Bell size={24} strokeWidth={1.5} />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
          <User size={24} strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
};

export default MobileNavBar;
