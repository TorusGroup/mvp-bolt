import { useState, useEffect, useCallback } from 'react';
import type { Project, ProjectStage } from '../types/project';
import { getDB } from '../services/db';
import { createProjectFolder } from '../services/filesystem';
import { toast } from 'react-hot-toast';

interface CreateProjectData {
  name: string;
  description: string;
  problem: string;
}

// Map old status to new stage
const statusToStage: Record<string, ProjectStage> = {
  'active': 'empty',
  'completed': 'completed',
  'archived': 'completed'
};

function migrateProject(project: any): Project {
  if (!project.stage && project.status) {
    return {
      ...project,
      stage: statusToStage[project.status] || 'empty',
    };
  }
  return project;
}

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProjects = async () => {
    try {
      const db = await getDB();
      const allProjects = await db.getAll('projects');
      
      // Migrate and update existing projects
      const migratedProjects = allProjects.map(migrateProject);
      
      // Update projects in database if they were migrated
      const updatePromises = migratedProjects.map(async (project) => {
        if (project.stage !== allProjects.find(p => p.id === project.id)?.stage) {
          await db.put('projects', project);
        }
        return project;
      });
      
      await Promise.all(updatePromises);
      setProjects(migratedProjects);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
      toast.error('Erro ao carregar projetos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = useCallback(async (data: CreateProjectData) => {
    const db = await getDB();
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: data.name,
      description: data.description,
      problem: data.problem,
      createdAt: Date.now(),
      stage: 'empty',
      methodology: {
        name: 'Design Thinking',
        description: 'Processo iterativo de solução de problemas',
        phases: ['Empatia', 'Definição', 'Ideação', 'Prototipação', 'Testes']
      },
      team: [],
      tasks: [],
      currentPhase: 0
    };

    try {
      await createProjectFolder(newProject.id, {
        metadata: newProject,
        conversations: [],
        tasks: [],
        artifacts: []
      });

      await db.put('projects', newProject);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (error) {
      console.error('Erro ao criar projeto:', error);
      throw error;
    }
  }, []);

  const updateProject = useCallback(async (project: Project) => {
    try {
      const db = await getDB();
      await db.put('projects', project);
      setProjects(prev => prev.map(p => p.id === project.id ? project : p));
      toast.success('Projeto atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
      toast.error('Erro ao atualizar projeto');
      throw error;
    }
  }, []);

  const deleteProject = useCallback(async (projectId: string) => {
    try {
      const db = await getDB();
      await db.delete('projects', projectId);
      await db.delete('project_files', projectId);
      setProjects(prev => prev.filter(p => p.id !== projectId));
      toast.success('Projeto excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir projeto:', error);
      toast.error('Erro ao excluir projeto');
      throw error;
    }
  }, []);

  return { projects, loading, createProject, updateProject, deleteProject };
}