export interface AIProvider {
  id: string;
  name: string;
  models: AIModelInfo[];
  setup: (apiKey: string) => Promise<void>;
  checkConnection: () => Promise<boolean>;
  complete: (options: AIRequestOptions) => Promise<AIResponse>;
}

export interface AIModelInfo {
  id: string;
  name: string;
  description: string;
  contextWindow: number;
  maxTokens: number;
  inputCostPer1k: number;
  outputCostPer1k: number;
}

export interface AIRequestOptions {
  model: string;
  prompt: string;
  systemPrompt?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
  stop?: string[];
  responseFormat?: { type: string };
}

export interface AIResponse {
  text: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}