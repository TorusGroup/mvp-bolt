export interface NavigationProps {
  currentPage: 'intro' | 'chat' | 'team' | 'settings' | 'projects';
  onPageChange: (page: 'intro' | 'chat' | 'team' | 'settings' | 'projects') => void;
}