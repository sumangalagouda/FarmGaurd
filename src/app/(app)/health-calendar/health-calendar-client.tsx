
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateHealthCalendar, GenerateHealthCalendarInput, GenerateHealthCalendarOutput } from '@/ai/flows/generate-health-calendar';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Loader2, Bot, CalendarCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { z } from 'zod';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const GenerateHealthCalendarInputSchema = z.object({
  farmType: z.enum(['poultry', 'pig']),
  poultryType: z.string().optional().describe("For poultry: Broiler, Layer, or Native breed."),
  poultryAge: z.string().optional().describe("For poultry: Age in days or weeks."),
  layerStage: z.string().optional().describe("For layers: Pre-lay, peak-lay, or post-lay stage."),
  pigType: z.string().optional().describe("For pigs: Breeding Sow, Boar, Piglet, or Grower."),
  pigAge: z.string().optional().describe("For pigs: Age in weeks or months."),
  sowStatus: z.string().optional().describe("For sows: Pregnant, lactating, or breeding status."),
  pigletStatus: z.string().optional().describe("For piglets: Newborn, weaned, or growing status."),
  pastDiseases: z.string().optional().describe("Any past diseases on the farm, and which ones."),
  vaccinationHistory: z.string().optional().describe("The farm's vaccination history, if available."),
  lastDeworming: z.string().optional().describe("The date of the last deworming."),
  mortalityRate: z.string().optional().describe("Mortality rates in the last cycle."),
});


type FormValues = GenerateHealthCalendarInput;
export type CalendarTask = {
  id: string;
  date: string;
  task: string;
  category: 'vaccination' | 'deworming' | 'health-check' | 'management' | 'supplement';
  status: 'pending' | 'done';
  completionDetails?: { photo?: string; description?: string };
};

export default function HealthCalendarClient() {
  const { user } = useAuth();
  const [calendarData, setCalendarData] = useState<CalendarTask[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const storageKey = `health-calendar-${user?.uid}`;

  const router = useRouter();


  useEffect(() => {
    if (!user) return;
    try {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        setCalendarData(JSON.parse(savedData));
      }
    } catch (e) {
      console.error("Failed to load calendar from localStorage", e);
    }
  }, [storageKey, user]);


  const form = useForm<FormValues>({
    resolver: zodResolver(GenerateHealthCalendarInputSchema),
    defaultValues: {
      farmType: 'poultry',
      poultryType: '',
      poultryAge: '',
      layerStage: '',
      pigType: '',
      pigAge: '',
      sowStatus: '',
      pigletStatus: '',
      pastDiseases: 'No',
      vaccinationHistory: '',
      lastDeworming: '',
      mortalityRate: '',
    },
  });

  const farmType = form.watch('farmType');

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setCalendarData(null);
    setError(null);
    try {
      const result = await generateHealthCalendar(values);
      const tasks: CalendarTask[] = result.tasks.map((t, index) => ({
        ...t,
        id: `${Date.now()}-${index}`, // Generate a unique ID
        date: new Date(t.date).toISOString(), // Store as ISO string
        status: 'pending' as 'pending',
      }));
      setCalendarData(tasks);
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  
  const handleGenerateNew = () => {
    localStorage.removeItem(storageKey);
    setCalendarData(null);
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground py-16">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-lg font-semibold">Generating Your Custom Health Calendar...</p>
        <p className="text-sm">Our AI is analyzing your farm's data to create a personalized schedule.</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error Generating Calendar</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  if (calendarData) {
    const parsedTasks = calendarData.map(t => ({...t, date: new Date(t.date)}));
    const modifiers = {
      vaccination: parsedTasks.filter(e => e.category === 'vaccination').map(e => e.date),
      deworming: parsedTasks.filter(e => e.category === 'deworming').map(e => e.date),
      'health-check': parsedTasks.filter(e => e.category === 'health-check').map(e => e.date),
      management: parsedTasks.filter(e => e.category === 'management').map(e => e.date),
      supplement: parsedTasks.filter(e => e.category === 'supplement').map(e => e.date),
      done: parsedTasks.filter(e => e.status === 'done').map(e => e.date),
    };

    return (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarCheck/> Your AI-Generated Health Calendar</CardTitle>
              <CardDescription>This personalized schedule is based on the information you provided. You can regenerate it anytime.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
               <div className="lg:col-span-2">
                  <Calendar
                    numberOfMonths={2}
                    className="rounded-md border p-4"
                    modifiers={modifiers}
                    modifiersClassNames={{
                      vaccination: 'bg-blue-500/20 text-blue-800',
                      deworming: 'bg-red-500/20 text-red-800',
                      'health-check': 'bg-green-500/20 text-green-800',
                      management: 'bg-purple-500/20 text-purple-800',
                      supplement: 'bg-yellow-500/20 text-yellow-800',
                      done: 'line-through bg-gray-400/20 text-gray-500',
                    }}
                  />
               </div>
               <div className="space-y-4">
                  <h3 className="font-semibold">Upcoming Tasks</h3>
                  {parsedTasks.sort((a,b) => a.date.getTime() - b.date.getTime()).map((event) => (
                      <div key={event.id} className="flex items-start gap-3">
                          <div className={`mt-1 h-3 w-3 rounded-full ${
                              event.category === 'vaccination' ? 'bg-blue-500' :
                              event.category === 'deworming' ? 'bg-red-500' :
                              event.category === 'health-check' ? 'bg-green-500' :
                              event.category === 'management' ? 'bg-purple-500' : 'bg-yellow-500'
                          }`}></div>
                          <div>
                              <p className="font-medium capitalize">{event.task}</p>
                              <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</p>
                               {event.status === 'pending' ? (
                                <Link href={`/health-calendar/complete/${event.id}`}>
                                  <Button size="sm" className="mt-1">Mark as Complete</Button>
                                </Link>
                              ) : (
                                <Link href={`/health-calendar/complete/${event.id}`} passHref>
                                  <Button asChild variant="outline" size="sm" className="mt-1">
                                    <span className="text-green-600 font-semibold">View Completion</span>
                                  </Button>
                                </Link>
                              )}
                          </div>
                      </div>
                  ))}
               </div>
            </CardContent>
             <CardFooter>
                  <Button onClick={handleGenerateNew}>Generate a New Calendar</Button>
              </CardFooter>
          </Card>
        </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Generate Your Health Calendar</CardTitle>
        <CardDescription>Answer the questions below to get a personalized health calendar for your farm from our AI assistant.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="farmType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type of Farm</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="poultry">Poultry</SelectItem>
                      <SelectItem value="pig">Pig</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {farmType === 'poultry' && (
              <div className="p-4 border rounded-md space-y-4">
                <h3 className="font-medium">Poultry Details</h3>
                 <FormField
                  control={form.control}
                  name="poultryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poultry Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Broiler">Broiler</SelectItem>
                          <SelectItem value="Layer">Layer</SelectItem>
                          <SelectItem value="Native breed">Native breed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="poultryAge"
                  render={({ field }) => (
                    <FormItem><FormLabel>Age in days/weeks</FormLabel><FormControl><Input placeholder="e.g., 21 days" {...field} /></FormControl><FormMessage /></FormItem>
                  )}
                />
                {form.watch('poultryType') === 'Layer' && (
                  <FormField
                    control={form.control}
                    name="layerStage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Layer Stage</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select stage..." /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="pre-lay">Pre-lay</SelectItem>
                                <SelectItem value="peak-lay">Peak-lay</SelectItem>
                                <SelectItem value="post-lay">Post-lay</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            )}
             {farmType === 'pig' && (
              <div className="p-4 border rounded-md space-y-4">
                <h3 className="font-medium">Pig Details</h3>
                 <FormField
                  control={form.control}
                  name="pigType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pig Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select type..." /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="Breeding Sow">Breeding Sow</SelectItem>
                          <SelectItem value="Boar">Boar</SelectItem>
                          <SelectItem value="Piglet">Piglet</SelectItem>
                          <SelectItem value="Grower">Grower</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="pigAge"
                  render={({ field }) => (
                    <FormItem><FormLabel>Age in weeks/months</FormLabel><FormControl><Input placeholder="e.g., 10 weeks" {...field} /></FormControl><FormMessage /></FormItem>
                  )}
                />
                {form.watch('pigType') === 'Breeding Sow' && (
                    <FormField
                        control={form.control}
                        name="sowStatus"
                        render={({ field }) => (
                        <FormItem><FormLabel>Sow Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select status..." /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="pregnant">Pregnant</SelectItem>
                                    <SelectItem value="lactating">Lactating</SelectItem>
                                    <SelectItem value="breeding">Breeding</SelectItem>
                                </SelectContent>
                            </Select>
                        <FormMessage /></FormItem>
                        )}
                    />
                )}
                {form.watch('pigType') === 'Piglet' && (
                    <FormField
                        control={form.control}
                        name="pigletStatus"
                        render={({ field }) => (
                        <FormItem><FormLabel>Piglet Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Select status..." /></SelectTrigger></FormControl>
                                <SelectContent>
                                    <SelectItem value="newborn">Newborn</SelectItem>
                                    <SelectItem value="weaned">Weaned</SelectItem>
                                    <SelectItem value="growing">Growing</SelectItem>
                                </SelectContent>
                            </Select>
                        <FormMessage /></FormItem>
                        )}
                    />
                )}
              </div>
            )}
            <div className="space-y-4">
                <FormField
                    control={form.control}
                    name="pastDiseases"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Any past diseases in the farm?</FormLabel>
                            <FormControl>
                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center gap-4">
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                                    <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                                </RadioGroup>
                            </FormControl>
                        </FormItem>
                    )}
                />
                {form.watch('pastDiseases') === 'Yes' && (
                    <FormField
                        control={form.control}
                        name="pastDiseases"
                        render={({ field }) => (
                            <FormItem><FormLabel>If yes, which diseases?</FormLabel><FormControl><Input placeholder="e.g., Newcastle, Swine Fever" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                    />
                )}
            </div>
            <FormField
              control={form.control}
              name="vaccinationHistory"
              render={({ field }) => (
                <FormItem><FormLabel>Vaccination History (if available)</FormLabel><FormControl><Textarea placeholder="List any recent vaccinations..." {...field} /></FormControl><FormMessage /></FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastDeworming"
              render={({ field }) => (
                <FormItem><FormLabel>Last Deworming Date</FormLabel><FormControl><Input type="date" {...field} /></FormControl><FormMessage /></FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mortalityRate"
              render={({ field }) => (
                <FormItem><FormLabel>Mortality rates in the last cycle (%)</FormLabel><FormControl><Input type="number" placeholder="e.g., 5" {...field} /></FormControl><FormMessage /></FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate AI Calendar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

    

    

    
