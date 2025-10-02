
'use server';

/**
 * @fileOverview This file defines a Genkit flow for AI-based disease prediction in livestock.
 *
 * The flow takes farmer-reported symptoms as input and predicts possible diseases,
 * suggesting preventive measures. It includes:
 *
 * - `predictDisease` function: The main entry point for predicting diseases based on symptoms.
 * - `DiseasePredictionInput`: The input type for the `predictDisease` function.
 * - `DiseasePredictionOutput`: The output type for the `predictDisease` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getNearbyOutbreaksTool } from '@/ai/tools/outbreak-tools';

const DiseasePredictionInputSchema = z.object({
  farmType: z.enum(['pig', 'poultry']).describe('The type of farm, either pig or poultry.'),
  breed: z.string().optional().describe('The specific breed of the livestock (e.g., "Chicken (Broiler)", "Yorkshire"). This is optional.'),
  location: z.string().describe('The geographical location of the farm.'),
  symptoms: z.array(z.string()).describe('A list of observed symptoms.'),
  otherSymptoms: z.string().optional().describe('A text description of any other observed symptoms.'),
  symptomsStartDate: z.string().optional().describe('When the symptoms started.'),
  affectedCount: z.number().optional().describe('The number of animals affected.'),
  totalCount: z.number().optional().describe('The total number of animals in the flock/herd.'),
  pastOutbreaks: z.string().optional().describe('Information about past disease outbreaks on the farm.'),
  recentVaccinations: z.string().optional().describe('Information about recent vaccinations.'),
  feedChange: z.string().optional().describe('Whether there was a recent change in feed.'),
  waterSource: z.string().optional().describe('The status of the water source.'),
  photoDataUri: z.string().optional().describe(
      "A photo of the affected livestock, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'. This is optional."
    ),
});
export type DiseasePredictionInput = z.infer<typeof DiseasePredictionInputSchema>;

const DiseasePredictionOutputSchema = z.object({
  possibleDiseases: z
    .array(z.string())
    .describe('A list of possible diseases based on the symptoms.'),
  preventiveMeasures:
    z.string().describe('Suggested preventive measures to protect the livestock.'),
});
export type DiseasePredictionOutput = z.infer<typeof DiseasePredictionOutputSchema>;

export async function predictDisease(
  input: DiseasePredictionInput
): Promise<DiseasePredictionOutput> {
  return predictDiseaseFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diseasePredictionPrompt',
  input: {schema: DiseasePredictionInputSchema},
  output: {schema: DiseasePredictionOutputSchema},
  tools: [getNearbyOutbreaksTool],
  prompt: `You are an AI assistant specializing in livestock disease diagnosis and prevention for Nigerian farms.

  Based on the following detailed report from a farmer, identify possible diseases and suggest practical, actionable preventive measures. Use the getNearbyOutbreaksTool to check for recent disease outbreaks in the provided location to improve your diagnosis.

  **Farm Details:**
  - Farm Type: {{{farmType}}}
  {{#if breed}}- Breed: {{{breed}}}{{/if}}
  - Location: {{{location}}}
  - Flock/Herd Size: {{totalCount}} animals
  - Number Affected: {{affectedCount}} animals

  **Symptoms & History:**
  - Observed Symptoms: {{#each symptoms}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}
  {{#if otherSymptoms}}- Other Symptoms: {{{otherSymptoms}}}{{/if}}
  - Symptoms Started: {{{symptomsStartDate}}}
  - Past Outbreaks: {{{pastOutbreaks}}}
  - Recent Vaccinations: {{{recentVaccinations}}}
  - Recent Feed Change: {{{feedChange}}}
  - Water Source Status: {{{waterSource}}}
  
  {{#if photoDataUri}}
  **Media:**
  - Photo of livestock: {{media url=photoDataUri}}
  {{/if}}

  **Your Task:**
  1.  Analyze all the provided information.
  2.  Consider the combination of symptoms, the number of animals affected, and the farm's history.
  3.  Provide a list of the most likely diseases in the 'possibleDiseases' field.
  4.  Provide a comprehensive list of preventive and control measures in the 'preventiveMeasures' field. The measures should be practical for a small-to-medium scale farmer in Nigeria.
`,
});

const predictDiseaseFlow = ai.defineFlow(
  {
    name: 'predictDiseaseFlow',
    inputSchema: DiseasePredictionInputSchema,
    outputSchema: DiseasePredictionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
