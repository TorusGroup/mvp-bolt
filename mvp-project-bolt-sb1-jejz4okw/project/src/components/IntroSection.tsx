import React from 'react';
import { ArrowRight } from 'lucide-react';
import { AnimatedDiv } from './animation';

interface IntroSectionProps {
  onStart: () => void;
}

export function IntroSection({ onStart }: IntroSectionProps) {
  return (
    <AnimatedDiv 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto text-center space-y-8"
    >
      <h1 className="text-5xl font-bold leading-tight">
        Bem-vindo à sua jornada de inovação
      </h1>
      <p className="text-xl opacity-80">
        Vamos descobrir juntos como transformar seus desafios em oportunidades através
        da inteligência artificial e metodologias inovadoras.
      </p>
      <button
        onClick={onStart}
        className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-3 rounded-full
                 font-semibold flex items-center space-x-2 mx-auto transition-colors
                 hover:scale-105 transform duration-200"
      >
        <span>Iniciar Jornada</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </AnimatedDiv>
  );
}