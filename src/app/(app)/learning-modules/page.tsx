
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { placeholderImageMap } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";

const learningModules = [
  {
    id: "biosecurity-basics",
    title: "Biosecurity Fundamentals for Poultry Farms",
    description: "Learn the essential steps to protect your flock from diseases with our comprehensive biosecurity guide.",
    tags: ["poultry", "biosecurity", "disease prevention"],
    duration: "12:34",
    thumbnailId: "learning-biosecurity",
  },
  {
    id: "pig-farrowing",
    title: "Managing Pig Farrowing Successfully",
    description: "A deep dive into best practices for managing sows and piglets during the farrowing process to increase survival rates.",
    tags: ["pigs", "farrowing", "reproduction"],
    duration: "18:21",
    thumbnailId: "learning-piglets",
  },
  {
    id: "feed-formulation",
    title: "DIY Feed Formulation for Broilers",
    description: "Discover how to create cost-effective and nutritious feed for your broilers using locally sourced ingredients.",
    tags: ["poultry", "feed", "nutrition", "cost-saving"],
    duration: "15:58",
    thumbnailId: "learning-feed",
  },
  {
    id: "swine-fever",
    title: "Identifying and Preventing African Swine Fever",
    description: "An expert guide on recognizing the signs of ASF and implementing effective control measures on your farm.",
    tags: ["pigs", "disease", "asf", "health"],
    duration: "22:05",
    thumbnailId: "learning-swine",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {learningModules.map((module) => {
          const thumbnail = placeholderImageMap[module.thumbnailId];
          return (
            <Card key={module.id} className="overflow-hidden">
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
                     <span className="absolute bottom-2 right-2 bg-black/60 text-white text-xs font-semibold px-2 py-1 rounded-md">{module.duration}</span>
                </CardHeader>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 leading-tight">{module.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{module.description}</p>
                
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex flex-wrap gap-2">
                    {module.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
