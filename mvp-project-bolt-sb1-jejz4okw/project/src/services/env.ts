/**
 * Serviço para gerenciar variáveis de ambiente no browser
 */
import { getDB } from './db';

interface EnvVars {
  [key: string]: string;
}

class EnvService {
  private cache: EnvVars = {};
  private initialized = false;

  async init() {
    if (this.initialized) return;
    
    try {
      const db = await getDB();
      const envStore = await db.get('settings', 'env') || { vars: {} };
      this.cache = envStore.vars;
      this.initialized = true;
    } catch (error) {
      console.error('Erro ao inicializar EnvService:', error);
      throw error;
    }
  }

  async get(key: string): Promise<string | undefined> {
    await this.init();
    return this.cache[key];
  }

  async set(key: string, value: string): Promise<void> {
    await this.init();
    
    try {
      const db = await getDB();
      this.cache[key] = value;
      
      await db.put('settings', {
        id: 'env',
        vars: this.cache,
        updatedAt: Date.now()
      });
      
      console.log(`Variável ${key} atualizada com sucesso`);
    } catch (error) {
      console.error('Erro ao atualizar variável de ambiente:', error);
      throw error;
    }
  }

  async getAll(): Promise<EnvVars> {
    await this.init();
    return { ...this.cache };
  }
}

export const envService = new EnvService();

/**
 * Atualiza uma variável de ambiente
 */
export async function writeEnvFile(key: string, value: string): Promise<void> {
  await envService.set(key, value);
}