
import React from 'react';
import { Search, Image, Video, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatPost from './ChatPost';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import PostsSection from '../PostsSection';

export default function ChatFeed() {
  const { user } = useAuth();
  const { toast } = useToast();

  return (
    <main className="w-full flex flex-col space-y-6 px-4 md:px-6 py-6">
      <PostsSection />
    </main>
  );
}
