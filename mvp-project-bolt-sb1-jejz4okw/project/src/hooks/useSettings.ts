import { useState, useEffect, useCallback } from 'react';
import { fetchSettings, updateSettings as updateSettingsApi } from '../services/api';
import { aiService } from '../services/ai';

interface Settings {
  openaiToken: string;
  anthropicToken: string;
  geminiToken: string;
  groqToken: string;
  architectPrompt: string;
  systemPrompt: string;
  assistantPrompt: string;
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>({
    openaiToken: '',
    anthropicToken: '',
    geminiToken: '',
    groqToken: '',
    architectPrompt: '',
    systemPrompt: '',
    assistantPrompt: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings()
      .then(settings => {
        setSettings(settings);
        // Inicializa os provedores de AI com as chaves disponíveis
        if (settings.openaiToken) {
          aiService.setupProvider('openai', settings.openaiToken);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const saveSettings = useCallback(async (newSettings: Settings) => {
    try {
      const updated = await updateSettingsApi(newSettings);
      setSettings(updated);
      
      // Atualiza os provedores de AI com as novas chaves
      if (newSettings.openaiToken) {
        aiService.setupProvider('openai', newSettings.openaiToken);
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      return false;
    }
  }, []);

  return { settings, loading, saveSettings };
}