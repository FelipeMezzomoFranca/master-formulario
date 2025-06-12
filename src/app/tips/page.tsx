'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Home } from 'lucide-react';

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-8">
      <Card className="w-full max-w-lg shadow-xl text-center">
        <CardHeader>
          <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          <CardTitle className="text-3xl font-headline text-primary">Obrigado por Participar!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Suas informações foram enviadas com sucesso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-foreground">
            Um de nossos especialistas em segurança entrará em contato em breve para discutir suas necessidades e oferecer um diagnóstico gratuito.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-4 pt-6">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md"
            onClick={() => router.push('/')}
          >
            <Home className="w-5 h-5 mr-2" />
            Voltar para o Início
          </Button>
          <p className="text-sm text-muted-foreground">
            Master Monitoramento - Protegendo o que importa para você.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
