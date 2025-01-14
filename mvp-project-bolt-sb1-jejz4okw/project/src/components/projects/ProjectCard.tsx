import React from 'react';
import { Calendar, Users, ArrowRight, Pencil, Trash2, Brain, Users2, Rocket, CheckCircle2 } from 'lucide-react';
import type { Project, ProjectStage } from '../../types/project';
import { AnimatedDiv } from '../animation';
import { ProjectTimeline } from './ProjectTimeline';

interface ProjectCardProps {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (projectId: string) => void;
  onOpenArchitectInterview: (project: Project) => void;
}

const stageInfo: Record<ProjectStage, { icon: React.ReactNode; label: string; color: string }> = {
  empty: {
    icon: <Brain className="w-4 h-4" />,
    label: 'Aguardando Planejamento',
    color: 'text-gray-400'
  },
  planned: {
    icon: <Brain className="w-4 h-4" />,
    label: 'Planejado',
    color: 'text-blue-400'
  },
  recruiting: {
    icon: <Users2 className="w-4 h-4" />,
    label: 'Recrutando Equipe',
    color: 'text-yellow-400'
  },
  ready: {
    icon: <Rocket className="w-4 h-4" />,
    label: 'Pronto para Iniciar',
    color: 'text-green-400'
  },
  ongoing: {
    icon: <Rocket className="w-4 h-4" />,
    label: 'Em Andamento',
    color: 'text-purple-400'
  },
  completed: {
    icon: <CheckCircle2 className="w-4 h-4" />,
    label: 'Concluído',
    color: 'text-emerald-400'
  }
};

export function ProjectCard({ project, onEdit, onDelete, onOpenArchitectInterview }: ProjectCardProps) {
  const stage = project?.stage || 'empty';
  const stageData = stageInfo[stage];

  if (!project) {
    console.error('Invalid project data:', project);
    return null;
  }

  const formattedDate = new Date(project.createdAt).toLocaleDateString();

  return (
    <AnimatedDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:bg-white/[0.15] transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold">{project.name}</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(project)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Editar projeto"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(project.id)}
            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
            title="Excluir projeto"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-sm opacity-80 mb-6 line-clamp-2">{project.description}</p>

      <ProjectTimeline stage={stage} />

      <div className="mt-6 space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <Calendar className="w-4 h-4 text-purple-400" />
          <span>Criado em {formattedDate}</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Users className="w-4 h-4 text-purple-400" />
          <span>{project.team?.length || 0} membros na equipe</span>
        </div>

        <div className={`flex items-center space-x-2 text-sm ${stageData.color}`}>
          {stageData.icon}
          <span>{stageData.label}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
        <div className="flex -space-x-2">
          {(project.team || []).slice(0, 3).map((member, index) => (
            <img
              key={member.id}
              src={member.avatar}
              alt={member.name}
              className="w-8 h-8 rounded-full border-2 border-purple-900"
              style={{ zIndex: 3 - index }}
            />
          ))}
          {(project.team?.length || 0) > 3 && (
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center
                          text-xs font-medium border-2 border-purple-900">
              +{project.team!.length - 3}
            </div>
          )}
        </div>

        <button
          onClick={() => onOpenArchitectInterview(project)}
          className="p-2 rounded-lg transition-all duration-300 hover:bg-purple-500 group"
          title="Abrir chat com Arquiteto"
        >
          <ArrowRight className="w-5 h-5 group-hover:text-white text-purple-400" />
        </button>
      </div>
    </AnimatedDiv>
  );
}