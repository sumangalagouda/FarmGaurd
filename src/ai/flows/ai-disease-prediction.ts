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
  symptoms: z
    .string()
    .describe(
      'A detailed description of the symptoms observed in the livestock.'
    ),
  farmType: z
    .enum(['pig', 'poultry'])
    .describe('The type of farm, either pig or poultry.'),
  breed: z
    .string()
    .optional()
    .describe('The specific breed of the livestock (e.g., "Chicken (Broiler)", "Yorkshire"). This is optional.'),
  location: z.string().describe('The geographical location of the farm.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
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
  prompt: `You are an AI assistant specializing in livestock disease diagnosis and prevention.

  Based on the following information reported by a farmer, identify possible diseases and suggest preventive measures. Use the getNearbyOutbreaksTool to check for recent disease outbreaks in the provided location to improve your diagnosis.

  Symptoms: {{{symptoms}}}
  Farm Type: {{{farmType}}}
  {{#if breed}}
  Breed: {{{breed}}}
  {{/if}}
  Location: {{{location}}}
  {{#if photoDataUri}}
  Photo of livestock: {{media url=photoDataUri}}
  {{/if}}

  Provide a list of possible diseases and detailed preventive measures.
  The possibleDiseases field should be a list of strings.
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
