import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, User, LogOut, MessageSquare } from 'lucide-react';
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

const NavBar: React.FC = () => {
  return (
    <div className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link to="/dashboard" className="flex items-center">
          <Logo />
        </Link>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Oxford University</span>
              <span className="px-2 py-1 text-xs font-medium text-white bg-gradpath-purple rounded-full">3rd Year</span>
            </div>
          </div>
          
          <Link to="/global-chat">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
            </Button>
          </Link>

          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
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
    </div>
  );
};

export default NavBar;
