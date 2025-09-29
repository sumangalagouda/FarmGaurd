'use server';
/**
 * @fileOverview A tool for fetching nearby disease outbreaks.
 */

import { ai } from '@/ai/genkit';
import { getNearbyOutbreaks } from '@/services/outbreak-service';
import { z } from 'genkit';

export const getNearbyOutbreaksTool = ai.defineTool(
  {
    name: 'getNearbyOutbreaks',
    description: 'Get a list of recent disease outbreaks near a specific location.',
    inputSchema: z.object({
      location: z.string().describe('The location to search for outbreaks.'),
    }),
    outputSchema: z.object({
      outbreaks: z.array(
        z.object({
          disease: z.string().describe('The name of the disease.'),
          date: z.string().describe('The date the outbreak was reported.'),
        })
      ).describe('A list of recent outbreaks.'),
    }),
  },
  async (input) => {
    console.log(`[getNearbyOutbreaksTool] Getting outbreaks for ${input.location}`);
    const outbreaks = await getNearbyOutbreaks(input.location);
    return { outbreaks };
  }
);
