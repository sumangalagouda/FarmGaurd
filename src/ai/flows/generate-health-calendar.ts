'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a personalized health calendar for livestock.
 *
 * The flow takes detailed farm information as input and produces a schedule of health-related tasks.
 *
 * - `generateHealthCalendar` function: The main entry point for generating the calendar.
 * - `GenerateHealthCalendarInput`: The input type for the `generateHealthCalendar` function.
 * - `GenerateHealthCalendarOutput`: The output type for the `generateHealthCalendar` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateHealthCalendarInputSchema = z.object({
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
export type GenerateHealthCalendarInput = z.infer<typeof GenerateHealthCalendarInputSchema>;

export const GenerateHealthCalendarOutputSchema = z.object({
  tasks: z.array(z.object({
    date: z.string().describe("The suggested date for the task in YYYY-MM-DD format."),
    task: z.string().describe("The description of the health task."),
    category: z.enum(['vaccination', 'deworming', 'health-check', 'management', 'supplement']).describe("The category of the task."),
  })).describe("A list of suggested health tasks for the farm."),
});
export type GenerateHealthCalendarOutput = z.infer<typeof GenerateHealthCalendarOutputSchema>;


export async function generateHealthCalendar(input: GenerateHealthCalendarInput): Promise<GenerateHealthCalendarOutput> {
  return generateHealthCalendarFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHealthCalendarPrompt',
  input: {schema: GenerateHealthCalendarInputSchema},
  output: {schema: GenerateHealthCalendarOutputSchema},
  prompt: `You are an AI expert in livestock health management for small-scale farms in Nigeria. Your task is to generate a practical and actionable health calendar based on the farmer's specific situation.

  **Farmer's Information:**
  - Farm Type: {{{farmType}}}
  {{#if poultryType}}- Poultry Type: {{{poultryType}}}{{/if}}
  {{#if poultryAge}}- Poultry Age: {{{poultryAge}}}{{/if}}
  {{#if layerStage}}- Layer Stage: {{{layerStage}}}{{/if}}
  {{#if pigType}}- Pig Type: {{{pigType}}}{{/if}}
  {{#if pigAge}}- Pig Age: {{{pigAge}}}{{/if}}
  {{#if sowStatus}}- Sow Status: {{{sowStatus}}}{{/if}}
  {{#if pigletStatus}}- Piglet Status: {{{pigletStatus}}}{{/if}}
  - Past Diseases: {{{pastDiseases}}}
  - Vaccination History: {{{vaccinationHistory}}}
  - Last Deworming Date: {{{lastDeworming}}}
  - Mortality Rate Last Cycle: {{{mortalityRate}}}

  **Your Task:**
  Based on the information provided, create a list of health tasks for the next 3 months.
  - The date for each task should be in YYYY-MM-DD format. Assume today's date is {{currentDate}}.
  - Tasks should include vaccinations, deworming, health checks, and other important management activities.
  - The tasks should be prioritized and relevant to the farm's context.
  - Be specific and practical for a small-scale farmer. For example, instead of "Vaccinate chickens", say "Administer Gumboro vaccine (day 14)".
  - Return the output as a structured list of tasks.
`,
});

const generateHealthCalendarFlow = ai.defineFlow(
  {
    name: 'generateHealthCalendarFlow',
    inputSchema: GenerateHealthCalendarInputSchema,
    outputSchema: GenerateHealthCalendarOutputSchema,
  },
  async input => {
    const currentDate = new Date().toISOString().split('T')[0];
    const {output} = await prompt({...input, currentDate});
    return output!;
  }
);
