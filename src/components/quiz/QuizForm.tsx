
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
import { useEffect, useState } from 'react';
import { Lightbulb, ArrowRight } from 'lucide-react';

export default function QuizForm() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const form = useForm<QuizFormData>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      cameras: '',
      alarmSystem: '',
    },
  });

  useEffect(() => {
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
      try {
        const parsedAnswers = JSON.parse(savedAnswers);
        form.reset(parsedAnswers);
      } catch (error) {
        console.error("Failed to parse saved quiz answers:", error);
        localStorage.removeItem('quizAnswers');
      }
    }
  }, [form]);

  const handleNextQuestion = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    if (event) {
      event.preventDefault(); // Garante que o botão type="button" não cause submissão
    }
    
    const currentQuestionId = quizQuestions[currentQuestionIndex].id as keyof QuizFormData;
    const isValid = await form.trigger(currentQuestionId);

    if (isValid) {
      const value = form.getValues(currentQuestionId);
      const existingAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
      const updatedAnswers = { ...existingAnswers, [currentQuestionId]: value };
      localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));
      
      if (currentQuestionIndex < quizQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      }
    }
  };

  function onSubmit(data: QuizFormData) {
    // Salva as respostas finais (data contém todas as respostas do formulário válido)
    localStorage.setItem('quizAnswers', JSON.stringify(data));
    
    let score = 0;
    // Usa 'data' diretamente, que é o estado atual e validado do formulário
    if (data.cameras === 'yes') score++;
    if (data.alarmSystem === 'yes_monitored') score++;
    localStorage.setItem('quizScore', JSON.stringify({ score, total: quizQuestions.length }));

    router.push('/myths');
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

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
            <p className="text-sm text-center text-muted-foreground">
              Pergunta {currentQuestionIndex + 1} de {quizQuestions.length}
            </p>
            {currentQuestion && (
              <FormField
                key={currentQuestion.id}
                control={form.control}
                name={currentQuestion.id as keyof QuizFormData}
                render={({ field }) => (
                  <FormItem className="space-y-3 p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
                    <FormLabel className="text-lg font-semibold text-foreground">{currentQuestion.text}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2 pt-2"
                      >
                        {currentQuestion.options.map((option) => (
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
            )}
          </CardContent>
          <CardFooter className="flex flex-col items-center space-y-4">
            {currentQuestionIndex < quizQuestions.length - 1 ? (
              <Button type="button" onClick={handleNextQuestion} size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                Próxima Pergunta
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
                Desbloquear Mitos da Segurança
                <Lightbulb className="w-5 h-5 ml-2" />
              </Button>
            )}
            <p className="text-sm text-muted-foreground">Suas respostas nos ajudarão a criar dicas personalizadas!</p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
