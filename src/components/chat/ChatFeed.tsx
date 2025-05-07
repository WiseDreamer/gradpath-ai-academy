
import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import PostsSection from '@/components/PostsSection';
import { useIsMobile } from '@/hooks/use-mobile';

export default function ChatFeed() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  return (
    <main className={`w-full flex flex-col space-y-2 ${isMobile ? 'pb-16' : 'pb-4'}`}>
      <PostsSection />
    </main>
  );
}
