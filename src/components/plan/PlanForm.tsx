
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
// submitUserDataAndLog import removed as it's no longer used directly here
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
// useToast import removed
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Send } from 'lucide-react'; // Loader2 removed

export default function PlanForm() {
  const router = useRouter();
  // toast related code removed
  // isLoading state removed
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string> | null>(null); // Kept for potential future use

  useEffect(() => {
    const storedAnswers = localStorage.getItem('quizAnswers');
    if (storedAnswers) {
      try {
        setQuizAnswers(JSON.parse(storedAnswers));
      } catch(e) {
        console.error("Failed to parse quiz answers from local storage", e);
        // Optionally, inform user about quiz answers not loading, but not critical for WA link
      }
    }
    // Initial toast about quiz answers not found can be removed or kept based on preference
  }, []);

  const form = useForm<PlanFormData>({
    resolver: zodResolver(planFormSchema),
    defaultValues: {
      name: '',
      phone: '', // Phone field remains in form for potential other uses
      email: '',
      propertyType: '',
      securityPriority: '',
    },
  });

  async function onSubmit(data: PlanFormData) {
    // quizAnswers check removed as it's not used in the current WA message
    
    const propertyTypeLabel = propertyTypes.find(pt => pt.value === data.propertyType)?.label || data.propertyType;
    const securityPriorityLabel = securityPriorities.find(sp => sp.value === data.securityPriority)?.label || data.securityPriority;

    const messageText = `Olá, meu nome é ${data.name}! Respondi o formulário de segurança e gostaria de um diagnóstico! Quero proteger ${propertyTypeLabel}, meu nível de prioridade é ${securityPriorityLabel}.`;
    const encodedMessage = encodeURIComponent(messageText);
    
    // IMPORTANT: The phone number 4699145281 might need a country code (e.g., 55 for Brazil) to work reliably.
    // For example: https://wa.me/554699145281?text=${encodedMessage}
    // Using the number as provided by the user for now.
    const whatsappUrl = `https://wa.me/4699145281?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    router.push('/tips'); 
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">Seu Plano de Proteção Personalizado</CardTitle>
        <CardDescription className="text-lg text-muted-foreground pt-2">
          Quase lá! Complete estas informações para que possamos entrar em contato.
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
                Estes dados são para seu cadastro e para que possamos identificá-lo.
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
                    <FormDescription>Este campo é obrigatório para o cadastro.</FormDescription>
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
            <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
              <Send className="mr-2 h-5 w-5" />
              Enviar Contato via WhatsApp
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
