
import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Home, Settings, User, LogOut, Bookmark, Users, ChevronDown, Compass } from "lucide-react";
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface ChatDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', to: '/dashboard' },
    { icon: Users, label: 'Friends', to: '/friends' },
    { icon: Bookmark, label: 'Saved', to: '/saved' },
    { icon: Compass, label: 'Groups', to: '/groups' },
    { icon: User, label: 'Profile', to: '/profile' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  const shortcuts = [
    { label: 'Calculus Study Group', to: '/groups/calculus' },
    { label: 'Physics Lab Reports', to: '/groups/physics' },
    { label: 'Computer Science Projects', to: '/groups/cs' },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[300px] sm:max-w-[300px] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerClose className="absolute right-4 top-4" />
        </DrawerHeader>
        
        <div className="py-2 flex flex-col h-full overflow-y-auto">
          <div className="flex items-center gap-3 mb-4 p-2">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-gradpath-purple text-white">A</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Alex Johnson</p>
              <p className="text-sm text-gray-500">Oxford University</p>
            </div>
          </div>
          
          {menuItems.map((item) => (
            <Link key={item.label} to={item.to}>
              <Button
                variant="ghost"
                className="w-full justify-start mb-2"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          ))}
          
          <Button variant="ghost" className="w-full justify-between mb-2">
            <div className="flex items-center">
              <ChevronDown className="mr-2 h-5 w-5" />
              <span>See more</span>
            </div>
          </Button>
          
          <div className="border-t border-gray-200 my-4 pt-4">
            <h3 className="font-medium text-sm mb-2 px-2">Your Shortcuts</h3>
            {shortcuts.map((item) => (
              <Link key={item.label} to={item.to}>
                <Button
                  variant="ghost"
                  className="w-full justify-start mb-2 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>
          
          <div className="mt-auto text-xs text-gray-500 p-2">
            Privacy · Terms · Cookies · More · © 2025
          </div>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 mt-2"
            onClick={() => setIsOpen(false)}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatDrawer;
