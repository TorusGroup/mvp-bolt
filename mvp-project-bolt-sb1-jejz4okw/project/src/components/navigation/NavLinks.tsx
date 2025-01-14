import React from 'react';
import { MessageSquare, Users, Settings, FolderKanban } from 'lucide-react';
import type { NavigationProps } from './types';

interface NavLinksProps extends NavigationProps {
  className?: string;
}

export function NavLinks({ currentPage, onPageChange, className = '' }: NavLinksProps) {
  return (
    <div className={className}>
      <button
        onClick={() => onPageChange('chat')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                  hover:bg-white/10 ${currentPage === 'chat' ? 'text-purple-300 bg-white/5' : ''}`}
      >
        <MessageSquare className="w-5 h-5" />
        <span>Chat</span>
      </button>

      <button
        onClick={() => onPageChange('team')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                  hover:bg-white/10 ${currentPage === 'team' ? 'text-purple-300 bg-white/5' : ''}`}
      >
        <Users className="w-5 h-5" />
        <span>Equipe AI</span>
      </button>

      <button
        onClick={() => onPageChange('projects')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                  hover:bg-white/10 ${currentPage === 'projects' ? 'text-purple-300 bg-white/5' : ''}`}
      >
        <FolderKanban className="w-5 h-5" />
        <span>Projetos</span>
      </button>

      <button
        onClick={() => onPageChange('settings')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
                  hover:bg-white/10 ${currentPage === 'settings' ? 'text-purple-300 bg-white/5' : ''}`}
      >
        <Settings className="w-5 h-5" />
        <span>Configurações</span>
      </button>
    </div>
  );
}