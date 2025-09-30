
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { placeholderImageMap } from "@/lib/placeholder-images";
import { Award, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

// Base data for farmers
const farmers = [
  { id: 'david', name: 'David Okon', avatarId: 'david-avatar', fallback: 'DO' },
  { id: 'amina', name: 'Amina Bello', avatarId: 'amina-avatar', fallback: 'AB' },
  { id: 'grace', name: 'Grace Eze', avatarId: 'grace-avatar', fallback: 'GE' },
  { id: 'farm-owner', name: 'Farm Owner', avatarId: 'farmer-avatar', fallback: 'FO' },
  { id: 'chinedu', name: 'Chinedu Okoro', avatarId: 'chinedu-avatar', fallback: 'CO' },
  { id: 'bukola', name: 'Bukola Adeyemi', avatarId: 'bukola-avatar', fallback: 'BA' },
  { id: 'mike', name: 'Mike K.', avatarId: 'user3-avatar', fallback: 'MK' },
  { id: 'sarah', name: 'Sarah A.', avatarId: 'user2-avatar', fallback: 'SA' },
  { id: 'john', name: 'John D.', avatarId: 'user1-avatar', fallback: 'JD' },
];

// Mock activity data for each farmer
const farmerActivities = {
  'david': { vaccination_on_time: 15, hygiene_submitted: 30, missed_update: 2 },
  'amina': { vaccination_on_time: 14, hygiene_submitted: 28, missed_update: 1 },
  'grace': { vaccination_on_time: 13, hygiene_submitted: 25, missed_update: 3 },
  'farm-owner': { vaccination_on_time: 12, hygiene_submitted: 22, missed_update: 0 },
  'chinedu': { vaccination_on_time: 10, hygiene_submitted: 20, missed_update: 4 },
  'bukola': { vaccination_on_time: 9, hygiene_submitted: 23, missed_update: 2 },
  'mike': { vaccination_on_time: 8, hygiene_submitted: 18, missed_update: 5 },
  'sarah': { vaccination_on_time: 7, hygiene_submitted: 15, missed_update: 6 },
  'john': { vaccination_on_time: 6, hygiene_submitted: 12, missed_update: 7 },
};

// Function to calculate points based on the provided algorithm
function calculateBiosecurityPoints(farmerId: string): number {
    let points = 0;
    const activities = farmerActivities[farmerId as keyof typeof farmerActivities];
    if (activities) {
        points += activities.vaccination_on_time * 20;
        points += activities.hygiene_submitted * 10;
        points -= activities.missed_update * 5;
    }
    return points > 0 ? points : 0;
}

// Generate the full leaderboard data
const leaderboardData = farmers.map(farmer => ({
    ...farmer,
    points: calculateBiosecurityPoints(farmer.id),
}))
.sort((a, b) => b.points - a.points)
.map((farmer, index) => ({
    ...farmer,
    rank: index + 1,
}));


export default function LeaderboardPage() {
  const { user } = useAuth();

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-400" />;
    return <span className="font-semibold text-sm">{rank}</span>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farmer Leaderboard</CardTitle>
        <CardDescription>Top performing farmers in the FarmGuard community based on points earned from biosecurity tasks and engagement.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20 text-center">Rank</TableHead>
              <TableHead>Farmer</TableHead>
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((farmer) => {
              const avatar = placeholderImageMap[farmer.avatarId];
              const isCurrentUser = user?.displayName === farmer.name;
              return (
                <TableRow key={farmer.rank} className={cn(isCurrentUser && "bg-accent/50")}>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      {getRankIcon(farmer.rank)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={avatar?.imageUrl} data-ai-hint={avatar?.imageHint} />
                        <AvatarFallback>{farmer.fallback}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{farmer.name} {isCurrentUser && "(You)"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-lg">{farmer.points.toLocaleString()}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
