
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, Menu, Home, Info, Mail, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from './Logo';

interface NavBarProps {
  openMobileMenu?: () => void;
  currentPage?: string;
}

const NavBar: React.FC<NavBarProps> = ({ openMobileMenu, currentPage }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || currentPage === path;

  return (
    <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
      <div className="container mx-auto flex flex-col px-0">
        {/* Top section */}
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center">
              <Logo className="h-10 w-10" />
              <span className="text-xl font-semibold ml-2 hidden sm:inline-block">GradPath</span>
            </Link>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 md:hidden">
              <Search className="h-7 w-7" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={openMobileMenu}>
              <Menu className="h-7 w-7" />
            </Button>
          </div>
        </div>
        
        {/* Bottom section - Mobile navigation */}
        <div className="md:hidden h-14 flex items-center justify-between px-4 border-t border-white/20">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className={cn(
              "rounded-full text-white hover:bg-white/20",
              isActive('/dashboard') && "bg-white/20"
            )}>
              <Home className="h-7 w-7" />
            </Button>
          </Link>
          <Link to="/friends">
            <Button variant="ghost" size="icon" className={cn(
              "rounded-full text-white hover:bg-white/20",
              isActive('/friends') && "bg-white/20"
            )}>
              <Users className="h-7 w-7" />
            </Button>
          </Link>
          <Link to="/messages">
            <Button variant="ghost" size="icon" className={cn(
              "rounded-full text-white hover:bg-white/20",
              isActive('messages') && "bg-white/20"
            )}>
              <Mail className="h-7 w-7" />
            </Button>
          </Link>
          <Link to="/global-chat">
            <Button variant="ghost" size="icon" className={cn(
              "rounded-full text-white hover:bg-white/20",
              isActive('/global-chat') && "bg-white/20"
            )}>
              <Info className="h-7 w-7" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
            <Bell className="h-7 w-7" />
          </Button>
          <Link to="/profile">
            <Button variant="ghost" size="icon" className={cn(
              "rounded-full text-white hover:bg-white/20",
              isActive('/profile') && "bg-white/20"
            )}>
              <User className="h-7 w-7" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
