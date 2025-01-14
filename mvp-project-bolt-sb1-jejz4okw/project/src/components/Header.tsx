import React from 'react';
import { Building2 } from 'lucide-react';
import { MobileMenu, DesktopMenu } from './navigation';
import type { NavigationProps } from './navigation/types';

export function Header({ currentPage, onPageChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handlePageChange = (page: NavigationProps['currentPage']) => {
    onPageChange(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80 
                     backdrop-blur-lg z-40 px-4 py-3 border-b border-white/10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Building2 className="w-8 h-8" />
          <span className="text-xl font-bold">MPV Factory</span>
        </div>

        <div className="relative flex items-center">
          <DesktopMenu currentPage={currentPage} onPageChange={handlePageChange} />
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </header>
  );
}