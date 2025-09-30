
'use client';

import { useEffect, useState } from "react";
import { summarizeForumPosts, SummarizeForumPostsOutput } from "@/ai/flows/summarize-forum-posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { placeholderImageMap } from "@/lib/placeholder-images";
import { Bot, Loader2, MessageSquare, Search, ThumbsUp, UserPlus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const forumPosts = [
  {
    author: "Grace Eze",
    avatarId: "grace-avatar",
    fallback: "GE",
    time: "2 hours ago",
    title: "Best Practices for Pig Farrowing?",
    content: "I have a few sows due to farrow soon. Looking for tips on how to prepare and manage the process to minimize piglet mortality. What has worked for you all?",
    tags: ["pigs", "farrowing", "health"],
    likes: 12,
    replies: 4,
    topContributor: true,
  },
  {
    author: "David Okon",
    avatarId: "david-avatar",
    fallback: "DO",
    time: "8 hours ago",
    title: "Question about Poultry Feed Formulation",
    content: "Has anyone tried formulating their own feed for broilers? I'm trying to reduce costs but want to ensure the nutritional value is high. Any recommended local ingredients?",
    tags: ["poultry", "feed", "cost-saving"],
    likes: 25,
    replies: 8,
  },
  {
    author: "Amina Bello",
    avatarId: "amina-avatar",
    fallback: "AB",
    time: "1 day ago",
    title: "Success Story: Overcoming Newcastle Disease Outbreak",
    content: "Just wanted to share that my flock has fully recovered from a recent Newcastle outbreak. The key was quick isolation and following the vet's advice strictly. Biosecurity is no joke!",
    tags: ["poultry", "disease", "biosecurity", "success-story"],
    likes: 42,
    replies: 15,
    topContributor: true,
  }
];

export default function CommunityForumPage() {
    const [summary, setSummary] = useState<SummarizeForumPostsOutput | null>(null);
    const [loadingSummary, setLoadingSummary] = useState(true);

    useEffect(() => {
        async function getSummary() {
            try {
                const postsContent = forumPosts.map(p => `Title: ${p.title}\nAuthor: ${p.author}\nContent: ${p.content}`).join('\n\n---\n\n');
                const result = await summarizeForumPosts({ forumPosts: postsContent });
                setSummary(result);
            } catch (error) {
                console.error("Failed to get forum summary:", error);
            } finally {
                setLoadingSummary(false);
            }
        }
        getSummary();
    }, []);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
      <div className="lg:col-span-3 space-y-6">
        <Card className="bg-primary/5 border-primary">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bot /> AI Summary of Recent Discussions
                </CardTitle>
            </CardHeader>
            <CardContent>
                {loadingSummary && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Loader2 className="animate-spin h-4 w-4"/>
                        <span>Generating summary...</span>
                    </div>
                )}
                {!loadingSummary && summary && (
                    <p className="text-muted-foreground">{summary.summary}</p>
                )}
                 {!loadingSummary && !summary && (
                    <Alert variant="destructive">
                        <AlertTitle>Could not load summary</AlertTitle>
                        <AlertDescription>There was an issue generating the AI summary. Please try again later.</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>

        <div className="flex items-center gap-4">
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search forum..." className="pl-10" />
            </div>
            <Button>
                <MessageSquare className="mr-2 h-4 w-4"/>
                New Post
            </Button>
        </div>
        {forumPosts.map((post, index) => {
          const avatar = placeholderImageMap[post.avatarId];
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <Avatar>
                  <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />
                  <AvatarFallback>{post.fallback}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{post.author} {post.topContributor && <Badge className="ml-2 bg-accent text-accent-foreground">Top Contributor</Badge>}</p>
                  <p className="text-xs text-muted-foreground">{post.time}</p>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold text-lg mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                      {post.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                  <div className="flex items-center gap-4 text-muted-foreground">
                      <button className="flex items-center gap-1 hover:text-primary">
                          <ThumbsUp className="h-4 w-4"/>
                          <span className="text-xs">{post.likes}</span>
                      </button>
                       <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4"/>
                          <span className="text-xs">{post.replies}</span>
                      </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )})}
      </div>
      <div className="space-y-6 sticky top-24">
        <Card>
            <CardHeader>
                <h3 className="font-semibold">Top Contributors</h3>
            </CardHeader>
            <CardContent className="space-y-4">
                {forumPosts.filter(p => p.topContributor).map(p => {
                    const avatar = placeholderImageMap[p.avatarId];
                    return (
                      <div key={p.author} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                  <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />
                                  <AvatarFallback>{p.fallback}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{p.author}</span>
                          </div>
                          <Button variant="ghost" size="sm"><UserPlus className="h-4 w-4" /></Button>
                      </div>
                    )})}
            </CardContent>
        </Card>
         <Card className="bg-accent/20 border-accent">
            <CardHeader>
                <h3 className="font-semibold">Forum Rules</h3>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1">
                    <li>Be respectful to other members.</li>
                    <li>Share knowledge and experiences.</li>
                    <li>Do not post spam or advertisements.</li>
                    <li>Keep discussions relevant to farming.</li>
                </ul>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
