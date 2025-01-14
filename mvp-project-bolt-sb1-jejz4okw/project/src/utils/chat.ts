import type { ThoughtProcess } from '../components/chat/types';

export const generateMessageId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const createMessage = (
  text: string,
  isBot: boolean,
  type?: string,
  thoughtProcess?: ThoughtProcess
) => {
  return {
    id: generateMessageId(),
    text,
    isBot,
    type,
    thoughtProcess,
    timestamp: Date.now(),
  };
};