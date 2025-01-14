import { getDB } from './db';
import type { AIAgent } from '../types/ai';
import { writeEnvFile } from './env';

export async function fetchAgents(): Promise<AIAgent[]> {
  const db = await getDB();
  return db.getAll('agents');
}

export async function createAgent(data: Omit<AIAgent, 'id'>): Promise<AIAgent> {
  const db = await getDB();
  const id = crypto.randomUUID();
  const agent: AIAgent = { ...data, id };
  await db.put('agents', agent);
  return agent;
}

export async function updateAgent(id: string, data: Omit<AIAgent, 'id'>): Promise<AIAgent> {
  const db = await getDB();
  const agent: AIAgent = { ...data, id };
  await db.put('agents', agent);
  return agent;
}

export async function fetchSettings() {
  const db = await getDB();
  const settings = await db.get('settings', 'default') || {
    id: 'default',
    openaiToken: '',
    systemPrompt: '',
    assistantPrompt: '',
  };
  return settings;
}

export async function updateSettings(data: any) {
  const db = await getDB();
  const settings = { ...data, id: 'default' };
  
  // Atualiza o arquivo .env com a nova chave da OpenAI
  if (data.openaiToken) {
    await writeEnvFile('OPENAI_API_KEY', data.openaiToken);
  }
  
  await db.put('settings', settings);
  return settings;
}