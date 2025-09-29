import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold font-headline">Settings</h2>
                <p className="text-muted-foreground">Manage your account and notification settings.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Manage your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" defaultValue="Farmer Name" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+234 801 234 5678" disabled />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Profile</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Choose how you want to be notified.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="push" defaultChecked />
                        <label htmlFor="push" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Push Notifications
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="sms" defaultChecked />
                        <label htmlFor="sms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            SMS Alerts
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="email" />
                        <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Email Summaries
                        </label>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button>Save Notifications</Button>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Language & Region</CardTitle>
                    <CardDescription>Set your preferred language and region.</CardDescription>
                </CardHeader>
                <CardContent className="grid sm:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                         <Select defaultValue="english">
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
                     <div className="space-y-2">
                        <Label htmlFor="region">Region</Label>
                        <Input id="region" defaultValue="Nigeria - North Central" />
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button>Save Language & Region</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
