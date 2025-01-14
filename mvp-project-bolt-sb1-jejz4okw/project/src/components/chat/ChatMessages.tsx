import React from 'react';
import { ChatMessage } from './ChatMessage';
import { Brain, Target, Users, Lightbulb, HelpCircle, CheckCircle, AlertTriangle, FileText, MessageSquare, Glasses } from 'lucide-react';
import type { Message } from './types';

const messageTypeIcons = {
  'Objetivo': Target,
  'Pensamento': Brain,
  'Análise': Glasses,
  'Equipe': Users,
  'Planejamento': MessageSquare,
  'Ideia': Lightbulb,
  'Dúvida': HelpCircle,
  'Aprovação': CheckCircle,
  'Atenção': AlertTriangle,
  'Documento': FileText
};

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="space-y-4 mb-4 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
      {messages.map((msg) => {
        const MessageIcon = msg.type ? messageTypeIcons[msg.type] : undefined;
        
        return (
          <ChatMessage 
            key={msg.id}
            message={msg.text}
            isBot={msg.isBot}
            type={msg.type}
            icon={MessageIcon}
          />
        );
      })}
    </div>
  );
}