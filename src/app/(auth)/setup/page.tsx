
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2, User, Building } from 'lucide-react';
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
  role: z.enum(['farmer', 'company'], { required_error: 'Please select a role.' }),
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
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verifiedPhone, setVerifiedPhone] = useState('');

  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { phone: '', otp: '' },
  });

  const setupForm = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      role: undefined,
      username: '',
      password: '',
      name: '',
      location: '',
      farmType: '',
      experience: '',
      livestockQuantity: 1,
    },
  });

  const role = setupForm.watch('role');

  const handleOtpSubmit: SubmitHandler<OtpFormValues> = async (data) => {
    setLoading(true);
    console.log('Simulating OTP verification for:', data.phone);
    await new Promise(res => setTimeout(res, 500));
    setVerifiedPhone(data.phone);
    setStep(2);
    setLoading(false);
  };
  
  const handleRoleSelect = (selectedRole: 'farmer' | 'company') => {
    setupForm.setValue('role', selectedRole);
    setStep(3);
  };
  
  const onSetupSubmit: SubmitHandler<SetupFormValues> = async (data) => {
    setLoading(true);
    console.log('Account setup data:', { ...data, phone: verifiedPhone });
    await new Promise(resolve => setTimeout(resolve, 1000)); 
    updateUser({
        uid: `mock-user-${Date.now()}`,
        displayName: data.name,
        phoneNumber: verifiedPhone, 
    });

    if (data.role === 'farmer') {
      router.push('/farm-setup');
    } else {
      router.push('/dashboard');
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create Your Account</CardTitle>
          <CardDescription>
            {step === 1 && 'First, let\'s verify your phone number.'}
            {step === 2 && 'Next, tell us who you are.'}
            {step === 3 && 'Great! Now, let\'s complete your profile.'}
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
                        <Input placeholder="e.g., 08012345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link href="/login" className="font-semibold text-primary hover:underline">
                    Sign In
                  </Link>
                </p>
              </form>
            </Form>
          )}

          {step === 2 && (
            <Form {...setupForm}>
              <FormField
                control={setupForm.control}
                name="role"
                render={() => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value: 'farmer' | 'company') => handleRoleSelect(value)}
                        className="grid grid-cols-2 gap-4"
                      >
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="farmer" id="farmer" className="sr-only" />
                          </FormControl>
                          <Label htmlFor="farmer">
                            <Card className={`cursor-pointer hover:border-primary ${role === 'farmer' ? 'border-primary ring-2 ring-primary' : ''}`}>
                              <CardContent className="flex flex-col items-center justify-center p-6">
                                <User className="h-12 w-12 mb-2" />
                                <span className="font-semibold">I'm a Farmer</span>
                              </CardContent>
                            </Card>
                          </Label>
                        </FormItem>
                        <FormItem>
                          <FormControl>
                            <RadioGroupItem value="company" id="company" className="sr-only" />
                          </FormControl>
                          <Label htmlFor="company">
                            <Card className={`cursor-pointer hover:border-primary ${role === 'company' ? 'border-primary ring-2 ring-primary' : ''}`}>
                              <CardContent className="flex flex-col items-center justify-center p-6">
                                <Building className="h-12 w-12 mb-2" />
                                <span className="font-semibold">I'm a Company</span>
                              </CardContent>
                            </Card>
                          </Label>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Form>
          )}

          {step === 3 && (
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
                        {role === 'farmer' ? 'What do you farm?' : 'What is your company specialty?'}
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                    <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
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
