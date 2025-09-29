'use client';

import { useFlow } from '@genkit-ai/next/client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { predictDisease } from '@/ai/flows/ai-disease-prediction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, Bot, ShieldAlert } from 'lucide-react';

const formSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please provide a detailed description of the symptoms.' }),
  farmType: z.enum(['pig', 'poultry'], { required_error: 'You must select a farm type.' }),
  location: z.string().min(2, { message: 'Location is required.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function DiseasePredictionClient() {
  const [predict, {data, running, error}] = useFlow(predictDisease);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
      farmType: 'poultry',
      location: 'Jos, Plateau State',
    },
  });

  async function onSubmit(values: FormValues) {
    await predict(values);
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      <Card>
        <CardHeader>
          <CardTitle>AI Vet: Disease Prediction</CardTitle>
          <CardDescription>Describe the symptoms and get an AI-powered analysis of possible diseases and preventive measures.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observed Symptoms</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Coughing, loss of appetite, unusual behavior, skin lesions..." {...field} className="min-h-32" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="farmType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farm Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select farm type" />
                          </SelectTrigger>
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
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Your farm's location" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Tip!</AlertTitle>
                <AlertDescription>
                  Be as detailed as possible. Include information about the number of affected animals, when symptoms started, and any recent changes to their environment or feed.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={running}>
                {running && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Analyze Symptoms
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <div className="space-y-4">
        <Card className="min-h-[500px] sticky top-24">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot /> AI Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            {running && !data && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-16">
                <Loader2 className="h-8 w-8 animate-spin mb-4" />
                <p>Analyzing symptoms...</p>
                <p className="text-xs">This may take a moment.</p>
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <ShieldAlert className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error.message}</AlertDescription>
              </Alert>
            )}
            {data && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Possible Diseases</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {data.possibleDiseases.map((disease, index) => (
                      <li key={index}>{disease}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Suggested Preventive Measures</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.preventiveMeasures}</p>
                </div>
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Disclaimer</AlertTitle>
                  <AlertDescription>
                    This AI analysis is for informational purposes only and is not a substitute for professional veterinary advice. Please consult a qualified veterinarian for an accurate diagnosis and treatment plan.
                  </AlertDescription>
                </Alert>
              </div>
            )}
            {!data && !running && !error && (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-16">
                <p>Your analysis results will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
