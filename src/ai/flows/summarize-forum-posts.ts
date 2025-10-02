
'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing forum discussions.
 *
 * - `summarizeForumPosts` function: The main entry point for summarizing posts.
 * - `SummarizeForumPostsInput`: The input type for the `summarizeForumPosts` function.
 * - `SummarizeForumPostsOutput`: The output type for the `summarizeForumPosts` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeForumPostsInputSchema = z.object({
  posts: z.array(z.object({
    author: z.string(),
    content: z.string(),
  })).describe("A list of forum posts to be summarized."),
});
export type SummarizeForumPostsInput = z.infer<typeof SummarizeForumPostsInputSchema>;

const SummarizeForumPostsOutputSchema = z.object({
  summary: z.string().describe("A concise summary of the key topics and questions from the forum posts."),
});
export type SummarizeForumPostsOutput = z.infer<typeof SummarizeForumPostsOutputSchema>;


export async function summarizeForumPosts(input: SummarizeForumPostsInput): Promise<SummarizeForumPostsOutput> {
  return summarizeForumPostsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeForumPostsPrompt',
  input: {schema: SummarizeForumPostsInputSchema},
  output: {schema: SummarizeForumPostsOutputSchema},
  prompt: `You are an AI assistant for a farming community. Your task is to summarize the following forum posts to highlight the main discussion points, key questions being asked, and any urgent issues.

  **Forum Posts:**
  {{#each posts}}
  - **{{author}}:** "{{content}}"
  {{/each}}

  **Your Task:**
  Provide a brief summary that captures the essence of the conversation.
`,
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
