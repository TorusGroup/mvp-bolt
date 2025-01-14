import type { AIModel } from './ai';

export type ProjectStage = 
  | 'empty'      // Ainda não existiu planejamento com o arquiteto
  | 'planned'    // Projeto foi iniciado com o arquiteto
  | 'recruiting' // Equipe AI ainda não foi criada
  | 'ready'      // Equipe criada e ainda não iniciaram atividades
  | 'ongoing'    // Atividades estão sendo distribuídas
  | 'completed'; // Projeto finalizado

export interface ProjectArchitect {
  modelId: string;
  model: AIModel;
  name: string;
  avatar: string;
  personality: string;
}

export interface ProjectMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
  backstory: string;
  objective: string;
  personality: string;
  specialization: string;
}

// ... resto do código continua igual ...

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  stage: ProjectStage;
  problem: string;
  architect?: ProjectArchitect;
  methodology: {
    name: string;
    description: string;
    phases: string[];
  };
  team: ProjectMember[];
  tasks: ProjectTask[];
  currentPhase: number;
}