
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft, Upload } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const otpSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  otp: z.string().min(4, 'Please enter a valid OTP.'),
});

const vetSetupSchema = z.object({
  // Personal Details
  fullName: z.string().min(2, 'Full Name is required.'),
  gender: z.string().optional(),
  dob: z.string().min(1, 'Date of birth is required'),
  email: z.string().email('Please enter a valid email address.'),
  // Professional Details
  registrationNumber: z.string().min(2, 'Registration Number is required.'),
  qualification: z.string().min(2, 'Qualification is required.'),
  experience: z.string().min(1, 'Years of experience is required.'),
  specialization: z.enum(['Poultry', 'Pig', 'Both', 'Other']),
  workplace: z.string().min(2, 'Current workplace is required.'),
  // Location & Availability
  district: z.string().min(2, 'District is required.'),
  state: z.string().min(2, 'State is required.'),
  availability: z.string().min(2, 'Availability is required.'),
  consultationMode: z.enum(['On-site', 'Online', 'Phone/Video']),
  // Authentication Documents
  idProof: z.string().optional(),
  vetCouncilCertificate: z.string().optional(),
  // Account Setup
  username: z.string().min(2, 'Username is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  securityQuestion: z.string().optional(),
});

type OtpFormValues = z.infer<typeof otpSchema>;
type VetSetupFormValues = z.infer<typeof vetSetupSchema>;

export default function RegisterVeterinarianPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [idProofFileName, setIdProofFileName] = useState('');
  const [certFileName, setCertFileName] = useState('');

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { phone: '', otp: '' },
  });

  const setupForm = useForm<VetSetupFormValues>({
    resolver: zodResolver(vetSetupSchema),
    defaultValues: {
        fullName: '',
        gender: '',
        dob: '',
        email: '',
        registrationNumber: '',
        qualification: '',
        experience: '',
        specialization: 'Both',
        workplace: '',
        district: '',
        state: '',
        availability: '',
        consultationMode: 'Phone/Video',
        idProof: '',
        vetCouncilCertificate: '',
        username: '',
        password: '',
        securityQuestion: '',
    }
  });

  const handleGetOtp = async () => {
    const phoneValid = await otpForm.trigger('phone');
    if (phoneValid) {
        setLoading(true);
        console.log('Simulating sending OTP to:', otpForm.getValues('phone'));
        await new Promise(res => setTimeout(res, 500)); // Simulate API call
        setOtpSent(true);
        setLoading(false);
    }
  };

  const handleOtpSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    setLoading(true);
    console.log('Simulating OTP verification for:', data.phone);
    await new Promise(res => setTimeout(res, 500)); // Simulate API call
    setVerifiedPhone(data.phone);
    setStep(2);
    setLoading(false);
  };
  
  const onSetupSubmit: SubmitHandler<VetSetupFormValues> = async (data) => {
    setLoading(true);
    const vetProfile = { ...data, phone: verifiedPhone };
    console.log('Veterinarian setup data:', vetProfile);
    
    localStorage.setItem(`vet-profile-${data.username}`, JSON.stringify(vetProfile));

    try {
      await signIn(data.username, data.password, { role: 'veterinarian', phoneNumber: verifiedPhone, displayName: data.fullName });
      router.push('/dashboard'); // Redirect to a future vet dashboard
    } catch(e) {
        console.error("Failed to sign in after vet registration", e);
    } finally {
        setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: 'idProof' | 'vetCouncilCertificate') => {
    if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (fieldName === 'idProof') setIdProofFileName(file.name);
        if (fieldName === 'vetCouncilCertificate') setCertFileName(file.name);
        // In a real app, you would handle file upload and get a URL
        setupForm.setValue(fieldName, 'path/to/uploaded/' + file.name);
    } else {
        if (fieldName === 'idProof') setIdProofFileName('');
        if (fieldName === 'vetCouncilCertificate') setCertFileName('');
        setupForm.setValue(fieldName, undefined);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-muted py-12">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Veterinarian Registration</CardTitle>
          <CardDescription>
            {step === 1 && 'Let\'s start by verifying your mobile number.'}
            {step === 2 && 'Great! Now, please provide your professional details.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-4 max-w-sm mx-auto">
                <FormField
                  control={otpForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 08012345678" {...field} disabled={otpSent}/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {otpSent && (
                    <FormField
                    control={otpForm.control}
                    name="otp"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>One-Time Password (OTP)</FormLabel>
                        <FormControl>
                            <Input placeholder="Enter OTP from SMS" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                )}
                
                {!otpSent ? (
                    <Button onClick={handleGetOtp} className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : 'Get OTP'}
                    </Button>
                ) : (
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
                    </Button>
                )}
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...setupForm}>
              <form onSubmit={setupForm.handleSubmit(onSetupSubmit)} className="space-y-6">
                
                {/* Personal Details */}
                <div className="space-y-4 p-4 border rounded-md">
                    <h3 className="font-semibold text-lg">Personal Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={setupForm.control} name="fullName" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Dr. John Doe" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="gender" render={({ field }) => (<FormItem><FormLabel>Gender (Optional)</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger></FormControl><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="dob" render={({ field }) => (<FormItem><FormLabel>Date of Birth</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Email ID</FormLabel><FormControl><Input type="email" placeholder="e.g., dr.johndoe@vet.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                </div>

                {/* Professional Details */}
                <div className="space-y-4 p-4 border rounded-md">
                    <h3 className="font-semibold text-lg">Professional Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={setupForm.control} name="registrationNumber" render={({ field }) => (<FormItem><FormLabel>Veterinary License ID</FormLabel><FormControl><Input placeholder="Your license number" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="qualification" render={({ field }) => (<FormItem><FormLabel>Qualification</FormLabel><FormControl><Input placeholder="e.g., B.V.Sc, M.V.Sc" {...field} /></FormControl><FormMessage /></FormItem>)} />
                         <FormField control={setupForm.control} name="experience" render={({ field }) => (<FormItem><FormLabel>Years of Experience</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select years..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="0-2">0-2 Years</SelectItem><SelectItem value="3-5">3-5 Years</SelectItem><SelectItem value="6-10">6-10 Years</SelectItem><SelectItem value="10+">10+ Years</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="specialization" render={({ field }) => (<FormItem><FormLabel>Specialization</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select specialization..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="Poultry">Poultry</SelectItem><SelectItem value="Pig">Pig</SelectItem><SelectItem value="Both">Both</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    </div>
                     <FormField control={setupForm.control} name="workplace" render={({ field }) => (<FormItem><FormLabel>Current Workplace / Clinic</FormLabel><FormControl><Input placeholder="e.g., Green Pastures Vet Clinic" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                
                {/* Location & Availability */}
                <div className="space-y-4 p-4 border rounded-md">
                    <h3 className="font-semibold text-lg">Location & Availability</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={setupForm.control} name="district" render={({ field }) => (<FormItem><FormLabel>District</FormLabel><FormControl><Input placeholder="e.g., Jos South" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="state" render={({ field }) => (<FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="e.g., Plateau" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                     <FormField control={setupForm.control} name="availability" render={({ field }) => (<FormItem><FormLabel>Availability</FormLabel><FormControl><Textarea placeholder="e.g., Mon-Fri 9am-5pm, Available for emergency calls" {...field} /></FormControl><FormMessage /></FormItem>)} />
                     <FormField control={setupForm.control} name="consultationMode" render={({ field }) => (<FormItem><FormLabel>Preferred Mode of Consultation</FormLabel><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="On-site" /></FormControl><FormLabel className="font-normal">On-site</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Online" /></FormControl><FormLabel className="font-normal">Online</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Phone/Video" /></FormControl><FormLabel className="font-normal">Phone/Video</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>)} />
                </div>
                
                {/* Authentication Documents */}
                <div className="space-y-4 p-4 border rounded-md">
                     <h3 className="font-semibold text-lg">Authentication Documents</h3>
                     <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={setupForm.control} name="idProof" render={() => (
                            <FormItem>
                                <FormLabel>ID Proof (Aadhaar/PAN/License)</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input id="id-proof" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,image/*" onChange={(e) => handleFileChange(e, 'idProof')} />
                                        <div className="flex items-center justify-center w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background">
                                            <Upload className="w-4 h-4 mr-2 text-muted-foreground" />
                                            <span className="text-muted-foreground">{idProofFileName || 'Upload ID Proof'}</span>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={setupForm.control} name="vetCouncilCertificate" render={() => (
                            <FormItem>
                                <FormLabel>Veterinary Council Certificate</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input id="vet-cert" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,image/*" onChange={(e) => handleFileChange(e, 'vetCouncilCertificate')} />
                                        <div className="flex items-center justify-center w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background">
                                            <Upload className="w-4 h-4 mr-2 text-muted-foreground" />
                                            <span className="text-muted-foreground">{certFileName || 'Upload Certificate'}</span>
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                     </div>
                </div>

                {/* Account Setup */}
                <div className="space-y-4 p-4 border rounded-md">
                    <h3 className="font-semibold text-lg">Account Setup</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={setupForm.control} name="username" render={({ field }) => (<FormItem><FormLabel>Username</FormLabel><FormControl><Input placeholder="Create a username" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="password" render={({ field }) => (<FormItem><FormLabel>Password</FormLabel><FormControl><Input type="password" placeholder="Create a password" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                     <FormField control={setupForm.control} name="securityQuestion" render={({ field }) => (<FormItem><FormLabel>Security Question (Optional)</FormLabel><FormControl><Input placeholder="e.g., Your first pet's name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>


                <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Complete Registration
                    </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="justify-center">
             <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login?role=veterinarian" className="font-semibold text-primary hover:underline">
                    Sign In
                  </Link>
                </p>
        </CardFooter>
      </Card>
    </div>
  );
}
