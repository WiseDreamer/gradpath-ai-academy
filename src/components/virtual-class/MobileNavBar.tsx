
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
      <div className="flex items-center justify-between h-16 px-0">
        <div className="flex items-center">
          <Logo clickable={false} className="ml-0" />
        </div>
        <div className="flex items-center gap-2 mr-0 pr-0">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Search size={36} strokeWidth={1.5} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 mr-0"
            onClick={onMenuClick}
          >
            <Menu size={36} strokeWidth={1.5} />
          </Button>
        </div>
      </div>
      <div className="h-14 flex items-center justify-between border-t border-white/20 px-0">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20 ml-0"
          onClick={handleHomeClick}
        >
          <Home size={36} strokeWidth={1.5} />
        </Button>
        <Link to="/global-chat">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <MessageSquare size={36} strokeWidth={1.5} />
          </Button>
        </Link>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <Bell size={36} strokeWidth={1.5} />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 mr-0">
          <User size={36} strokeWidth={1.5} />
        </Button>
      </div>
    </div>
  );
};

export default MobileNavBar;
