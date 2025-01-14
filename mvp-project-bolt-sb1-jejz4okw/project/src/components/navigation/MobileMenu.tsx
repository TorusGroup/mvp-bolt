import React from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatedDiv } from '../animation';
import { NavLinks } from './NavLinks';
import type { NavigationProps } from './types';

interface MobileMenuProps extends NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileMenu({ isOpen, onToggle, currentPage, onPageChange }: MobileMenuProps) {
  return (
    <div className="lg:hidden">
      <button
        onClick={onToggle}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {isOpen && (
        <AnimatedDiv
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 
                    backdrop-blur-lg mt-2 py-4 rounded-lg shadow-xl border border-white/10"
        >
          <NavLinks
            currentPage={currentPage}
            onPageChange={(page) => {
              onPageChange(page);
              onToggle();
            }}
            className="flex flex-col space-y-4 px-4"
          />
        </AnimatedDiv>
      )}
    </div>
  );
}