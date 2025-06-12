'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { quizQuestions, type QuizQuestion } from '@/lib/data';
import { quizFormSchema, type QuizFormData } from '@/lib/schemas';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Lightbulb } from 'lucide-react';

export default function QuizForm() {
  const router = useRouter();
  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      cameras: '',
      alarmSystem: '',
      mainConcern: '',
    },
  });

  useEffect(() => {
    // Load answers from localStorage if available
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        form.reset(parsedAnswers);
      } catch (error) {
        console.error("Failed to parse saved quiz answers:", error);
        localStorage.removeItem('quizAnswers'); // Clear corrupted data
      }
    }
  }, [form]);

  function onSubmit(data: QuizFormData) {
    localStorage.setItem('quizAnswers', JSON.stringify(data));
    
    // Calculate score (simple example: 1 point per 'yes' or 'yes_monitored')
    let score = 0;
    if (data.cameras === 'yes') score++;
    if (data.alarmSystem === 'yes_monitored') score++;
    // Could add more complex scoring logic here
    localStorage.setItem('quizScore', JSON.stringify({ score, total: quizQuestions.length }));

    router.push('/myths');
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">Diagnóstico Rápido de Vulnerabilidade</CardTitle>
        <CardDescription className="text-lg text-muted-foreground pt-2">
          Responda algumas perguntas para avaliarmos seu nível de segurança atual.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-6">
            {quizQuestions.map((question) => (
              <FormField
                key={question.id}
                control={form.control}
                name={question.id as keyof QuizFormData}
                render={({ field }) => (
                  <FormItem className="space-y-3 p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
                    <FormLabel className="text-lg font-semibold text-foreground">{question.text}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2 pt-2"
                      >
                        {question.options.map((option) => (
                          <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={option.value} />
                            </FormControl>
                            <FormLabel className="font-normal text-foreground">
                              {option.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
             <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
              Ver Resultado e Desbloquear Mitos da Segurança
              <Lightbulb className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-sm text-muted-foreground">Suas respostas nos ajudarão a criar dicas personalizadas!</p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
