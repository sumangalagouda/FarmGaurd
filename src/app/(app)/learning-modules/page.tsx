
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, PlayCircle } from "lucide-react";
import Image from "next/image";
import { placeholderImageMap } from "@/lib/placeholder-images";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const learningModules = [
  {
    id: "poultry-farming",
    title: "Modern Poultry Farming Techniques",
    description: "Learn the essential steps to protect your flock and improve productivity with modern techniques.",
    tags: ["poultry", "biosecurity", "productivity"],
    thumbnailId: "learning-biosecurity",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: "pig-farming",
    title: "Advanced Pig Farming & Management",
    description: "A deep dive into best practices for managing sows and piglets and ensuring healthy growth.",
    tags: ["pigs", "farrowing", "health"],
    thumbnailId: "learning-piglets",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "integrated-farming",
    title: "Integrated Poultry & Pig Farming",
    description: "Discover the benefits of integrated farming systems for increased efficiency and profitability.",
    tags: ["integrated", "efficiency", "cost-saving"],
    thumbnailId: "learning-swine",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
];


export default function LearningModulesPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-headline">Learning Modules</h1>
            <p className="text-muted-foreground">Expand your knowledge with our expert-led video tutorials.</p>
          </div>
            <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search videos..." className="pl-10 w-full md:w-64" />
            </div>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningModules.map((module) => {
          const thumbnail = placeholderImageMap[module.thumbnailId];
          return (
            <Dialog key={module.id}>
              <DialogTrigger asChild>
                <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
                    <CardHeader className="p-0 relative">
                        <Image
                            src={thumbnail.imageUrl}
                            alt={module.title}
                            width={400}
                            height={225}
                            className="aspect-video object-cover"
                            data-ai-hint={thumbnail.imageHint}
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <PlayCircle className="h-12 w-12 text-white/80" />
                        </div>
                    </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2 leading-tight">{module.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{module.description}</p>
                    <div className="flex flex-wrap gap-2">
                        {module.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0">
                  <DialogHeader className="p-4">
                      <DialogTitle>{module.title}</DialogTitle>
                  </DialogHeader>
                  <div className="aspect-video">
                      <video className="w-full h-full" controls autoPlay>
                          <source src={module.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                      </video>
                  </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
}
