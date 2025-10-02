
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';

const otpSchema = z.object({
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  otp: z.string().min(4, 'Please enter a valid OTP.'),
});

const setupSchema = z.object({
  username: z.string().min(2, 'Username is required.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  name: z.string().min(2, 'Name is required.'),
  location: z.string().min(2, 'Location is required.'),
  farmType: z.string().min(2, 'Farming type is required.'),
  experience: z.string().min(1, 'Years of experience is required.'),
  livestockQuantity: z.coerce.number().min(1, 'Livestock quantity must be at least 1.'),
});

type OtpFormValues = z.infer<typeof otpSchema>;
type SetupFormValues = z.infer<typeof setupSchema>;

export default function SetupPage() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { phone: '', otp: '' },
  });

  const setupForm = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      username: '',
      password: '',
      name: '',
      location: '',
      farmType: '',
      experience: '',
      livestockQuantity: 1,
    },
  });

  const handleGetOtp = async () => {
    const phoneValid = await otpForm.trigger('phone');
    if (phoneValid) {
        setLoading(true);
        console.log('Simulating sending OTP to:', otpForm.getValues('phone'));
        await new Promise(res => setTimeout(res, 500));
        setOtpSent(true);
        setLoading(false);
    }
  };

  const handleOtpSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    setLoading(true);
    console.log('Simulating OTP verification for:', data.phone);
    await new Promise(res => setTimeout(res, 500));
    setVerifiedPhone(data.phone);
    setStep(2);
    setLoading(false);
  };
  
  const onSetupSubmit: SubmitHandler<SetupFormValues> = async (data) => {
    setLoading(true);
    console.log('Account setup data:', { ...data, phone: verifiedPhone });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      await signIn(data.username, data.password, {
        displayName: data.name,
        phoneNumber: verifiedPhone,
        location: data.location,
        experience: data.experience,
      });
      router.push('/farm-setup'); // Redirect to farm-setup to complete profile
    } catch (e) {
      console.error("Failed to sign in after registration", e);
      // Handle error, maybe show a message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Your Farmer Account</CardTitle>
          <CardDescription>
            {step === 1 && 'First, let\'s verify your phone number to get started.'}
            {step === 2 && 'Great! Now, let\'s complete your profile.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <Form {...otpForm}>
              <form onSubmit={otpForm.handleSubmit(handleOtpSubmit)} className="space-y-4">
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


                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login?role=farmer" className="font-semibold text-primary hover:underline">
                    Sign In
                  </Link>
                </p>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...setupForm}>
              <form onSubmit={setupForm.handleSubmit(onSetupSubmit)} className="space-y-4">
                 <FormField
                  control={setupForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Create a username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={setupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Create a password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={setupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={setupForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Location</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Jos, Plateau State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={setupForm.control}
                  name="farmType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        What do you farm?
                      </FormLabel>
                       <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="poultry">Poultry</SelectItem>
                          <SelectItem value="pig">Pigs</SelectItem>
                          <SelectItem value="both">Both Poultry and Pigs</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={setupForm.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Years of Experience</FormLabel>
                      <Select onValuechange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select years of experience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 Years</SelectItem>
                          <SelectItem value="2-5">2-5 Years</SelectItem>
                          <SelectItem value="6-10">6-10 Years</SelectItem>
                          <SelectItem value="10+">10+ Years</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={setupForm.control}
                  name="livestockQuantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Total Livestock Quantity</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 500" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-between items-center pt-4">
                    <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                    <Button type="submit" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Complete Registration
                    </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
