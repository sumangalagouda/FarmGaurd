'use server';

/**
 * @fileOverview Summarizes recent forum posts for farmers.
 *
 * - summarizeForumPosts - A function that takes recent forum posts and returns a summary.
 * - SummarizeForumPostsInput - The input type for the summarizeForumPosts function.
 * - SummarizeForumPostsOutput - The return type for the summarizeForumPosts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeForumPostsInputSchema = z.object({
  forumPosts: z
    .string()
    .describe('Recent forum posts from the community to summarize.'),
});
export type SummarizeForumPostsInput = z.infer<typeof SummarizeForumPostsInputSchema>;

const SummarizeForumPostsOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A concise summary of the recent forum posts, highlighting key discussions, advice, and shared experiences relevant to farmers.'
    ),
});
export type SummarizeForumPostsOutput = z.infer<typeof SummarizeForumPostsOutputSchema>;

export async function summarizeForumPosts(input: SummarizeForumPostsInput): Promise<SummarizeForumPostsOutput> {
  return summarizeForumPostsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeForumPostsPrompt',
  input: {schema: SummarizeForumPostsInputSchema},
  output: {schema: SummarizeForumPostsOutputSchema},
  prompt: `You are an AI assistant helping farmers quickly understand community forum discussions.

  Summarize the following recent forum posts into a concise summary that highlights key discussions, advice, and shared experiences relevant to farmers. Focus on providing actionable insights and tips that farmers can apply to their farms.

  Forum Posts:
  {{forumPosts}}`,
});

const summarizeForumPostsFlow = ai.defineFlow(
  {
    name: 'summarizeForumPostsFlow',
    inputSchema: SummarizeForumPostsInputSchema,
    outputSchema: SummarizeForumPostsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
