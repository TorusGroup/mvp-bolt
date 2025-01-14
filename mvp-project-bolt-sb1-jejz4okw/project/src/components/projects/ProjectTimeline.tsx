import React from 'react';
import type { ProjectStage } from '../../types/project';

interface ProjectTimelineProps {
  stage: ProjectStage;
}

const stages: ProjectStage[] = ['empty', 'planned', 'recruiting', 'ready', 'ongoing', 'completed'];

const stageLabels: Record<ProjectStage, string> = {
  empty: 'Aguardando Planejamento',
  planned: 'Planejado',
  recruiting: 'Recrutando Equipe',
  ready: 'Pronto para Iniciar',
  ongoing: 'Em Andamento',
  completed: 'Concluído'
};

const stageDescriptions: Record<ProjectStage, string> = {
  empty: 'O projeto ainda não foi planejado com o arquiteto AI',
  planned: 'O projeto foi iniciado e planejado com o arquiteto AI',
  recruiting: 'Montando a equipe especializada de IAs',
  ready: 'Equipe formada e pronta para iniciar as atividades',
  ongoing: 'Atividades em andamento com a equipe AI',
  completed: 'Projeto finalizado com sucesso'
};

export function ProjectTimeline({ stage }: ProjectTimelineProps) {
  const currentIndex = stages.indexOf(stage);

  return (
    <div className="relative flex items-center justify-between w-full h-2 bg-white/10 rounded-full overflow-hidden">
      {/* Barra de Progresso */}
      <div
        className="absolute left-0 h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-500"
        style={{ width: `${(currentIndex + 1) * (100 / stages.length)}%` }}
      />

      {/* Pontos do Timeline */}
      {stages.map((s, index) => {
        const isActive = index <= currentIndex;
        const isCurrent = index === currentIndex;

        return (
          <div key={s} className="relative group">
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300
                        ${isActive ? 'bg-purple-400' : 'bg-white/20'}
                        ${isCurrent ? 'ring-4 ring-purple-400/30' : ''}`}
            />
            
            {/* Tooltip Aprimorado */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100
                          transition-all duration-200 pointer-events-none z-10 min-w-[200px]">
              <div className="bg-gray-900/95 backdrop-blur-sm text-white rounded-lg p-3 shadow-xl">
                <h4 className="font-medium mb-1">{stageLabels[s]}</h4>
                <p className="text-sm text-white/80">{stageDescriptions[s]}</p>
                {/* Seta do tooltip */}
                <div className="absolute left-1/2 -bottom-1 w-2 h-2 bg-gray-900 transform -translate-x-1/2 rotate-45" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}