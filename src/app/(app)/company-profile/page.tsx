
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Edit, Building, Briefcase, Target, Phone, Mail, MapPin } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type CompanyData = {
    companyName: string;
    companyType: string;
    registrationNumber: string;
    gstNumber?: string;
    email: string;
    phone: string;
    address: string;
    branchAddress?: string;
    district: string;
    state: string;
    servicesProvided: string;
    targetLivestock: 'Poultry' | 'Pig' | 'Both';
    capacity: string;
    businessLicense?: string;
};

export default function CompanyProfilePage() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [companyData, setCompanyData] = useState<CompanyData | null>(null);
    const [error, setError] = useState('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
      if (user?.displayName) {
        const savedProfile = localStorage.getItem(`company-profile-${user.displayName}`);
        if (savedProfile) {
          setCompanyData(JSON.parse(savedProfile));
        } else {
          // This case is unlikely if registration flow is followed
          // but could be a fallback.
          setIsEditing(true);
        }
      }
    }, [user]);
    
    if (!isClient) {
      return <div>Loading...</div>; // Or a skeleton loader
    }

    if (!companyData && !isEditing) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Company Profile Not Found</CardTitle>
                </CardHeader>
                <CardContent>
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>We couldn't load the company profile. Please try registering again.</AlertDescription>
                    </Alert>
                </CardContent>
            </Card>
        )
    }

  if (isEditing || !companyData) {
    // For now, editing is a future feature. The view is prioritized.
    // This could be built out with a form similar to register-company.
    return (
        <Card>
            <CardHeader><CardTitle>Editing Mode</CardTitle></CardHeader>
            <CardContent>
                <p>The ability to edit company profiles will be available in a future update.</p>
                <Button onClick={() => setIsEditing(false)} className="mt-4">View Profile</Button>
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
                            <AvatarFallback><Building /></AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">{companyData.companyName}</CardTitle>
                            <CardDescription>{companyData.state}, {companyData.district}</CardDescription>
                        </div>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-8 border-t pt-6">
                 {/* Basic Details */}
                 <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Briefcase />Basic Details</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                        <div><Label className="font-semibold mb-1">Company Type</Label><p className="text-muted-foreground">{companyData.companyType}</p></div>
                        <div><Label className="font-semibold mb-1">Registration Number</Label><p className="text-muted-foreground">{companyData.registrationNumber}</p></div>
                        {companyData.gstNumber && <div><Label className="font-semibold mb-1">GST Number</Label><p className="text-muted-foreground">{companyData.gstNumber}</p></div>}
                    </div>
                 </div>

                 {/* Contact Info */}
                 <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Phone />Contact Information</h3>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                        <div><Label className="font-semibold mb-1">Email</Label><p className="text-muted-foreground">{companyData.email}</p></div>
                        <div><Label className="font-semibold mb-1">Phone</Label><p className="text-muted-foreground">{companyData.phone}</p></div>
                        <div><Label className="font-semibold mb-1">State</Label><p className="text-muted-foreground">{companyData.state}</p></div>
                        <div><Label className="font-semibold mb-1">District</Label><p className="text-muted-foreground">{companyData.district}</p></div>
                    </div>
                    <div className="mt-4 text-sm">
                         <Label className="font-semibold mb-1">Head Office Address</Label>
                         <p className="text-muted-foreground">{companyData.address}</p>
                    </div>
                    {companyData.branchAddress && 
                        <div className="mt-4 text-sm">
                             <Label className="font-semibold mb-1">Branch Address</Label>
                             <p className="text-muted-foreground">{companyData.branchAddress}</p>
                        </div>
                    }
                 </div>

                  {/* Business Info */}
                 <div>
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2"><Target />Business Information</h3>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                        <div><Label className="font-semibold mb-1">Target Livestock</Label><p className="text-muted-foreground">{companyData.targetLivestock}</p></div>
                        <div><Label className="font-semibold mb-1">Capacity</Label><p className="text-muted-foreground">{companyData.capacity}</p></div>
                    </div>
                    <div className="mt-4 text-sm">
                         <Label className="font-semibold mb-1">Services Provided</Label>
                         <p className="text-muted-foreground">{companyData.servicesProvided}</p>
                    </div>
                 </div>

            </CardContent>
        </Card>
    </div>
  )
}
