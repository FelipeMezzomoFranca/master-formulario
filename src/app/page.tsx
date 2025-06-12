import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';
import Image from 'next/image';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Image src="https://placehold.co/120x120.png" alt="Master Security Logo" width={120} height={120} className="rounded-lg" data-ai-hint="shield eagle" />
          </div>
          <CardTitle className="text-3xl font-headline text-primary">Bem-vindo ao Desafio da Segurança Master!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Prepare-se para descobrir como proteger seu mundo e fortalecer sua segurança.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-foreground">
            Teste seus conhecimentos, desvende mitos e receba um plano personalizado com dicas exclusivas da Master Monitoramento.
            Está pronto para se tornar um Mestre em Segurança?
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
            <Link href="/quiz">
              <Zap className="w-5 h-5 mr-2" />
              Iniciar Desafio Agora!
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
