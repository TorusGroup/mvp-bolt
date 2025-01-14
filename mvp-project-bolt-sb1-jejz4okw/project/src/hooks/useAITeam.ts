import { useState, useEffect, useCallback } from 'react';
import type { AIAgent } from '../types/ai';
import { AI_MODELS } from '../types/ai';
import { fetchAgents, createAgent as createAgentApi, updateAgent as updateAgentApi } from '../services/api';

interface CreateAgentData {
  name: string;
  avatar: string;
  prompt: string;
  temperature: number;
  outputFormat: string;
  maxTokens: number;
  modelId: string;
}

export function useAITeam() {
  const [agents, setAgents] = useState<AIAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchAgents()
      .then(setAgents)
      .finally(() => setLoading(false));
  }, []);

  const createAgent = useCallback(async (data: CreateAgentData) => {
    setIsCreating(true);
    try {
      const model = AI_MODELS.find(m => m.id === data.modelId)!;
      const newAgent = await createAgentApi({
        ...data,
        model,
        createdAt: Date.now(),
      });
      
      setAgents(prev => [...prev, newAgent]);
      return newAgent;
    } finally {
      setIsCreating(false);
    }
  }, []);

  const updateAgent = useCallback(async (id: string, data: CreateAgentData) => {
    setIsCreating(true);
    try {
      const model = AI_MODELS.find(m => m.id === data.modelId)!;
      const updatedAgent = await updateAgentApi(id, {
        ...data,
        model,
      });
      
      setAgents(prev => prev.map(agent => 
        agent.id === id ? updatedAgent : agent
      ));
      return updatedAgent;
    } finally {
      setIsCreating(false);
    }
  }, []);

  return { agents, loading, isCreating, createAgent, updateAgent };
}