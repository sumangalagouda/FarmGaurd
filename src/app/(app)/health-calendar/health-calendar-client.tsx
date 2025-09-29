
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateHealthCalendar, GenerateHealthCalendarInput, GenerateHealthCalendarOutput, GenerateHealthCalendarInputSchema } from '@/ai/flows/generate-health-calendar';
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

type FormValues = GenerateHealthCalendarInput;
type CalendarTask = { date: Date; description: string; category: string };

export default function HealthCalendarClient() {
  const [calendarData, setCalendarData] = useState<CalendarTask[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(GenerateHealthCalendarInputSchema),
    defaultValues: {
      farmType: 'poultry',
      pastDiseases: 'No',
    },
  });

  const farmType = form.watch('farmType');

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setCalendarData(null);
    setError(null);
    try {
      const result = await generateHealthCalendar(values);
      const tasks = result.tasks.map(t => ({
        date: new Date(t.date),
        description: t.task,
        category: t.category,
      }));
      setCalendarData(tasks);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
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
    const modifiers = {
      vaccination: calendarData.filter(e => e.category === 'vaccination').map(e => e.date),
      deworming: calendarData.filter(e => e.category === 'deworming').map(e => e.date),
      'health-check': calendarData.filter(e => e.category === 'health-check').map(e => e.date),
      management: calendarData.filter(e => e.category === 'management').map(e => e.date),
      supplement: calendarData.filter(e => e.category === 'supplement').map(e => e.date),
    };

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarCheck/> Your AI-Generated Health Calendar</CardTitle>
            <CardDescription>This personalized schedule is based on the information you provided. You can regenerate it anytime by refreshing or going back.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
             <div className="lg:col-span-2">
                <Calendar
                  numberOfMonths={2}
                  className="rounded-md border p-4"
                  modifiers={modifiers}
                  modifiersClassNames={{
                    vaccination: 'bg-blue-500/20 text-blue-800',
                    deworming: 'bg-orange-500/20 text-orange-800',
                    'health-check': 'bg-green-500/20 text-green-800',
                    management: 'bg-purple-500/20 text-purple-800',
                    supplement: 'bg-yellow-500/20 text-yellow-800',
                  }}
                />
             </div>
             <div className="space-y-4">
                <h3 className="font-semibold">Upcoming Tasks</h3>
                {calendarData.sort((a,b) => a.date.getTime() - b.date.getTime()).map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className={`mt-1 h-3 w-3 rounded-full ${
                            event.category === 'vaccination' ? 'bg-blue-500' :
                            event.category === 'deworming' ? 'bg-orange-500' :
                            event.category === 'health-check' ? 'bg-green-500' :
                            event.category === 'management' ? 'bg-purple-500' : 'bg-yellow-500'
                        }`}></div>
                        <div>
                            <p className="font-medium capitalize">{event.description}</p>
                            <p className="text-sm text-muted-foreground">{event.date.toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
             </div>
          </CardContent>
           <CardFooter>
                <Button onClick={() => setCalendarData(null)}>Generate a New Calendar</Button>
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
