
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Edit } from "lucide-react";

type FarmData = {
    farmerName: string;
    contact: string;
    location: string;
    experience: string;
    farmType: string;
    breedType: string;
    farmSize: string;
    farmCapacity: string;
    feedingMethod: string;
    housingType: string;
    waterSource: string;
    wasteManagement: string;
    vaccinationRecord: string;
    dewormingPractices: string;
    mortalityRate: string;
    pastOutbreaks: 'Yes' | 'No';
    pastDiseases?: string;
    mainPurpose: string;
    monthlyProduction: string;
    currentBuyers: string;
    governmentScheme: 'Yes' | 'No';
    insurance: 'Yes' | 'No';
};

const initialFarmData: FarmData = {
    farmerName: "Farm Owner",
    contact: "+2348012345678",
    location: "Jos, Plateau State",
    experience: "",
    farmType: "",
    breedType: "",
    farmSize: "",
    farmCapacity: "",
    feedingMethod: "",
    housingType: "",
    waterSource: "",
    wasteManagement: "",
    vaccinationRecord: "",
    dewormingPractices: "no",
    mortalityRate: "",
    pastOutbreaks: "No",
    pastDiseases: "",
    mainPurpose: "",
    monthlyProduction: "",
    currentBuyers: "",
    governmentScheme: "no",
    insurance: "no",
};

export default function FarmSetupPage() {
    const [isEditing, setIsEditing] = useState(true);
    const [farmData, setFarmData] = useState<FarmData>(initialFarmData);
    const [error, setError] = useState('');

    const handleInputChange = (field: keyof FarmData, value: string) => {
        setFarmData(prev => ({ ...prev, [field]: value }));
    };
    
    const handleSelectChange = (field: keyof FarmData, value: string) => {
        setFarmData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveChanges = () => {
        const requiredFields: (keyof FarmData)[] = [
            'farmerName', 'contact', 'location', 'experience', 'farmType', 'breedType', 
            'farmSize', 'farmCapacity', 'feedingMethod', 'housingType', 'waterSource', 
            'wasteManagement', 'vaccinationRecord', 'dewormingPractices', 'mortalityRate', 
            'pastOutbreaks', 'mainPurpose', 'monthlyProduction', 'currentBuyers', 
            'governmentScheme', 'insurance'
        ];

        for (const field of requiredFields) {
            if (!farmData[field]) {
                setError(`'${field.replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase())}' field is required.`);
                return;
            }
        }
        
        if (farmData.pastOutbreaks === 'Yes' && !farmData.pastDiseases) {
             setError("Please specify which disease(s) for past outbreaks.");
             return;
        }

        setError('');
        setIsEditing(false);
    };

  if (!isEditing) {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Farm Details</CardTitle>
                        <CardDescription>Review your farm's configured details.</CardDescription>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4">
                    {Object.entries(farmData).map(([key, value]) => {
                         if (!value || (key === 'pastDiseases' && farmData.pastOutbreaks === 'No')) return null;
                         const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        return (
                            <div key={key} className="flex flex-col sm:flex-row sm:items-center">
                                <Label className="w-full sm:w-1/3 font-semibold">{label}</Label>
                                <p className="text-muted-foreground w-full sm:w-2/3">{value}</p>
                            </div>
                        )
                    })}
                </div>
            </CardContent>
             <CardFooter>
                 <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
            </CardFooter>
        </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Setup</CardTitle>
        <CardDescription>Configure your farm details here. This information helps us tailor our recommendations for you.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {error && (
             <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Missing Information</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="farmer-name">Name of Farmer</Label>
            <Input id="farmer-name" placeholder="Enter your full name" value={farmData.farmerName} onChange={(e) => handleInputChange('farmerName', e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">Contact (Mobile / Email)</Label>
            <Input id="contact" placeholder="Enter your mobile or email" value={farmData.contact} onChange={(e) => handleInputChange('contact', e.target.value)} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="location">Location (District, State)</Label>
                <Input id="location" placeholder="E.g., Jos, Plateau State" value={farmData.location} onChange={(e) => handleInputChange('location', e.target.value)} />
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
                <Label htmlFor="feeding-method">Feeding Method</Label>
                <Select value={farmData.feedingMethod} onValueChange={(value) => handleSelectChange('feedingMethod', value)}>
                    <SelectTrigger id="feeding-method"><SelectValue placeholder="Select feeding method" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="commercial">Commercial Feed</SelectItem>
                        <SelectItem value="homemade">Homemade</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
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
        </div>
        <div className="grid gap-2">
            <Label>Waste / Manure Management Method</Label>
            <Select value={farmData.wasteManagement} onValueChange={(value) => handleSelectChange('wasteManagement', value)}>
                <SelectTrigger><SelectValue placeholder="Select waste management method" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="composting">Composting</SelectItem>
                    <SelectItem value="disposal">Disposal</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                </SelectContent>
            </Select>
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
                <Label>Deworming Practices</Label>
                 <RadioGroup value={farmData.dewormingPractices} onValueChange={(value) => handleSelectChange('dewormingPractices', value)} className="flex items-center gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="deworm-yes" />
                        <Label htmlFor="deworm-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="deworm-no" />
                        <Label htmlFor="deworm-no">No</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="occasional" id="deworm-occasional" />
                        <Label htmlFor="deworm-occasional">Occasional</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="mortality-rate">Mortality rate in last 6 months (%)</Label>
                <Input id="mortality-rate" type="number" placeholder="e.g., 5" value={farmData.mortalityRate} onChange={(e) => handleInputChange('mortalityRate', e.target.value)} />
            </div>
            <div className="grid gap-2">
                <Label>Any past disease outbreaks?</Label>
                <RadioGroup value={farmData.pastOutbreaks} onValueChange={(value) => handleSelectChange('pastOutbreaks', value as 'Yes' | 'No')} className="flex items-center gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Yes" id="outbreak-yes" />
                        <Label htmlFor="outbreak-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="No" id="outbreak-no" />
                        <Label htmlFor="outbreak-no">No</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
        {farmData.pastOutbreaks === 'Yes' && (
            <div className="grid gap-2">
                <Label htmlFor="past-diseases">If yes, specify which disease(s)</Label>
                <Textarea id="past-diseases" placeholder="e.g., Newcastle, Swine Fever" value={farmData.pastDiseases} onChange={(e) => handleInputChange('pastDiseases', e.target.value)} />
            </div>
        )}

        {/* Production & Market */}
        <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label>Main Purpose</Label>
                <Select value={farmData.mainPurpose} onValueChange={(value) => handleSelectChange('mainPurpose', value)}>
                    <SelectTrigger><SelectValue placeholder="Select main purpose" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="meat">Meat</SelectItem>
                        <SelectItem value="egg">Egg</SelectItem>
                        <SelectItem value="breeding">Breeding</SelectItem>
                        <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label htmlFor="monthly-production">Average monthly production</Label>
                <Input id="monthly-production" placeholder="e.g., 100 crates of eggs or 500kg of pork" value={farmData.monthlyProduction} onChange={(e) => handleInputChange('monthlyProduction', e.target.value)} />
            </div>
        </div>
        <div className="grid gap-2">
            <Label>Current Buyers</Label>
            <Select value={farmData.currentBuyers} onValueChange={(value) => handleSelectChange('currentBuyers', value)}>
                <SelectTrigger><SelectValue placeholder="Select primary buyer type" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="local">Local Market</SelectItem>
                    <SelectItem value="wholesaler">Wholesaler</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                </SelectContent>
            </Select>
        </div>

        {/* Governance */}
        <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label>Registered under any Government Scheme?</Label>
                 <RadioGroup value={farmData.governmentScheme} onValueChange={(value) => handleSelectChange('governmentScheme', value as 'Yes' | 'No')} className="flex items-center gap-4 pt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="Yes" id="scheme-yes" /><Label htmlFor="scheme-yes">Yes</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="No" id="scheme-no" /><Label htmlFor="scheme-no">No</Label></div>
                </RadioGroup>
            </div>
            <div className="grid gap-2">
                <Label>Insurance taken for livestock?</Label>
                 <RadioGroup value={farmData.insurance} onValueChange={(value) => handleSelectChange('insurance', value as 'Yes' | 'No')} className="flex items-center gap-4 pt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="Yes" id="insurance-yes" /><Label htmlFor="insurance-yes">Yes</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="No" id="insurance-no" /><Label htmlFor="insurance-no">No</Label></div>
                </RadioGroup>
            </div>
        </div>

      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}

    