
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


const setupSchema = z.object({
  role: z.enum(['farmer', 'company'], { required_error: 'Please select a role.' }),
  name: z.string().min(2, 'Name is required.'),
  location: z.string().min(2, 'Location is required.'),
  farmType: z.string().min(2, 'Farming type is required.'),
  experience: z.string().min(1, 'Years of experience is required.'),
  livestockQuantity: z.coerce.number().min(1, 'Livestock quantity must be at least 1.'),
});

type SetupFormValues = z.infer<typeof setupSchema>;

export default function SetupPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const form = useForm<SetupFormValues>({
    resolver: zodResolver(setupSchema),
    defaultValues: {
      role: undefined,
      name: '',
      location: '',
      farmType: '',
      experience: '',
      livestockQuantity: 1,
    },
  });

  const role = form.watch('role');

  const handleRoleSubmit = (values: { role: 'farmer' | 'company' }) => {
    form.setValue('role', values.role);
    setStep(2);
  };
  
  const onSubmit = async (data: SetupFormValues) => {
    setLoading(true);
    console.log('Account setup data:', data, 'for user:', user?.uid);
    // Here you would typically save this data to your database (e.g., Firestore)
    // associated with the user.uid.
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    router.push('/dashboard');
    setLoading(false);
  };

  if (!user) {
    return null; // Or a loading spinner, since the layout should handle redirection
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Account Setup</CardTitle>
          <CardDescription>
            {step === 1 ? 'First, tell us who you are.' : "Great! Now, a little bit about your operations."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            {step === 1 && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value: 'farmer' | 'company') => handleRoleSubmit({ role: value })}
                        defaultValue={field.value}
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
            )}

            {step === 2 && (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FormField
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                  control={form.control}
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
                        Go to Dashboard
                    </Button>
                </div>
              </form>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
