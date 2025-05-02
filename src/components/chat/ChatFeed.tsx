
import React from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/hooks/use-toast';
import PostsSection from '../PostsSection';

export default function ChatFeed() {
  const { user } = useAuth();
  const { toast } = useToast();

  return (
    <main className="w-full flex flex-col space-y-6 py-6">
      <PostsSection />
    </main>
  );
}
