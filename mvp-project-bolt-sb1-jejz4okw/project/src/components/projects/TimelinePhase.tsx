import React from 'react';
import { LucideIcon } from 'lucide-react';

interface TimelinePhaseProps {
  icon: LucideIcon;
  label: string;
  color: string;
  isActive: boolean;
  isCurrent: boolean;
  progress: number;
}

export function TimelinePhase({ 
  icon: Icon, 
  label, 
  color, 
  isActive, 
  isCurrent,
  progress 
}: TimelinePhaseProps) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Linha de Progresso */}
      {progress > 0 && (
        <div 
          className="absolute left-0 top-4 h-1 bg-gradient-to-r from-purple-500 to-purple-400"
          style={{ width: `${progress}%` }}
        />
      )}

      {/* Ícone e Status */}
      <div 
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                  relative z-10 ${isActive ? 'bg-purple-500' : 'bg-white/10'}
                  ${isCurrent ? 'ring-4 ring-purple-400/30 animate-pulse' : ''}`}
      >
        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-white/50'}`} />
      </div>

      {/* Label */}
      <span className={`text-sm mt-2 font-medium transition-colors duration-300
                     ${isActive ? color : 'text-white/50'}`}>
        {label}
      </span>

      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100
                    transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-900 text-white text-sm px-3 py-1 rounded-lg shadow-lg">
          {label}
        </div>
      </div>
    </div>
  );
}