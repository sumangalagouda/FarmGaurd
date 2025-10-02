
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { placeholderImageMap } from "@/lib/placeholder-images";
import { Bot, Loader2, MessageSquare, Send, ThumbsUp } from "lucide-react";
import { useState, useMemo } from 'react';
import { summarizeForumPosts, SummarizeForumPostsOutput } from '@/ai/flows/summarize-forum-posts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/hooks/use-auth";

const initialPosts = [
  {
    id: 1,
    author: "Grace Eze",
    avatarId: "grace-avatar",
    fallback: "GE",
    time: "2 hours ago",
    content: "Has anyone tried the new supplements from AgriCorp? Seeing good results in my layers, eggshells seem stronger.",
    likes: 12,
  },
  {
    id: 2,
    author: "David Okon",
    avatarId: "david-avatar",
    fallback: "DO",
    time: "5 hours ago",
    content: "Need advice on controlling flies in my piggery. It's getting out of hand this rainy season. What are your best methods?",
    likes: 25,
  },
   {
    id: 3,
    author: "Amina Bello",
    avatarId: "amina-avatar",
    fallback: "AB",
    time: "1 day ago",
    content: "Warning to poultry farmers near Lagos: I've had a suspected case of Newcastle Disease. Please be vigilant with your biosecurity.",
    likes: 45,
  },
];

type Post = typeof initialPosts[0];

export default function CommunityForumPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPostContent, setNewPostContent] = useState("");
  const [summary, setSummary] = useState<SummarizeForumPostsOutput | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);

  const handlePostSubmit = () => {
    if (!newPostContent.trim() || !user) return;
    const newPost = {
      id: posts.length + 1,
      author: user.displayName || 'Anonymous',
      avatarId: "farmer-avatar",
      fallback: user.displayName?.[0] || 'A',
      time: "Just now",
      content: newPostContent,
      likes: 0,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleGenerateSummary = async () => {
    setLoadingSummary(true);
    setSummary(null);
    setSummaryError(null);
    try {
      const result = await summarizeForumPosts({ posts: posts.map(p => ({ author: p.author, content: p.content })) });
      setSummary(result);
    } catch (e: any) {
      setSummaryError(e.message || "Failed to generate summary.");
    } finally {
      setLoadingSummary(false);
    }
  };
  
  const topPost = useMemo(() => {
    return [...posts].sort((a,b) => b.likes - a.likes)[0];
  }, [posts]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Share your thoughts or ask a question..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="min-h-24"
            />
          </CardContent>
          <CardFooter>
            <Button onClick={handlePostSubmit} disabled={!newPostContent.trim()}>
              <Send className="mr-2" />
              Post to Forum
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          {posts.map(post => {
            const avatar = placeholderImageMap[post.avatarId];
            return (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint}/>
                        <AvatarFallback>{post.fallback}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{post.content}</p>
                </CardContent>
                <CardFooter>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4"/>
                        {post.likes}
                    </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="sticky top-24 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot />AI Summary</CardTitle>
            <CardDescription>Get a quick summary of the latest discussions in the community.</CardDescription>
          </CardHeader>
          <CardContent>
            {loadingSummary && (
                <div className="flex items-center justify-center text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                </div>
            )}
            {summaryError && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{summaryError}</AlertDescription></Alert>}
            {summary && <p className="text-sm">{summary.summary}</p>}
             {!summary && !loadingSummary && <p className="text-sm text-muted-foreground">Click the button to generate a summary of the current posts.</p>}
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerateSummary} disabled={loadingSummary} className="w-full">
              {loadingSummary ? 'Summarizing...' : 'Generate Summary'}
            </Button>
          </CardFooter>
        </Card>
        
         <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquare />Top Discussion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-semibold text-sm">{topPost.author} asked:</p>
            <p className="text-sm text-muted-foreground italic">"{topPost.content}"</p>
          </CardContent>
          <CardFooter>
              <Button variant="outline" className="w-full">
                  Join Conversation
              </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
