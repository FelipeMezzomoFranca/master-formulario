'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, ShieldCheck, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function TipsPage() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Only for potential future use if tips are passed via URL
  const [tips, setTips] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedTips = localStorage.getItem('securityTips');
    if (storedTips) {
      try {
        const parsedTips = JSON.parse(storedTips);
        setTips(parsedTips);
      } catch(e) {
        console.error("Failed to parse tips from local storage", e);
        // Optionally redirect or show error
      }
    }
    // If tips were passed via query params (alternative to localStorage):
    // const queryTips = searchParams.get('tips');
    // if (queryTips) {
    //   setTips(JSON.parse(queryTips));
    // }
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center py-8 space-y-6">
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="text-center">
            <ShieldCheck className="w-16 h-16 mx-auto text-accent mb-2" />
            <Skeleton className="h-8 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3 p-4 border rounded-lg bg-card">
                <Skeleton className="h-6 w-6 rounded-full mt-1" />
                <Skeleton className="h-12 w-full" />
              </div>
            ))}
          </CardContent>
           <CardFooter className="flex justify-center">
             <Skeleton className="h-10 w-48" />
           </CardFooter>
        </Card>
      </div>
    );
  }

  if (!tips || tips.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
        <Card className="w-full max-w-lg p-8 shadow-xl">
          <CardTitle className="text-2xl font-headline text-destructive">Nenhuma Dica Encontrada</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            Não foi possível carregar suas dicas de segurança personalizadas. 
            Por favor, tente refazer o desafio ou contate o suporte.
          </CardDescription>
          <Button onClick={() => router.push('/')} className="mt-6">
            Voltar ao Início
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-8 space-y-6">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <ShieldCheck className="w-16 h-16 mx-auto text-accent mb-2" />
          <CardTitle className="text-3xl font-headline text-primary">Seu Plano de Proteção Master!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Aqui estão algumas dicas de segurança personalizadas com base nas suas respostas:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <Lightbulb className="h-6 w-5 text-accent mt-1 flex-shrink-0" />
              <p className="text-foreground leading-relaxed">{tip}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4 pt-6">
          <p className="text-sm text-center text-muted-foreground">
            Estas são sugestões iniciais. Para um diagnóstico completo e soluções robustas, fale com nossos especialistas.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md"
            onClick={() => {
              // Potentially open a link to Master Monitoramento website or contact page
              window.open('https://desafio.mastermonitoramento.com.br', '_blank'); // Example URL
            }}
          >
            Saiba Mais sobre Nossas Soluções
            <ExternalLink className="w-5 h-5 ml-2" />
          </Button>
           <Button variant="outline" onClick={() => router.push('/')}>
            Refazer o Desafio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
