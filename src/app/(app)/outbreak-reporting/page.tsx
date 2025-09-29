
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Send } from "lucide-react";

export default function OutbreakReportingPage() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Report a Disease Outbreak</CardTitle>
        <CardDescription>
          Alert your local farming community about a potential disease outbreak. 
          Your report will be shared anonymously to help others take preventive action.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="disease">Suspected Disease</Label>
            <Input id="disease" placeholder="e.g., Avian Influenza" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="farm-type">Affected Livestock</Label>
            <Select>
              <SelectTrigger id="farm-type">
                <SelectValue placeholder="Select livestock type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="poultry">Poultry</SelectItem>
                <SelectItem value="pig">Pigs</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location of Outbreak</Label>
          <Input id="location" placeholder="e.g., Near Jos, Plateau State" defaultValue="Jos, Plateau State" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description of Symptoms</Label>
          <Textarea id="description" placeholder="Describe the signs and symptoms you've observed..." className="min-h-24" />
        </div>
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            Please provide accurate and truthful information. Misinformation can cause unnecessary panic and harm to the community. This service is for community safety.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter>
        <Button>
            <Send className="mr-2"/>
            Submit Report
        </Button>
      </CardFooter>
    </Card>
  );
}
