'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { mythItems } from '@/lib/data';
import MythCardInteractive from '@/components/myths/MythCardInteractive';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShieldQuestion, Target } from 'lucide-react';

export default function MythsPage() {
  const [revealedMyths, setRevealedMyths] = useState(0);
  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null);

  useEffect(() => {
    const storedScore = localStorage.getItem('quizScore');
    if (storedScore) {
      try {
        setQuizScore(JSON.parse(storedScore));
      } catch (e) {
        console.error("Failed to parse quiz score", e);
      }
    }
  }, []);

  const handleMythRevealed = () => {
    setRevealedMyths(prev => prev + 1);
  };

  const allMythsRevealed = revealedMyths === mythItems.length;

  return (
    <div className="flex flex-col items-center py-8 space-y-8">
      <Card className="w-full max-w-3xl text-center shadow-xl">
        <CardHeader>
          <ShieldQuestion className="w-16 h-16 mx-auto text-accent mb-2" />
          <CardTitle className="text-3xl font-headline text-primary">Mitos e Verdades da Segurança</CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-2">
            Vamos desvendar alguns segredos e fortalecer seus conhecimentos!
          </CardDescription>
          {quizScore && (
            <p className="text-sm text-accent mt-2 font-semibold">
              Sua pontuação no diagnóstico foi: {quizScore.score}/{quizScore.total}. {quizScore.score > quizScore.total / 2 ? "Bom começo!" : "Vamos melhorar!"}
            </p>
          )}
        </CardHeader>
      </Card>

      <div className="w-full max-w-3xl space-y-6">
        {mythItems.map((myth) => (
          <MythCardInteractive key={myth.id} myth={myth} onMythRevealed={handleMythRevealed} />
        ))}
      </div>
      
      <Card className="w-full max-w-3xl shadow-xl mt-8">
        <CardContent className="pt-6">
          <div className="mb-4">
            <p className="text-center text-sm text-muted-foreground mb-1">Progresso nos mitos:</p>
            <Progress value={(revealedMyths / mythItems.length) * 100} className="w-full h-2.5" />
            <p className="text-center text-sm font-medium mt-1 text-primary">{revealedMyths} de {mythItems.length} mitos desvendados</p>
          </div>
        
          {allMythsRevealed && (
            <div className="text-center p-4 bg-green-100 rounded-lg">
              <p className="text-lg font-semibold text-green-700">Parabéns, Mestre dos Mitos! Você desvendou todos os segredos.</p>
              <p className="text-muted-foreground">Está pronto para o próximo nível?</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
           <Button asChild size="lg" disabled={!allMythsRevealed} className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 disabled:opacity-50">
            <Link href="/plan">
              <Target className="w-5 h-5 mr-2" />
              Criar Seu Plano de Proteção Personalizado
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
