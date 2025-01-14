import React from 'react';
import { Brain, Thermometer, MessageSquare, Hash } from 'lucide-react';
import type { AIAgent } from '../../types/ai';
import { AnimatedDiv } from '../animation';

interface AIAgentCardProps {
  agent: AIAgent;
  isNew?: boolean;
  onEdit: (agent: AIAgent) => void;
}

export function AIAgentCard({ agent, isNew, onEdit }: AIAgentCardProps) {
  return (
    <AnimatedDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white/10 backdrop-blur-lg rounded-xl p-6 transition-all duration-300 cursor-pointer
                ${isNew ? 'ring-2 ring-purple-400 ring-opacity-100 shadow-lg shadow-purple-500/20' : ''}
                hover:transform hover:scale-105`}
      onClick={() => onEdit(agent)}
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={agent.photo || agent.avatar}
          alt={agent.name}
          className={`w-16 h-16 rounded-full object-cover border-2 
                   ${isNew ? 'border-purple-400 animate-pulse' : 'border-purple-400/50'}`}
        />
        <div>
          <h3 className="text-xl font-semibold">{agent.name}</h3>
          <p className="text-sm opacity-80">{agent.model.name}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <Brain className="w-4 h-4 text-purple-400" />
          <span className="opacity-80">Prompt:</span>
          <p className="flex-1 truncate">{agent.prompt}</p>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Thermometer className="w-4 h-4 text-purple-400" />
          <span className="opacity-80">Temperatura:</span>
          <p>{agent.temperature}</p>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <MessageSquare className="w-4 h-4 text-purple-400" />
          <span className="opacity-80">Formato:</span>
          <p>{agent.outputFormat}</p>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <Hash className="w-4 h-4 text-purple-400" />
          <span className="opacity-80">Tokens:</span>
          <p>{agent.maxTokens}</p>
        </div>
      </div>
    </AnimatedDiv>
  );
}