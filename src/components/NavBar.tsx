import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, Menu, Home, Mail, Search, HelpCircle, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Logo from './Logo';

interface NavBarProps {
  openMobileMenu?: () => void;
  currentPage?: string;
  variant?: 'learning' | 'social' | 'ai-tutor';
}

const NavBar: React.FC<NavBarProps> = ({ openMobileMenu, currentPage, variant = 'learning' }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const showBack = location.pathname !== "/dashboard";

  const isActive = (path: string) => location.pathname === path || currentPage === path;

  const iconProps = { 
    size: 36,  // Increased icon size
    strokeWidth: 2.5
  };

  if (variant === 'ai-tutor') {
    return (
      <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
        <div className="w-full">
          {/* Top Section */}
          <div className="flex items-center justify-between h-20 px-0">
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => navigate(-1)} 
                className="hover:bg-white/20 ml-0 px-2"
              >
                <ChevronLeft {...iconProps} />
              </Button>
              <Logo clickable={false} />
              <span className="text-lg font-medium ml-2">AI Tutor</span>
            </div>
            <div className="flex items-center gap-2 mr-2">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Search {...iconProps} />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={openMobileMenu}>
                <Menu {...iconProps} />
              </Button>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="h-16 flex items-center justify-between border-t border-white/20 px-4">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <Bell {...iconProps} />
            </Button>
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <User {...iconProps} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
      <div className="w-full px-2">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-1">
            {showBack && (
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="hover:bg-white/20 ml-0">
                <ChevronLeft {...iconProps} />
              </Button>
            )}
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
                    <Mail {...iconProps} />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Bell {...iconProps} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <HelpCircle {...iconProps} />
                </Button>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className={cn(
                    "rounded-full text-white hover:bg-white/20",
                    isActive('/profile') && "bg-white/20"
                  )}>
                    <User {...iconProps} />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={openMobileMenu}>
                  <Menu {...iconProps} />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Bell {...iconProps} />
                </Button>
                <Link to="/profile">
                  <Button variant="ghost" size="icon" className={cn(
                    "rounded-full text-white hover:bg-white/20",
                    isActive('/profile') && "bg-white/20"
                  )}>
                    <User {...iconProps} />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={openMobileMenu}>
                  <Menu {...iconProps} />
                </Button>
              </>
            )}
          </div>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden h-16 flex items-center justify-between border-t border-white/20">
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
            <Bell {...iconProps} />
          </Button>
          {variant === 'social' ? (
            <>
              <Link to="/messages">
                <Button variant="ghost" size="icon" className={cn(
                  "rounded-full text-white hover:bg-white/20",
                  isActive('/messages') && "bg-white/20"
                )}>
                  <Mail {...iconProps} />
                </Button>
              </Link>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <HelpCircle {...iconProps} />
              </Button>
            </>
          ) : null}
          <Link to="/profile">
            <Button variant="ghost" size="icon" className={cn(
              "rounded-full text-white hover:bg-white/20",
              isActive('/profile') && "bg-white/20"
            )}>
              <User {...iconProps} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
