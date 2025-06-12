'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { planFormSchema, type PlanFormData } from '@/lib/schemas';
import { propertyTypes, securityPriorities } from '@/lib/data';
import { submitUserDataAndGetTips } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Send } from 'lucide-react';

export default function PlanForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    const storedAnswers = localStorage.getItem('quizAnswers');
    if (storedAnswers) {
      try {
        setQuizAnswers(JSON.parse(storedAnswers));
      } catch(e) {
        console.error("Failed to parse quiz answers from local storage", e);
        toast({
          title: "Erro",
          description: "Não foi possível carregar suas respostas anteriores. Por favor, recomece o desafio se os problemas persistirem.",
          variant: "destructive",
        });
      }
    } else {
       toast({
        title: "Atenção",
        description: "Respostas do quiz não encontradas. Para um plano mais preciso, complete o diagnóstico primeiro.",
        variant: "default",
      });
    }
  }, [toast]);

  const form = useForm<PlanFormData>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      propertyType: '',
      securityPriority: '',
    },
  });

  async function onSubmit(data: PlanFormData) {
    setIsLoading(true);
    if (!quizAnswers) {
      toast({
        title: "Erro",
        description: "Não foi possível encontrar as respostas do quiz. Por favor, tente refazer o diagnóstico.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    const result = await submitUserDataAndGetTips(data, quizAnswers);
    setIsLoading(false);

    if (result.success && result.tips) {
      localStorage.setItem('securityTips', JSON.stringify(result.tips));
      toast({
        title: "Plano Gerado com Sucesso!",
        description: "Suas dicas personalizadas estão prontas.",
      });
      router.push('/tips');
    } else {
      toast({
        title: "Erro ao Gerar Plano",
        description: result.error || "Não foi possível gerar seu plano. Tente novamente.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">Seu Plano de Proteção Personalizado</CardTitle>
        <CardDescription className="text-lg text-muted-foreground pt-2">
          Quase lá! Complete estas informações para receber seu plano e dicas exclusivas.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-6">
            <fieldset className="space-y-4 p-4 border rounded-lg">
              <legend className="text-xl font-semibold px-1 font-headline text-primary/80">Sobre suas Necessidades</legend>
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Qual tipo de imóvel você quer proteger?</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de imóvel" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {propertyTypes.map(pt => (
                          <SelectItem key={pt.value} value={pt.value}>{pt.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="securityPriority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Qual nível de prioridade você dá à segurança neste momento?</FormLabel>
                     <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2 pt-2"
                      >
                        {securityPriorities.map((priority) => (
                          <FormItem key={priority.value} className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={priority.value} />
                            </FormControl>
                            <FormLabel className="font-normal text-foreground">
                              {priority.label}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
            
            <fieldset className="space-y-4 p-4 border rounded-lg">
              <legend className="text-xl font-semibold px-1 font-headline text-primary/80">Seus Dados de Contato</legend>
               <FormDescription className="text-sm text-muted-foreground pb-2">
                Para receber o checklist completo, dicas exclusivas e um diagnóstico GRÁTIS com um especialista.
              </FormDescription>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone (com DDD)</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="Ex: 11999998888" {...field} />
                    </FormControl>
                    <FormDescription>Este campo é obrigatório.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seuemail@exemplo.com" {...field} />
                    </FormControl>
                     <FormDescription>Opcional.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </fieldset>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button type="submit" size="lg" disabled={isLoading} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processando seu Plano...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Receber Meu Plano Grátis e Dicas Master!
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
