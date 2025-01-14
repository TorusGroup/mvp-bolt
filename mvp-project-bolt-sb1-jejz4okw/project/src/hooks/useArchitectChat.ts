import { useState, useEffect, useCallback } from 'react';
import { getDB } from '../services/db';
import { toast } from 'react-hot-toast';
import type { Project } from '../types/project';
import type { Message, ApiLog } from '../components/chat/types';
import type { ArchitectChatData } from '../services/db';

interface ChatState {
  messages: Message[];
  insights: string[];
  currentPhase: number;
  apiLogs: ApiLog[];
}

export function useArchitectChat(project: Project) {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    insights: [],
    currentPhase: 0,
    apiLogs: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasHistory, setHasHistory] = useState<boolean | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Carregar estado do chat quando o hook é inicializado
  useEffect(() => {
    if (!isInitialized && project.id) {
      loadChatState();
      setIsInitialized(true);
    }
  }, [project.id, isInitialized]);

  const loadChatState = useCallback(async () => {
    try {
      const db = await getDB();
      const chatData = await db.get('architect_chats', project.id);
      
      if (chatData && chatData.messages.length > 0) {
        console.log('Chat existente carregado:', chatData);
        setChatState({
          messages: chatData.messages,
          insights: chatData.insights,
          currentPhase: chatData.currentPhase,
          apiLogs: chatData.apiLogs || []
        });
        setHasHistory(true);
        toast.success('Histórico do chat carregado');
      } else {
        console.log('Novo chat iniciado para o projeto:', project.id);
        setChatState({
          messages: [],
          insights: [],
          currentPhase: 0,
          apiLogs: []
        });
        setHasHistory(false);
      }
    } catch (error) {
      console.error('Erro ao carregar estado do chat:', error);
      toast.error('Erro ao carregar histórico do chat');
      setHasHistory(false);
    }
  }, [project.id]);

  const saveChatState = useCallback(async () => {
    if (!project.id) return;

    try {
      const db = await getDB();
      const chatData: ArchitectChatData = {
        id: project.id,
        projectId: project.id,
        messages: chatState.messages,
        insights: chatState.insights,
        currentPhase: chatState.currentPhase,
        apiLogs: chatState.apiLogs,
        updatedAt: Date.now()
      };
      
      await db.put('architect_chats', chatData);
      console.log('Chat salvo com sucesso:', chatData);
      setHasHistory(true);
    } catch (error) {
      console.error('Erro ao salvar estado do chat:', error);
      toast.error('Erro ao salvar estado do chat');
    }
  }, [project.id, chatState]);

  // Salvar estado do chat sempre que houver mudanças significativas
  useEffect(() => {
    if (chatState.messages.length > 0) {
      saveChatState();
    }
  }, [chatState.messages, saveChatState]);

  const addMessage = useCallback((message: Message, apiLog?: ApiLog) => {
    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
      apiLogs: apiLog ? [...prev.apiLogs, apiLog] : prev.apiLogs
    }));
  }, []);

  const addInsight = useCallback((insight: string) => {
    setChatState(prev => ({
      ...prev,
      insights: [...new Set([...prev.insights, insight])]
    }));
  }, []);

  const setPhase = useCallback((phase: number) => {
    setChatState(prev => ({
      ...prev,
      currentPhase: phase
    }));
  }, []);

  const clearChat = useCallback(async () => {
    try {
      const db = await getDB();
      await db.delete('architect_chats', project.id);
      setChatState({
        messages: [],
        insights: [],
        currentPhase: 0,
        apiLogs: []
      });
      setHasHistory(false);
      toast.success('Histórico do chat limpo com sucesso');
    } catch (error) {
      console.error('Erro ao limpar chat:', error);
      toast.error('Erro ao limpar histórico do chat');
      throw error;
    }
  }, [project.id]);

  return {
    messages: chatState.messages,
    insights: chatState.insights,
    currentPhase: chatState.currentPhase,
    apiLogs: chatState.apiLogs,
    isLoading,
    setIsLoading,
    addMessage,
    addInsight,
    setPhase,
    clearChat,
    hasHistory,
    loadChatState
  };
}