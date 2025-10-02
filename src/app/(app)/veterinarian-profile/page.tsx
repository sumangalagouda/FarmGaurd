
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Edit, User, Stethoscope, Briefcase, MapPin, Clock, MessageSquare, ShieldCheck, Award } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type VetData = {
  fullName: string;
  gender?: string;
  dob: string;
  email: string;
  registrationNumber: string;
  qualification: string;
  experience: string;
  specialization: 'Poultry' | 'Pig' | 'Both' | 'Other';
  workplace: string;
  district: string;
  state: string;
  availability: string;
  consultationMode: 'On-site' | 'Online' | 'Phone/Video';
  idProof?: string;
  vetCouncilCertificate?: string;
  username: string;
};


export default function VeterinarianProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [vetData, setVetData] = useState<VetData | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      if (user?.username) {
        const savedProfile = localStorage.getItem(`vet-profile-${user.username}`);
        if (savedProfile) {
          setVetData(JSON.parse(savedProfile));
        } else {
          // This would be for a case where the profile wasn't saved correctly.
          // For now, we can show an editing state or an error.
          setIsEditing(true); 
        }
      }
    }, [user]);
    
    if (!isClient) {
      return <div>Loading...</div>; // Or a skeleton loader
    }

    if (!vetData && !isEditing) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Veterinarian Profile Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>We couldn't load your profile. Please try registering again.</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        )
    }

  if (isEditing || !vetData) {
    // Editing is a future feature. The view is prioritized.
    return (
        <Card>
            <CardHeader><CardTitle>Editing Mode</CardTitle></CardHeader>
            <CardContent>
                <p>The ability to edit veterinarian profiles will be available in a future update.</p>
                {vetData && <Button onClick={() => setIsEditing(false)} className="mt-4">View Profile</Button>}
            </CardContent>
        </Card>
    );
  }

  return (
    <div className="space-y-6">
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20">
                            <AvatarFallback><Stethoscope /></AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{vetData.fullName}</CardTitle>
                            <CardDescription>{vetData.qualification} - {vetData.specialization} Specialist</CardDescription>
                        </div>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-8 border-t pt-6">
                 {/* Professional Details */}
                 <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Briefcase />Professional Details</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                        <div><Label className="font-semibold mb-1">Veterinary License ID</Label><p className="text-muted-foreground">{vetData.registrationNumber}</p></div>
                        <div><Label className="font-semibold mb-1">Years of Experience</Label><p className="text-muted-foreground">{vetData.experience}</p></div>
                        <div><Label className="font-semibold mb-1">Current Workplace</Label><p className="text-muted-foreground">{vetData.workplace}</p></div>
                    </div>
                 </div>

                 {/* Location & Availability */}
                 <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><MapPin />Location & Availability</h3>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                        <div><Label className="font-semibold mb-1">State</Label><p className="text-muted-foreground">{vetData.state}</p></div>
                        <div><Label className="font-semibold mb-1">District</Label><p className="text-muted-foreground">{vetData.district}</p></div>
                        <div><Label className="font-semibold mb-1">Consultation Mode</Label><p className="text-muted-foreground">{vetData.consultationMode}</p></div>
                    </div>
                    <div className="mt-4 text-sm">
                         <Label className="font-semibold mb-1">Availability</Label>
                         <p className="text-muted-foreground">{vetData.availability}</p>
                    </div>
                 </div>

                  {/* Contact Info */}
                 <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><MessageSquare />Contact Information</h3>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                        <div><Label className="font-semibold mb-1">Email</Label><p className="text-muted-foreground">{vetData.email}</p></div>
                        {user?.phoneNumber && <div><Label className="font-semibold mb-1">Phone</Label><p className="text-muted-foreground">{user.phoneNumber}</p></div>}
                    </div>
                 </div>
            </CardContent>
        </Card>
    </div>
  )
}
