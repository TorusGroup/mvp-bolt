import React from 'react';
import { Bot, User, Brain } from 'lucide-react';
import type { ChatMessageProps } from './types';
import { ThoughtProcessVisualization } from './ThoughtProcessVisualization';
import { ApiLogModal } from './ApiLogModal';

export function ChatMessage({ 
  message, 
  isBot = true, 
  type, 
  thoughtProcess,
  apiLog 
}: ChatMessageProps) {
  const isThinking = type === 'thinking';

  return (
    <div 
      className={`relative flex items-start space-x-3 ${
        isBot ? 'bg-white/20' : 'bg-purple-500/20'
      } p-4 rounded-lg`}
    >
      <div className="flex-1 flex items-start space-x-3">
        {/* Avatar do Bot/Usuário */}
        {isBot ? (
          <Bot className={`w-6 h-6 text-purple-300 mt-1 shrink-0 ${isThinking ? 'animate-pulse' : ''}`} />
        ) : (
          <User className="w-6 h-6 text-purple-300 mt-1 shrink-0" />
        )}
        
        {/* Mensagem */}
        <div className="flex-1">
          {/* Tag de Tipo */}
          {type && type !== 'thinking' && (
            <div className="inline-flex items-center space-x-1 px-2 py-0.5 bg-purple-500/20 
                          rounded-full text-sm text-purple-300 mb-2">
              <Brain className="w-3 h-3" />
              <span>{type}</span>
            </div>
          )}
          
          <p className={`text-white/90 ${isThinking ? 'animate-pulse' : ''}`}>{message}</p>
        </div>

        {/* Botões de Controle */}
        {isBot && !isThinking && (
          <div className="flex items-center space-x-2">
            {/* Visualização da Cadeia de Pensamento */}
            {thoughtProcess && (
              <ThoughtProcessVisualization 
                thoughtProcess={thoughtProcess}
                apiLog={apiLog}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}