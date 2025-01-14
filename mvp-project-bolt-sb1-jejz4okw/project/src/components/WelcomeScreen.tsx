import React from 'react';
import { Sparkles } from 'lucide-react';

export function WelcomeScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4 animate-fade-in">
        <Sparkles className="w-16 h-16 mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold">MPV Factory</h1>
        <p className="text-xl opacity-80">Transformando ideias em inovação</p>
      </div>
    </div>
  );
}