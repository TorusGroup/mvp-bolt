import type { LucideIcon } from 'lucide-react';

export interface AIModel {
  id: string;
  name: string;
  description: string;
  icon: string;
  provider: string;
  contextWindow?: number;
  maxTokens?: number;
  inputCostPer1k?: number;
  outputCostPer1k?: number;
}

export interface AIAgent {
  id: string;
  name: string;
  avatar: string;
  photo?: string;
  prompt: string;
  temperature: number;
  outputFormat: string;
  maxTokens: number;
  model: AIModel;
  createdAt: number;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'gpt-4-turbo-preview',
    name: 'GPT-4 Turbo',
    description: 'Modelo mais recente e avançado da OpenAI',
    icon: 'brain',
    provider: 'openai',
    contextWindow: 128000,
    maxTokens: 4096,
    inputCostPer1k: 0.01,
    outputCostPer1k: 0.03
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    description: 'Modelo estável e confiável para tarefas complexas',
    icon: 'sparkles',
    provider: 'openai',
    contextWindow: 8192,
    maxTokens: 4096,
    inputCostPer1k: 0.03,
    outputCostPer1k: 0.06
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    description: 'Modelo rápido e eficiente para tarefas gerais',
    icon: 'zap',
    provider: 'openai',
    contextWindow: 16385,
    maxTokens: 4096,
    inputCostPer1k: 0.0015,
    outputCostPer1k: 0.002
  }
];