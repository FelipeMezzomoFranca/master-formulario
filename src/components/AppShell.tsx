
'use client';

import type React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, Home, Zap, MessageSquareHeart, Target, ThumbsUp } from 'lucide-react'; // Changed Lightbulb to ThumbsUp
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Início', path: '/', icon: Home, progress: 0 },
  { name: 'Diagnóstico', path: '/quiz', icon: Zap, progress: 33 }, // Adjusted progress
  { name: 'Mitos e Verdades', path: '/myths', icon: MessageSquareHeart, progress: 66 }, // Adjusted progress
  { name: 'Seu Plano', path: '/plan', icon: Target, progress: 100 }, // Plan now leads to 100%
  // { name: 'Dicas Master', path: '/tips', icon: Lightbulb, progress: 100 }, // Removed Dicas Master, now /tips is thank you page
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  let currentProgress = 0;
  let currentModuleIndex = 0;

  const activeItem = navItems.find((item, index) => {
    // Match if current path is exactly the item path or starts with item path (and item path is not just '/')
    // Also, if on /tips, consider /plan as active for progress calculation
    if (pathname === item.path || (pathname.startsWith(item.path) && item.path !== '/') || (pathname === '/tips' && item.path === '/plan')) {
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
  } else if (pathname.startsWith('/myths')) {
    currentProgress = navItems.find(item => item.path === '/myths')?.progress ?? 0;
    currentModuleIndex = navItems.findIndex(item => item.path === '/myths');
  } else if (pathname.startsWith('/plan')) {
    currentProgress = navItems.find(item => item.path === '/plan')?.progress ?? 0;
    currentModuleIndex = navItems.findIndex(item => item.path === '/plan');
  } else if (pathname === '/tips') { // If on thank you page, show 100%
    currentProgress = 100;
    currentModuleIndex = navItems.length -1; // Consider the last main step (plan) as active
  }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold font-headline text-primary">
            <ShieldCheck className="w-7 h-7 text-accent" />
            Master Monitoramento 24 Horas
          </Link>
          <div className="hidden md:flex items-center space-x-2">
             {navItems.map((item, index) => (
                <Button 
                    key={item.name} 
                    variant={pathname === item.path || (index < currentModuleIndex && activeItem?.path !== item.path) || (pathname === '/tips' && item.path === '/plan') ? "secondary" : "ghost"} 
                    size="sm" 
                    asChild
                    // Disable future steps, allow clicking on /plan even if on /tips
                    className={(index > currentModuleIndex && !(pathname === '/tips' && item.path ==='/plan') ) ? "pointer-events-none opacity-50" : ""}
                >
                    <Link href={index <= currentModuleIndex || (pathname === '/tips' && item.path ==='/plan') ? item.path : '#'}>
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
