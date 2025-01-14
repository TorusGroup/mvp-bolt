import React, { useState, useEffect } from 'react';
import { AnimatedDiv } from '../animation';
import { Message, ApiResponse } from './types';
import { createMessage } from '../../utils/chat';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { aiService } from '../../services/ai';
import { useSettings } from '../../hooks/useSettings';
import { Brain } from 'lucide-react';

export function ChatSection() {
  const { settings } = useSettings();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initiateChat();
  }, []);

  const initiateChat = async () => {
    try {
      const systemPrompt = `
Você é um assistente especializado em projetos de inovação.

Instruções:
- Analise cuidadosamente cada pergunta
- Forneça respostas estruturadas e objetivas
- Categorize suas respostas de acordo com o tipo mais apropriado
- Inclua sua cadeia de pensamento
- Identifique e registre insights relevantes
- Responda SEMPRE em formato JSON com a estrutura completa fornecida`;

      const response = await aiService.complete('openai', {
        model: 'gpt-3.5-turbo',
        systemPrompt,
        prompt: "Como posso ajudar com seu projeto hoje?",
        responseFormat: { type: 'json_object' }
      });

      const parsedResponse = JSON.parse(response.text) as ApiResponse;
      
      const initialMessage = createMessage(
        parsedResponse.chat_response.message,
        true,
        parsedResponse.chat_response.type,
        parsedResponse.thought_process
      );

      setMessages([initialMessage]);
    } catch (error) {
      console.error('Erro ao iniciar chat:', error);
      setMessages([
        createMessage("Desculpe, ocorreu um erro ao iniciar o chat. Por favor, tente novamente.", true)
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    
    const userMessage = createMessage(input.trim(), false);
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Adiciona mensagem de "pensando" temporária
    const thinkingMessage = createMessage("Arquiteto pensando...", true, "thinking");
    setMessages(prev => [...prev, thinkingMessage]);
    
    try {
      const conversationHistory = messages
        .map(msg => `${msg.isBot ? 'Assistente' : 'Usuário'}: ${msg.text}`)
        .join('\n');

      const systemPrompt = `
${settings.systemPrompt || 'Você é um assistente especializado em projetos de inovação.'}

Histórico da Conversa:
${conversationHistory}

Instruções:
- Analise cuidadosamente cada pergunta
- Forneça respostas estruturadas e objetivas
- Categorize suas respostas de acordo com o tipo mais apropriado
- Inclua sua cadeia de pensamento
- Identifique e registre insights relevantes
- Responda SEMPRE em formato JSON com a estrutura completa fornecida`;

      const response = await aiService.complete('openai', {
        model: 'gpt-3.5-turbo',
        systemPrompt,
        prompt: input.trim(),
        responseFormat: { type: 'json_object' }
      });

      const parsedResponse = JSON.parse(response.text) as ApiResponse;
      
      // Remove a mensagem de "pensando"
      setMessages(prev => prev.filter(msg => msg.type !== "thinking"));
      
      const botMessage = createMessage(
        parsedResponse.chat_response.message,
        true,
        parsedResponse.chat_response.type,
        parsedResponse.thought_process
      );

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro ao processar mensagem:', error);
      // Remove a mensagem de "pensando"
      setMessages(prev => prev.filter(msg => msg.type !== "thinking"));
      
      const errorMessage = createMessage(
        "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.",
        true,
        "error"
      );
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[90rem] mx-auto px-4"
    >
      <div className="flex gap-6">
        <div className="flex-1 bg-white/10 rounded-xl p-6 backdrop-blur-lg">
          <ChatHeader />
          <ChatMessages messages={messages} />
          <ChatInput 
            value={input}
            onChange={setInput}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </AnimatedDiv>
  );
}