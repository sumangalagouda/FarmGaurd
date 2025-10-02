
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
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Loader2, Bot, ShieldAlert, FileImage } from 'lucide-react';

const symptomsList = {
  poultry: [
    "Coughing / Sneezing", "Diarrhea / Loose droppings", "Reduced feed intake", 
    "Swollen eyes / nasal discharge", "Sudden mortality", "Weakness / lethargy",
    "Reduced egg laying"
  ],
  pig: [
    "Coughing / Sneezing", "Diarrhea / Loose droppings", "Reduced feed intake",
    "Weakness / lethargy", "Skin lesions / rashes", "Weight loss / slow growth",
    "Sudden mortality"
  ]
};

const formSchema = z.object({
  farmType: z.enum(['pig', 'poultry'], { required_error: 'You must select a farm type.' }),
  breed: z.string().optional(),
  affectedCount: z.coerce.number().min(1, 'Must be at least 1.'),
  totalCount: z.coerce.number().min(1, 'Must be at least 1.'),
  symptoms: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one symptom.",
  }),
  otherSymptoms: z.string().optional(),
  symptomsStartDate: z.string().min(1, 'This field is required.'),
  pastOutbreaks: z.enum(['Yes', 'No']),
  pastOutbreaksDetails: z.string().optional(),
  recentVaccination: z.enum(['Yes', 'No']),
  recentVaccinationDetails: z.string().optional(),
  feedChange: z.enum(['Yes', 'No']),
  waterSource: z.enum(['Clean', 'Contaminated', 'Unknown']),
  location: z.string().min(2, { message: 'Location is required.' }),
  photoDataUri: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

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
      farmType: 'poultry',
      symptoms: [],
      otherSymptoms: '',
      location: 'Jos, Plateau State',
      pastOutbreaks: 'No',
      recentVaccination: 'No',
      feedChange: 'No',
      waterSource: 'Clean'
    },
  });

  const farmType = form.watch('farmType');

  async function onSubmit(values: FormValues) {
    setData(null);
    setError(null);
    setRunning(true);

    const payload = {
        ...values,
        pastOutbreaks: values.pastOutbreaks === 'Yes' ? values.pastOutbreaksDetails || 'Yes, details not provided.' : 'No',
        recentVaccinations: values.recentVaccination === 'Yes' ? values.recentVaccinationDetails || 'Yes, details not provided.' : 'No',
    };

    try {
      const result = await predictDisease(payload);
      setData(result);
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
            <CardContent className="space-y-6">
                {/* Farm & Breed */}
                <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                    control={form.control}
                    name="farmType"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Farm Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select farm type" /></SelectTrigger>
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
                        name="breed"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Breed Type</FormLabel>
                                <FormControl><Input placeholder={farmType === 'poultry' ? "e.g., Broiler, Layer" : "e.g., Yorkshire"} {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Symptoms */}
                 <FormField
                    control={form.control}
                    name="symptoms"
                    render={() => (
                        <FormItem>
                        <div className="mb-4">
                            <FormLabel>Visible Symptoms</FormLabel>
                            <FormDescription>Select all that apply.</FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                        {symptomsList[farmType].map((item) => (
                            <FormField
                            key={item}
                            control={form.control}
                            name="symptoms"
                            render={({ field }) => {
                                return (
                                <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(item)}
                                            onCheckedChange={(checked) => {
                                            return checked
                                                ? field.onChange([...(field.value || []), item])
                                                : field.onChange(
                                                    field.value?.filter(
                                                    (value) => value !== item
                                                    )
                                                )
                                            }}
                                        />
                                    </FormControl>
                                    <FormLabel className="font-normal">{item}</FormLabel>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="otherSymptoms"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Other Symptoms</FormLabel>
                            <FormControl><Textarea placeholder="Describe any other symptoms..." {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Symptom Details */}
                 <div className="grid md:grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="symptomsStartDate"
                        render={({ field }) => (
                            <FormItem><FormLabel>When did symptoms start?</FormLabel><FormControl><Input placeholder="e.g., 3 days ago" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="affectedCount"
                        render={({ field }) => (
                            <FormItem><FormLabel>Number of animals affected</FormLabel><FormControl><Input type="number" placeholder="e.g., 10" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="totalCount"
                        render={({ field }) => (
                            <FormItem><FormLabel>Total flock/herd size</FormLabel><FormControl><Input type="number" placeholder="e.g., 500" {...field} /></FormControl><FormMessage /></FormItem>
                        )}
                    />
                 </div>
                
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
                      <FormDescription>A picture can improve accuracy.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* History */}
                 <div className="space-y-4 p-4 border rounded-md">
                     <FormField
                        control={form.control}
                        name="pastOutbreaks"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Any past disease outbreaks?</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.watch('pastOutbreaks') === 'Yes' && (
                        <FormField
                            control={form.control}
                            name="pastOutbreaksDetails"
                            render={({ field }) => (
                                <FormItem><FormLabel>If yes, specify disease</FormLabel><FormControl><Input placeholder="e.g., Newcastle" {...field} /></FormControl><FormMessage /></FormItem>
                            )}
                        />
                    )}
                 </div>

                 <div className="space-y-4 p-4 border rounded-md">
                     <FormField
                        control={form.control}
                        name="recentVaccination"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormLabel>Recent vaccination done?</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4">
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    {form.watch('recentVaccination') === 'Yes' && (
                        <FormField
                            control={form.control}
                            name="recentVaccinationDetails"
                            render={({ field }) => (
                                <FormItem><FormLabel>If yes, specify which one</FormLabel><FormControl><Input placeholder="e.g., Gumboro" {...field} /></FormControl><FormMessage /></FormItem>
                            )}
                        />
                    )}
                 </div>

                 {/* Environment */}
                 <div className="grid md:grid-cols-2 gap-4">
                     <FormField
                        control={form.control}
                        name="feedChange"
                        render={({ field }) => (
                            <FormItem className="space-y-2"><FormLabel>Feed change in last 2 weeks?</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="No" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="waterSource"
                        render={({ field }) => (
                            <FormItem className="space-y-2"><FormLabel>Water source quality?</FormLabel>
                                <FormControl>
                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 pt-2">
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Clean" /></FormControl><FormLabel className="font-normal">Clean</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Contaminated" /></FormControl><FormLabel className="font-normal">Contaminated</FormLabel></FormItem>
                                        <FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="Unknown" /></FormControl><FormLabel className="font-normal">Unknown</FormLabel></FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                 </div>
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
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Tip!</AlertTitle>
                <AlertDescription>
                  The more details you provide, the more accurate the AI analysis will be.
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
                  </AlertDescription>
                </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
