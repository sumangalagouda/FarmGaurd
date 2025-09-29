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

const DiseasePredictionInputSchema = z.object({
  symptoms: z
    .string()
    .describe(
      'A detailed description of the symptoms observed in the livestock.'
    ),
  farmType: z
    .enum(['pig', 'poultry'])
    .describe('The type of farm, either pig or poultry.'),
  location: z.string().describe('The geographical location of the farm.'),
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
  prompt: `You are an AI assistant specializing in livestock disease diagnosis and prevention.

  Based on the following symptoms reported by a farmer, identify possible diseases and suggest preventive measures.

  Symptoms: {{{symptoms}}}
  Farm Type: {{{farmType}}}
  Location: {{{location}}}

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
