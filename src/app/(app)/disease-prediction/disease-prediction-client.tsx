
'use client';

import { useState, useEffect } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { predictDisease, DiseasePredictionOutput } from '@/ai/flows/ai-disease-prediction';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, Bot, ShieldAlert, FileImage } from 'lucide-react';
import { streamFlow } from '@genkit-ai/next/client';

const formSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please provide a detailed description of the symptoms.' }),
  farmType: z.enum(['pig', 'poultry'], { required_error: 'You must select a farm type.' }),
  pigBreed: z.string().optional(),
  poultryBreed: z.string().optional(),
  chickenType: z.string().optional(),
  location: z.string().min(2, { message: 'Location is required.' }),
  photoDataUri: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const pigBreeds = [
  "Agonda Goan", "Banda", "Doom", "Ghurrah", "Ghungroo", "Mali", 
  "Niang Megha", "Nicobari", "Purnea", "Tenyi Vo", "Zovawk"
];

const poultryBreeds = ["Chickens", "Turkeys", "Geese", "Ducks"];
const chickenTypes = ["Broiler", "Layer"];


const toBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
  });

export default function DiseasePredictionClient() {
  const [data, setData] = useState<Partial<DiseasePredictionOutput> | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [running, setRunning] = useState(false);
  const [fileName, setFileName] = useState('');

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
      farmType: 'poultry',
      pigBreed: '',
      poultryBreed: '',
      chickenType: '',
      location: 'Jos, Plateau State',
      photoDataUri: '',
    },
  });

  const farmType = form.watch('farmType');
  const poultryBreed = form.watch('poultryBreed');

  useEffect(() => {
    form.setValue('pigBreed', '');
    form.setValue('poultryBreed', '');
    form.setValue('chickenType', '');
  }, [farmType, form]);


  async function onSubmit(values: FormValues) {
    setData(null);
    setError(null);
    setRunning(true);

    let breed: string | undefined;
    if (values.farmType === 'pig') {
      breed = values.pigBreed;
    } else if (values.farmType === 'poultry') {
      if (values.poultryBreed === 'Chickens' && values.chickenType) {
        breed = `Chicken (${values.chickenType})`;
      } else {
        breed = values.poultryBreed;
      }
    }

    const payload = {
      symptoms: values.symptoms,
      farmType: values.farmType,
      breed: breed,
      location: values.location,
      photoDataUri: values.photoDataUri,
    }

    try {
      const { stream } = streamFlow(predictDisease, payload);
      for await (const chunk of stream) {
        setData((prevData) => ({...prevData, ...chunk}));
      }
    } catch (e: any) {
      setError(e);
    } finally {
      setRunning(false);
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      const base64 = await toBase64(file);
      form.setValue('photoDataUri', base64);
    } else {
      setFileName('');
      form.setValue('photoDataUri', undefined);
    }
  };


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
              <FormField
                  control={form.control}
                  name="photoDataUri"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Image (Optional)</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            id="picture"
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <div className="flex items-center justify-center w-full h-12 px-3 py-2 text-sm border rounded-md border-input bg-background ring-offset-background">
                            <FileImage className="w-4 h-4 mr-2 text-muted-foreground" />
                            <span className="text-muted-foreground">
                              {fileName || 'Click to select an image'}
                            </span>
                          </div>
                        </div>
                      </FormControl>
                      <FormDescription>
                        A picture of the affected animal can improve accuracy.
                      </FormDescription>
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
                {farmType === 'pig' && (
                  <FormField
                    control={form.control}
                    name="pigBreed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pig Breed</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select pig breed" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {pigBreeds.map(breed => (
                              <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {farmType === 'poultry' && (
                  <>
                    <FormField
                      control={form.control}
                      name="poultryBreed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Poultry Breed</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select poultry breed" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {poultryBreeds.map(breed => (
                                <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {poultryBreed === 'Chickens' && (
                      <FormField
                        control={form.control}
                        name="chickenType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Chicken Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select chicken type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {chickenTypes.map(type => (
                                  <SelectItem key={type} value={type}>{type}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </>
                )}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem className={farmType === 'poultry' && poultryBreed === 'Chickens' ? 'col-span-2' : ''}>
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
                  Be as detailed as possible. The more information you provide, the more accurate the AI analysis will be.
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
                 {data.possibleDiseases && (
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Possible Diseases</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {data.possibleDiseases?.map((disease: string, index: number) => (
                            <li key={index}>{disease}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {data.preventiveMeasures && (
                    <div>
                        <h3 className="font-semibold text-lg mb-2">Suggested Preventive Measures</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{data.preventiveMeasures}</p>
                    </div>
                )}
                <Alert variant="destructive">
                  <ShieldAlert className="h-4 w-4" />
                  <AlertTitle>Disclaimer</AlertTitle>
                  <AlertDescription>
                    This AI analysis is for informational purposes only and is not a substitute for professional veterinary advice. Please consult a qualified veterinarian for an accurate diagnosis and treatment plan.
                  </Aler  tDescription>
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
