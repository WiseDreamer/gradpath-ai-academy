
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, Menu, Home, Bell, User } from 'lucide-react';
import Logo from '@/components/Logo';
import { useNavigate } from "react-router-dom";

interface MobileNavBarProps {
  onMenuClick?: () => void;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const iconProps = { size: 32, strokeWidth: 3 };

  const handleHomeClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
      <div className="flex items-center justify-between h-16 px-0">
        <div className="flex items-center">
          <Logo clickable={false} className="ml-0" />
        </div>
        <div className="flex items-center gap-2 mr-0 pr-0">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <Search {...iconProps} />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-white hover:bg-white/20 mr-0"
            onClick={onMenuClick}
          >
            <Menu {...iconProps} />
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
          <Home {...iconProps} />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
          <Bell {...iconProps} />
        </Button>
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 mr-0">
          <User {...iconProps} />
        </Button>
      </div>
    </div>
  );
};

export default MobileNavBar;
