
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut, MessageSquare, Search, Menu, Home, Mail, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Logo from './Logo';
import { Input } from '@/components/ui/input';

interface NavBarProps {
  openMobileMenu?: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ openMobileMenu }) => {
  return (
    <div className="border-b bg-gradpath-purple text-white sticky top-0 z-50">
      <div className="container mx-auto flex flex-col">
        {/* Top section */}
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center">
              <Logo className="h-10 w-10" />
              <span className="text-xl font-semibold ml-2 hidden sm:inline-block">GradPath</span>
            </Link>
            
            <div className="hidden md:flex w-64 lg:w-80">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search GradPath..."
                  className="w-full pl-10 pr-4 py-2 bg-white text-black rounded-full border-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {/* Center icons on desktop */}
            <div className="hidden md:flex items-center">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Home className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Info className="h-6 w-6" />
              </Button>
            </div>
            
            {/* Right icons */}
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20 md:hidden">
              <Search className="h-6 w-6" />
            </Button>
            
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20" onClick={openMobileMenu}>
              <Menu className="h-6 w-6" />
            </Button>
            
            <Link to="/messages">
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                <Mail className="h-6 w-6" />
              </Button>
            </Link>

            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <Bell className="h-6 w-6" />
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="flex w-full">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/settings" className="flex w-full">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500">
                  <Link to="/" className="flex items-center w-full">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {/* Bottom section - Mobile navigation */}
        <div className="md:hidden h-12 flex items-center justify-between px-4 border-t border-white/20">
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
            <Home className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
            <User className="h-6 w-6" />
          </Button>
          <Link to="/messages">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
              <Mail className="h-6 w-6" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
            <Info className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/20">
            <Bell className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
