'use server';
/**
 * @fileOverview An AI agent that provides customized security tips based on user quiz answers.
 *
 * - generateSmartSecurityTips - A function that generates security tips.
 * - GenerateSmartSecurityTipsInput - The input type for the generateSmartSecurityTips function.
 * - GenerateSmartSecurityTipsOutput - The return type for the generateSmartSecurityTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSmartSecurityTipsInputSchema = z.object({
  quizAnswers: z.record(z.string(), z.any()).describe('A record of quiz questions and answers.'),
});
export type GenerateSmartSecurityTipsInput = z.infer<typeof GenerateSmartSecurityTipsInputSchema>;

const GenerateSmartSecurityTipsOutputSchema = z.object({
  securityTips: z.array(z.string()).describe('An array of customized security tips.'),
});
export type GenerateSmartSecurityTipsOutput = z.infer<typeof GenerateSmartSecurityTipsOutputSchema>;

export async function generateSmartSecurityTips(
  input: GenerateSmartSecurityTipsInput
): Promise<GenerateSmartSecurityTipsOutput> {
  return generateSmartSecurityTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSmartSecurityTipsPrompt',
  input: {schema: GenerateSmartSecurityTipsInputSchema},
  output: {schema: GenerateSmartSecurityTipsOutputSchema},
  prompt: `You are a home security expert. Based on the following quiz answers, provide 3-5 specific and actionable security tips to the user.\n\nQuiz Answers:\n{{#each (toArray quizAnswers) as |value key|}}- {{@key}}: {{value}}\n{{/each}}\n\nSecurity Tips:`,
});

const generateSmartSecurityTipsFlow = ai.defineFlow(
  {
    name: 'generateSmartSecurityTipsFlow',
    inputSchema: GenerateSmartSecurityTipsInputSchema,
    outputSchema: GenerateSmartSecurityTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
