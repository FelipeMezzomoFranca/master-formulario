'use client';

import { useState } from 'react';
import type { MythItem } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Lightbulb, AlertTriangle } from 'lucide-react';

interface MythCardInteractiveProps {
  myth: MythItem;
  onMythRevealed: () => void;
}

export default function MythCardInteractive({ myth, onMythRevealed }: MythCardInteractiveProps) {
  const [answered, setAnswered] = useState(false);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);

  const handleAnswer = (choice: boolean) => {
    setUserChoice(choice);
    setAnswered(true);
    onMythRevealed();
  };

  const isCorrect = userChoice === myth.isTrue;

  return (
    <Card className="w-full shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-headline text-primary">{myth.statement}</CardTitle>
      </CardHeader>
      <CardContent>
        {!answered ? (
          <div className="flex justify-around space-x-4">
            <Button onClick={() => handleAnswer(true)} className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 text-lg">
              <CheckCircle className="mr-2 h-6 w-6" /> Verdadeiro
            </Button>
            <Button onClick={() => handleAnswer(false)} className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 text-lg">
              <XCircle className="mr-2 h-6 w-6" /> Falso
            </Button>
          </div>
        ) : (
          <div className={`p-4 rounded-md ${isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'} border-l-4`}>
            <div className="flex items-center mb-2">
              {isCorrect ? (
                <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-red-600 mr-2" />
              )}
              <p className={`text-lg font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                Sua resposta foi: {userChoice ? 'Verdadeiro' : 'Falso'}. {isCorrect ? 'Correto!' : 'Incorreto!'}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-1">A afirmação é <span className="font-bold">{myth.isTrue ? 'VERDADEIRA' : 'FALSA'}</span>.</p>
            <CardDescription className="text-md text-foreground">{myth.explanation}</CardDescription>
          </div>
        )}
      </CardContent>
      {answered && (
        <CardFooter className="bg-primary/10 p-4 rounded-b-lg">
          <div className="flex items-start">
            <Lightbulb className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-primary font-headline">Dica Master:</h4>
              <p className="text-sm text-foreground">{myth.masterTip}</p>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
