
import React, { useState } from 'react';
import { Search, Image, Video, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatPost from './ChatPost';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

const ChatFeed: React.FC = () => {
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([
    {
      author: "Alex Johnson",
      content: "Has anyone worked through the latest Calculus practice problems? I'm stuck on the third one related to implicit differentiation.",
      timestamp: "2 hours ago",
      reactions: {
        "👍": 5,
        "🤔": 2,
        "❤️": 1
      },
      comments: [
        {
          author: "Sarah Lee",
          content: "I can help! The key is to use the chain rule here. You need to differentiate both sides with respect to x, being careful with the y terms.",
          timestamp: "1 hour ago"
        },
        {
          author: "Michael Chen",
          content: "I struggled with that one too. Make sure you're applying the product rule correctly when differentiating the xy term.",
          timestamp: "45 minutes ago"
        }
      ]
    },
    {
      author: "Maria Garcia",
      content: "Looking for study partners for the upcoming AI exam. Anyone interested in forming a virtual study group this weekend? I'm particularly focused on neural networks and deep learning applications.",
      timestamp: "3 hours ago",
      reactions: {
        "👋": 8,
        "👍": 3,
        "🔥": 2
      },
      comments: [
        {
          author: "David Wong",
          content: "I'm interested! Been studying neural networks all week and could use some group discussion.",
          timestamp: "2 hours ago"
        }
      ]
    },
    {
      author: "James Smith",
      content: "Just finished my research paper on quantum computing applications in cryptography. Would anyone be interested in peer reviewing it before submission? It's about 15 pages with diagrams.",
      timestamp: "5 hours ago",
      reactions: {
        "🧠": 12,
        "🔬": 5,
        "🎉": 3
      },
      comments: []
    }
  ]);

  const handleCreatePost = () => {
    if (postContent.trim()) {
      const newPost = {
        author: "Alex Johnson",
        content: postContent,
        timestamp: "Just now",
        reactions: {},
        comments: []
      };
      
      setPosts([newPost, ...posts]);
      setPostContent('');
      setIsPostDialogOpen(false);
    }
  };

  return (
    <main className="w-full flex flex-col space-y-6 px-0">
      {/* Create Post Card */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm border p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradpath-purple text-white">A</AvatarFallback>
          </Avatar>
          <div 
            className="bg-gray-100 rounded-full flex-1 px-4 py-2.5 text-gray-500 cursor-pointer hover:bg-gray-200 transition-colors"
            onClick={() => setIsPostDialogOpen(true)}
          >
            Have something in mind, Alex?
          </div>
        </div>
        <div className="flex mt-3 pt-3 border-t">
          <Button variant="ghost" className="flex-1 rounded-lg justify-center">
            <Image className="h-5 w-5 mr-2 text-blue-500" />
            Photo
          </Button>
          <Button variant="ghost" className="flex-1 rounded-lg justify-center">
            <Video className="h-5 w-5 mr-2 text-green-500" />
            Video
          </Button>
          <Button variant="ghost" className="flex-1 rounded-lg justify-center">
            <Smile className="h-5 w-5 mr-2 text-yellow-500" />
            Feeling
          </Button>
        </div>
      </div>

      {/* Post Creation Dialog */}
      <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a Post</DialogTitle>
            <DialogDescription>
              Share your thoughts with the community
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <textarea
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px]"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
          <DialogFooter className="sm:justify-between">
            <Button type="button" variant="secondary" onClick={() => setIsPostDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              disabled={!postContent.trim()}
              onClick={handleCreatePost}
            >
              Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Chat Posts */}
      <div className="w-full space-y-4">
        {posts.map((post, index) => (
          <ChatPost
            key={index}
            author={post.author}
            content={post.content}
            timestamp={post.timestamp}
            reactions={post.reactions}
            comments={post.comments}
          />
        ))}
      </div>
    </main>
  );
};

export default ChatFeed;
