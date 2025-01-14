import React from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

export function ChatInput({ value, onChange, onSubmit, isLoading }: ChatInputProps) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
          }
        }}
        className="w-full bg-white/10 p-4 pr-24 rounded-lg resize-none h-20
                 focus:outline-none focus:ring-2 focus:ring-purple-400
                 placeholder-white/50"
        placeholder="Digite sua mensagem..."
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !value.trim()}
        className={`absolute right-2 bottom-2 px-4 py-2 rounded-lg flex items-center space-x-2
                 transition-colors ${
                   isLoading || !value.trim()
                     ? 'bg-purple-500/50 cursor-not-allowed'
                     : 'bg-purple-500 hover:bg-purple-400'
                 }`}
      >
        <Send className="w-5 h-5" />
        <span>{isLoading ? 'Enviando...' : 'Enviar'}</span>
      </button>
    </form>
  );
}