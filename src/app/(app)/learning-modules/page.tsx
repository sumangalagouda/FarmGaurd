

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookCheck, PlayCircle, WholeWord, Award } from "lucide-react";
import Link from 'next/link';
import { learningModules } from '@/lib/learning-modules-data';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { placeholderImageMap } from "@/lib/placeholder-images";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";

const skills = [
    { icon: BookCheck, name: 'Biosecurity', learners: '1.2M' },
    { icon: WholeWord, name: 'Feed Formulation', learners: '980k' },
    { icon: PlayCircle, name: 'Disease Prev...', learners: '1.5M' },
    { icon: BookCheck, name: 'Farrowing', learners: '750k' },
    { icon: PlayCircle, name: 'Vaccination', learners: '1.8M' },
];

const farmers = [
  { id: 'david', name: 'David Okon', avatarId: 'david-avatar', fallback: 'DO', completedModules: ['poultry-farming', 'integrated-farming'] },
  { id: 'amina', name: 'Amina Bello', avatarId: 'amina-avatar', fallback: 'AB', completedModules: ['pig-farming', 'integrated-farming'] },
  { id: 'grace', name: 'Grace Eze', avatarId: 'grace-avatar', fallback: 'GE', completedModules: ['poultry-farming'] },
  { id: 'farm-owner', name: 'Farm Owner', avatarId: 'farmer-avatar', fallback: 'FO', completedModules: ['pig-farming'] },
  { id: 'chinedu', name: 'Chinedu Okoro', avatarId: 'chinedu-avatar', fallback: 'CO', completedModules: [] },
];

const calculateLearningPoints = (completedModules: string[]): number => {
    let totalPoints = 0;
    completedModules.forEach(moduleId => {
        const module = learningModules.find(m => m.id === moduleId);
        if (module) {
            totalPoints += module.syllabus.reduce((sum, item) => sum + item.points, 0);
        }
    });
    return totalPoints;
}

const companyOffers = [
  {
    companyName: 'AgriCorp Supplies',
    discount: '15% Off',
    productName: 'Poultry Feed Starter Pack',
    location: 'Lagos',
  },
  {
    companyName: 'VetPlus Nigeria',
    discount: '10% Off',
    productName: 'Swine Vaccination Kit',
    location: 'Abuja',
  },
  {
    companyName: 'Farmwell Equipment',
    discount: '20% Off',
    productName: 'Automated Drinkers',
    location: 'Jos',
  },
  {
    companyName: 'Grand Cereals',
    discount: 'Buy 10 get 1 Free',
    productName: 'Vital Feed',
    location: 'Kano',
  }
];


export default function LearningModulesPage() {
    const { user } = useAuth();
    
    const learnerLeaderboard = useMemo(() => {
        return farmers
            .map(farmer => ({
                ...farmer,
                points: calculateLearningPoints(farmer.completedModules)
            }))
            .sort((a,b) => b.points - a.points)
            .map((farmer, index) => ({
                ...farmer,
                rank: index + 1,
            }))
    }, []);

  return (
    <div className="space-y-12">
        <div>
            <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {learningModules.map((module, index) => (
                    <Link key={module.id} href={`/learning-modules/${module.id}`}>
                        <Card className="relative overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow h-full">
                            <CardContent className="p-6">
                                <div className="relative z-10">
                                    <h3 className="text-xl font-bold">{module.title}</h3>
                                    <p className="text-muted-foreground mt-1 mb-4">{module.description}</p>
                                    <div className="font-semibold text-primary group-hover:underline flex items-center">
                                        Start course <ArrowRight className="ml-1 h-4 w-4" />
                                    </div>
                                </div>
                                <div className="absolute -right-4 -bottom-4 z-0">
                                    <span className="text-[10rem] font-bold text-muted/20 leading-none">{index + 1}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
                <h2 className="text-2xl font-bold mb-6">Learn the skills that matter most</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {skills.map(skill => (
                        <Card key={skill.name} className="p-4 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow cursor-pointer">
                            <div className="bg-primary/10 p-3 rounded-lg mb-2">
                               <skill.icon className="h-6 w-6 text-primary" />
                            </div>
                            <p className="font-semibold text-sm">{skill.name}</p>
                            <p className="text-xs text-muted-foreground">{skill.learners} learners</p>
                        </Card>
                    ))}
                </div>
            </div>
             <div>
                <h2 className="text-2xl font-bold mb-6">Top Learners</h2>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16 text-center">Rank</TableHead>
                                    <TableHead>Farmer</TableHead>
                                    <TableHead className="text-right">Points</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {learnerLeaderboard.slice(0, 5).map((learner) => {
                                    const avatar = placeholderImageMap[learner.avatarId];
                                    const isCurrentUser = user?.displayName === learner.name;
                                    return (
                                        <TableRow key={learner.id} className={cn(isCurrentUser && "bg-accent/50")}>
                                            <TableCell className="text-center font-bold">{learner.rank}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint} />
                                                        <AvatarFallback>{learner.fallback}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium">{learner.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-semibold">{learner.points}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>

        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Top Farmer Rewards</CardTitle>
                    <CardDescription>Exclusive discounts from our partners for the top-performing farmers. Keep learning to unlock more!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Discount</TableHead>
                                <TableHead>Location</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companyOffers.map((offer) => (
                                <TableRow key={offer.companyName}>
                                    <TableCell className="font-medium">{offer.companyName}</TableCell>
                                    <TableCell>{offer.productName}</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{offer.discount}</Badge>
                                    </TableCell>
                                    <TableCell>{offer.location}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
