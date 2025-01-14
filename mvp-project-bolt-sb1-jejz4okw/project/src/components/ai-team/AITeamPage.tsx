import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AnimatedDiv } from '../animation';
import { AIAgentCard } from './AIAgentCard';
import { CreateAgentModal } from './CreateAgentModal';
import { useAITeam } from '../../hooks/useAITeam';
import type { AIAgent } from '../../types/ai';

export function AITeamPage() {
  const { agents, isCreating } = useAITeam();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAgent, setEditingAgent] = useState<AIAgent | undefined>();
  const [lastCreatedId, setLastCreatedId] = useState<string | null>(null);

  const handleAgentCreated = (agentId: string) => {
    setLastCreatedId(agentId);
    setTimeout(() => setLastCreatedId(null), 2000);
  };

  const handleEditAgent = (agent: AIAgent) => {
    setEditingAgent(agent);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAgent(undefined);
  };

  return (
    <AnimatedDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Equipe AI</h1>
        <p className="text-xl opacity-80 max-w-2xl mx-auto">
          Monte sua equipe de agentes AI especializados para diferentes aspectos do seu projeto
        </p>
      </div>

      {agents.length === 0 && !isCreating ? (
        <div className="flex flex-col items-center justify-center py-16">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-500 hover:bg-purple-400 text-white p-4 rounded-full
                     shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Plus className="w-8 h-8 transform group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <p className="mt-4 text-lg opacity-80">Adicione seu primeiro agente AI</p>
        </div>
      ) : (
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <AIAgentCard 
                key={agent.id} 
                agent={agent}
                isNew={agent.id === lastCreatedId}
                onEdit={handleEditAgent}
              />
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-8 right-8 bg-purple-500 hover:bg-purple-400 text-white p-4
                     rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <Plus className="w-6 h-6 transform group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>
      )}

      <CreateAgentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreated={handleAgentCreated}
        editAgent={editingAgent}
      />
    </AnimatedDiv>
  );
}