import React from 'react';
import { NavLinks } from './NavLinks';
import type { NavigationProps } from './types';

export function DesktopMenu({ currentPage, onPageChange }: NavigationProps) {
  return (
    <nav className="hidden lg:block">
      <NavLinks
        currentPage={currentPage}
        onPageChange={onPageChange}
        className="flex items-center space-x-6"
      />
    </nav>
  );
}