import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Sparkles, Target, Rocket, CheckCircle, Brain, MessageSquare, AlertTriangle, Lightbulb, Info, FileText } from 'lucide-react';
import { AnimatedDiv } from '../animation';
import type { Project } from '../../types/project';
import { useArchitectChat } from '../../hooks/useArchitectChat';
import { ThoughtProcessVisualization } from '../chat/ThoughtProcessVisualization';
import { InsightsPanel } from '../chat/InsightsPanel';
import { createMessage } from '../../utils/chat';
import { aiService } from '../../services/ai';
import { toast } from 'react-hot-toast';

interface Phase {
  id: string;
  label: string;
  icon: typeof Brain;
  description: string;
}

const phases: Phase[] = [
  {
    id: 'analysis',
    label: 'Análise',
    icon: Brain,
    description: 'Análise inicial do projeto e definição de objetivos'
  },
  {
    id: 'planning',
    label: 'Planejamento',
    icon: Target,
    description: 'Definição de estratégias e metodologias'
  },
  {
    id: 'execution',
    label: 'Execução',
    icon: Rocket,
    description: 'Desenvolvimento e implementação'
  },
  {
    id: 'completion',
    label: 'Conclusão',
    icon: CheckCircle,
    description: 'Finalização e entrega do projeto'
  }
];

interface ArchitectInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  onUpdateProject: (project: Project) => void;
}

export function ArchitectInterviewModal({ 
  isOpen, 
  onClose, 
  project, 
  onUpdateProject 
}: ArchitectInterviewModalProps) {
  const [isPhasesExpanded, setIsPhasesExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [strategy, setStrategy] = useState<any>(null);
  const [showThoughtProcess, setShowThoughtProcess] = useState(true);
  const [showApiLogs, setShowApiLogs] = useState(true);
  const chatRef = useRef<HTMLDivElement>(null);
  const currentPhase = project.currentPhase || 0;
  
  const {
    messages,
    insights,
    isLoading,
    addMessage,
    addInsight,
    setPhase,
    clearChat,
    hasHistory,
    loadChatState,
    apiLogs
  } = useArchitectChat(project);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = createMessage(message.trim(), false);
    addMessage(userMessage);
    setMessage('');

    try {
      const response = await aiService.complete('openai', {
        model: 'gpt-4-turbo-preview',
        prompt: message.trim(),
        systemPrompt: `Você é o Arquiteto AI do projeto ${project.name}. 
                      Fase atual: ${phases[currentPhase].label}
                      Objetivo: ${project.problem}`
      });

      const botMessage = createMessage(
        JSON.parse(response.text).chat_response.message,
        true,
        JSON.parse(response.text).chat_response.type,
        JSON.parse(response.text).thought_process
      );

      addMessage(botMessage, {
        request: {
          prompt: message.trim(),
          model: 'gpt-4-turbo-preview'
        },
        response: response,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      toast.error('Erro ao processar mensagem');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <AnimatedDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 rounded-xl w-full max-w-7xl mx-4 
                  max-h-[90vh] flex overflow-hidden"
      >
        {/* Área Principal */}
        <div className="flex-1 p-6 flex flex-col max-h-[90vh] overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-2xl font-bold">{project.name}</h2>
                <p className="text-white/60">Fase atual: {phases[currentPhase].label}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowThoughtProcess(!showThoughtProcess)}
                  className={`p-2 rounded-lg transition-colors ${
                    showThoughtProcess ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'
                  }`}
                  title={showThoughtProcess ? 'Ocultar cadeia de pensamento' : 'Mostrar cadeia de pensamento'}
                >
                  <Brain className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowApiLogs(!showApiLogs)}
                  className={`p-2 rounded-lg transition-colors ${
                    showApiLogs ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'
                  }`}
                  title={showApiLogs ? 'Ocultar logs da API' : 'Mostrar logs da API'}
                >
                  <FileText className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Área de Chat */}
          <div ref={chatRef} className="flex-1 overflow-y-auto custom-scrollbar mb-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg relative ${
                    msg.isBot ? 'bg-white/10 text-white' : 'bg-purple-500/20 text-white'
                  }`}
                >
                  {msg.type && msg.isBot && (
                    <div className="absolute -top-3 left-4 px-2 py-0.5 bg-purple-500 rounded-full text-xs">
                      {msg.type}
                    </div>
                  )}
                  <div className="mt-2">{msg.text}</div>
                  {msg.isBot && msg.thoughtProcess && showThoughtProcess && (
                    <div className="mt-2 pt-2 border-t border-white/10">
                      <ThoughtProcessVisualization
                        thoughtProcess={msg.thoughtProcess}
                        apiLog={showApiLogs ? apiLogs[index] : undefined}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-4 rounded-lg bg-white/10 text-white">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-5 h-5 animate-pulse" />
                    <span className="animate-pulse">Arquiteto pensando...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input de Mensagem */}
          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-white/10 p-4 pr-24 rounded-lg resize-none h-20
                       focus:outline-none focus:ring-2 focus:ring-purple-400
                       placeholder-white/50"
              placeholder="Digite sua mensagem..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className={`absolute right-2 bottom-2 px-4 py-2 rounded-lg flex items-center space-x-2
                       transition-colors ${
                         isLoading || !message.trim()
                           ? 'bg-purple-500/50 cursor-not-allowed'
                           : 'bg-purple-500 hover:bg-purple-400'
                       }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>{isLoading ? 'Enviando...' : 'Enviar'}</span>
            </button>
          </form>
        </div>

        {/* Painel Lateral */}
        <div className="w-80 bg-white/5 rounded-lg p-4 overflow-hidden flex flex-col">
          {/* Fases do Projeto */}
          <div className="mb-6">
            <button
              onClick={() => setIsPhasesExpanded(!isPhasesExpanded)}
              className="flex items-center justify-between w-full p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-medium text-purple-300">Fases do Projeto</h3>
              </div>
              {isPhasesExpanded ? (
                <ChevronDown className="w-4 h-4 text-purple-300" />
              ) : (
                <ChevronRight className="w-4 h-4 text-purple-300" />
              )}
            </button>

            {/* Lista de Fases */}
            <div className="space-y-2 mt-2">
              {isPhasesExpanded ? (
                phases.map((phase, index) => {
                  const Icon = phase.icon;
                  const isActive = index <= currentPhase;
                  return (
                    <div
                      key={phase.id}
                      className={`flex items-center space-x-2 p-2 rounded-lg
                                ${isActive ? 'bg-purple-500/20' : 'bg-white/5'}`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-white/50'}`} />
                      <span className={isActive ? 'text-white' : 'text-white/50'}>
                        {phase.label}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex items-center space-x-2 p-2 rounded-lg bg-purple-500/20">
                  {React.createElement(phases[currentPhase].icon, { 
                    className: "w-4 h-4 text-purple-400" 
                  })}
                  <span className="text-white">{phases[currentPhase].label}</span>
                </div>
              )}
            </div>
          </div>

          {/* Insights e Análises */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <InsightsPanel
              insights={insights}
              analysis={analysis}
              strategy={strategy}
            />
          </div>
        </div>
      </AnimatedDiv>
    </div>
  );
}