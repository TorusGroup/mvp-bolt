export interface Insight {
  id: string;
  type: 'requirement' | 'constraint' | 'risk' | 'opportunity' | 'decision';
  content: string;
  impact_level: 'high' | 'medium' | 'low';
  confidence: number;
  tags: string[];
}

export interface Analysis {
  patterns: string[];
  opportunities: string[];
  risks: string[];
}

export interface Strategy {
  next_steps: string[];
  information_needed: string[];
  approach?: string;
}

export interface ProjectContext {
  objectives: {
    primary: string;
    secondary: string[];
  };
  scope: {
    included: string[];
    excluded: string[];
  };
  constraints: {
    [key: string]: string[];
  };
}

export interface PlanningPhase {
  id: string;
  name: string;
  description: string;
  objectives: string[];
  timeline?: {
    estimated_duration: string;
  };
}

export interface TeamRole {
  title: string;
  responsibilities: string[];
}

export interface Planning {
  phases: PlanningPhase[];
  team?: {
    roles: TeamRole[];
  };
}

export interface Message {
  id: string;
  text: string;
  isBot: boolean;
  type?: string;
  thoughtProcess?: ThoughtProcess;
  timestamp: number;
}

export interface ApiLog {
  request: {
    systemPrompt?: string;
    prompt: string;
    model?: string;
    [key: string]: any;
  };
  response: {
    text?: string;
    usage?: {
      promptTokens: number;
      completionTokens: number;
      totalTokens: number;
    };
    [key: string]: any;
  };
  timestamp: string;
}

export interface ThoughtProcess {
  current_understanding: {
    context: string;
    key_points: string[];
    uncertainties: string[];
  };
  analysis: {
    patterns: string[];
    opportunities: string[];
    risks: string[];
  };
}