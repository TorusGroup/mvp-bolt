import { OpenAIProvider } from './providers/openai';
import type { AIProvider, AIRequestOptions, AIResponse } from './types';

class AIService {
  private readonly providers: Map<string, AIProvider>;

  constructor() {
    this.providers = new Map();
    this.initializeProviders();
  }

  private initializeProviders(): void {
    this.providers.set('openai', new OpenAIProvider());
  }

  setupProvider(providerId: string, apiKey: string): void {
    const provider = this.getProviderById(providerId);
    provider?.setup(apiKey);
  }

  async testConnection(providerId: string): Promise<boolean> {
    const provider = this.getProviderById(providerId);
    
    if (!provider) {
      throw new Error(`Provider ${providerId} not found`);
    }
    
    return provider.checkConnection();
  }

  async complete(providerId: string, options: AIRequestOptions): Promise<AIResponse> {
    const provider = this.getProviderById(providerId);
    
    if (!provider) {
      throw new Error(`Provider ${providerId} not found`);
    }
    
    return provider.complete(options);
  }

  getProvider(providerId: string): AIProvider | undefined {
    return this.getProviderById(providerId);
  }

  getProviders(): AIProvider[] {
    return Array.from(this.providers.values());
  }

  private getProviderById(providerId: string): AIProvider | undefined {
    return this.providers.get(providerId);
  }
}

export const aiService = new AIService();
export * from './types';