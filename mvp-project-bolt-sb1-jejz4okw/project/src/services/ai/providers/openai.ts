import { OpenAI } from 'openai';
import type { AIProvider, AIModelInfo, AIRequestOptions, AIResponse } from '../types';
import { envService } from '../../env';

export class OpenAIProvider implements AIProvider {
  private client: OpenAI | null = null;
  private apiKey: string | null = null;
  
  readonly id = 'openai';
  readonly name = 'OpenAI';
  readonly models: AIModelInfo[] = [
    {
      id: 'gpt4o-mini',
      name: 'GPT-4 Otimizado Mini',
      description: 'Modelo otimizado para melhor custo-benefício',
      contextWindow: 8192,
      maxTokens: 2048,
      inputCostPer1k: 0.005,
      outputCostPer1k: 0.015
    }
  ];

  constructor() {
    this.loadApiKey();
  }

  private async loadApiKey(): Promise<void> {
    const key = await envService.get('OPENAI_API_KEY');
    if (key) {
      await this.setup(key);
    }
  }

  async setup(apiKey: string): Promise<void> {
    if (this.apiKey === apiKey && this.client) {
      return;
    }

    this.apiKey = apiKey;
    this.client = new OpenAI({ 
      apiKey,
      dangerouslyAllowBrowser: true
    });

    await envService.set('OPENAI_API_KEY', apiKey);
  }

  async checkConnection(): Promise<boolean> {
    if (!this.client) {
      return false;
    }

    try {
      const response = await this.client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [{ role: 'user', content: 'Test connection' }],
        max_tokens: 5
      });
      return response.choices.length > 0;
    } catch (error) {
      console.error('OpenAI connection test failed:', error);
      return false;
    }
  }

  async complete(options: AIRequestOptions): Promise<AIResponse> {
    if (!this.client) {
      throw new Error('OpenAI client not initialized');
    }

    try {
      const messages = [
        {
          role: 'system' as const,
          content: options.systemPrompt || 'Você é um assistente especializado em projetos de inovação.'
        },
        {
          role: 'user' as const,
          content: `${options.prompt}

IMPORTANTE: Sua resposta DEVE seguir este formato JSON:
{
  "thought_process": {
    "current_understanding": {
      "context": "Explicação detalhada do contexto atual",
      "key_points": ["Ponto chave 1", "Ponto chave 2"],
      "uncertainties": ["Incerteza 1", "Incerteza 2"]
    },
    "analysis": {
      "patterns": ["Padrão 1", "Padrão 2"],
      "opportunities": ["Oportunidade 1", "Oportunidade 2"],
      "risks": ["Risco 1", "Risco 2"]
    }
  },
  "chat_response": {
    "message": "Sua mensagem aqui",
    "type": "analysis"
  }
}`
        }
      ];

      const response = await this.client.chat.completions.create({
        model: options.model || 'gpt-4-turbo-preview',
        messages,
        temperature: options.temperature || 0.7,
        max_tokens: options.maxTokens || 2048,
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0]?.message?.content || '';
      let parsedContent;
      
      try {
        parsedContent = JSON.parse(content);
      } catch (e) {
        console.error('Erro ao fazer parse da resposta:', e);
        parsedContent = {
          thought_process: {
            current_understanding: {
              context: "Erro ao processar resposta",
              key_points: [],
              uncertainties: []
            }
          },
          chat_response: {
            message: content,
            type: "error"
          }
        };
      }

      return {
        text: JSON.stringify(parsedContent),
        usage: {
          promptTokens: response.usage?.prompt_tokens || 0,
          completionTokens: response.usage?.completion_tokens || 0,
          totalTokens: response.usage?.total_tokens || 0
        }
      };
    } catch (error) {
      console.error('OpenAI completion failed:', error);
      throw error;
    }
  }
}