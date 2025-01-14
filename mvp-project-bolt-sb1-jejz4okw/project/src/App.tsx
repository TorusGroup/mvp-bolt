import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Header } from './components/Header';
import { IntroSection } from './components/IntroSection';
import { ChatSection } from './components/chat/ChatSection';
import { AITeamPage } from './components/ai-team/AITeamPage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { SettingsModal } from './components/settings/SettingsModal';
import { CreateAgentModal } from './components/ai-team/CreateAgentModal';
import { CreateProjectModal } from './components/projects/CreateProjectModal';
import { useTimeout } from './hooks/useTimeout';

type ModalType = 'settings' | 'createAgent' | 'createProject' | null;

export default function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [currentPage, setCurrentPage] = useState<'intro' | 'chat' | 'team' | 'settings' | 'projects'>('intro');
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [editingAgent, setEditingAgent] = useState<any>(null);
  
  useTimeout(() => {
    setShowWelcome(false);
  }, 3000);

  const handleOpenModal = (modalType: ModalType, data?: any) => {
    setActiveModal(modalType);
    if (modalType === 'createAgent' && data) {
      setEditingAgent(data);
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setEditingAgent(null);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'intro':
        return <IntroSection onStart={() => setCurrentPage('chat')} />;
      case 'chat':
        return <ChatSection />;
      case 'team':
        return <AITeamPage onOpenModal={(data) => handleOpenModal('createAgent', data)} />;
      case 'projects':
        return <ProjectsPage onOpenModal={() => handleOpenModal('createProject')} />;
      default:
        return <IntroSection onStart={() => setCurrentPage('chat')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 text-white">
      {showWelcome ? (
        <WelcomeScreen />
      ) : (
        <>
          <Header 
            currentPage={currentPage} 
            onPageChange={(page) => {
              if (page === 'settings') {
                handleOpenModal('settings');
              } else {
                setCurrentPage(page);
              }
            }}
          />
          <main className="container mx-auto px-4 pt-24 pb-8">
            {renderPage()}
          </main>

          {/* Modais */}
          <SettingsModal
            isOpen={activeModal === 'settings'}
            onClose={handleCloseModal}
          />
          
          <CreateAgentModal
            isOpen={activeModal === 'createAgent'}
            onClose={handleCloseModal}
            editAgent={editingAgent}
            onCreated={() => handleCloseModal()}
          />

          <CreateProjectModal
            isOpen={activeModal === 'createProject'}
            onClose={handleCloseModal}
          />
        </>
      )}
    </div>
  );
}