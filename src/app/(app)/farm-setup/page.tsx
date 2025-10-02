
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FarmSetupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Farm Setup</CardTitle>
        <CardDescription>Configure your farm details here. This information helps us tailor our recommendations for you.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
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
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
