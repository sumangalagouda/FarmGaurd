
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/hooks/use-auth";
import { placeholderImageMap } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";
import { Award, Medal, Sparkles, Syringe, Trophy, Phone, MapPin, User, Star, BookOpen, ShieldCheck, CheckCircle, AlertCircle, XCircle, Home, Wheat, CheckSquare, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMemo, useState } from "react";
import { Separator } from "@/components/ui/separator";

// Expanded farmer data
const farmers = [
  { 
    id: 'farm-owner', 
    name: 'Farm Owner', 
    avatarId: 'farmer-avatar', 
    fallback: 'FO', 
    location: "Jos", 
    category: "Poultry", 
    phone: "+234 805 123 4570",
    experience: '2 years',
    farmSize: '1,000 birds',
    breeds: 'Broilers',
    feeding: 'Commercial feed',
    manureDisposal: 'Composting',
    healthStatus: 'Overdue',
    healthScore: 75,
    completedModules: []
  },
  { 
    id: 'bukola', 
    name: 'Bukola Adeyemi', 
    avatarId: 'bukola-avatar', 
    fallback: 'BA', 
    location: "Lagos", 
    category: "Integrated", 
    phone: "+234 807 123 4572",
    experience: '10+ years',
    farmSize: '3,000 birds, 200 pigs',
    breeds: 'Layers, Duroc',
    feeding: 'Commercial feed',
    manureDisposal: 'Biogas',
    healthStatus: 'Completed',
    healthScore: 98,
    completedModules: ['Advanced Pig Management', 'Integrated Farming Systems']
  },
  { id: 'girinar', name: 'Girinar Chicken Centre', avatarId: 'user1-avatar', fallback: 'GC', location: "Mangalore", category: "Poultry", phone: "+91 123 456 7890", experience: '3 years', farmSize: '500 birds', breeds: 'Broilers', feeding: 'Commercial feed', manureDisposal: 'Composting', healthStatus: 'Completed', healthScore: 85, completedModules: [] },
  { id: 'akbird', name: 'Ak Bird Farm', avatarId: 'user2-avatar', fallback: 'AF', location: "Mangalore", category: "Poultry", phone: "+91 123 456 7891", experience: '2 years', farmSize: '300 birds', breeds: 'Broilers', feeding: 'Commercial feed', manureDisposal: 'Disposal', healthStatus: 'Pending', healthScore: 82, completedModules: [] },
  { id: 'arun', name: 'Arun Poultry Farm', avatarId: 'user3-avatar', fallback: 'AP', location: "Mangalore", category: "Poultry", phone: "+91 123 456 7892", experience: '4 years', farmSize: '1000 birds', breeds: 'Layers', feeding: 'Self-formulated', manureDisposal: 'Composting', healthStatus: 'Completed', healthScore: 88, completedModules: [] },
  { id: 'anupama', name: 'Anupama Feeds Farms', avatarId: 'farmer-avatar', fallback: 'AF', location: "Mangalore", category: "Poultry", phone: "+91 123 456 7893", experience: '5 years', farmSize: '1500 birds', breeds: 'Broilers, Layers', feeding: 'Commercial feed', manureDisposal: 'Sold to crop farmers', healthStatus: 'Overdue', healthScore: 78, completedModules: [] },
  { id: 'coastal', name: 'Coastal Farms', avatarId: 'david-avatar', fallback: 'CF', location: "Mangalore", category: "Integrated", phone: "+91 123 456 7894", experience: '7 years', farmSize: '2000 birds, 100 pigs', breeds: 'Noiler, Landrace', feeding: 'Mixed', manureDisposal: 'Biogas', healthStatus: 'Completed', healthScore: 93, completedModules: [] },
  { id: 'skfarm', name: 'S.K Farm', avatarId: 'amina-avatar', fallback: 'SF', location: "Mangalore", category: "Poultry", phone: "+91 123 456 7895", experience: '1 year', farmSize: '200 birds', breeds: 'Local breed', feeding: 'Self-formulated', manureDisposal: 'Disposal', healthStatus: 'Pending', healthScore: 79, completedModules: [] },
  { id: 'kodethoor', name: 'Kodethoor', avatarId: 'grace-avatar', fallback: 'K', location: "Mangalore", category: "Pig", phone: "+91 123 456 7896", experience: '6 years', farmSize: '200 pigs', breeds: 'Duroc', feeding: 'Commercial feed', manureDisposal: 'Composting', healthStatus: 'Completed', healthScore: 90, completedModules: [] },
  { id: 'krishna', name: 'Krishna Farm', avatarId: 'user1-avatar', fallback: 'KF', location: "Mysore", category: "Poultry", phone: "+91 234 567 8901", experience: '4 years', farmSize: '800 birds', breeds: 'Layers', feeding: 'Commercial feed', manureDisposal: 'Composting', healthStatus: 'Completed', healthScore: 87, completedModules: [] },
  { id: 'goldenegg', name: 'The Golden Egg', avatarId: 'user2-avatar', fallback: 'GE', location: "Mysore", category: "Poultry", phone: "+91 234 567 8902", experience: '6 years', farmSize: '3000 birds', breeds: 'Layers', feeding: 'Commercial feed', manureDisposal: 'Sold to crop farmers', healthStatus: 'Completed', healthScore: 94, completedModules: [] },
  { id: 'mellahalli', name: 'Mellahalli Nati Koli Poultry', avatarId: 'user3-avatar', fallback: 'MP', location: "Mysore", category: "Poultry", phone: "+91 234 567 8903", experience: '2 years', farmSize: '400 birds', breeds: 'Native', feeding: 'Self-formulated', manureDisposal: 'Disposal', healthStatus: 'Pending', healthScore: 81, completedModules: [] },
  { id: 'aminpoultry', name: 'Amin Poultry Farm', avatarId: 'david-avatar', fallback: 'AP', location: "Udupi", category: "Poultry", phone: "+91 345 678 9012", experience: '5 years', farmSize: '1200 birds', breeds: 'Broilers', feeding: 'Commercial feed', manureDisposal: 'Composting', healthStatus: 'Completed', healthScore: 89, completedModules: [] },
  { id: 'alevoor', name: 'Alevoor Poultry Farm', avatarId: 'david-avatar', fallback: 'AP', location: "Udupi", category: "Poultry", phone: "+91 345 678 9013", experience: '3 years', farmSize: '600 birds', breeds: 'Layers', feeding: 'Self-formulated', manureDisposal: 'Disposal', healthStatus: 'Overdue', healthScore: 76, completedModules: [] },
  { id: 'bhavani', name: 'Bhavani Poultary Farm', avatarId: 'amina-avatar', fallback: 'BP', location: "Udupi", category: "Poultry", phone: "+91 345 678 9014", experience: '7 years', farmSize: '2500 birds', breeds: 'Broilers', feeding: 'Commercial feed', manureDisposal: 'Sold to crop farmers', healthStatus: 'Completed', healthScore: 92, completedModules: [] },
  { id: 'adarsh', name: 'Adarsh Poultry Farm Chicken Center', avatarId: 'grace-avatar', fallback: 'AC', location: "Udupi", category: "Poultry", phone: "+91 345 678 9015", experience: '1 year', farmSize: '300 birds', breeds: 'Native', feeding: 'Mixed', manureDisposal: 'Composting', healthStatus: 'Pending', healthScore: 80, completedModules: [] }
];


const allLocations = ["All Locations", "Mangalore", "Mysore", "Udupi", "Uttara Kannada"];

// Mock activity data for each farmer
const farmerActivities = {
  'farm-owner': { vaccination_on_time: 12, hygiene_submitted: 22, missed_update: 0 },
  'bukola': { vaccination_on_time: 9, hygiene_submitted: 23, missed_update: 2 },
  'girinar': { vaccination_on_time: 12, hygiene_submitted: 25, missed_update: 3 },
  'akbird': { vaccination_on_time: 11, hygiene_submitted: 22, missed_update: 1 },
  'arun': { vaccination_on_time: 14, hygiene_submitted: 28, missed_update: 2 },
  'anupama': { vaccination_on_time: 10, hygiene_submitted: 19, missed_update: 4 },
  'coastal': { vaccination_on_time: 16, hygiene_submitted: 32, missed_update: 1 },
  'skfarm': { vaccination_on_time: 9, hygiene_submitted: 18, missed_update: 3 },
  'kodethoor': { vaccination_on_time: 15, hygiene_submitted: 29, missed_update: 0 },
  'krishna': { vaccination_on_time: 13, hygiene_submitted: 26, missed_update: 2 },
  'goldenegg': { vaccination_on_time: 17, hygiene_submitted: 35, missed_update: 0 },
  'mellahalli': { vaccination_on_time: 10, hygiene_submitted: 21, missed_update: 2 },
  'aminpoultry': { vaccination_on_time: 14, hygiene_submitted: 27, missed_update: 1 },
  'alevoor': { vaccination_on_time: 9, hygiene_submitted: 17, missed_update: 5 },
  'bhavani': { vaccination_on_time: 16, hygiene_submitted: 31, missed_update: 1 },
  'adarsh': { vaccination_on_time: 10, hygiene_submitted: 20, missed_update: 3 },
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

function getBadges(farmerId: string): { name: string; icon: React.ComponentType<{className?: string}> }[] {
    const badges = [];
    const activities = farmerActivities[farmerId as keyof typeof farmerActivities];
    if (activities) {
        if (activities.vaccination_on_time >= 10) {
            badges.push({ name: "On-Time Vaccinator", icon: Syringe });
        }
        if (activities.hygiene_submitted >= 20) {
            badges.push({ name: "Hygiene Champion", icon: Sparkles });
        }
    }
    return badges;
}

type FarmerWithPoints = (typeof farmers)[0] & { points: number, rank: number, badges: { name: string; icon: React.ComponentType<{ className?: string }> }[] };


export default function LeaderboardPage() {
  const { user } = useAuth();
  const [category, setCategory] = useState('All Categories');
  const [location, setLocation] = useState('All Locations');
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerWithPoints | null>(null);


  const leaderboardData = useMemo(() => {
    return farmers
      .filter(farmer => (category === 'All Categories' || farmer.category === category))
      .filter(farmer => (location === 'All Locations' || farmer.location === location))
      .map(farmer => ({
          ...farmer,
          points: calculateBiosecurityPoints(farmer.id),
          badges: getBadges(farmer.id),
      }))
      .sort((a, b) => b.points - a.points)
      .map((farmer, index) => ({
          ...farmer,
          rank: index + 1,
      }));
  }, [category, location]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-400" />;
    return <span className="font-semibold text-sm">{rank}</span>;
  }
  
  const healthStatusIcons = {
      'Completed': <CheckCircle className="h-4 w-4 text-green-600"/>,
      'Pending': <AlertCircle className="h-4 w-4 text-yellow-500"/>,
      'Overdue': <XCircle className="h-4 w-4 text-red-600"/>,
  };

  return (
    <Dialog onOpenChange={(isOpen) => !isOpen && setSelectedFarmer(null)}>
      <Card>
        <CardHeader>
          <CardTitle>Biosecurity Heroes</CardTitle>
          <CardDescription>Meet the top-performing farmers in the FarmGuard community who are leading the way in biosecurity and farm health.</CardDescription>
          <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  <SelectItem value="Poultry">Poultry</SelectItem>
                  <SelectItem value="Pig">Pig</SelectItem>
                  <SelectItem value="Integrated">Integrated</SelectItem>
                </SelectContent>
              </Select>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  {allLocations.map(loc => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-20 text-center">Rank</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Badges</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaderboardData.map((farmer) => {
                const isCurrentUser = user?.displayName === farmer.name;
                return (
                  <DialogTrigger asChild key={farmer.id}>
                    <TableRow 
                      onClick={() => setSelectedFarmer(farmer)}
                      className={cn(isCurrentUser && "bg-accent/50", "cursor-pointer")}>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center">
                          {getRankIcon(farmer.rank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{farmer.name} {isCurrentUser && "(You)"}</span>
                        </div>
                      </TableCell>
                      <TableCell>{farmer.location}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                            {farmer.badges.map(badge => (
                                <Badge key={badge.name} variant="secondary" className="flex items-center gap-1">
                                    <badge.icon className="h-3 w-3"/>
                                    {badge.name}
                                </Badge>
                            ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-bold text-lg">{farmer.points.toLocaleString()}</TableCell>
                    </TableRow>
                  </DialogTrigger>
                )
              })}
              {leaderboardData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    No farmers found for the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {selectedFarmer && (
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
                <div className="flex items-center gap-3">
                    <User className="h-5 w-5"/>
                    Farmer Details
                </div>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
              <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-2xl font-bold">{selectedFarmer.name}</h3>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4"/>
                        <span>{selectedFarmer.location}</span>
                    </div>
                     <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4"/>
                        <span>{selectedFarmer.phone}</span>
                    </div>
                  </div>
              </div>

            <Separator/>
            
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-4">
                    <h4 className="font-semibold">Basic Info</h4>
                    <div className="text-sm space-y-2">
                        <p className="flex items-center gap-2"><User className="text-muted-foreground"/><strong>Type:</strong> {selectedFarmer.category}</p>
                        <p className="flex items-center gap-2"><Star className="text-muted-foreground"/><strong>Experience:</strong> {selectedFarmer.experience}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold">Farm Setup</h4>
                     <div className="text-sm space-y-2">
                        <p className="flex items-center gap-2"><Home className="text-muted-foreground"/><strong>Farm Size:</strong> {selectedFarmer.farmSize}</p>
                        <p className="flex items-center gap-2"><Award className="text-muted-foreground"/><strong>Breeds:</strong> {selectedFarmer.breeds}</p>
                        <p className="flex items-center gap-2"><Wheat className="text-muted-foreground"/><strong>Feeding:</strong> {selectedFarmer.feeding}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <h4 className="font-semibold">Biosecurity & Health</h4>
                     <div className="text-sm space-y-2">
                        <p className="flex items-center gap-2"><ShieldCheck className="text-muted-foreground"/><strong>Health Score:</strong> {selectedFarmer.healthScore}%</p>
                        <p className="flex items-center gap-2"><CheckSquare className="text-muted-foreground"/>
                            <strong>Health Calendar:</strong> 
                            <span className="flex items-center gap-1">
                                {healthStatusIcons[selectedFarmer.healthStatus as keyof typeof healthStatusIcons]} {selectedFarmer.healthStatus}
                            </span>
                        </p>
                         <p className="flex items-center gap-2"><Trash2 className="text-muted-foreground"/><strong>Manure Disposal:</strong> {selectedFarmer.manureDisposal}</p>
                    </div>
                </div>
                 <div className="space-y-4">
                    <h4 className="font-semibold">Achievements</h4>
                     <div className="text-sm space-y-2">
                        <p><strong>Rank:</strong> #{selectedFarmer.rank} with {selectedFarmer.points} points</p>
                        <div>
                            <p className="font-medium mb-1">Badges:</p>
                             <div className="flex flex-wrap gap-1">
                                {selectedFarmer.badges.map(badge => (
                                    <Badge key={badge.name} variant="secondary" className="flex items-center gap-1">
                                        <badge.icon className="h-3 w-3"/>
                                        {badge.name}
                                    </Badge>
                                ))}
                                {selectedFarmer.badges.length === 0 && <span className="text-xs text-muted-foreground">No badges yet.</span>}
                            </div>
                        </div>
                        <div>
                           <p className="font-medium mb-1 flex items-center gap-1"><BookOpen className="h-4 w-4"/>Modules Completed:</p>
                           {selectedFarmer.completedModules.length > 0 ? (
                                <ul className="list-disc list-inside text-muted-foreground">
                                    {selectedFarmer.completedModules.map(m => <li key={m}>{m}</li>)}
                                </ul>
                           ) : <p className="text-xs text-muted-foreground">No modules completed yet.</p>}
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </DialogContent>
      )}
    </Dialog>
  );
}

    
    
    