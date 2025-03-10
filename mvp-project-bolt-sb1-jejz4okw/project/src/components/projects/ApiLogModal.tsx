import React from 'react';
import { X, Clock, Server, ArrowDown } from 'lucide-react';
import { AnimatedDiv } from '../animation';

interface ApiLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: {
    request: any;
    response: any;
    timestamp?: string;
  };
}

export function ApiLogModal({ isOpen, onClose, log }: ApiLogModalProps) {
  if (!isOpen || !log) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60]">
      <AnimatedDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl w-full max-w-4xl 
                  max-h-[90vh] overflow-hidden flex flex-col mx-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Log da API</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-6 custom-scrollbar">
          {log.timestamp && (
            <div className="flex items-center space-x-2 text-sm text-purple-400 mb-4">
              <Clock className="w-4 h-4" />
              <span>{new Date(log.timestamp).toLocaleString()}</span>
            </div>
          )}

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Server className="w-5 h-5 text-blue-400" />
              <h3 className="text-blue-400 font-medium">Request</h3>
            </div>
            <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm font-mono">
              {JSON.stringify(log.request, null, 2)}
            </pre>
          </div>

          <div className="flex justify-center">
            <ArrowDown className="w-6 h-6 text-purple-400" />
          </div>

          <div>
            <div className="flex items-center space-x-2 mb-2">
              <ArrowDown className="w-5 h-5 text-green-400" />
              <h3 className="text-green-400 font-medium">Response</h3>
            </div>
            <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm font-mono">
              {JSON.stringify(log.response, null, 2)}
            </pre>
          </div>
        </div>
      </AnimatedDiv>
    </div>
  );
}