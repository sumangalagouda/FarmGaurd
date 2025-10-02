
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Edit, Award, BookOpen, Gift, History } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type FarmData = {
    farmerName: string;
    contact: string;
    email: string;
    language: string;
    location: string;
    experience: string;
    farmType: string;
    breedType: string;
    farmSize: string;
    farmCapacity: string;
    housingType: string;
    waterSource: string;
    wasteManagement: string;
    vaccinationRecord: string;
    pastOutbreaks: 'Yes' | 'No';
    pastDiseases?: string;
};

const initialFarmData: FarmData = {
    farmerName: "",
    contact: "",
    email: "",
    language: "english",
    location: "Jos, Plateau State",
    experience: "",
    farmType: "",
    breedType: "",
    farmSize: "",
    farmCapacity: "",
    housingType: "",
    waterSource: "",
    wasteManagement: "",
    vaccinationRecord: "",
    pastOutbreaks: "No",
    pastDiseases: "",
};

export default function FarmSetupPage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(true);
    const [farmData, setFarmData] = useState<FarmData>(initialFarmData);
    const [error, setError] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      // Check local storage to see if profile has been set up
      const savedProfile = localStorage.getItem(`farm-profile-${user?.uid}`);
      if (savedProfile) {
        setFarmData(JSON.parse(savedProfile));
        setIsEditing(false);
      } else if (user) {
        // Pre-fill from auth context if new
        setFarmData(prev => ({
          ...prev,
          farmerName: user.displayName || '',
          contact: user.phoneNumber || '',
        }));
      }
    }, [user]);

    const handleInputChange = (field: keyof FarmData, value: string) => {
        setFarmData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleSelectChange = (field: keyof FarmData, value: string) => {
        setFarmData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        // Simple validation
        if (!farmData.farmerName || !farmData.contact || !farmData.location) {
             setError("Please fill out all required fields: Name, Contact, and Location.");
             return;
        }
        
        if (farmData.pastOutbreaks === 'Yes' && !farmData.pastDiseases) {
             setError("Please specify which disease(s) for past outbreaks.");
             return;
        }

        setError('');
        if (user) {
          localStorage.setItem(`farm-profile-${user.uid}`, JSON.stringify(farmData));
        }
        setIsEditing(false);
    };
    
    // Mock data for display
    const modulesCompleted = ["Modern Poultry Farming", "Biosecurity & Disease Prevention"];
    const rankHistory = ["#12 (This Month)", "#15 (Last Month)", "#20 (Previous)"];
    const rewards = ["10% off VetPlus Nigeria", "15% off AgriCorp Supplies"];
    const connections = ["FarmFresh Grocers", "Capital Meats"];


  if (!isClient) {
      return <div>Loading...</div>; // Or a skeleton loader
  }

  if (!isEditing) {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://images.unsplash.com/photo-1655979910802-4ef8cc3704c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxmYXJtZXIlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTkwNzU4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                                <AvatarFallback>{farmData.farmerName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <CardTitle className="text-2xl">{farmData.farmerName}</CardTitle>
                                <CardDescription>{farmData.location}</CardDescription>
                            </div>
                        </div>
                        <Button variant="outline" onClick={() => setIsEditing(true)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 border-t pt-6">
                     <h3 className="font-semibold text-lg">Farm Details</h3>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                        {Object.entries(farmData).map(([key, value]) => {
                             if (!value || (key === 'pastDiseases' && farmData.pastOutbreaks === 'No')) return null;
                             const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                            return (
                                <div key={key} className="flex flex-col">
                                    <Label className="font-semibold mb-1">{label}</Label>
                                    <p className="text-muted-foreground">{value}</p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BookOpen/>Modules Completed</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {modulesCompleted.map(m => <li key={m}>{m}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Award/>Leaderboard Rank History</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {rankHistory.map(r => <li key={r}>{r}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Gift/>Earned Rewards & Coupons</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {rewards.map(r => <li key={r}>{r}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><History/>Company Connections</CardTitle>
                    </CardHeader>
                     <CardContent>
                        <ul className="list-disc list-inside text-muted-foreground">
                            {connections.map(c => <li key={c}>{c}</li>)}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Set Up Your Farm Profile</CardTitle>
        <CardDescription>This information helps us tailor recommendations for you. Let's start with the basics.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {error && (
             <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Missing Information</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {/* Profile Picture */}
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src="https://images.unsplash.com/photo-1655979910802-4ef8cc3704c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxmYXJtZXIlMjBwb3J0cmFpdHxlbnwwfHx8fDE3NTkwNzU4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080" />
                <AvatarFallback>{farmData.farmerName.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button variant="outline">Upload Photo</Button>
        </div>
        
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="farmer-name">Name of Farmer</Label>
            <Input id="farmer-name" placeholder="Enter your full name" value={farmData.farmerName} onChange={(e) => handleInputChange('farmerName', e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">Contact (Mobile)</Label>
            <Input id="contact" placeholder="Enter your mobile" value={farmData.contact} onChange={(e) => handleInputChange('contact', e.target.value)} disabled />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" value={farmData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
          </div>
           <div className="grid gap-2">
            <Label htmlFor="language">Preferred Language</Label>
             <Select value={farmData.language} onValueChange={(value) => handleSelectChange('language', value)}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hausa">Hausa</SelectItem>
                <SelectItem value="igbo">Igbo</SelectItem>
                <SelectItem value="yoruba">Yoruba</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="location">Location (State)</Label>
                <Input id="location" placeholder="E.g., Plateau State" value={farmData.location} onChange={(e) => handleInputChange('location', e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="experience">Years of Experience in Farming</Label>
                <Select value={farmData.experience} onValueChange={(value) => handleSelectChange('experience', value)}>
                    <SelectTrigger id="experience">
                        <SelectValue placeholder="Select years of experience" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="0-1">0-1 Years</SelectItem>
                        <SelectItem value="2-5">2-5 Years</SelectItem>
                        <SelectItem value="6-10">6-10 Years</SelectItem>
                        <SelectItem value="10+">10+ Years</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
        
        {/* Farm Specifics */}
         <div className="grid md:grid-cols-2 gap-6 items-start">
            <div className="grid gap-2">
                <Label htmlFor="farm-type">Farm Type</Label>
                 <Select value={farmData.farmType} onValueChange={(value) => handleSelectChange('farmType', value)}>
                    <SelectTrigger id="farm-type">
                        <SelectValue placeholder="Select farm type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="poultry">Poultry</SelectItem>
                        <SelectItem value="pig">Pig</SelectItem>
                        <SelectItem value="integrated">Integrated</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="breed-type">Breed Type</Label>
                <Input id="breed-type" placeholder={
                    farmData.farmType === 'poultry' ? "e.g., Broiler, Layer" :
                    farmData.farmType === 'pig' ? "e.g., Large White Yorkshire" :
                    "e.g., Broiler, Landrace"
                } value={farmData.breedType} onChange={(e) => handleInputChange('breedType', e.target.value)} />
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="farm-size">Farm Size (Number of birds / pigs)</Label>
                <Input id="farm-size" type="number" placeholder="e.g., 500" value={farmData.farmSize} onChange={(e) => handleInputChange('farmSize', e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="farm-capacity">Farm Capacity (Maximum housing)</Label>
                <Input id="farm-capacity" type="number" placeholder="e.g., 1000" value={farmData.farmCapacity} onChange={(e) => handleInputChange('farmCapacity', e.target.value)} />
            </div>
        </div>

        {/* Operations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="housing-type">Housing Type</Label>
                <Select value={farmData.housingType} onValueChange={(value) => handleSelectChange('housingType', value)}>
                    <SelectTrigger id="housing-type"><SelectValue placeholder="Select housing type" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="semi-closed">Semi-closed</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="water-source">Water Source</Label>
                <Select value={farmData.waterSource} onValueChange={(value) => handleSelectChange('waterSource', value)}>
                    <SelectTrigger id="water-source"><SelectValue placeholder="Select water source" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="well">Well</SelectItem>
                        <SelectItem value="borewell">Borewell</SelectItem>
                        <SelectItem value="tap">Tap</SelectItem>
                        <SelectItem value="other">Others</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <div className="grid gap-2">
                <Label>Waste / Manure Management</Label>
                <Select value={farmData.wasteManagement} onValueChange={(value) => handleSelectChange('wasteManagement', value)}>
                    <SelectTrigger><SelectValue placeholder="Select method" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="composting">Composting</SelectItem>
                        <SelectItem value="disposal">Disposal</SelectItem>
                        <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
       
        {/* Health Information */}
        <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label>Vaccination Record</Label>
                <Select value={farmData.vaccinationRecord} onValueChange={(value) => handleSelectChange('vaccinationRecord', value)}>
                    <SelectTrigger><SelectValue placeholder="Select vaccination status" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="done">Done</SelectItem>
                        <SelectItem value="not-done">Not Done</SelectItem>
                        <SelectItem value="partial">Partial</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label>Any past disease outbreaks?</Label>
                <RadioGroup value={farmData.pastOutbreaks} onValueChange={(value) => handleSelectChange('pastOutbreaks', value as 'Yes' | 'No')} className="flex items-center gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="outbreak-yes" />
                        <Label htmlFor="outbreak-yes" className="font-normal">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="outbreak-no" />
                        <Label htmlFor="outbreak-no" className="font-normal">No</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
        {farmData.pastOutbreaks === 'Yes' && (
            <div className="grid gap-2">
                <Label htmlFor="past-diseases">If yes, specify which disease(s) and when</Label>
                <Textarea id="past-diseases" placeholder="e.g., Newcastle (Jan 2023), Swine Fever (May 2022)" value={farmData.pastDiseases} onChange={(e) => handleInputChange('pastDiseases', e.target.value)} />
            </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges}>Save and View Profile</Button>
      </CardFooter>
    </Card>
  );
}
