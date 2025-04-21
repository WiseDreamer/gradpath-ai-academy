
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

  // Only show back if NOT on dashboard
  const showBack = location.pathname !== "/dashboard";

  const isActive = (path: string) => location.pathname === path || currentPage === path;

  // Icon props with larger size but normal circle
  const iconProps = { 
    size: 28,  // Icon size
    strokeWidth: 2.5  // Make lines bolder but not too thick
  };

  return (
    <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50 w-full">
      <div className="w-full px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            {showBack && (
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-1 hover:bg-white/20">
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
              </>
            ) : variant === 'ai-tutor' ? (
              <>
                {/* No icons for AI tutor variant */}
              </>
            ) : (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="icon" className={cn(
                    "rounded-full text-white hover:bg-white/20",
                    isActive('/dashboard') && "bg-white/20"
                  )}>
                    <Home {...iconProps} />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <Bell {...iconProps} />
                </Button>
              </>
            )}

            {variant !== 'ai-tutor' && (
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 md:hidden">
                <Search {...iconProps} />
              </Button>
            )}
            
            {variant !== 'ai-tutor' && (
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={openMobileMenu}>
                <Menu {...iconProps} />
              </Button>
            )}

            {/* Always show profile icon */}
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
        {/* Mobile nav */}
        <div className="md:hidden h-16 flex items-center justify-between border-t border-white/20">
          {/* Hide all icons in AI Tutor header */}
          {variant !== "ai-tutor" && (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="icon" className={cn(
                  "rounded-full text-white hover:bg-white/20",
                  isActive('/dashboard') && "bg-white/20"
                )}>
                  <Home {...iconProps} />
                </Button>
              </Link>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
