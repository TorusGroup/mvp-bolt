import React, { useState, useEffect } from 'react';
import { X, Upload, Brain, Camera } from 'lucide-react';
import { AnimatedDiv } from '../animation';
import { useAITeam } from '../../hooks/useAITeam';
import { AI_MODELS, type AIAgent } from '../../types/ai';

interface CreateAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (agentId: string) => void;
  editAgent?: AIAgent;
}

export function CreateAgentModal({ isOpen, onClose, onCreated, editAgent }: CreateAgentModalProps) {
  const { createAgent, updateAgent, isCreating } = useAITeam();
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    photo: '',
    prompt: '',
    temperature: 0.7,
    outputFormat: 'text',
    maxTokens: 2048,
    modelId: AI_MODELS[0].id
  });
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (editAgent) {
      setFormData({
        name: editAgent.name,
        avatar: editAgent.avatar,
        photo: editAgent.photo || '',
        prompt: editAgent.prompt,
        temperature: editAgent.temperature,
        outputFormat: editAgent.outputFormat,
        maxTokens: editAgent.maxTokens,
        modelId: editAgent.model.id
      });
      setPreviewUrl(editAgent.photo || editAgent.avatar);
    } else {
      setFormData({
        name: '',
        avatar: '',
        photo: '',
        prompt: '',
        temperature: 0.7,
        outputFormat: 'text',
        maxTokens: 2048,
        modelId: AI_MODELS[0].id
      });
      setPreviewUrl('');
    }
  }, [editAgent]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData(prev => ({ ...prev, photo: base64String }));
        setPreviewUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) return;

    try {
      let agent;
      if (editAgent) {
        agent = await updateAgent(editAgent.id, formData);
      } else {
        agent = await createAgent(formData);
      }
      onCreated(agent.id);
      onClose();
    } catch (error) {
      console.error('Error saving agent:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <AnimatedDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 p-6 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {editAgent ? 'Editar Agente' : 'Criar Novo Agente'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white/10 flex items-center justify-center border-2 border-purple-400/50">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-12 h-12 text-white/50" />
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <Upload className="w-8 h-8" />
              </label>
            </div>
            <p className="text-sm mt-2 opacity-70">
              Clique para fazer upload da foto
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Nome do Agente
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-white/10 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Ex: Especialista em Design Thinking"
                required
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              URL do Avatar (opcional)
              <input
                type="url"
                value={formData.avatar}
                onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                className="w-full bg-white/10 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="https://exemplo.com/avatar.jpg"
              />
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Prompt do Agente
              <textarea
                value={formData.prompt}
                onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                className="w-full bg-white/10 p-3 rounded-lg mt-1 resize-none h-32 focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Defina o comportamento e especialidade do agente..."
                required
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">
                Temperatura
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={formData.temperature}
                  onChange={(e) => setFormData(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                  className="w-full"
                />
                <span className="text-sm opacity-80">{formData.temperature}</span>
              </label>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Tokens Máximos
                <input
                  type="number"
                  value={formData.maxTokens}
                  onChange={(e) => setFormData(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                  className="w-full bg-white/10 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  min="1"
                  max="4096"
                  required
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Formato de Saída
              <select
                value={formData.outputFormat}
                onChange={(e) => setFormData(prev => ({ ...prev, outputFormat: e.target.value }))}
                className="w-full bg-white/10 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              >
                <option value="text">Texto</option>
                <option value="json">JSON</option>
                <option value="markdown">Markdown</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Modelo
              <select
                value={formData.modelId}
                onChange={(e) => setFormData(prev => ({ ...prev, modelId: e.target.value }))}
                className="w-full bg-white/10 p-3 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                required
              >
                {AI_MODELS.map(model => (
                  <option key={model.id} value={model.id}>
                    {model.name} - {model.description}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className={`bg-purple-500 hover:bg-purple-400 px-6 py-2 rounded-lg transition-colors
                       flex items-center space-x-2 ${isCreating ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <span className="animate-pulse">Salvando...</span>
                </>
              ) : (
                <>
                  <Brain className="w-5 h-5" />
                  <span>{editAgent ? 'Salvar Alterações' : 'Criar Agente'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </AnimatedDiv>
    </div>
  );
}