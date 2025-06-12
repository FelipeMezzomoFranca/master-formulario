'use client';

import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Home, Zap, MessageSquareHeart, Target, Lightbulb } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Início', path: '/', icon: Home, progress: 0 },
  { name: 'Diagnóstico', path: '/quiz', icon: Zap, progress: 25 },
  { name: 'Mitos e Verdades', path: '/myths', icon: MessageSquareHeart, progress: 50 },
  { name: 'Seu Plano', path: '/plan', icon: Target, progress: 75 },
  { name: 'Dicas Master', path: '/tips', icon: Lightbulb, progress: 100 },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  let currentProgress = 0;
  let currentModuleIndex = 0;

  const activeItem = navItems.find((item, index) => {
    if (pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/')) {
      currentModuleIndex = index;
      return true;
    }
    // Special case for root path matching
    if (pathname === '/' && item.path === '/') {
        currentModuleIndex = index;
        return true;
    }
    return false;
  });

  if (activeItem) {
    currentProgress = activeItem.progress;
  } else if (pathname.startsWith('/quiz')) {
    currentProgress = navItems.find(item => item.path === '/quiz')?.progress ?? 0;
    currentModuleIndex = navItems.findIndex(item => item.path === '/quiz');
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
            <ShieldCheck className="w-7 h-7 text-accent" />
            Master Security Challenge
          </Link>
          <div className="hidden md:flex items-center space-x-2">
             {navItems.map((item, index) => (
                <Button 
                    key={item.name} 
                    variant={pathname === item.path || (index < currentModuleIndex && activeItem?.path !== item.path) ? "secondary" : "ghost"} 
                    size="sm" 
                    asChild
                    className={index > currentModuleIndex ? "pointer-events-none opacity-50" : ""}
                >
                    <Link href={index <= currentModuleIndex ? item.path : '#'}>
                        {item.name}
                    </Link>
                </Button>
             ))}
          </div>
        </div>
        <Progress value={currentProgress} className="w-full h-1 rounded-none" />
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="py-6 text-center border-t bg-card">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Master Monitoramento. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
