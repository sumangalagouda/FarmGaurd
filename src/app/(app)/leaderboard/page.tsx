
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { placeholderImageMap } from "@/lib/placeholder-images";
import { Award, Medal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const leaderboardData = [
  { rank: 1, name: 'David Okon', points: 12500, avatarId: 'david-avatar', fallback: 'DO' },
  { rank: 2, name: 'Amina Bello', points: 11800, avatarId: 'amina-avatar', fallback: 'AB' },
  { rank: 3, name: 'Grace Eze', points: 11200, avatarId: 'grace-avatar', fallback: 'GE' },
  { rank: 4, name: 'Farm Owner', points: 10500, avatarId: 'farmer-avatar', fallback: 'FO', isCurrentUser: true },
  { rank: 5, name: 'Chinedu Okoro', points: 9800, avatarId: 'chinedu-avatar', fallback: 'CO' },
  { rank: 6, name: 'Bukola Adeyemi', points: 9500, avatarId: 'bukola-avatar', fallback: 'BA' },
  { rank: 7, name: 'Mike K.', points: 8900, avatarId: 'user3-avatar', fallback: 'MK' },
  { rank: 8, name: 'Sarah A.', points: 8200, avatarId: 'user2-avatar', fallback: 'SA' },
  { rank: 9, name: 'John D.', points: 7600, avatarId: 'user1-avatar', fallback: 'JD' },
];

export default function LeaderboardPage() {
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
        <CardDescription>Top performing farmers in the FarmGuard community based on points earned from tasks and engagement.</CardDescription>
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
              return (
                <TableRow key={farmer.rank} className={cn(farmer.isCurrentUser && "bg-accent/50")}>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      {getRankIcon(farmer.rank)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={avatar.imageUrl} data-ai-hint={avatar.imageHint} />
                        <AvatarFallback>{farmer.fallback}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{farmer.name} {farmer.isCurrentUser && "(You)"}</span>
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
