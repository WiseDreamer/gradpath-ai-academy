
import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Home, Settings, User, LogOut } from "lucide-react";
import { Link } from 'react-router-dom';

interface ChatDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChatDrawer: React.FC<ChatDrawerProps> = ({ isOpen, setIsOpen }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', to: '/dashboard' },
    { icon: User, label: 'Profile', to: '/profile' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent className="h-[85vh]">
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 py-2">
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
          <Button
            variant="ghost"
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-2 h-5 w-5" />
            Log out
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ChatDrawer;
