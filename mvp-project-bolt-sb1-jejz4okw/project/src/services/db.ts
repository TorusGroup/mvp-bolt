import { openDB } from 'idb';
import type { DBSchema } from 'idb';
import type { AIAgent } from '../types/ai';
import type { Project } from '../types/project';
import type { Message, ApiLog } from '../components/chat/types';

interface ArchitectChatData {
  id: string;
  projectId: string;
  messages: Message[];
  insights: string[];
  currentPhase: number;
  apiLogs: ApiLog[];
  updatedAt: number;
}

interface MVPFactoryDB extends DBSchema {
  agents: {
    key: string;
    value: AIAgent;
    indexes: { 'by-created': number };
  };
  settings: {
    key: string;
    value: {
      id: string;
      openaiToken?: string;
      anthropicToken?: string;
      geminiToken?: string;
      groqToken?: string;
      architectPrompt?: string;
      systemPrompt?: string;
      assistantPrompt?: string;
      vars?: Record<string, string>;
      updatedAt?: number;
    };
  };
  projects: {
    key: string;
    value: Project;
    indexes: { 'by-created': number; 'by-status': string };
  };
  project_files: {
    key: string;
    value: {
      id: string;
      metadata: any;
      conversations: any[];
      tasks: any[];
      artifacts: any[];
      createdAt: number;
      updatedAt: number;
    };
  };
  architect_chats: {
    key: string;
    value: ArchitectChatData;
    indexes: { 'by-project': string; 'by-updated': number };
  };
}

const DB_NAME = 'mvp-factory';
const DB_VERSION = 5;

async function initDB() {
  return openDB<MVPFactoryDB>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        const agentsStore = db.createObjectStore('agents', { keyPath: 'id' });
        agentsStore.createIndex('by-created', 'createdAt');
        
        db.createObjectStore('settings', { keyPath: 'id' });
      }
      
      if (oldVersion < 2) {
        const projectsStore = db.createObjectStore('projects', { keyPath: 'id' });
        projectsStore.createIndex('by-created', 'createdAt');
        projectsStore.createIndex('by-status', 'status');
      }

      if (oldVersion < 3) {
        const filesStore = db.createObjectStore('project_files', { keyPath: 'id' });
      }

      if (oldVersion < 4) {
        const architectChatsStore = db.createObjectStore('architect_chats', { keyPath: 'id' });
        architectChatsStore.createIndex('by-project', 'projectId');
        architectChatsStore.createIndex('by-updated', 'updatedAt');
      }
    },
  });
}

let dbPromise: ReturnType<typeof initDB> | null = null;

export function getDB() {
  if (!dbPromise) {
    dbPromise = initDB();
  }
  return dbPromise;
}

export type { MVPFactoryDB, ArchitectChatData };