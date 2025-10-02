
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function FarmSetupPage() {
    const [farmType, setFarmType] = useState<string>('');
    const [pastOutbreaks, setPastOutbreaks] = useState<string>('No');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Setup</CardTitle>
        <CardDescription>Configure your farm details here. This information helps us tailor our recommendations for you.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* Basic Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="farmer-name">Name of Farmer</Label>
            <Input id="farmer-name" placeholder="Enter your full name" defaultValue="Farm Owner" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">Contact (Mobile / Email)</Label>
            <Input id="contact" placeholder="Enter your mobile or email" defaultValue="+2348012345678" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="location">Location (District, State)</Label>
                <Input id="location" placeholder="E.g., Jos, Plateau State" defaultValue="Jos, Plateau State" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="experience">Years of Experience in Farming</Label>
                <Select>
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
                 <Select onValueChange={setFarmType}>
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
                    farmType === 'poultry' ? "e.g., Broiler, Layer" :
                    farmType === 'pig' ? "e.g., Large White Yorkshire" :
                    "e.g., Broiler, Landrace"
                } />
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="farm-size">Farm Size (Number of birds / pigs)</Label>
                <Input id="farm-size" type="number" placeholder="e.g., 500" />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="farm-capacity">Farm Capacity (Maximum housing)</Label>
                <Input id="farm-capacity" type="number" placeholder="e.g., 1000" />
            </div>
        </div>

        {/* Operations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="grid gap-2">
                <Label htmlFor="feeding-method">Feeding Method</Label>
                <Select>
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
                <Select>
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
                <Select>
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
            <Select>
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
                <Select>
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
                 <RadioGroup defaultValue="no" className="flex items-center gap-4 pt-2">
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
                <Input id="mortality-rate" type="number" placeholder="e.g., 5" />
            </div>
            <div className="grid gap-2">
                <Label>Any past disease outbreaks?</Label>
                <RadioGroup defaultValue={pastOutbreaks} onValueChange={setPastOutbreaks} className="flex items-center gap-4 pt-2">
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
        {pastOutbreaks === 'Yes' && (
            <div className="grid gap-2">
                <Label htmlFor="past-diseases">If yes, specify which disease(s)</Label>
                <Textarea id="past-diseases" placeholder="e.g., Newcastle, Swine Fever" />
            </div>
        )}

        {/* Production & Market */}
        <div className="grid md:grid-cols-2 gap-6">
            <div className="grid gap-2">
                <Label>Main Purpose</Label>
                <Select>
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
                <Input id="monthly-production" placeholder="e.g., 100 crates of eggs or 500kg of pork" />
            </div>
        </div>
        <div className="grid gap-2">
            <Label>Current Buyers</Label>
            <Select>
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
                 <RadioGroup defaultValue="no" className="flex items-center gap-4 pt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="scheme-yes" /><Label htmlFor="scheme-yes">Yes</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="scheme-no" /><Label htmlFor="scheme-no">No</Label></div>
                </RadioGroup>
            </div>
            <div className="grid gap-2">
                <Label>Insurance taken for livestock?</Label>
                 <RadioGroup defaultValue="no" className="flex items-center gap-4 pt-2">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="insurance-yes" /><Label htmlFor="insurance-yes">Yes</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="insurance-no" /><Label htmlFor="insurance-no">No</Label></div>
                </RadioGroup>
            </div>
        </div>

      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
