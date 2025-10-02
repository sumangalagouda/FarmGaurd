
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

const otpSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  otp: z.string().min(4, 'Please enter a valid OTP.'),
});

const companySetupSchema = z.object({
  companyName: z.string().min(2, 'Company Name is required.'),
  companyType: z.string().min(2, 'Type of Company is required.'),
  registrationNumber: z.string().min(2, 'Registration Number is required.'),
  gstNumber: z.string().optional(),
  email: z.string().email('Please enter a valid email address.'),
  address: z.string().min(5, 'Head Office Address is required.'),
  branchAddress: z.string().optional(),
  district: z.string().min(2, 'District is required.'),
  state: z.string().min(2, 'State is required.'),
  servicesProvided: z.string().min(3, 'Services provided are required.'),
  targetLivestock: z.enum(['Poultry', 'Pig', 'Both']),
  capacity: z.string().min(1, 'Capacity is required.'),
  businessLicense: z.string().optional(),
});

type OtpFormValues = z.infer<typeof otpSchema>;
type CompanySetupFormValues = z.infer<typeof companySetupSchema>;

export default function RegisterCompanyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [fileName, setFileName] = useState('');

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { phone: '', otp: '' },
  });

  const setupForm = useForm<CompanySetupFormValues>({
    resolver: zodResolver(companySetupSchema),
    defaultValues: {
      companyName: '',
      companyType: '',
      registrationNumber: '',
      gstNumber: '',
      email: '',
      address: '',
      branchAddress: '',
      district: '',
      state: '',
      servicesProvided: '',
      capacity: '',
      businessLicense: '',
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
  
  const onSetupSubmit: SubmitHandler<CompanySetupFormValues> = async (data) => {
    setLoading(true);
    console.log('Company setup data:', { ...data, phone: verifiedPhone });
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/login?role=company&registered=true'); // Redirect to login page after registration
    setLoading(false);
  };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFileName(file.name);
            // In a real app, you would handle file upload and get a URL
            setupForm.setValue('businessLicense', 'path/to/uploaded/' + file.name);
        } else {
            setFileName('');
            setupForm.setValue('businessLicense', undefined);
        }
    };


  return (
    <div className="flex items-center justify-center min-h-screen bg-muted py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Register Your Company</CardTitle>
          <CardDescription>
            {step === 1 && 'Let\'s start by verifying your company\'s contact number.'}
            {step === 2 && 'Great! Now, please provide your company details.'}
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
                      <FormLabel>Phone Number</FormLabel>
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
                
                {/* Basic Details */}
                <div className="space-y-4 p-4 border rounded-md">
                    <h3 className="font-semibold text-lg">Basic Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={setupForm.control} name="companyName" render={({ field }) => (<FormItem><FormLabel>Company Name</FormLabel><FormControl><Input placeholder="Your company's legal name" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="companyType" render={({ field }) => (<FormItem><FormLabel>Type of Company</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="feed-supplier">Feed Supplier</SelectItem><SelectItem value="pharma">Pharma</SelectItem><SelectItem value="buyer">Buyer</SelectItem><SelectItem value="exporter">Exporter</SelectItem><SelectItem value="startup">Startup</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="registrationNumber" render={({ field }) => (<FormItem><FormLabel>Registration Number / License ID</FormLabel><FormControl><Input placeholder="e.g., RC123456" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="gstNumber" render={({ field }) => (<FormItem><FormLabel>GST Number (optional)</FormLabel><FormControl><Input placeholder="Your GSTIN" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4 p-4 border rounded-md">
                    <h3 className="font-semibold text-lg">Contact Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={setupForm.control} name="email" render={({ field }) => (<FormItem><FormLabel>Official Email</FormLabel><FormControl><Input type="email" placeholder="e.g., contact@company.com" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormItem><FormLabel>Verified Phone Number</FormLabel><FormControl><Input value={verifiedPhone} disabled /></FormControl></FormItem>
                        <FormField control={setupForm.control} name="district" render={({ field }) => (<FormItem><FormLabel>District</FormLabel><FormControl><Input placeholder="e.g., Jos South" {...field} /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="state" render={({ field }) => (<FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="e.g., Plateau" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                    <FormField control={setupForm.control} name="address" render={({ field }) => (<FormItem><FormLabel>Head Office Address</FormLabel><FormControl><Textarea placeholder="Enter the full address of your head office" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={setupForm.control} name="branchAddress" render={({ field }) => (<FormItem><FormLabel>Branch Address (optional)</FormLabel><FormControl><Textarea placeholder="If you have a branch office, enter its address here" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>
                
                {/* Business Information */}
                <div className="space-y-4 p-4 border rounded-md">
                    <h3 className="font-semibold text-lg">Business Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <FormField control={setupForm.control} name="targetLivestock" render={({ field }) => (<FormItem><FormLabel>Target Livestock</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select livestock..." /></SelectTrigger></FormControl><SelectContent><SelectItem value="Poultry">Poultry</SelectItem><SelectItem value="Pig">Pig</SelectItem><SelectItem value="Both">Both</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                        <FormField control={setupForm.control} name="capacity" render={({ field }) => (<FormItem><FormLabel>Capacity</FormLabel><FormControl><Input placeholder="e.g., 500 farmers / 1000 animals" {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                     <FormField control={setupForm.control} name="servicesProvided" render={({ field }) => (<FormItem><FormLabel>Services Provided</FormLabel><FormControl><Textarea placeholder="e.g., feed, vaccines, buyers, consultancy" {...field} /></FormControl><FormMessage /></FormItem>)} />
                </div>

                {/* Verification Documents */}
                <div className="space-y-4 p-4 border rounded-md">
                     <h3 className="font-semibold text-lg">Verification Documents</h3>
                     <FormField control={setupForm.control} name="businessLicense" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Business License / Trade Certificate</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <Input id="business-license" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf,.doc,.docx,image/*" onChange={handleFileChange} />
                                    <div className="flex items-center justify-center w-full h-10 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background">
                                        <Upload className="w-4 h-4 mr-2 text-muted-foreground" />
                                        <span className="text-muted-foreground">{fileName || 'Click to upload a document'}</span>
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                     )} />
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
                  <Link href="/login?role=company" className="font-semibold text-primary hover:underline">
                    Sign In
                  </Link>
                </p>
        </CardFooter>
      </Card>
    </div>
  );
}
