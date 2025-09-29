import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
            <Label htmlFor="farm-name">Farm Name</Label>
            <Input id="farm-name" placeholder="E.g., Green Meadows Farm" defaultValue="My Farm" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="farm-type">Farm Type</Label>
            <Select defaultValue="poultry">
              <SelectTrigger id="farm-type">
                <SelectValue placeholder="Select farm type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="poultry">Poultry</SelectItem>
                <SelectItem value="pig">Pig</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Input id="location" placeholder="E.g., Jos, Plateau State" defaultValue="Jos, Plateau State" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="farm-size">Farm Size (in acres)</Label>
            <Input id="farm-size" type="number" placeholder="e.g., 50" defaultValue="10" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="breed">Primary Breed</Label>
            <Input id="breed" placeholder="E.g., Broiler, Yorkshire" defaultValue="Broiler" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="population">Animal Population</Label>
            <Input id="population" type="number" placeholder="e.g., 1000" defaultValue="500" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="history">Farm Health History</Label>
          <Textarea id="history" placeholder="Briefly describe any significant past health issues, vaccinations, etc." className="min-h-24" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
