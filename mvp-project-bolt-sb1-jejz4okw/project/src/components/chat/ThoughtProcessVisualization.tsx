import React, { useState } from 'react';
import { Brain, FileText, Target, AlertTriangle, Lightbulb, X } from 'lucide-react';
import type { ThoughtProcess, ApiLog } from './types';
import { ApiLogModal } from './ApiLogModal';
import { AnimatedDiv } from '../animation';

interface ThoughtProcessVisualizationProps {
  thoughtProcess: ThoughtProcess;
  apiLog?: ApiLog;
}

export function ThoughtProcessVisualization({ 
  thoughtProcess,
  apiLog
}: ThoughtProcessVisualizationProps) {
  const [isThoughtVisible, setIsThoughtVisible] = useState(false);
  const [isLogVisible, setIsLogVisible] = useState(false);

  return (
    <div className="relative flex items-center space-x-2">
      {/* Botão da Cadeia de Pensamento */}
      <button
        onClick={() => setIsThoughtVisible(true)}
        className={`p-2 rounded-full transition-all duration-300
                   ${isThoughtVisible ? 'bg-purple-500 shadow-lg shadow-purple-500/20' : 
                   'bg-white/10 hover:bg-purple-500/50'}`}
        title="Ver cadeia de pensamento"
      >
        <Brain className="w-4 h-4" />
      </button>

      {/* Botão do Log da API */}
      {apiLog && (
        <button
          onClick={() => setIsLogVisible(true)}
          className="p-2 rounded-full transition-all duration-300 bg-white/10 hover:bg-purple-500/50"
          title="Ver log da API"
        >
          <FileText className="w-4 h-4" />
        </button>
      )}

      {/* Modal do Log da API */}
      <ApiLogModal
        isOpen={isLogVisible}
        onClose={() => setIsLogVisible(false)}
        log={apiLog}
      />

      {/* Modal da Cadeia de Pensamento */}
      {isThoughtVisible && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[70]">
          <AnimatedDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl w-full max-w-2xl 
                      max-h-[90vh] overflow-hidden flex flex-col mx-4"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-bold">Cadeia de Pensamento</h2>
              </div>
              <button
                onClick={() => setIsThoughtVisible(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar">
              {/* Resto do conteúdo permanece igual */}
              {/* ... */}
            </div>
          </AnimatedDiv>
        </div>
      )}
    </div>
  );
}