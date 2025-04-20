
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, Menu, Home, Mail, Search, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from './Logo';

interface NavBarProps {
  openMobileMenu?: () => void;
  currentPage?: string;
  variant?: 'learning' | 'social';
}

const NavBar: React.FC<NavBarProps> = ({ openMobileMenu, currentPage, variant = 'learning' }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || currentPage === path;

  return (
    <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
      <div className="w-full px-4">
        {/* Top section */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Logo clickable={false} />
          </div>

          <div className="flex items-center gap-2">
            {variant === 'social' ? (
              <>
                <Link to="/messages">
                  <Button variant="ghost" size="icon" className={cn(
                    "rounded-full text-white hover:bg-white/20",
                    isActive('/messages') && "bg-white/20"
                  )}>
                    <Mail className="h-8 w-8" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Bell className="h-8 w-8" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <HelpCircle className="h-8 w-8" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className={cn(
                    "rounded-full text-white hover:bg-white/20",
                    isActive('/dashboard') && "bg-white/20"
                  )}>
                    <Home className="h-8 w-8" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Bell className="h-8 w-8" />
                </Button>
              </>
            )}
            
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 md:hidden">
              <Search className="h-8 w-8" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={openMobileMenu}>
              <Menu className="h-8 w-8" />
            </Button>
            
            <Link to="/profile">
              <Button variant="ghost" size="icon" className={cn(
                "rounded-full text-white hover:bg-white/20",
                isActive('/profile') && "bg-white/20"
              )}>
                <User className="h-8 w-8" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Bottom section - Mobile navigation */}
        <div className="md:hidden h-14 flex items-center justify-between border-t border-white/20">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className={cn(
              "rounded-full text-white hover:bg-white/20",
              isActive('/dashboard') && "bg-white/20"
            )}>
              <Home className="h-8 w-8" />
            </Button>
          </Link>
          
          {variant === 'social' ? (
            <>
              <Link to="/messages">
                <Button variant="ghost" size="icon" className={cn(
                  "rounded-full text-white hover:bg-white/20",
                  isActive('/messages') && "bg-white/20"
                )}>
                  <Mail className="h-8 w-8" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <HelpCircle className="h-8 w-8" />
              </Button>
            </>
          ) : null}
          
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
            <Bell className="h-8 w-8" />
          </Button>
          
          <Link to="/profile">
            <Button variant="ghost" size="icon" className={cn(
              "rounded-full text-white hover:bg-white/20",
              isActive('/profile') && "bg-white/20"
            )}>
              <User className="h-8 w-8" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
