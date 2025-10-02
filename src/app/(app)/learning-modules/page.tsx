

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, BookCheck, PlayCircle, WholeWord, Award } from "lucide-react";
import Link from 'next/link';
import { learningModules } from '@/lib/learning-modules-data';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { placeholderImageMap } from "@/lib/placeholder-images";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const farmers = [
  { id: 'david', name: 'David Okon', avatarId: 'david-avatar', fallback: 'DO', completedModules: ['poultry-farming', 'integrated-farming'], location: 'Lagos' },
  { id: 'amina', name: 'Amina Bello', avatarId: 'amina-avatar', fallback: 'AB', completedModules: ['pig-farming', 'integrated-farming'], location: 'Abuja' },
  { id: 'grace', name: 'Grace Eze', avatarId: 'grace-avatar', fallback: 'GE', completedModules: ['poultry-farming'], location: 'Jos' },
  { id: 'farm-owner', name: 'Farm Owner', avatarId: 'farmer-avatar', fallback: 'FO', completedModules: ['pig-farming'], location: 'Jos' },
  { id: 'chinedu', name: 'Chinedu Okoro', avatarId: 'chinedu-avatar', fallback: 'CO', completedModules: [], location: 'Enugu' },
];

const allLocations = ["All Locations", ...Array.from(new Set(farmers.map(f => f.location)))];

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
    const [learnerLocation, setLearnerLocation] = useState('All Locations');
    
    const learnerLeaderboard = useMemo(() => {
        return farmers
            .filter(farmer => learnerLocation === 'All Locations' || farmer.location === learnerLocation)
            .map(farmer => ({
                ...farmer,
                points: calculateLearningPoints(farmer.completedModules)
            }))
            .sort((a,b) => b.points - a.points)
            .map((farmer, index) => ({
                ...farmer,
                rank: index + 1,
            }))
    }, [learnerLocation]);

  return (
    <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
             <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Top Learners</h2>
                    <Select value={learnerLocation} onValueChange={setLearnerLocation}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent>
                            {allLocations.map(loc => (
                                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Card>
                    <CardContent className="p-0">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16 text-center">Rank</TableHead>
                                    <TableHead>Farmer</TableHead>
                                    <TableHead>Location</TableHead>
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
                                            <TableCell>{learner.location}</TableCell>
                                            <TableCell className="text-right font-semibold">{learner.points}</TableCell>
                                        </TableRow>
                                    )
                                })}
                                {learnerLeaderboard.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                                        No learners found for this location.
                                        </TableCell>
                                    </TableRow>
                                )}
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
