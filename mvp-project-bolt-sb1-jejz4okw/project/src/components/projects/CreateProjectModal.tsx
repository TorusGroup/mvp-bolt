import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { AnimatedDiv } from '../animation';
import { useProjects } from '../../hooks/useProjects';
import type { Project } from '../../types/project';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  editProject?: Project;
}

export function CreateProjectModal({ isOpen, onClose, editProject }: CreateProjectModalProps) {
  const { createProject, updateProject } = useProjects();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    problem: ''
  });

  useEffect(() => {
    if (editProject) {
      setFormData({
        name: editProject.name,
        description: editProject.description,
        problem: editProject.problem
      });
    } else {
      setFormData({
        name: '',
        description: '',
        problem: ''
      });
    }
  }, [editProject]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editProject) {
        await updateProject({
          ...editProject,
          ...formData
        });
      } else {
        await createProject(formData);
      }
      onClose();
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <AnimatedDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 rounded-xl w-full max-w-2xl mx-4"
      >
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {editProject ? 'Editar Projeto' : 'Novo Projeto'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block mb-2 font-medium">
              Nome do Projeto
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-white/10 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Ex: Sistema de Gestão de Vendas"
                required
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Descrição
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full bg-white/10 p-3 rounded-lg mt-1 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Descreva o projeto em detalhes..."
                required
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Problema a ser Resolvido
              <textarea
                value={formData.problem}
                onChange={(e) => setFormData(prev => ({ ...prev, problem: e.target.value }))}
                className="w-full bg-white/10 p-3 rounded-lg mt-1 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Qual o problema que este projeto pretende resolver?"
                required
              />
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-400 px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Save className="w-5 h-5" />
              <span>{editProject ? 'Salvar Alterações' : 'Criar Projeto'}</span>
            </button>
          </div>
        </form>
      </AnimatedDiv>
    </div>
  );
}