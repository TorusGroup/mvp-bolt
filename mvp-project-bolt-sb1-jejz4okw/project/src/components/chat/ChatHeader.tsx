import React from 'react';
import { Bot } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <Bot className="w-8 h-8 text-purple-300" />
      <div>
        <h2 className="text-xl font-semibold">Assistente MPV</h2>
        <p className="opacity-80">Seu guia de inovação</p>
      </div>
    </div>
  );
}