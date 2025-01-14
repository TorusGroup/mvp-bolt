import { aiService } from './index';
import { useSettings } from '../../hooks/useSettings';

export async function sendMessageToArchitect(
  message: string,
  projectContext: string,
  previousMessages: Array<{ text: string; isBot: boolean }> = []
) {
  const { settings } = useSettings();
  
  // Constrói o contexto completo para o modelo
  const conversationHistory = previousMessages
    .map(msg => `${msg.isBot ? 'Arquiteto:' : 'Usuário:'} ${msg.text}`)
    .join('\n');

  const prompt = `
${settings.architectPrompt || 'Você é um Arquiteto AI especializado em planejamento de projetos.'}

Contexto do Projeto:
${projectContext}

Histórico da Conversa:
${conversationHistory}

Usuário: ${message}

Arquiteto:`;

  try {
    const response = await aiService.complete('openai', {
      model: 'gpt-4-turbo-preview',
      prompt,
      temperature: 0.7,
      maxTokens: 2048
    });

    return response.text.trim();
  } catch (error) {
    console.error('Erro ao enviar mensagem para o Arquiteto:', error);
    throw error;
  }
}