import React, { useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { AnimatedDiv } from '../animation';
import { ProjectCard } from './ProjectCard';
import { CreateProjectModal } from './CreateProjectModal';
import { DeleteConfirmationModal } from './DeleteConfirmationModal';
import { ArchitectInterviewModal } from './ArchitectInterviewModal';
import { useProjects } from '../../hooks/useProjects';
import type { Project } from '../../types/project';

export function ProjectsPage() {
  const { projects, loading, deleteProject, updateProject } = useProjects();
  const [modalState, setModalState] = useState<{
    type: 'create' | 'delete' | 'architect' | null;
    project?: Project;
  }>({ type: null });

  // Memoize handlers para evitar recriações desnecessárias
  const handleEditProject = useCallback((project: Project) => {
    setModalState({ type: 'create', project });
  }, []);

  const handleDeleteClick = useCallback((project: Project) => {
    setModalState({ type: 'delete', project });
  }, []);

  const handleOpenArchitectInterview = useCallback((project: Project) => {
    setModalState({ type: 'architect', project });
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalState({ type: null });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (modalState.project) {
      try {
        await deleteProject(modalState.project.id);
        handleCloseModal();
      } catch (error) {
        console.error('Erro ao excluir projeto:', error);
      }
    }
  }, [modalState.project, deleteProject, handleCloseModal]);

  const handleUpdateProject = useCallback(async (updatedProject: Project) => {
    try {
      await updateProject(updatedProject);
    } catch (error) {
      console.error('Erro ao atualizar projeto:', error);
    }
  }, [updateProject]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-xl">Carregando projetos...</div>
      </div>
    );
  }

  return (
    <AnimatedDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Projetos</h1>
        <p className="text-xl opacity-80 max-w-2xl mx-auto">
          Transforme suas ideias em realidade com nossa equipe de IAs especializadas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Botão de Novo Projeto */}
        <button
          onClick={() => setModalState({ type: 'create' })}
          className="h-[400px] border-2 border-dashed border-purple-400/50 rounded-xl
                   flex flex-col items-center justify-center space-y-4
                   hover:border-purple-400 hover:bg-purple-400/10 transition-all
                   duration-300 group"
        >
          <Plus className="w-12 h-12 text-purple-400 group-hover:rotate-90 transform transition-transform duration-300" />
          <span className="text-purple-400 font-medium">Novo Projeto</span>
        </button>

        {/* Lista de Projetos */}
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onEdit={handleEditProject}
            onDelete={handleDeleteClick}
            onOpenArchitectInterview={handleOpenArchitectInterview}
          />
        ))}
      </div>

      {/* Modais */}
      {modalState.type === 'create' && (
        <CreateProjectModal
          isOpen={true}
          onClose={handleCloseModal}
          editProject={modalState.project}
        />
      )}

      {modalState.type === 'delete' && (
        <DeleteConfirmationModal
          isOpen={true}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          projectName={modalState.project?.name}
        />
      )}

      {modalState.type === 'architect' && modalState.project && (
        <ArchitectInterviewModal
          isOpen={true}
          onClose={handleCloseModal}
          project={modalState.project}
          onUpdateProject={handleUpdateProject}
        />
      )}
    </AnimatedDiv>
  );
}