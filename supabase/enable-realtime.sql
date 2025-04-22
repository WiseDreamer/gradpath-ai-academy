
-- Enable REPLICA IDENTITY for the posts table
ALTER TABLE public.posts REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.posts;
